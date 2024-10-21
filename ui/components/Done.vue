<template>
  <div class="popup-overlay higherz" v-if="donemsg">
    <div class="popup">
      <div class="popup-overlay higherz">
          <div class="popup">
            <div class="displaycard__review">
              <div class="displaycard__review--header">
                <div class="displaycard__review--headerleft">
                  <figure class="displaycard__review--logo">
                    <img src="@/assets/imgs/logo-nobackground.png" />
                  </figure>
                  <p class="displaycard__review--now">now</p>
                </div>

                <div class="displaycard__review--headerright">
                  
                </div>
              </div>

              <div class="displaycard__review--content">
                <p class="successtext">
                  <span class="displaycard__review--itemlogo">
                   
                  </span>

                  {{ donemsg }}
                </p>
              </div>

              <div class="displaycard__review--bottom">
                <button
                  class="button displaycard__review--btn"
                  @click="okay"
                >
                  Done
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
  methods: {
    okay() {
      const { user } = this;
      this.setdonemsg(null);
      this.$router.push(`/overview/${user}`);
    },
  }
};
</script>
