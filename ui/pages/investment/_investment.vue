<template>
  <div>
    <div class="overview">
      <UserHeader
        :notifsbodstate="opennotificationsbody"
        :opennotifsbod="opennotifications"
        :openprofilebod="openprofiledrop"
        :profilebod="profilebody"
      />

      <div class="white-background content-body">
        <div class="apply">
          <div class="apply__content">
            <div class="apply__form" v-if="investment">
              <div class="overview__transaction--header">
                <div class="overview__transaction--h2 header-label bottom-margin">
                  Start the {{ investment.name }}
                </div>
              </div>

              <div class="input-area">
                <label class="smlabel">Amount ($)</label>
                <label
                  class="smlabel tinylabel fontweight-5"
                  :class="{
                    fonterror: inputError === 'Insufficient funds',
                  }"
                >
                  {{
                    inputError
                      ? `Insufficient funds`
                      : `This input should contain just numbers`
                  }}
                </label>
                <div class="input">
                  <input placeholder="Amount to commit" v-model="amount" />
                </div>
              </div>

              <div class="input-area">
                <label class="smlabel">Target ($)</label>
                <label
                  class="smlabel tinylabel fontweight-5"
                  :class="{
                    fonterror: authError === 'this input should contain just numbers',
                  }"
                >
                  This input should contain just numbers
                </label>
                <div class="input">
                  <input placeholder="What's your target?" v-model="target" />
                </div>
              </div>

              <div class="overview__withddep">
                <button
                  class="button orange-btn fontweight-3 half-flex-space"
                  v-if="allowapply"
                  @click="applyinvest"
                >
                  Apply
                </button>
                <button
                  class="button orange-btn-faint fontweight-3 half-flex-space"
                  v-if="!allowapply"
                >
                  Apply
                </button>
              </div>
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
  data() {
    return {
      amount: "",
      target: "",
      inputError: null,
    };
  },
  mixins: [global],
  methods: {
    applyinvest() {
      const { investment, amount, target, account } = this;

      if (parseFloat(account.balance) <= parseFloat(amount)) {
        this.inputError = `Insufficient funds`;

        return;
      }

      const investmentplanid = investment._id;
      this.toggleverbiage("Processing");
      this.onspinner();
      this.joininvestmentprog({ amount, target, investmentplanid })
        .then(() => {
          this.toggleverbiage(null);
          this.offspinner();
          this.setdonemsg(
            `Process completed. You can track your progress in your account over dashboard`
          );
        })
        .catch((error) => {});
    },
  },
  watch: {
    amount(newval, oldval) {
      const { account } = this;

      if (parseFloat(newval) < parseFloat(account.balance)) {
        return (this.inputError = null);
      }

      if (parseFloat(newval) >= parseFloat(account.balance)) {
        return (this.inputError = "Insufficient funds");
      }
    },
  },
  computed: {
    allowapply() {
      const { amount, target } = this;

      if (
        target.length &&
        amount.length &&
        this.isOnlyNumbers(target) &&
        this.isOnlyNumbers(amount) &&
        !this.inputError
      ) {
        return true;
      } else {
        return false;
      }
    },
    investment() {
      const investmentid = this.$route.params.investment;

      if (this.investmentplans.length) {
        const investment = this.investmentplans.find(
          (invstmnt) => invstmnt._id === investmentid
        );

        return investment;
      } else {
        return null;
      }
    },
  },
};
</script>
