<template>
  <div class="popup-overlay higherz" v-if="spinneron">
    <div class="popup">
      <div class="loader"></div>
      <p class="verbiage" v-if="spinnerverbiage">{{ spinnerverbiage }}</p>
    </div>
  </div>
</template>

<script>
import global from "@/mixins/global";

export default {
  mixins: [global],
};
</script>

<style lang="scss">

.loader {
  border: 5px solid #f3f3f3;
  border-top: 5px solid $primary-orange;
  border-radius: 50%;
  width: #{scaleValue(50)};
  height: #{scaleValue(50)};
  animation: spin 1s linear infinite;
}

.verbiage {
  margin-top: #{scaleValue(20)};
  font-size: #{scaleValue(20)};
  font-weight: 400;
  color: $font-black;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
