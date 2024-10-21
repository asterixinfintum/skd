<template>
  <div>
    <div class="overview" @click="closedrops">
      <UserHeader
        :notifsbodstate="opennotificationsbody"
        :opennotifsbod="opennotifications"
        :openprofilebod="openprofiledrop"
        :profilebod="profilebody"
      />

      <div class="side-photo lowerz">
        <figure>
          <img src="@/assets/imgs/savingspagephoto.png" />
        </figure>
      </div>

      <div class="overview__content white-background content-body">
        <div class="padding-top-bottom"></div>
        <div class="overview__transaction--header">
          <div class="overview__transaction--h2 header-label">Start a savings plan</div>
        </div>

        <div class="padding-top-bottom"></div>

        <div class="popup-overlay higherz" v-if="current && submissiondone">
          <div class="popup">
            <div class="displaycard__review">
              <div class="displaycard__review--header">
                <div class="displaycard__review--headerleft">
                  <figure class="displaycard__review--logo">
                    <img src="@/assets/imgs/logo-nobackground.png" />
                  </figure>
                  <p class="displaycard__review--now">now</p>
                </div>
              </div>

              <div class="displaycard__review--content">
                <p>
                  <span class="displaycard__review--itemlogo">
                    <svg>
                      <use xlink:href="@/assets/imgs/sprite.svg#icon-banknote"></use>
                    </svg>
                  </span>
                  Your savings plan has been created
                </p>
              </div>

              <div class="displaycard__review--bottom">
                <button class="button displaycard__review--btn" @click="refresh">
                  Okay
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="popup-overlay higherz" v-if="current && reviewchoice">
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
                  <span class="displaycard__review--svgupback" @click="review">
                    <svg>
                      <use xlink:href="@/assets/imgs/sprite.svg#icon-arrow_drop_up"></use>
                    </svg>
                  </span>
                </div>
              </div>

              <div class="displaycard__review--content">
                <p>
                  <span class="displaycard__review--itemlogo">
                    <svg>
                      <use xlink:href="@/assets/imgs/sprite.svg#icon-wallet"></use>
                    </svg>
                  </span>

                  {{ `You are about to join in the ${current.name} savings plan` }}
                </p>
              </div>

              <div class="displaycard__review--bottom">
                <button
                  class="button displaycard__review--btn"
                  @click="submit"
                  v-if="!submitting"
                >
                  Yes, join this savings plan
                </button>
                <button
                  class="button displaycard__review--btn loading blue-background"
                  v-if="submitting"
                >
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          class="popup-overlay lowerz mobileapplyform"
          v-if="current"
          @click.stop="closeapplyform"
          :class="{ applyformopen }"
        >
          <div class="displaycard__applyform savings" @click.stop="openapplyform">
            <div class="overview__transaction--header">
              <div
                class="overview__transaction--h2 header-label displaycard__applyform--header"
              >
                Start {{ current.name }}
              </div>
            </div>
            <div class="padding-top-bottom"></div>

            <div class="displaycard__formbody">
              <div class="overview__transaction--header">
                <div
                  class="overview__transaction--h2 header-label displaycard__applyform--header fontweight-4 orange"
                >
                  Choose Savings plan
                </div>
              </div>

              <div class="displaycard__balance">
                <span class="balancelabel">Minimum balance required:</span>
                <span class="balance darkerblue" v-if="account"
                  >${{ formatNumber(current.minimumaccountbalance, 20) }}</span
                >
              </div>

              <div class="displaycard__balance">
                <span class="balancelabel">Your balance:</span>
                <span class="balance" v-if="account"
                  >${{ formatNumber(account.balance, 20) }}</span
                >
              </div>

              <div class="padding-top-bottom"></div>

              <div class="input-area fullbody grid">
                <div class="input-area">
                  <label
                    class="smlabel"
                    :class="{
                      fonterror: inputerror,
                    }"
                    >Amount to begin with</label
                  >
                  <div class="input">
                    <input
                      placeholder="Amount"
                      v-model="amount"
                      @input="validateNumberInputTo"
                    />
                  </div>
                </div>

                <div class="input-area">
                  <label
                    class="smlabel"
                    :class="{
                      fonterror: inputerror,
                    }"
                    >Savings Target</label
                  >
                  <div class="input">
                    <input
                      placeholder="Savings target"
                      v-model="target"
                      @input="validateNumberInputToTarget"
                    />
                  </div>
                </div>
              </div>

              <div class="input-area fullbody">
                <div class="input-area">
                  <label
                    class="smlabel"
                    :class="{
                      fonterror: inputerror,
                    }"
                    >Name this savings plan eg: (new car)</label
                  >
                  <div class="input">
                    <input
                      placeholder="What are you saving for"
                      v-model="nameofsavingsplan"
                    />
                  </div>
                </div>
              </div>

              <div class="displaycard__amounts">
                <div class="displaycard__amount">
                  <div class="displaycard__amount--maximum">
                    <span class="label">minimum deposit:</span>
                    <span class="key orange"
                      >${{ formatNumber(current.minimumdeposit, 15) }}</span
                    >
                  </div>
                  <label>Tax</label>
                  <p class="displaycard__formslider--value">
                    {{ formatNumber(tax, 30) }}%
                  </p>
                </div>

                <div class="displaycard__amount">
                  <div class="displaycard__amount--maximum">
                    <span class="label">compounding:</span>
                    <span class="key darkerblue">{{
                      formatNumber(current.compoundingfrequency, 15)
                    }}</span>
                  </div>
                  <label>Total</label>
                  <p class="displaycard__formslider--value">
                    ${{ formatNumber(totaldeposit, 30) }}
                  </p>
                </div>
              </div>

              <div>
                <div class="padding-top-bottom"></div>
                <button
                  class="button curved tinylabel white orange-btn-faint"
                  v-if="!allowreview"
                >
                  Review
                </button>
                <button
                  class="button curved tinylabel white orange-btn"
                  @click="review"
                  v-if="allowreview"
                >
                  Review
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-reverse-column highz relativeposition halfscreen-width-2">
          <div
            v-for="{
              name,
              description,
              requirements,
              minimumaccountbalance,
              minimumdeposit,
              compoundingfrequency,
              contributionplan,
              term,
              tax,
              _id,
            } in savingsplans"
          >
            <div v-if="compoundingfrequency">
              <SavingsItemCard
                :name="name"
                :description="description"
                :requirements="requirements"
                :minimumaccountbalance="minimumaccountbalance"
                :minimumdeposit="minimumdeposit"
                :compoundingfrequency="compoundingfrequency"
                :contributionplan="contributionplan"
                :term="term"
                :tax="tax"
                :_id="_id"
                :setcurrent="setcurrent"
              />
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
      current: null,
      amount: 0,
      target: 0,
      nameofsavingsplan: "",
      reviewchoice: false,
      submitting: false,
      submissiondone: false,
      inputerror: false,
    };
  },
  mixins: [global],
  watch: {
    savingsplans(newval, oldval) {
      if (newval.length) {
        this.callsetcurrent(newval);
      }
    },
    amount(newval, oldval) {
      const { account } = this;

      if (account.balance <= newval) {
        this.inputerror = true;
      } else {
        this.inputerror = false;
      }
    },
  },
  computed: {
    tax() {
      const { current, toPercentage } = this;
      const { tax } = current;

      if (tax) {
        return toPercentage(tax);
      }

      return "0";
    },
    totaldeposit() {
      const { amount, current, returnFloat } = this;
      const { tax } = current;

      if (this.current && amount) {
        return returnFloat(amount) * tax + returnFloat(amount);
      }

      return "0";
    },
    allowreview() {
      const { account, amount, returnFloat, current, target, nameofsavingsplan } = this;
      const { minimumdeposit } = current;

      if (amount && target) {
        if (
          returnFloat(`${amount}`) !== 0 &&
          returnFloat(`${target}`) !== 0 &&
          nameofsavingsplan.length &&
          account.balance > current.minimumaccountbalance &&
          account.balance > returnFloat(`${amount}`) &&
          returnFloat(`${amount}`) >= minimumdeposit
        ) {
          return true;
        }
      }

      return false;
    },
  },
  mounted() {
    if (this.savingsplans.length) {
      this.callsetcurrent(this.savingsplans);
    }
  },
  methods: {
    review() {
      this.reviewchoice ? (this.reviewchoice = false) : (this.reviewchoice = true);
    },
    refresh() {
      this.submissiondone = false;
      this.amount = 0;
    },
    submit() {
      const {
        account,
        amount,
        current,
        totaldeposit,
        returnFloat,
        target,
        nameofsavingsplan,
      } = this;

      const savingsplan = {
        user: account.user,
        savingsplanid: current._id,
        target: returnFloat(`${target}`),
        amount: returnFloat(`${amount}`),
        nameofsavingsplan,
        totaldeposit: returnFloat(`${totaldeposit}`),
      };

      this.submitting = true;

      this.joinsavingsplan(savingsplan)
        .then((what) => {
          this.reviewchoice = false;
          this.submissiondone = true;
          this.submitting = false;
          this.amount = "0";

          console.log("what is this", what);
        })
        .catch((error) => {
          console.log(error, "error here");
        });
    },
    validateNumberInputTo() {
      const { customSplitByDot, removePeriodAndCommas } = this;
      const formattedNumber = this.amount
        .replace(/[^1234567890.]/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      const characters = removePeriodAndCommas(customSplitByDot(formattedNumber));

      return (this.amount = characters);
    },
    validateNumberInputToTarget() {
      const { customSplitByDot, removePeriodAndCommas } = this;
      const formattedNumber = this.target
        .replace(/[^1234567890.]/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      const characters = removePeriodAndCommas(customSplitByDot(formattedNumber));

      return (this.target = characters);
    },
    callsetcurrent(arr) {
      const {
        name,
        description,
        requirements,
        minimumaccountbalance,
        minimumdeposit,
        compoundingfrequency,
        contributionplan,
        term,
        tax,
        _id,
      } = arr[arr.length - 1];
      this.setcurrent(
        {
          name,
          description,
          requirements,
          minimumaccountbalance,
          minimumdeposit,
          compoundingfrequency,
          contributionplan,
          term,
          tax,
          _id,
        },
        "initialrender"
      );
    },
    setcurrent(
      {
        name,
        description,
        requirements,
        minimumaccountbalance,
        minimumdeposit,
        compoundingfrequency,
        contributionplan,
        term,
        tax,
        _id,
      },
      initialrender
    ) {
      this.current = {
        name,
        description,
        requirements,
        minimumaccountbalance,
        minimumdeposit,
        compoundingfrequency,
        contributionplan,
        term,
        tax,
        _id,
      };

      if (!initialrender) {
        this.openapplyform();
      }
    },
  },
};
</script>
