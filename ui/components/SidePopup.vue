<template>
  <div>
    <div class="popup side">
      <div class="popup__body">
        <div class="popup__textarea">
          <div class="overview__transaction--header">
            <div class="overview__transaction--h2 header-label">
              {{ header }}
            </div>
          </div>

          <p class="popup__text">
            {{ text }}
          </p>

          <div class="overview__withddep" v-if="admin">
            <button
              class="button orange-btn fontweight-3 half-flex-space loanbtn curved"
              @click="updatemethod"
            >
              {{ btntext }}
            </button>

            <button
              class="button orange-btn fontweight-3 half-flex-space loanbtn curved"
              v-if="deletebtn"
              @click="deletemethod"
            >
              {{ deletebtn }}
            </button>
          </div>

          <div class="overview__withddep" v-if="!admin && type === 'loan'">
            <button
              class="button orange-btn fontweight-3 half-flex-space loanbtn curved"
              @click="toroute(`loan/${current}`)"
            >
              {{ btntext }}
            </button>
          </div>

          <div class="overview__withddep" v-if="!admin && type === 'investment'">
            <button
              class="button orange-btn fontweight-3 half-flex-space loanbtn curved"
              @click="toroute(`investment/${current}`)"
            >
              {{ btntext }}
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
  mixins: [global],
  props: [
    "header",
    "text",
    "buttontext",
    "current",
    "btntext",
    "deletebtn",
    "admin",
    "type",
    "updatemethod",
    "deletemethod",
    "itemid",
  ],
};
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: #{scaleValue(200)};
  right: #{scaleValue(100)};
  z-index: 4;
  background: rgba($primary-orange, 0.5);
  padding: #{scaleValue(10)};
  border-radius: #{scaleValue(5)};

  &.side {
    width: #{scaleValue(800)};
  }

  &__body {
    background: $font-white;
    padding: #{scaleValue(20)};

    & figure {
      width: #{scaleValue(30)};
      height: #{scaleValue(30)};

      & img {
        object-fit: contain;
        height: 100%;
        width: 100%;
      }
    }

    &.flex {
      display: flex;
    }
  }

  &__text {
    font-size: #{scaleValue(15)};
    line-height: #{scaleValue(30)};
    margin-top: #{scaleValue(30)};

    border-radius: #{scaleValue(5)};
  }
}
</style>
