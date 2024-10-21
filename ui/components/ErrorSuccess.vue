<template>
  <div>
    <div class="errorsuccess popup-overlay" v-if="successMessage || errorMessage">

      <div class="popup errorsuccess__body" :class="{ error }" v-if="successMessage">
        <div class="errorsuccess__top">
          <span> </span>
          <span class="svg" @click="closeErrorSuccess">
            <svg class="feature__icon">
              <use xlink:href="@/assets/imgs/sprite.svg#icon-close"></use>
            </svg>
          </span>
        </div>
        <p>{{ successMessage }}</p>
      </div>

      <div class="popup errorsuccess__body error" v-if="errorMessage">
        <div class="errorsuccess__top">
          <span> </span>
          <span class="svg error" @click="closeErrorSuccess">
            <svg class="feature__icon">
              <use xlink:href="@/assets/imgs/sprite.svg#icon-close"></use>
            </svg>
          </span>
        </div>
        <p>{{ errorMessage }}</p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: ["errorMessage", "successMessage", "closeErrorSuccess"],
};
</script>

<style lang="scss">
.errorsuccess {
  &__top {
    display: flex;
    width: 100%;
    justify-content: space-between;

    & span {
      &.svg {
        cursor: pointer;
        display: flex;
        height: #{scaleValue(30)};
        width: #{scaleValue(30)};
        background: $green-success;
        border-radius: 100%;
        justify-content: center;
        align-items: center;


        & svg {
          height: #{scaleValue(18)};
          width: #{scaleValue(18)};
          fill: $font-white;
        }

        &.error {
            background: $error-color;
        }
      }
    }
  }

  &__body {
    border: 3px solid $green-success;
    width: #{scaleValue(500)};
    color: $green-success;
    font-size: #{scaleValue(18)};
    transition: all 0.5s ease;
    transform: translateY(#{scaleValue(-100)});
    padding-bottom:  #{scaleValue(50)};

    &.error {
      border: 1px solid $error-color;
      color: $error-color;
      padding-bottom:  #{scaleValue(50)};
    }
  }
}
</style>
