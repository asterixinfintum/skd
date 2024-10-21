<template>
  <div>
    <div class="dashboard overview">
      <AdminHeader />

      <div class="dashboard__content halfscreen-width">
        <div class="overview__transaction--header bottom-margin">
          <div class="overview__transaction--h2 header-label capitalize">
            Edit savings plan item to display to
            {{ userid && userprofile ? userprofile.details.firstname : "clients" }}
          </div>
        </div>

        <div class="input-area fullbody grid">
          <div class="input-area fullbody">
            <label class="smlabel">Name</label>
            <div class="input">
              <input
                placeholder="Choose what to name this savingsplan item"
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
                v-model="minimumaccountbalance"
              />
            </div>
          </div>
        </div>

        <div class="input-area fullbody grid">
          <div class="input-area fullbody">
            <label class="smlabel">Minimum deposit allowed</label>
            <div class="input">
              <input type="text" placeholder="" v-model="minimumdeposit" />
            </div>
          </div>

          <div class="input-area fullbody">
            <label class="smlabel"
              >Compounding frequency (savings growth rate eg 0.6)</label
            >
            <div class="input">
              <input type="text" placeholder="" v-model="compoundingfrequency" />
            </div>
          </div>
        </div>

        <div class="input-area fullbody grid">
          <div class="input-area fullbody">
            <label class="smlabel">Duration of savings eg (20)</label>
            <div class="input">
              <input type="text" placeholder="" v-model="duration" />
            </div>
          </div>

          <div class="input-area fullbody">
            <label class="smlabel"
              >Unit of Duration of savings eg (months, days, years etc)</label
            >
            <div class="input">
              <input type="text" placeholder="" v-model="unit" />
            </div>
          </div>
        </div>

        <div class="input-area fullbody grid">
          <div class="input-area fullbody">
            <label class="smlabel">Frequency of deposits required eg (5)</label>
            <div class="input">
              <input type="text" placeholder="" v-model="frequency" />
            </div>
          </div>

          <div class="input-area fullbody">
            <label class="smlabel"
              >Unit of Frequency of depositseg (months, days, years etc)</label
            >
            <div class="input">
              <input type="text" placeholder="" v-model="frequencyunit" />
            </div>
          </div>
        </div>

        <div class="input-area fullbody">
          <label class="smlabel">Describe this savings plan</label>
          <div class="input">
            <textarea
              placeholder="description for this savings plan"
              v-model="description"
            ></textarea>
          </div>
        </div>

        <div class="input-area fullbody">
          <label class="smlabel">Requirements</label>
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
      minimumaccountbalance: "",
      minimumdeposit: "",
      description: "",
      requirements: "",
      compoundingfrequency: "",
      frequency: "",
      foruser: null,
      frequencyunit: "",
      duration: "",
      unit: "",
      savingsplanid: null,
    };
  },
  mixins: [global],
  watch: {
    currentsavingsitem(newval, oldval) {
      if (newval) {
        this.savingsplanid = newval._id;
        this.name = newval.name;
        this.minimumaccountbalance = newval.minimumaccountbalance;
        this.minimumdeposit = newval.minimumdeposit;
        this.description = newval.description;
        this.requirements = newval.requirements.join(",");
        this.compoundingfrequency = newval.compoundingfrequency;
        this.frequency = newval.contributionplan.frequency;
        this.frequencyunit = newval.contributionplan.frequencyunit;
        this.duration = newval.term.duration;
        this.unit = newval.term.unit;
      }
    },
  },
  methods: {
    async submit() {
      const {
        savingsplanid,
        name,
        minimumaccountbalance,
        minimumdeposit,
        description,
        requirements,
        foruser,
        compoundingfrequency,
        frequency,
        frequencyunit,
        duration,
        unit,
      } = this;

      const requirementsarray = requirements.split(",");

      const savingsplanupdate = {
        savingsplanid,
        name,
        minimumaccountbalance,
        minimumdeposit,
        description,
        requirements: requirementsarray,
        foruser,
        compoundingfrequency,
        contributionplan: {
          frequency,
          frequencyunit,
        },
        term: {
          duration,
          unit,
        },
      };

      this.toggleverbiage(`Updating investmentplan item`);
      this.onspinner();

      try {
        await this.updatesavingsitem(savingsplanupdate);
        this.toggleverbiage(null);
        this.offspinner();
        this.getsavingsplans();
        this.toadminroute("admin/dashboard");
      } catch (error) {
        console.error("Error editing loan item:", error);
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
    currentsavingsitem() {
      const { currentitemdetails } = this;

      return currentitemdetails;
    },
    allowsubmit() {
      const {
        name,
        minimumaccountbalance,
        minimumdeposit,
        description,
        requirements,
        compoundingfrequency,
        frequency,
        frequencyunit,
        duration,
        unit,
      } = this;

      if (
        name.length &&
        `${minimumaccountbalance}`.length &&
        `${minimumdeposit}`.length &&
        description.length &&
        `${compoundingfrequency}`.length &&
        requirements.length &&
        `${frequency}`.length &&
        frequencyunit.length &&
        `${duration}`.length &&
        unit.length
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

    const currentitem = this.$route.query.currentitem;

    this.getitemdetails({ type: "savingsplan", currentitem });
  },
};
</script>
