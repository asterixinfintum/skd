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
            <div class="input-area fullbody">
              <label class="smlabel">Status</label>
              <div class="input">
                <input placeholder="pending, approved etc" type="text" v-model="status" />
              </div>
            </div>
            <div class="input-area fullbody">
              <label class="smlabel">Write a message to display to user</label>
              <div class="input">
                <textarea
                  placeholder="Message for this loan"
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
          <div class="overview__transaction--h2 header-label">Your loans</div>
        </div>

        <div class="padding-top-bottom"></div>

        <div class="flex-reverse-column relativeposition halfscreen-width-2">
          <div
            class="displaycard__userlistcard displaycard__review"
            v-for="loan in userloans"
          >
            <div class="displaycard__review--header">
              <div class="displaycard__review--headerleft">
                <figure class="displaycard__review--logo">
                  <img src="@/assets/imgs/logo-nobackground.png" />
                </figure>
                <p class="displaycard__review--now capitalize darkerblue">
                  ${{ formatNumber(loan.userloan.amount, 20) }}
                </p>
              </div>

              <div class="">
                <h2 class="displaycard__name loan">{{ loan.loanname }}</h2>
              </div>
            </div>

            <div class="displaycard__review--content">
              <p class="darkerblue">
                <span class="displaycard__review--itemlogo">
                  <svg>
                    <use xlink:href="@/assets/imgs/sprite.svg#icon-banknote"></use>
                  </svg>
                </span>
                {{ loan.userloan.message }}
              </p>
            </div>

            <div class="padding-top-bottom"></div>

            <div class="flex-with-spacebetween">
              <span class="displaycard__status capitalise">{{
                loan.userloan.status
              }}</span>
              <span
                class="displaycard__status capitalise orange cursorpointer"
                v-if="adminid"
                @click="edititem(loan.userloan._id)"
              >
                Edit this item
              </span>
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
      message: "",
      status: "",
      current: null,
    };
  },
  methods: {
    submit() {
      const { message, status, current } = this;

      const body = {
        message,
        status,
        userloan: current.userloan._id,
      };

      this.toggleverbiage("Editing item");
      this.onspinner();

      this.edituserloan(body).then(() => {
        this.toggleverbiage(null);
        this.offspinner();
        this.current = null;
      });
    },
    edititem(id) {
      const loan = this.userloans.find((loan) => loan.userloan._id === id);

      this.current = loan;
    },
    closeitem() {
      this.current = null;
    },
  },
  mixins: [global],
  computed: {
    allowsubmit() {
      const { message, status, current } = this;

      if (message.length && status.length && current) {
        return true;
      }

      return false;
    },
  },
};
</script>
