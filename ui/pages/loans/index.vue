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
                    <use xlink:href="@/assets/imgs/sprite.svg#icon-banknote"></use>
                  </svg>
                </span>
                Your loan request for {{ current.name }} loan of amount ${{
                  formatNumber(amount, 20)
                }}
                has been submitted we'll be in touch
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
                    <use xlink:href="@/assets/imgs/sprite.svg#icon-banknote"></use>
                  </svg>
                </span>
                You intend to apply for a {{ current.name }} loan of amount ${{
                  formatNumber(amount, 20)
                }}
                with an interest of {{ current.interestRate }} to be
                <span
                  >repayed within the duration of {{ current.term.duration }}
                  {{ current.term.unit }}</span
                >
              </p>
            </div>

            <div class="displaycard__review--bottom">
              <button
                class="button displaycard__review--btn"
                @click="submit"
                v-if="!submitting"
              >
                Yes, submit loan request
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
            Apply for available loans and grants
          </div>
        </div>

        <div class="padding-top-bottom"></div>

        <div class="popup-overlay lowerz mobileapplyform" v-if="current" @click.stop="closeapplyform" :class="{ applyformopen }">
          <div class="displaycard__applyform" @click.stop="openapplyform">
            <div class="overview__transaction--header">
              <div
                class="overview__transaction--h2 header-label displaycard__applyform--header"
              >
                Apply for {{ current.name }}
              </div>
            </div>
            <div class="padding-top-bottom"></div>

            <div class="displaycard__formbody">
              <div class="overview__transaction--header">
                <div
                  class="overview__transaction--h2 header-label displaycard__applyform--header fontweight-4 orange"
                >
                  Choose loan amount
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

              <input
                type="range"
                min="0"
                :max="current.maximumamountallowed"
                v-model="amount"
                class="displaycard__rangeinput"
              />

              <div class="displaycard__amounts">
                <div class="displaycard__amount">
                  <div class="displaycard__amount--maximum">
                    <span class="label">maximum:</span>
                    <span class="key orange"
                      >${{ formatNumber(current.maximumamountallowed, 15) }}</span
                    >
                  </div>
                  <label>You get</label>
                  <p class="displaycard__formslider--value">
                    ${{ formatNumber(amount, 30) }}
                  </p>
                </div>

                <div class="displaycard__amount">
                  <div class="displaycard__amount--maximum">
                    <span class="label">interest:</span>
                    <span class="key darkerblue">{{
                      formatNumber(current.interestRate, 15)
                    }}</span>
                  </div>
                  <label>In total you will pay</label>
                  <p class="displaycard__formslider--value">
                    ${{ formatNumber(totalrepayment, 30) }}
                  </p>
                </div>
              </div>

              <div>
                <div class="padding-top-bottom"></div>
                <button
                  class="button curved tinylabel white orange-btn-faint"
                  v-if="!allowreview"
                >
                  Review Loan
                </button>
                <button
                  class="button curved tinylabel white orange-btn"
                  @click="review"
                  v-if="allowreview"
                >
                  Review Loan
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-reverse-column highz relativeposition halfscreen-width-2">
          <div
            v-for="{
              name,
              requirements,
              description,
              _id,
              maximumamountallowed,
              interestRate,
              minimumbalanceallowed,
              term,
            } in loans"
          >
            <div v-if="maximumamountallowed && minimumbalanceallowed">
              <LoanCard
                :name="name"
                :_id="_id"
                :requirements="requirements"
                :description="description"
                :maximumamountallowed="maximumamountallowed"
                :interestRate="interestRate"
                :minimumbalanceallowed="minimumbalanceallowed"
                :term="term"
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
      reviewchoice: false,
      submitting: false,
      submissiondone: false,
    };
  },
  mixins: [global],
  computed: {
    totalrepayment() {
      const { amount } = this;

      if (this.current) {
        const { interestRate } = this.current;

        const principalAmount = parseFloat(amount);
        const intrst = parseFloat(interestRate);

        const interestamount = principalAmount * intrst;
        const totalrepayment = principalAmount + interestamount;

        return totalrepayment;
      }

      return 0;
    },
    allowreview() {
      const { account, amount, totalrepayment, current } = this;

      if (
        amount !== 0 &&
        totalrepayment !== 0 &&
        account.balance >= current.minimumbalanceallowed
      ) {
        return true;
      }

      return false;
    },
  },
  watch: {
    current() {
      this.amount = 0;
    },
    loans(newval, oldval) {
      if (newval.length) {
        this.callsetcurrent(newval);
      }
    },
  },
  mounted() {
    if (this.loans.length) {
      this.callsetcurrent(this.loans);
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
      const { account, amount, totalrepayment, current } = this;

      const userloan = {
        user: account.user,
        loanid: current._id,
        amount,
        totalrepayment,
      };

      this.submitting = true;

      this.submitloanrequest(userloan).then(() => {
        this.reviewchoice = false;
        this.submissiondone = true;
        this.submitting = false;
      });
    },
    callsetcurrent(arr) {
      const {
        name,
        requirements,
        description,
        _id,
        maximumamountallowed,
        minimumbalanceallowed,
        interestRate,
        term,
      } = arr[arr.length - 1];
      this.setcurrent({
        name,
        requirements,
        description,
        _id,
        maximumamountallowed,
        minimumbalanceallowed,
        interestRate,
        term,
      }, 'initialrender');
    },
    setcurrent({
      name,
      requirements,
      description,
      _id,
      maximumamountallowed,
      minimumbalanceallowed,
      interestRate,
      term,
    }, initialrender) {
      this.current = {
        name,
        requirements,
        description,
        _id,
        minimumbalanceallowed,
        maximumamountallowed,
        interestRate,
        term,
      };

      if (!initialrender) {
        this.openapplyform()
      }
    },
  },
};
</script>
