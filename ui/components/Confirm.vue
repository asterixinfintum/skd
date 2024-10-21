<template>
  <div class="popup-overlay">
    <div class="popup">
      <div class="confirm mobilewide">
        <div class="overview__transaction--header">
          <div class="overview__transaction--h2 header-label">{{ msg }}</div>
        </div>

        <div class="confirm-text">
          <div
            class="confirm-textarea flex-with-spacebetween"
            v-if="subject === 'transfer'"
          >
            <p>Bank</p>
            <p>{{ transferdetails.nameofbnk }}</p>
          </div>
          <div
            class="confirm-textarea flex-with-spacebetween"
            v-if="subject === 'transfer'"
          >
            <p>Amount</p>
            <p>{{ transferdetails.amounttosend }}</p>
          </div>
          <div
            class="confirm-textarea flex-with-spacebetween"
            v-if="subject === 'transfer'"
          >
            <p>Account</p>
            <p>{{ transferdetails.accountno }}</p>
          </div>
          <div
            class="confirm-textarea flex-with-spacebetween"
            v-if="subject === 'transfer'"
          >
            <p>Country</p>
            <p>{{ transferdetails.country }}</p>
          </div>
        </div>

        <div class="overview__withddep center">
          <button
            class="button orange-btn fontweight-3 half-flex-space"
            @click="confirmationfunc"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import global from "@/mixins/global";

export default {
  props: ["confirmationfunc", "msg", "subject", "transferdetails"],
  mixins: [global],
};
</script>

<style lang="scss">
.confirm {
  min-width: #{scaleValue(300)};

  &-text {
    margin-top: #{scaleValue(12)};

    @media only screen and (max-width: 768px) {
      font-size: #{scaleValue(60)};
      line-height: #{scaleValue(130)};
    }
  }

  &-textarea {
    padding: #{scaleValue(12)} 0;

    @media only screen and (max-width: 768px) {
      font-size: #{scaleValue(60)};
      line-height: #{scaleValue(130)};
    }
  }
}
</style>

