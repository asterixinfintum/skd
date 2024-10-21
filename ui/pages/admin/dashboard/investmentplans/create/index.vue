<template>
  <div>
    <div class="dashboard overview">
      <AdminHeader />

      <div class="dashboard__content halfscreen-width">
        <div class="overview__transaction--header bottom-margin">
          <div class="overview__transaction--h2 header-label capitalize">
            Create an investment item to display to
            {{ userid && userprofile ? userprofile.details.firstname : "clients" }}
          </div>
        </div>

        <div class="input-area fullbody grid">
          <div class="input-area fullbody">
            <label class="smlabel">Name</label>
            <div class="input">
              <input
                placeholder="Choose what to name this investment item"
                type="text"
                v-model="name"
              />
            </div>
          </div>

          <div class="input-area fullbody">
            <label class="smlabel">Minimum account balance</label>
            <div class="input">
              <input
                placeholder="Minimum account balance to be elligible"
                type="text"
                v-model="minimumbalanceallowed"
              />
            </div>
          </div>
        </div>

        <div class="input-area fullbody grid">
          <div class="input-area fullbody">
            <label class="smlabel">Duration of investment eg: (5, 6, 7)</label>
            <div class="input">
              <input
                placeholder="Duration of investment"
                type="text"
                v-model="duration"
              />
            </div>
          </div>

          <div class="input-area fullbody">
            <label class="smlabel"
              >Unit of duration of investment eg: (days, months, years)</label
            >
            <div class="input">
              <input placeholder="Unit of duration" type="text" v-model="unit" />
            </div>
          </div>
        </div>

        <div class="input-area fullbody">
          <label class="smlabel">Minimum deposit allowed</label>
          <div class="input">
            <input type="text" placeholder="eg 1000" v-model="minimumdeposit" />
          </div>
        </div>

        <div class="input-area fullbody">
          <label class="smlabel"
            >Choose a percentage of return for this investment item</label
          >
          <div class="input">
            <input
              type="text"
              placeholder="eg 0.4, 0.05, 1, 1.7 etc be accurate or it won't display"
              v-model="returnpercentage"
            />
          </div>
        </div>

        <div class="input-area fullbody">
          <label class="smlabel">Describe this investment item</label>
          <div class="input">
            <textarea
              placeholder="description for this investment item"
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
              placeholder="Requirements should be comma seperated"
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
      foruser: null,
      minimumbalanceallowed: "",
      description: "",
      requirements: "",
      returnpercentage: "",
      minimumdeposit: "",
      duration: "",
      unit: "",
    };
  },
  mixins: [global],
  methods: {
    async submit() {
      const {
        name,
        foruser,
        minimumbalanceallowed,
        description,
        requirements,
        returnpercentage,
        minimumdeposit,
        duration,
        unit,
      } = this;

      const requirementsarray = requirements.split(", ");

      const investment = {
        name,
        foruser,
        minimumbalanceallowed: parseFloat(minimumbalanceallowed),
        description,
        requirements,
        returnpercentage: parseFloat(returnpercentage),
        minimumdeposit: parseFloat(minimumdeposit),
        durationofinvestment: {
          duration,
          unit,
        },
      };

      this.toggleverbiage(`Adding new investment item`);
      this.onspinner();

      try {
        await this.createinvestmentitem(investment);
        this.toggleverbiage(null);
        this.offspinner();
        this.toadminroute("admin/dashboard");
      } catch (error) {
        console.error("Error creating investment item:", error);
        // Handle the error appropriately, e.g., show an error message to the user
      }
    },
  },
  mounted() {
    if (this.userid) {
      this.foruser = this.userid;
      this.getuser(this.userid);
    }
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
        description,
        requirements,
        returnpercentage,
        minimumdeposit,
        duration,
        unit,
      } = this;

      if (
        name.length &&
        minimumbalanceallowed.length &&
        description.length &&
        requirements.length &&
        returnpercentage.length &&
        minimumdeposit.length &&
        duration.length &&
        unit.length
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
