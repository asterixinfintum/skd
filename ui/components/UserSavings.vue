<template>
  <div>
    <div class="popup-overlay highz" v-if="depositformopen">
      <div class="popup">
        <div class="halfscreen-width-2 mobilewide">
          <div class="overview__transaction--header">
            <div class="overview__transaction--h2 header-label smlabel orange">
              Deposit into your
              <span class="capitalize">{{ nameofsavingsplan }}</span> savings plan
            </div>
          </div>

          <div class="padding-top-bottom">
            <div class="input-area fullbody">
              <label class="smlabel">Amount</label>
              <div class="input">
                <input
                  placeholder="Amount"
                  type="text"
                  v-model="depositamount"
                  @input="validateNumberInputToDeposit"
                />
              </div>
            </div>
          </div>

          <div class="flex-with-spacebetween">
            <div class="overview__withddep">
              <button
                class="button orange-btn fontweight-3 half-flex-space loanbtn curved"
                v-if="allowdeposit"
                @click="depositintosavings"
              >
                deposit
              </button>

              <button
                class="button orange-btn-faint fontweight-3 half-flex-space loanbtn curved"
                v-if="!allowdeposit"
              >
                deposit
              </button>
            </div>

            <div class="overview__withddep">
              <button
                class="button fontweight-3 half-flex-space loanbtn curved blue-background"
                @click="closedeposit"
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="popup-overlay highz" v-if="edit">
      <div class="popup">
        <div class="halfscreen-width-2">
          <div class="two-side-grid">
            <div class="input-area fullbody">
              <label class="smlabel">Bonus</label>
              <div class="input">
                <input
                  placeholder="bonus to display for this savings"
                  type="number"
                  v-model="formbonus"
                />
              </div>
            </div>

            <div class="input-area fullbody">
              <label class="smlabel">Amount</label>
              <div class="input">
                <input placeholder="Edit the amount" type="number" v-model="formamount" />
              </div>
            </div>
          </div>

          <div class="input-area fullbody">
            <label class="smlabel">Status</label>
            <div class="input">
              <input placeholder="Edit the status" type="text" v-model="formstatus" />
            </div>
          </div>

          <div class="input-area fullbody">
            <label class="smlabel">Write a message to display to user</label>
            <div class="input">
              <textarea
                placeholder="Message for this user saving item"
                v-model="formmessage"
              ></textarea>
            </div>
          </div>

          <div class="flex-with-spacebetween">
            <div class="overview__withddep">
              <button
                class="button orange-btn fontweight-3 half-flex-space loanbtn curved"
                v-if="allowsubmit"
                @click="submit"
              >
                submit
              </button>

              <button
                class="button orange-btn-faint fontweight-3 half-flex-space loanbtn curved"
                v-if="!allowsubmit"
              >
                submit
              </button>
            </div>

            <div class="overview__withddep">
              <button
                class="button fontweight-3 half-flex-space loanbtn curved blue-background"
                @click="closeitem"
              >
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="usersavings mobilewide" :class="{ overviewone }">
      <div class="usersavings__top">
        <div class="usersavings__top--left">
          <span>
            <svg class="feature__icon">
              <use xlink:href="@/assets/imgs/sprite.svg#icon-wallet"></use>
            </svg>
          </span>
        </div>

        <div class="flex-with-spacebetween">
          <div>
            <div class="usersavings__top--right">
              <h2 class="capitalize">{{ nameofsavingsplan }}</h2>
              <h3 class="capitalize">Plan: ({{ savingsplanname }})</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="usersavings__bottom">
        <div class="usersavings__bottom--left">
          <span>${{ formatNumber(amount) }}</span>
        </div>
        <div class="usersavings__bottom--right">
          <span>target:</span>
          <span>${{ formatNumber(target) }}</span>
        </div>
      </div>

      <div class="usersavings__progress">
        <div class="usersavings__progress--background"></div>
        <div class="usersavings__progress--color" ref="progress"></div>
      </div>

      <div class="flex-with-spacebetween">
        <div class="overview__withddep">
          <button
            class="button orange-btn fontweight-3 half-flex-space loanbtn curved"
            @click="opendeposit"
          >
            Deposit
          </button>
        </div>

        <div class="overview__withddep">
          <button
            class="button fontweight-3 half-flex-space loanbtn curved blue-background"
            v-if="adminid"
            @click="edititem"
          >
            Edit
          </button>
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
      edit: false,
      formbonus: 0,
      formamount: 0,
      formstatus: "",
      formmessage: "",
      depositformopen: false,
      deposit: 0,
      depositamount: "",
    };
  },
  props: [
    "target",
    "amount",
    "nameofsavingsplan",
    "savingsplanname",
    "overviewone",
    "bonus",
    "message",
    "status",
    "id",
  ],
  mixins: [global],
  computed: {
    allowdeposit() {
      const { depositamount, account } = this;

      const amount = parseFloat(`${depositamount}`.replace(/,/g, ""), 10);

      if (depositamount.length && account.balance > amount) {
        return true;
      }

      return false;
    },
    allowsubmit() {
      const { formamount, formmessage, formstatus } = this;

      if (formamount && formmessage && formstatus) {
        if (formamount && formmessage.length && formstatus.length) {
          return true;
        }
      }

      return false;
    },
  },
  methods: {
    depositintosavings() {
      const { depositamount, id } = this;

      this.toggleverbiage(`Updating item`);
      this.onspinner();

      this.deposittosavingsitem({ amount: depositamount, id }).then(() => {
        this.toggleverbiage(null);
        this.offspinner();
        this.closedeposit();
      });
    },
    validateNumberInputToDeposit() {
      const { customSplitByDot, removePeriodAndCommas } = this;
      const formattedNumber = this.depositamount
        .replace(/[^1234567890.]/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      const characters = removePeriodAndCommas(customSplitByDot(formattedNumber));

      return (this.depositamount = characters);
    },
    closedeposit() {
      this.depositformopen = false;
    },
    opendeposit() {
      this.depositformopen = true;
    },
    submit() {
      const { formamount, formbonus, formmessage, formstatus, id } = this;

      const usersavingedit = {
        amount: parseFloat(formamount),
        bonus: parseFloat(formbonus),
        message: formmessage,
        status: formstatus,
        id,
      };

      this.toggleverbiage(`Updating item`);
      this.onspinner();

      this.editusersaving(usersavingedit).then(() => {
        this.toggleverbiage(null);
        this.offspinner();
        this.closeitem();
      });
    },
    closeitem() {
      this.edit = false;
    },
    edititem() {
      this.edit = true;
    },
    setProgress(amount, target) {
      const progressBar = this.$refs.progress;
      const percentage = (amount / target) * 100;

      progressBar.style.width = percentage + "%";
    },
  },
  mounted() {
    const { setProgress, amount, target, bonus, status, message } = this;

    this.formamount = amount;
    this.formbonus = bonus;
    this.formstatus = status;
    this.formmessage = message;

    setProgress(amount, target);
  },
};
</script>

<style lang="scss">
.usersavings {
  border: 2px solid rgba($primary-orange, 0.1);
  border-radius: #{scaleValue(10)};
  margin-bottom: #{scaleValue(20)};
  width: #{scaleValue(500)};
  padding: #{scaleValue(30)};

  @media only screen and (max-width: 768px) {
    padding: #{scaleValue(100)};
  }

  &.overviewone {
    width: 100%;
  }

  &__top {
    display: flex;
    margin-bottom: #{scaleValue(55)};

    &--left {
      margin-right: #{scaleValue(30)};

      & span {
        display: flex;
        background: rgba($primary-orange, 0.1);
        justify-content: center;
        align-items: center;
        border-radius: #{scaleValue(5)};
        height: #{scaleValue(60)};
        width: #{scaleValue(60)};

        @media only screen and (max-width: 768px) {
          margin-right: #{scaleValue(20)};
        }

        & svg {
          height: #{scaleValue(30)};
          width: #{scaleValue(30)};
          fill: $primary-orange;

          @media only screen and (max-width: 768px) {
            height: #{scaleValue(90)};
            width: #{scaleValue(90)};
          }
        }
      }
    }

    &--right {
      & h2 {
        font-weight: 500;
        font-size: #{scaleValue(16)};
        margin-bottom: #{scaleValue(10)};
        color: $darker-blue;

        @media only screen and (max-width: 768px) {
          font-size: #{scaleValue(80)};
          margin-bottom: #{scaleValue(50)};
        }
      }

      & h3 {
        font-weight: 500;
        font-size: #{scaleValue(12)};
        opacity: 0.8;
        color: $button-blue;

        @media only screen and (max-width: 768px) {
          font-size: #{scaleValue(60)};
        }
      }
    }
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    color: $font-black;

    @media only screen and (max-width: 768px) {
      margin-top: #{scaleValue(140)};
    }

    &--left {
      font-weight: 500;

      @media only screen and (max-width: 768px) {
        font-size: #{scaleValue(60)};
      }
    }

    &--right {
      font-weight: 500;
      color: rgba($font-black, 0.5);

      @media only screen and (max-width: 768px) {
        font-size: #{scaleValue(60)};
      }
    }
  }

  &__progress {
    width: 100%;
    height: #{scaleValue(5)};
    border-radius: 3rem;
    overflow: hidden;
    position: relative;
    margin-top: #{scaleValue(20)};

    @media only screen and (max-width: 768px) {
      height: #{scaleValue(30)};
      margin-top: #{scaleValue(60)};
      margin-bottom: #{scaleValue(60)};
    }

    &--background {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: rgba($primary-orange, 0.1);
    }

    &--color {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 50%;
      background: rgba($primary-orange, 1);

      transition: all 0.4s ease;
    }
  }
}
</style>
