<template>
  <div>
    <div class="popup-overlay" @click.stop="closebtn">
      <div class="popup createmessage">
        <div class="overview__transaction--header">
          <div class="overview__transaction--h2 header-label">{{ header }}</div>
        </div>

        <div class="createmessage__form" @click.stop="openbtn">
          <div class="input-area">
            <label class="smlabel tinylabel fontweight-5">Subject</label>
            <div class="input">
              <input placeholder="Why are you messaging?" v-model="label" />
            </div>
          </div>

          <div class="input-area">
            <label class="smlabel tinylabel fontweight-5">Your message</label>
            <div class="input">
              <textarea placeholder="Your message here" v-model="content"></textarea>
            </div>
          </div>

          <div class="overview__withddep">
            <button
              class="button orange-btn-faint fontweight-3 half-flex-space"
              v-if="!allowsubmit"
            >
              Send Message
            </button>
            <button
              class="button orange-btn fontweight-3 half-flex-space"
              v-if="allowsubmit"
              @click="submitmsg"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import global from "@/mixins/global";

export default {
  data() {
    return {
      label: "",
      content: "",
    };
  },
  props: ["header", "openbtn", "closebtn"],
  mixins: [global],
  computed: {
    allowsubmit() {
      const { label, content } = this;

      if (label.length && content.length) {
        return true;
      }

      return false;
    },
  },
  methods: {
    submitmsg() {
      const { label, content } = this;

      if (label.length && content.length) {
        this.closebtn();
        this.toggleverbiage(`Sending your message`);
        this.onspinner();
        this.supportcontact({ label, content })
          .then(() => {
            this.toggleverbiage(null);
            this.offspinner();
            this.setdonemsg(`Your message has been sent! Our team will get back to you promptly!`);
          })
          .catch((error) => {});
      }
    },
  },
};
</script>

<style lang="scss">
.createmessage {
  width: #{scaleValue(400)};

  &__form {
    width: 100%;
  }
}
</style>
