<template>
  <div class="popup-overlay">
    <div class="addnotification popup">
      <div class="apply relativeposition">
        <span class="sidex" @click="togglenotform">
          <svg class="feature__icon">
            <use xlink:href="@/assets/imgs/sprite.svg#icon-x-altx-alt"></use>
          </svg>
        </span>
        <div class="apply__content">
          <div class="apply__form">
            <div class="overview__transaction--header bottom-margin">
              <div class="overview__transaction--h2 header-label capitalize">
                {{
                  `Add a Notification to ${userprofile.details.firstname} ${userprofile.details.lastname}'s Profile`
                }}
              </div>
            </div>

            <div class="input-area">
              <label class="smlabel">Notification Topic</label>
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
              <label class="smlabel">Notification Content</label>
              <label
                class="smlabel tinylabel fontweight-5"
                :class="{
                  fonterror: authError === 'this input should contain just numbers',
                }"
              >
              </label>
              <div class="input">
                <textarea :placeholder="`Content`" v-model="description"></textarea>
              </div>
            </div>

            <div class="overview__withddep" v-if="allowsubmit">
              <button
                class="button orange-btn fontweight-3 half-flex-space curved"
                @click="callcreatenotification"
              >
                Add Notification
              </button>
            </div>

            <div class="overview__withddep" v-if="!allowsubmit">
              <button class="button orange-btn-faint fontweight-3 half-flex-space curved">
                Add Notification
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
  props: ["togglenotform"],
  data() {
    return {
      label: "",
      description: "",
    };
  },
  methods: {
    async callcreatenotification() {
      const { label, description, userid } = this;

      const notification = {
        user: userid,
        label,
        description,
        type: "notification",
      };

      this.toggleverbiage("Creating notification");
      this.onspinner();

      try {
        await this.createnotification(notification);

        this.toggleverbiage(null);
        this.offspinner();

        if (this.userid) {
          this.togglenotform();
          await this.getusernotifications(this.user);
        }
      } catch (error) {
        // Handle the error appropriately
        console.error("Error in handleCreateNotification:", error);
        // Maybe display an error message to the user
      }
    },
  },
  computed: {
    userid() {
      return this.$route.params.user;
    },
    allowsubmit() {
      const { label, description } = this;

      if (label.length && description.length) {
        return true;
      }

      return false;
    },
  },
};
</script>
