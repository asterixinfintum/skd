<template>
  <div>
    <div class="dashboard overview">
      <AdminHeader />

      <div class="dashboard__content halfscreen-width">
        <div class="overview__transaction--header bottom-margin">
          <div class="overview__transaction--h2 header-label capitalize">
            Create a loan item to display to
            {{ userid && userprofile ? userprofile.details.firstname : "clients" }}
          </div>
        </div>

        <div class="input-area fullbody grid">
          <div class="input-area fullbody">
            <label class="smlabel">Name</label>
            <div class="input">
              <input
                placeholder="Choose what to name this loan"
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
      requirementArray: [],
      interestRate: "",
      termduration: "",
      termunit: "",
      foruser: null,
    };
  },
  mixins: [global],
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
      } = this;

      const requirementsarray = requirements.split(", ");

      const loan = {
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

      this.toggleverbiage(`Adding new loan item`);
      this.onspinner();

      try {
        await this.createloanitem(loan);
        this.toggleverbiage(null);
        this.offspinner();
        this.toadminroute("admin/dashboard");
      } catch (error) {
        console.error("Error creating loan item:", error);
        // Handle the error appropriately, maybe show an error message to the user
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
      } = this;

      if (
        name.length &&
        description.length &&
        maximumamountallowed.length &&
        minimumbalanceallowed.length &&
        requirements.length &&
        interestRate.length &&
        termduration.length &&
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
  mounted() {
    if (this.userid) {
      this.foruser = this.userid;
      this.getuser(this.userid);
    }
  },
};
</script>
