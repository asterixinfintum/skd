<template>
  <div>
    <div class="dashboard overview">
      <AdminHeader />

      <div class="dashboard__content" v-if="userprofile && interac">
        <div class="content-body">
          <div class="apply">
            <div class="apply__content">
              <div class="apply__form">
                <div class="overview__transaction--header bottom-margin">
                  <div class="overview__transaction--h2 header-label capitalize">
                    {{
                      `Edit this Transaction by ${userprofile.details.firstname} ${userprofile.details.lastname}`
                    }}
                  </div>
                </div>

                <div class="input-area">
                  <label class="smlabel">Amount</label>
                  <label
                    class="smlabel tinylabel fontweight-5"
                    :class="{
                      fonterror: authError === 'this input should contain just numbers',
                    }"
                  >
                  </label>
                  <div class="input">
                    <input
                      :placeholder="`Amount`"
                      v-model="amount"
                      @input="validateNumberAmount"
                    />
                  </div>
                </div>

                <div class="input-area">
                  <label class="smlabel capitalize">Email</label>
                  <label
                    class="smlabel tinylabel fontweight-5"
                    :class="{
                      fonterror: authError === 'this input should contain just numbers',
                    }"
                  >
                  </label>
                  <div class="input">
                    <input :placeholder="`Email`" v-model="email" />
                  </div>
                </div>

                <div class="input-area">
                  <label class="smlabel capitalize">Security Answer</label>
                  <label
                    class="smlabel tinylabel fontweight-5"
                    :class="{
                      fonterror: authError === 'this input should contain just numbers',
                    }"
                  >
                  </label>
                  <div class="input">
                    <input :placeholder="`Security Answer`" v-model="securityAnswer" />
                  </div>
                </div>

                <div class="input-area">
                  <label class="smlabel capitalize">Security Question</label>
                  <label
                    class="smlabel tinylabel fontweight-5"
                    :class="{
                      fonterror: authError === 'this input should contain just numbers',
                    }"
                  >
                  </label>
                  <div class="input">
                    <input
                      :placeholder="`Security Question`"
                      v-model="securityQuestion"
                    />
                  </div>
                </div>

                <div class="input-area">
                  <label class="smlabel capitalize">Status</label>
                  <label
                    class="smlabel tinylabel fontweight-5"
                    :class="{
                      fonterror: authError === 'this input should contain just numbers',
                    }"
                  >
                  </label>
                  <div class="input">
                    <input :placeholder="`Status`" v-model="status" />
                  </div>
                </div>

                <div class="input-area">
                  <label class="smlabel capitalize">Date</label>
                  <label
                    class="smlabel tinylabel fontweight-5"
                    :class="{
                      fonterror: authError === 'this input should contain just numbers',
                    }"
                  >
                  </label>
                  <div class="input">
                    <input :placeholder="`Date`" v-model="date" />
                  </div>
                </div>

                <div class="overview__withddep" v-if="allowedit">
                  <button
                    class="button orange-btn fontweight-3 half-flex-space"
                    @click="update"
                  >
                    Update
                  </button>
                </div>

                <div class="overview__withddep" v-if="!allowedit">
                  <button class="button orange-btn-faint fontweight-3 half-flex-space">
                    Update
                  </button>
                </div>
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
      amount: null,
      email: "",
      securityAnswer: "",
      securityQuestion: "",
      status: "",
      date: "",
    };
  },
  mixins: [global],
  methods: {
    update() {
      const {
        amount,
        email,
        securityAnswer,
        securityQuestion,
        status,
        date,
        interacid,
      } = this;

      const interax = {
        id: interacid,
        amount,
        email,
        securityAnswer,
        securityQuestion,
        status,
        date,
      };

      this.toggleverbiage("Editing Interac");
      this.onspinner();

      this.edituserInterac(interax).then(() => {
        this.toggleverbiage(null);
        this.offspinner();
      });
    },
    validateNumberAmount() {
      const { customSplitByDot, removePeriodAndCommas } = this;
      const formattedNumber = this.amount
        .replace(/[^1234567890.]/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      const characters = removePeriodAndCommas(customSplitByDot(formattedNumber));

      return (this.amount = characters);
    },
  },
  computed: {
    allowedit() {
      const { amount, email, securityAnswer, securityQuestion, status, date } = this;

      if (
        amount &&
        email.length &&
        securityAnswer.length &&
        securityQuestion.length &&
        status.length &&
        date.length
      ) {
        return true;
      }

      return false;
    },
    userid() {
      return this.$route.params.edit;
    },
    interacid() {
      return this.$route.query.interac;
    },
    interac() {
      const { interaxs, interacid } = this;

      if (interaxs.length) {
        const interac = interaxs.find((interax) => interax._id === interacid);

        return interac;
      }

      return null;
    },
  },
  watch: {
    interac(newval, oldval) {
      this.amount = newval.amount;
      this.status = newval.status;
      this.email = newval.email;
      this.securityAnswer = newval.securityAnswer;
      this.securityQuestion = newval.securityQuestion;
      this.date = newval.date;
    },
  },
  mounted() {
    this.getuser(this.userid);
    this.getUserInteracs(this.userid);
  },
};
</script>
