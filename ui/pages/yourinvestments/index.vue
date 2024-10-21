<template>
  <div>
    <div class="overview" @click="closedrops">
      <UserHeader
        :notifsbodstate="opennotificationsbody"
        :opennotifsbod="opennotifications"
        :openprofilebod="openprofiledrop"
        :profilebod="profilebody"
      />

      <div class="popup-overlay highz" v-if="current">
        <div class="popup">
          <div class="halfscreen-width-2">

            <div class="two-side-grid">
              <div class="input-area fullbody">
                <label class="smlabel">Status</label>
                <div class="input">
                  <input placeholder="pending, approved etc" type="text" v-model="status" />
                </div>
              </div>

              <div class="input-area fullbody">
                <label class="smlabel">Profit Growth</label>
                <div class="input">
                  <input placeholder="Choose profit amount to show user" type="number" v-model="profit" />
                </div>
              </div>
            </div>

            <div class="input-area fullbody">
              <label class="smlabel">Add a deduction</label>
              <div class="input">
                <input placeholder="Choose amount to show user as deduction" type="number" v-model="deduction" />
              </div>
            </div>

            <div class="input-area fullbody">
              <label class="smlabel">Write a message to display to user</label>
              <div class="input">
                <textarea
                  placeholder="Message to display for this item"
                  v-model="message"
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

      <div class="overview__content white-background content-body">
        <div class="padding-top-bottom"></div>
        <div class="overview__transaction--header">
          <div class="overview__transaction--h2 header-label">Your investments</div>
        </div>

        <div class="padding-top-bottom"></div>

        <div class="flex-reverse-column relativeposition halfscreen-width-2">
          <div
            class="displaycard__userlistcard displaycard__review"
            v-for="investment in userinvestments"
          >
            
            <div class="investmentcard">
              <div class="investmentcard__header flex-with-spacebetween">
                <h2 class="displaycard__name loan">{{ investment.investmentname }}</h2>
                <div>
                  <button
                      class="button fontweight-3 half-flex-space loanbtn curved normblack blue-background"
                      v-if="adminid"
                      @click="edititem(investment.userinvestment._id)"
                    >
                      Edit
                  </button>
                </div>
              </div>

              <div class="investmentcard__top">
                <div class="investmentcard__logoarea">
                  <span>
                    <svg>
                      <use xlink:href="@/assets/imgs/sprite.svg#icon-tree"></use>
                    </svg>
                  </span>
                </div>

                <div class="investmentcard__topright">
                  <div class="investmentcard__topright--amountlabel capitalize">
                    Initial capital
                  </div>
                  <div class="investmentcard__topright--amountfigure">
                    ${{ formatNumber(investment.userinvestment.amount, 20) }}
                  </div>
                </div>
              </div>

              <div class="investmentcard__top">
                <div class="investmentcard__logoarea"></div>

                <div class="investmentcard__topright">
                  <div class="investmentcard__topright--amountlabel capitalize">
                    Projected Profit
                  </div>
                  <div class="investmentcard__topright--amountfigure">
                    ${{ formatNumber(investment.userinvestment.potentialprofit, 20) }}
                  </div>
                </div>
              </div>

              <div class="investmentcard__detail" v-if="showdetails">
                <p class="investmentcard__detail--message">{{ investment.userinvestment.message }}</p>

                <div class="flex-with-spacebetween investmentcard__detail--section">
                  <span>Profit</span>
                  <span class="investmentcard__detail--value">${{ investment.userinvestment.profit }}</span>
                </div>

                <div class="flex-with-spacebetween investmentcard__detail--section">
                  <span>Deductions</span>
                  <span class="investmentcard__detail--value">${{ investment.userinvestment.deduction }}</span>
                </div>

                <div class="flex-with-spacebetween investmentcard__detail--section">
                  <span>Status</span>
                  <span class="capitalize investmentcard__detail--value">{{ investment.userinvestment.status }}</span>
                </div>
              </div>

              <div class="investmentcard__bottom" @click="toggleshowdetails" v-if="!showdetails">
                <span class="investmentcard__bottom--left">View Details</span>
                <span class="investmentcard__bottom--right">
                  <svg>
                      <use xlink:href="@/assets/imgs/sprite.svg#icon-arrow_right"></use>
                    </svg>
                  </span>
                </span>
              </div>

              <div class="investmentcard__bottom" @click="toggleshowdetails" v-if="showdetails">
                <span class="investmentcard__bottom--left">Close Details</span>
                <span class="investmentcard__bottom--right">
                  <svg>
                      <use xlink:href="@/assets/imgs/sprite.svg#icon-arrow_right"></use>
                    </svg>
                  </span>
                </span>
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
      edit: true,
      profit: 0,
      deduction: 0,
      status: null,
      message: '',
      current: null,
      showdetails: false
    };
  },
  mixins: [global],
  computed: {
    allowsubmit() {
      const { profit, deduction, status, message, current } = this;

      if (current) {
        if (status.length) {
          return true;
        }
      }

      return false;
    }
  },
  watch: {
    current(newval, oldval) {
      if (newval) {
        this.profit = newval.userinvestment.profit;
        this.deduction = newval.userinvestment.deduction;
        this.status = newval.userinvestment.status;
        this.message = newval.userinvestment.message;
      }
    }
  },
  methods: {
    toggleshowdetails() {
      this.showdetails ? this.showdetails = false : this.showdetails = true;
    },
    submit() {
      const { profit, deduction, status, message, current } = this;

      const body = {
        profit, 
        deduction, 
        status, 
        message,
        id: current.userinvestment._id
      }

      this.toggleverbiage("Editing item");
      this.onspinner();

      this.edituserinvestment(body).then(() => {
        this.toggleverbiage(null);
        this.offspinner();
        this.current = null;
      });
    },
    edititem(id) {
      const investment = this.userinvestments.find(investment => investment.userinvestment._id === id);
      this.current = investment;
    },
    closeitem() {
      this.current = null;
    },
  }
};
</script>
