<template>
  <div>
    <div>
      <figure class="chat__close" @click="closechat">
        <span class="chat__close--x">X</span>
      </figure>

      <div class="chat__bubbles" ref="bubblescontainer">
        <div v-if="!currentadmin">
          <div v-for="message in messages" :key="message._id">
            <BubbleBody
              :content="message.message"
              :time="message.time"
              :role="message.from ? 'sender' : 'receiver'"
            />
          </div>
        </div>

        <div v-if="currentadmin">
          <div v-for="message in messages" :key="message._id">
            <BubbleBody
              :content="message.message"
              :time="message.time"
              :role="!message.from ? 'sender' : 'receiver'"
            />
          </div>
        </div>
      </div>

      <div class="chat__messageinput">
        <textarea
          rows=""
          cols=""
          v-model="chatval"
          @keydown.enter.prevent="sendMessage"
          v-if="!mobileView"
          class="chat__auto-resize"
          ref="txtarea"
        ></textarea>
        <textarea
          rows=""
          cols=""
          v-model="chatval"
          v-if="mobileView"
          class="chat__auto-resize"
          ref="txtarea"
        ></textarea>
        <span class="send" @click="sendMessage">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
            style="color: rgb(29, 155, 240)"
          >
            <g>
              <path
                d="M2.504 21.866l.526-2.108C3.04 19.719 4 15.823 4 12s-.96-7.719-.97-7.757l-.527-2.109L22.236 12 2.504 21.866zM5.981 13c-.072 1.962-.34 3.833-.583 5.183L17.764 12 5.398 5.818c.242 1.349.51 3.221.583 5.183H10v2H5.981z"
              ></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user", "handleEnterKey", "messages", "currentadmin", "closechat"],
  data() {
    return {
      chatval: "",
      mobileView: false,
    };
  },
  mounted() {
    this.scrollToBottom();

    const mediaQuery = window.matchMedia("(max-width: 600px)");

    if (mediaQuery.matches) {
      this.mobileView = true;
    } else {
      this.mobileView = false;
    }

    const textareas = document.querySelectorAll(".chat__auto-resize");
    textareas.forEach((textarea) => {
      textarea.addEventListener("input", autoResize);
    });

    this.$refs.txtarea.focus();

    function autoResize() {
      this.style.height = "auto"; 
      this.style.height = '5rem';
    }
  },
  watch: {
    messages(newval, oldval) {
      this.scrollToBottom();
    },
  },
  methods: {
    sendMessage() {
      if (this.chatval.trim().length) {
        this.handleEnterKey(this.chatval);
        this.chatval = "";

        this.$refs.txtarea.height = 'auto';
        this.$refs.txtarea.style.height = '2rem';
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.bubblescontainer;
        container.scrollTop = container.scrollHeight;
      });
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
  background: $primary-orange;
  width: #{scaleValue(370)};
  z-index: 20;
  padding-top: #{scaleValue(50)};

  &__bubbles {
    height: #{scaleValue(340)};
    overflow-x: hidden;
    overflow-y: scroll;

    @media only screen and (max-width: 414px) {
      height: #{scaleValue(2000)};
    }
  }

  &__messageinput {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: #{scaleValue(10)};
    background: $primary-orange;

    position: relative;

    & textarea {
      width: 100%;
      padding: #{scaleValue(10)};
      border: none;
      outline: none;
      border-radius: 1rem;
    }

    & span {
      &.send {
        position: absolute;
        bottom: #{scaleValue(22)};
        right: #{scaleValue(20)};
        background: $star-green;
        display: flex;
        align-items: center;
        height: 2.5rem;
        border-radius: 0 1rem 1rem 0;

        @media only screen and (max-width: 414px) {
          height: 13rem;
        }

        & svg {
          fill: $primary-orange;
          height: #{scaleValue(20)};
          width: #{scaleValue(40)};

          @media only screen and (max-width: 414px) {
            height: #{scaleValue(100)};
            width: #{scaleValue(100)};
          }
        }
      }
    }
  }

  &__auto-resize {
    box-sizing: border-box;
    overflow: hidden; /* Hide the scrollbar */
    min-height: 50px; /* Optional: set a minimum height */
    resize: none;
  }

  &__close {
    position: absolute;
    top: #{scaleValue(20)};
    right: #{scaleValue(20)};
    cursor: pointer;

    box-shadow: 0 0 20px 10px rgba(255, 0, 0, 0.8), 0 0 30px 15px rgba(0, 255, 0, 0.6),
      0 0 40px 20px rgba(0, 0, 255, 0.4);

    border-radius: 100%;
    height: #{scaleValue(30)};
    width: #{scaleValue(30)};
    display: flex;
    justify-content: center;
    align-content: center;

    @media only screen and (max-width: 414px) {
      height: #{scaleValue(120)};
      width: #{scaleValue(120)};
      background: $font-white;
    }

    &--x {
      font-size: #{scaleValue(20)};
      display: flex;
      justify-content: center;
      align-items: center;

      @media only screen and (max-width: 414px) {
        font-size: #{scaleValue(60)};
      }
    }
  }
}
</style>
