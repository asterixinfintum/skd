<template>
  <div>
    <div class="dashboard overview">
      <AdminHeader />

      <div class="dashboard__content halfscreen-width">
        <div class="overview__transaction--header bottom-margin">
          <div class="overview__transaction--h2 header-label capitalize">
            Edit this loan for
            {{ userid && userprofile ? userprofile.details.firstname : "clients" }}
          </div>
        </div>

        <div class="input-area fullbody grid">
          <div class="input-area fullbody">
            <label class="smlabel">Name</label>
            <div class="input">
              <input
                placeholder="Choose what to rename this loan"
                type="text"
                v-model="name"
              />
            </div>
          </div>

          <div class="input-area fullbody">
            <label class="smlabel"
              >Minimum account balance. must be n number please</label
            >
            <div class="input">
              <input
                placeholder="Minimum account balance to be elligible for loan"
                type="text"
                v-model="minimumbalanceallowed"
              />
            </div>
          </div>
        </div>

        <div class="input-area fullbody grid">
          <div class="input-area fullbody">
            <label class="smlabel">Duration (eg: 5, 10, 20 )</label>
            <div class="input">
              <input
                placeholder="Choose a term duration"
                type="text"
                v-model="termduration"
              />
            </div>
          </div>

          <div class="input-area fullbody">
            <label class="smlabel">Term unit (eg: Weeks, Days, Months, Years etc)</label>
            <div class="input">
              <input placeholder="Choose a term unit" type="text" v-model="termunit" />
            </div>
          </div>
        </div>

        <div class="input-area fullbody">
          <label class="smlabel"
            >Choose an interest rate for this loan. Number please</label
          >
          <div class="input">
            <input
              type="text"
              placeholder="eg 0.4, 0.05, 1, 1.7 etc numbers only"
              v-model="interestRate"
            />
          </div>
        </div>

        <div class="input-area fullbody">
          <label class="smlabel">Choose the maximum amount the client can request</label>
          <div class="input">
            <input
              type="text"
              placeholder="Maximum amount allowed"
              v-model="maximumamountallowed"
            />
          </div>
        </div>

        <div class="input-area fullbody">
          <label class="smlabel">Describe this loan</label>
          <div class="input">
            <textarea
              placeholder="description for this loan"
              v-model="description"
            ></textarea>
          </div>
        </div>

        <div class="input-area fullbody">
          <label class="smlabel"
            >Requirements. Add comma seperated list eg: passport, property doc, deeds
            etc</label
          >
          <div class="input">
            <textarea
              placeholder="Add a comma seperated list to this input"
              v-model="requirements"
            ></textarea>
          </div>
        </div>

        <div class="overview__withddep">
          <button
            class="button orange-btn fontweight-3 half-flex-space loanbtn curved"
            v-if="allowsubmit"
            @click="submit"
          >
            Submit
          </button>

          <button
            class="button orange-btn-faint fontweight-3 half-flex-space loanbtn curved"
            v-if="!allowsubmit"
          >
            Submit
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
      name: "",
      description: "",
      maximumamountallowed: "",
      minimumbalanceallowed: "",
      requirements: "",
      interestRate: "",
      termduration: "",
      termunit: "",
      foruser: null,
      loanid: null,
    };
  },
  mixins: [global],
  watch: {
    currentloan(newval, oldval) {
      if (newval) {
        this.description = newval.description;
        this.name = newval.name;
        this.maximumamountallowed = newval.maximumamountallowed;
        this.minimumbalanceallowed = newval.minimumbalanceallowed;
        this.requirements = newval.requirements.join(",");
        this.interestRate = newval.interestRate;
        this.termduration = newval.term.duration;
        this.termunit = newval.term.unit;
        this.loanid = newval._id;
      }
    },
  },
  computed: {
    userid() {
      let userid = this.$route.query.user;

      if (userid) {
        return userid;
      } else {
        return null;
      }
    },
    currentloan() {
      const { currentitemdetails } = this;

      return currentitemdetails;
    },
    allowsubmit() {
      const {
        name,
        minimumbalanceallowed,
        termduration,
        termunit,
        interestRate,
        description,
        requirements,
        maximumamountallowed,
        foruser,
      } = this;

      if (
        name.length &&
        description.length &&
        `${maximumamountallowed}`.length &&
        `${minimumbalanceallowed}`.length &&
        requirements.length &&
        `${interestRate}`.length &&
        `${termduration}`.length &&
        termunit.length &&
        typeof parseInt(interestRate) === "number" &&
        typeof parseInt(termduration) === "number" &&
        typeof parseInt(maximumamountallowed) === "number" &&
        typeof parseInt(minimumbalanceallowed) === "number"
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    async submit() {
      const {
        name,
        description,
        maximumamountallowed,
        minimumbalanceallowed,
        requirements,
        interestRate,
        termduration,
        termunit,
        foruser,
        loanid,
      } = this;

      const requirementsarray = requirements.split(", ");

      const loanupdate = {
        loanid,
        name,
        description,
        maximumamountallowed: parseFloat(maximumamountallowed),
        minimumbalanceallowed: parseFloat(minimumbalanceallowed),
        requirements: requirementsarray,
        interestRate: parseFloat(interestRate),
        term: {
          duration: termduration,
          unit: termunit,
        },
        foruser,
      };

      this.toggleverbiage(`Updating loan item`);
      this.onspinner();

      try {
        await this.updateloanitem(loanupdate);
        this.toggleverbiage(null);
        this.offspinner();
        this.getloans();
        this.toadminroute("admin/dashboard");
      } catch (error) {
        console.error("Error editing loan item:", error);
      }
    },
  },
  mounted() {
    if (this.userid) {
      this.foruser = this.userid;
      this.getuser(this.userid);
    }

    const currentloanid = this.$route.query.currentloan

    this.getitemdetails({ type: "loan", currentitem: currentloanid });
  },
};
</script>
