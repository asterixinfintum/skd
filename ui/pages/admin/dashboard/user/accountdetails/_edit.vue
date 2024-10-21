<template>
  <div>
    <div class="dashboard overview">
      <AdminHeader />

      <div class="dashboard__content" v-if="userprofile">
        <div class="content-body">
          <div class="apply">
            <div class="apply__content">
              <div class="apply__form">
                <div class="overview__transaction--header bottom-margin">
                  <div class="overview__transaction--h2 header-label capitalize">
                    {{
                      `Edit ${userprofile.details.firstname} ${userprofile.details.lastname}'s Account details`
                    }}
                  </div>
                </div>

                <div class="two-side-grid">
                  <div class="input-area">
                    <label class="smlabel capitalize"
                      >{{ userprofile.details.firstname }}'s Account Balance</label
                    >
                    <label
                      class="smlabel tinylabel fontweight-5"
                      :class="{
                        fonterror: authError === 'this input should contain just numbers',
                      }"
                    >
                    </label>
                    <div class="input">
                      <input
                        :placeholder="`${userprofile.details.firstname}'s balance`"
                        v-model="balance"
                      />
                    </div>
                  </div>

                  <div class="input-area">
                    <label class="smlabel capitalize"
                      >{{ userprofile.details.firstname }}'s Loan total</label
                    >
                    <label
                      class="smlabel tinylabel fontweight-5"
                      :class="{
                        fonterror: authError === 'this input should contain just numbers',
                      }"
                    >
                    </label>
                    <div class="input">
                      <input
                        :placeholder="`${userprofile.details.firstname}'s loan total`"
                        v-model="loansaggregate"
                      />
                    </div>
                  </div>
                </div>

                <div class="two-side-grid">
                  <div class="input-area">
                    <label class="smlabel capitalize"
                      >{{ userprofile.details.firstname }}'s Income</label
                    >
                    <label
                      class="smlabel tinylabel fontweight-5"
                      :class="{
                        fonterror: authError === 'this input should contain just numbers',
                      }"
                    >
                    </label>
                    <div class="input">
                      <input
                        :placeholder="`${userprofile.details.firstname}'s income`"
                        v-model="income"
                      />
                    </div>
                  </div>

                  <div class="input-area">
                    <label class="smlabel capitalize"
                      >{{ userprofile.details.firstname }}'s Savings's growth
                      target</label
                    >
                    <label
                      class="smlabel tinylabel fontweight-5"
                      :class="{
                        fonterror: authError === 'this input should contain just numbers',
                      }"
                    >
                    </label>
                    <div class="input">
                      <input
                        :placeholder="`${userprofile.details.firstname}'s savings's growth target`"
                        v-model="savingsaggregatetarget"
                      />
                    </div>
                  </div>
                </div>

                <div class="two-side-grid">
                  <div class="input-area">
                    <label class="smlabel capitalize"
                      >{{ userprofile.details.firstname }}'s Savings's growth</label
                    >
                    <label
                      class="smlabel tinylabel fontweight-5"
                      :class="{
                        fonterror: authError === 'this input should contain just numbers',
                      }"
                    >
                    </label>
                    <div class="input">
                      <input
                        :placeholder="`${userprofile.details.firstname}'s savings's growth`"
                        v-model="savingsaggregate"
                      />
                    </div>
                  </div>

                  <div class="input-area">
                    <label class="smlabel capitalize"
                      >{{ userprofile.details.firstname }}'s Investment growth</label
                    >
                    <label
                      class="smlabel tinylabel fontweight-5"
                      :class="{
                        fonterror: authError === 'this input should contain just numbers',
                      }"
                    >
                    </label>
                    <div class="input">
                      <input
                        :placeholder="`${userprofile.details.firstname}'s investment growth target`"
                        v-model="investmentgrowth"
                      />
                    </div>
                  </div>
                </div>

                <div class="overview__withddep">
                  <button
                    class="button orange-btn fontweight-3 half-flex-space"
                    @click="updateaccount"
                  >
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
      balance: "",
      loansaggregate: "",
      income: "",
      savingsaggregatetarget: "",
      savingsaggregate: "",
      investmentgrowth: "",
    };
  },
  mixins: [global],
  computed: {
    userid() {
      return this.$route.params.edit;
    },
  },
  mounted() {
    this.getuser(this.userid).then((user) => {
        const account = user.account;

        this.balance = account.balance;
        this.loansaggregate = account.loansaggregate;
        this.income = account.income;
        this.savingsaggregate = account.savingsaggregate;
        this.savingsaggregatetarget = account.savingsaggregatetarget;
        this.investmentgrowth = account.investmentgrowth;
    });
  },
  methods: {
    updateaccount() {
      const {
        balance,
        loansaggregate,
        income,
        savingsaggregatetarget,
        savingsaggregate,
        investmentgrowth,
      } = this;

      this.toggleverbiage(`Updating ${this.userprofile.details.firstname}'s profile`);
      this.onspinner();

      this.updateuseraccount({
        user: this.userid,
        balance,
        loansaggregate,
        income,
        savingsaggregatetarget,
        savingsaggregate,
        investmentgrowth
      }).then(() => {
        this.toggleverbiage(null);
        this.offspinner();
        this.toadminroute(`admin/dashboard/user/${this.userid}`)
      });
    },
  },
};
</script>
