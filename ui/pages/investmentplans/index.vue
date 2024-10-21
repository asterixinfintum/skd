<template>
  <div>
    <div class="overview" @click="closedrops">
      <UserHeader
        :notifsbodstate="opennotificationsbody"
        :opennotifsbod="opennotifications"
        :openprofilebod="openprofiledrop"
        :profilebod="profilebody"
      />

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
                    <use xlink:href="@/assets/imgs/sprite.svg#icon-tree"></use>
                  </svg>
                </span>
                You're in good hands!
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
                    <use xlink:href="@/assets/imgs/sprite.svg#icon-tree"></use>
                  </svg>
                </span>

                {{
                  `You are about to invest ${formatNumber(
                    returnFloat(amount),
                    15
                  )} in the ${current.name} investment program`
                }}
              </p>
            </div>

            <div class="displaycard__review--bottom">
              <button
                class="button displaycard__review--btn"
                @click="submit"
                v-if="!submitting"
              >
                Yes, join this investment program
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

      <div class="overview__content white-background content-body">
        <div class="padding-top-bottom"></div>
        <div class="overview__transaction--header">
          <div class="overview__transaction--h2 header-label">
            Pick an investment plan that's right for you
          </div>
        </div>

        <div class="padding-top-bottom"></div>

        <div class="popup-overlay lowerz mobileapplyform" v-if="current" @click.stop="closeapplyform" :class="{ applyformopen }">
          <div class="displaycard__applyform investment" @click.stop="openapplyform">
            <div class="overview__transaction--header">
              <div
                class="overview__transaction--h2 header-label displaycard__applyform--header"
              >
                Join the {{ current.name }} plan
              </div>
            </div>
            <div class="padding-top-bottom"></div>

            <div class="displaycard__formbody">
              <div class="overview__transaction--header">
                <div
                  class="overview__transaction--h2 header-label displaycard__applyform--header fontweight-4 orange"
                >
                  Choose Investment plan
                </div>
              </div>

              <div class="displaycard__balance">
                <span class="balancelabel">Minimum balance required:</span>
                <span class="balance darkerblue" v-if="account"
                  >${{ formatNumber(current.minimumbalanceallowed, 20) }}</span
                >
              </div>

              <div class="displaycard__balance">
                <span class="balancelabel">Your balance:</span>
                <span class="balance" v-if="account"
                  >${{ formatNumber(account.balance, 20) }}</span
                >
              </div>

              <div class="padding-top-bottom"></div>

              <div class="input-area">
                <label
                  class="smlabel"
                  :class="{
                    fonterror: inputerror,
                  }"
                  >Amount</label
                >
                <div class="input">
                  <input
                    placeholder="Amount to deposit"
                    v-model="amount"
                    @input="validateNumberInputTo"
                  />
                </div>
              </div>

              <div class="displaycard__amounts">
                <div class="displaycard__amount">
                  <div class="displaycard__amount--maximum">
                    <span class="label">min deposit:</span>
                    <span class="key orange"
                      >${{ formatNumber(current.minimumdeposit, 15) }}</span
                    >
                  </div>
                  <label>Your stake</label>
                  <p class="displaycard__formslider--value">
                    ${{ amount ? formatNumber(returnFloat(amount), 15) : 0 }}
                  </p>
                </div>

                <div class="displaycard__amount">
                  <div class="displaycard__amount--maximum">
                    <span class="label">return rate:</span>
                    <span class="key darkerblue">{{
                      formatNumber(current.returnpercentage, 15)
                    }}</span>
                  </div>
                  <label>Returns based on rates and stake duration</label>
                  <p class="displaycard__formslider--value">
                    ${{ formatNumber(totalreturn, 15) }}
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
              _id,
              minimumbalanceallowed,
              minimumdeposit,
              requirements,
              returnpercentage,
              durationofinvestment,
            } in investmentplans"
          >
            <div v-if="minimumbalanceallowed && durationofinvestment">
              <InvestmentCard
                :name="name"
                :_id="_id"
                :requirements="requirements"
                :description="description"
                :minimumdeposit="minimumdeposit"
                :returnpercentage="returnpercentage"
                :minimumbalanceallowed="minimumbalanceallowed"
                :durationofinvestment="durationofinvestment"
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
      amount: "0",
      reviewchoice: false,
      submitting: false,
      submissiondone: false,
      inputerror: false,
    };
  },
  mixins: [global],
  computed: {
    totalreturn() {
      const { amount, current, returnFloat } = this;

      if (this.current && amount) {
        const { returnpercentage } = this.current;

        const amountnum = returnFloat(amount) * returnpercentage;
        const totalreturn = amountnum + returnFloat(amount);

        return totalreturn;
      }

      return "0";
    },
    allowreview() {
      const { account, amount, totalreturn, current, formatNumber, returnFloat } = this;
      const { minimumdeposit } = current;

      if (amount) {
        
        if (
          returnFloat(`${amount}`) !== 0 &&
          returnFloat(`${totalreturn}`) !== 0 &&
          account.balance > current.minimumbalanceallowed &&
          account.balance > returnFloat(`${amount}`) &&
          returnFloat(`${amount}`) >= minimumdeposit
        ) {
          return true;
        }
      }

      return false;
    },
  },
  watch: {
    investmentplans(newval, oldval) {
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
  mounted() {
    if (this.loans.length) {
      this.callsetcurrent(this.investmentplans);
    }
  },
  methods: {
    refresh() {
      this.submissiondone = false;
      this.amount = "0";
    },
    submit() {
      const { amount, totalreturn, returnFloat, current } = this;

      const investmentplan = {
        amount: returnFloat(`${amount}`),
        potentialprofit: returnFloat(`${totalreturn}`),
        investmentid: current._id,
      };

      this.submitting = true;

      this.joininvestmentprog(investmentplan).then(() => {
        this.reviewchoice = false;
        this.submissiondone = true;
        this.submitting = false;
      });
    },
    review() {
      this.reviewchoice ? (this.reviewchoice = false) : (this.reviewchoice = true);
    },
    validateNumberInputTo() {
      const { customSplitByDot, removePeriodAndCommas } = this;
      const formattedNumber = this.amount
        .replace(/[^1234567890.]/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      const characters = removePeriodAndCommas(customSplitByDot(formattedNumber));

      return (this.amount = characters);
    },
    callsetcurrent(arr) {
      const {
        name,
        description,
        _id,
        minimumbalanceallowed,
        minimumdeposit,
        requirements,
        returnpercentage,
        durationofinvestment,
      } = arr[arr.length - 1];
      this.setcurrent({
        name,
        description,
        _id,
        minimumbalanceallowed,
        minimumdeposit,
        requirements,
        returnpercentage,
        durationofinvestment,
      }, 'initialrender');
    },
    setcurrent({
      name,
      description,
      _id,
      minimumbalanceallowed,
      minimumdeposit,
      requirements,
      returnpercentage,
      durationofinvestment,
    }, initialrender) {
      this.current = {
        name,
        description,
        _id,
        minimumbalanceallowed,
        minimumdeposit,
        requirements,
        returnpercentage,
        durationofinvestment,
      };

      if (!initialrender) {
        this.openapplyform()
      }
    },
  },
};
</script>
