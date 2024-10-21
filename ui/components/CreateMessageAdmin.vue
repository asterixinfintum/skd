<template>
  <div class="popup-overlay">
    <div class="addnotification popup">
      <div class="apply relativeposition">
        <span class="sidex" @click="togglemessageform">
          <svg class="feature__icon">
            <use xlink:href="@/assets/imgs/sprite.svg#icon-x-altx-alt"></use>
          </svg>
        </span>
        <div class="apply__content">
          <div class="apply__form">
            <div class="overview__transaction--header bottom-margin">
              <div class="overview__transaction--h2 header-label capitalize">
                {{
                  `Add a Message to ${userprofile.details.firstname} ${userprofile.details.lastname}'s Profile`
                }}
              </div>
            </div>

            <div class="input-area">
              <label class="smlabel">Message Topic</label>
              <label
                class="smlabel tinylabel fontweight-5"
                :class="{
                  fonterror: authError === 'this input should contain just numbers',
                }"
              >
              </label>
              <div class="input">
                <input :placeholder="`Topic`" v-model="label" />
              </div>
            </div>

            <div class="input-area">
              <label class="smlabel">Message Content</label>
              <label
                class="smlabel tinylabel fontweight-5"
                :class="{
                  fonterror: authError === 'this input should contain just numbers',
                }"
              >
              </label>
              <div class="input">
                <textarea :placeholder="`Content`" v-model="content"></textarea>
              </div>
            </div>

            <div class="overview__withddep" v-if="allowsubmit">
              <button
                class="button orange-btn fontweight-3 half-flex-space curved"
                @click="callcreatemessage"
              >
                Add Message
              </button>
            </div>

            <div class="overview__withddep" v-if="!allowsubmit">
              <button class="button orange-btn-faint fontweight-3 half-flex-space curved">
                Add Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import global from "@/mixins/global";

export default {
  mixins: [global],
  props: ["togglemessageform"],
  data() {
    return {
      label: "",
      content: "",
    };
  },
  methods: {
    async callcreatemessage() {
      const { label, content, userid } = this;

      const message = {
        user: userid,
        label,
        content,
        adminmsg: true,
      };

      this.toggleverbiage("Creating User Message");
      this.onspinner();

      try {
        await this.senduseramessage(message);
        this.toggleverbiage(null);
        this.offspinner();

        if (this.userid) {
          this.togglemessageform();
        }
      } catch (error) {
        // Handle the error appropriately
        console.error("Error in handleSendMessage:", error);
        // Perhaps show an error notification to the user
      }
    },
  },
  computed: {
    userid() {
      return this.$route.params.user;
    },
    allowsubmit() {
      const { label, content } = this;

      if (label.length && content.length) {
        return true;
      }

      return false;
    },
  },
};
</script>
