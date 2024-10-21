<template>
  <div class="chat" :class="{ transparentbackground: !open }">
    <div class="chat__open" @click="openchat" v-if="user && !open">
      <span class="chat__open--unseen" v-if="unSeenMessages.length">{{
        unSeenMessages.length
      }}</span>
      <span></span>
      <span class="chat__open--svg">
        <svg class="feature__icon">
          <use xlink:href="@/assets/imgs/sprite.svg#icon-message-circle"></use>
        </svg>
      </span>
    </div>
    <div v-if="user && open">
      <ChatInterface
        :user="user"
        :handleEnterKey="handleEnterKey"
        :messages="messages"
        :currentadmin="currentadmin"
        :closechat="closechat"
      />
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";

let CHAT_API = getCurrentPageDomain();

const processTime = (time) => {
    if (time) {
        const date = new Date(time);
        return date.toLocaleString("en-US", {
            weekday: "long", // "Monday"
            year: "numeric", // "2024"
            month: "long", // "May"
            day: "numeric", // "19"
            hour: "2-digit", // "11"
            minute: "2-digit", // "36"
            second: "2-digit", // "17"
            hour12: true, // "PM"
        });
    }
}

if (CHAT_API.includes("localhost")) {
  CHAT_API = `http://localhost:8082`;
} else {
  CHAT_API = getCurrentPageDomain();
}

function getCurrentPageDomain() {
  if (process.client) {
    // Check if the code is running on the client side
    const currentURL = window.location.href;
    const url = new URL(currentURL);
    return url.protocol + "//" + "chat." + url.hostname;
  } else {
    // Handle server-side rendering (optional)
    return ""; // You can return a default value or handle it differently for SSR
  }
}

export default {
  props: ["user", "currentadmin"],
  data() {
    return {
      socket: null,
      messages: [],
      agent: false,
      open: false,
    };
  },
  mounted() {
    if (this.user) {
      this.connectSocket();

      this.getMessages();
    }
  },
  watch: {
    user(newval, oldval) {
      console.log('user:', user)
      if (newval) {
        this.connectSocket();
      }
    },
  },
  computed: {
    unSeenMessages() {
      const { messages } = this;

      const unseenMsgs = messages.filter((msg) => {
        if (this.currentadmin) {
          if (!msg.from && !msg.seen) {
            return msg;
          }
        } else {
          if (msg.from && !msg.seen) {
            return msg;
          }
        }
      });

      return unseenMsgs;
    },
  },
  methods: {
    setMsgAsSeen() {
      const { unSeenMessages } = this;

      if (unSeenMessages.length) {
        this.socket.emit("setMsgAsSeen", unSeenMessages);
      }
    },
    openchat() {
      this.open = true;
      this.setMsgAsSeen();
    },
    closechat() {
      this.open = false;
    },
    async getMessages() {
      try {
        const url = new URL(`${CHAT_API}/userchatmsgs`);
        url.searchParams.append("user", this.user);
        const token = localStorage.getItem("873__jh6bdjklkjhghn");

        if (token) {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();

          this.messages = data.chatMsgs;
        }
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    },
    handleEnterKey(chatval) {
      const currentDate = new Date();
      const isoDateString = currentDate.toISOString();

      let msgData;

      if (!this.currentadmin) {
        msgData = { chatval, time: isoDateString };
      } else {
        msgData = { chatval, time: isoDateString, from: this.currentadmin };
      }

      const tempMsg = {
        message: chatval,
        time: processTime(isoDateString),
        _id: this.messages.length,
        from: this.currentadmin ? this.currentadmin : null,
        temp: true
      }

      this.messages.push(tempMsg)

      this.socket.emit("sendMessage", msgData);
    },
    connectSocket() {
      let token = localStorage.getItem("873__jh6bdjktoken");

      if (!token && localStorage.getItem("873__jh6bdjklkjhghn")) {
        token = localStorage.getItem("873__jh6bdjklkjhghn");
        this.agent = true;
      } else {
        this.agent = false;
      }

      if (token) {
        this.socket = io(`${CHAT_API}`, {
          extraHeaders: {
            Authorization: `Bearer ${token}`,
          },
          query: {
            userid: this.user,
          },
        });

        this.socket.on("newMessage", (data) => {
          if (data.user === this.user) {
            this.messages.push(data);

            const messages = this.messages.filter(msg => !msg.temp)

            this.messages = messages
          }
        });

        this.socket.on("msgsSetAsSeen", () => {
          this.getMessages();
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.chat {
  position: fixed;
  bottom: 0;
  right: #{scaleValue(83)};
  padding: #{scaleValue(20)};
  background: $font-white;
  width: #{scaleValue(350)};
  z-index: 20;
  padding-top: #{scaleValue(50)};

  @media only screen and (max-width: 414px) {
    width: 92%;
  }

  &.transparentbackground {
    background: transparent;
  }

  &__open {
    display: flex;
    justify-content: space-between;

    &--unseen {
      background: $primary-orange;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: #{scaleValue(25)};
      width: #{scaleValue(25)};
      color: $font-white;
      font-weight: 500;
      font-size: #{scaleValue(13)};

      position: absolute;
      right: #{scaleValue(15)};
      top: #{scaleValue(10)};
      z-index: 2;
    }

    &--svg {
      cursor: pointer;
      transition: all 0.5s ease;
      border-radius: 100%;
      height: #{scaleValue(50)};
      width: #{scaleValue(50)};

      display: flex;
      justify-content: center;
      align-items: center;

      box-shadow: 0 0 20px 10px rgba(255, 0, 0, 0.8), 0 0 30px 15px rgba(0, 255, 0, 0.6),
        0 0 40px 20px rgba(0, 0, 255, 0.4);
      transform: translateY(#{scaleValue(-30)});
      background: $font-white;

      @media only screen and (max-width: 414px) {
        height: #{scaleValue(200)};
        width: #{scaleValue(200)};
      }

      &:hover {
        transform: translateY(#{scaleValue(-40)});
      }

      & svg {
        fill: $primary-orange;
        height: #{scaleValue(30)};
        width: #{scaleValue(30)};
        cursor: pointer;

        @media only screen and (max-width: 414px) {
          height: #{scaleValue(130)};
          width: #{scaleValue(130)};
        }
      }
    }
  }
}
</style>
