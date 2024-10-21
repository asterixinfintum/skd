<template>
  <div>
    <div class="dashboard overview">
      <AdminHeader />

      <div class="dashboard__content" v-if="userprofile && transaction">
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
                  <label class="smlabel capitalize">Type</label>
                  <label
                    class="smlabel tinylabel fontweight-5"
                    :class="{
                      fonterror: authError === 'this input should contain just numbers',
                    }"
                  >
                  </label>
                  <div class="input">
                    <input :placeholder="`Type`" v-model="type" />
                  </div>
                </div>

                <div class="input-area">
                  <label class="smlabel capitalize">Country</label>
                  <label
                    class="smlabel tinylabel fontweight-5"
                    :class="{
                      fonterror: authError === 'this input should contain just numbers',
                    }"
                  >
                  </label>
                  <div class="input">
                    <input :placeholder="`Country`" v-model="country" />
                  </div>
                </div>

                <div class="input-area">
                  <label class="smlabel capitalize">Bank</label>
                  <label
                    class="smlabel tinylabel fontweight-5"
                    :class="{
                      fonterror: authError === 'this input should contain just numbers',
                    }"
                  >
                  </label>
                  <div class="input">
                    <input :placeholder="`Bank`" v-model="bank" />
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
                  <label class="smlabel capitalize">Account</label>
                  <label
                    class="smlabel tinylabel fontweight-5"
                    :class="{
                      fonterror: authError === 'this input should contain just numbers',
                    }"
                  >
                  </label>
                  <div class="input">
                    <input
                      :placeholder="`Destination Account`"
                      v-model="destinationaccount"
                    />
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
      type: "",
      status: "",
      date: "",
      country: "",
      bank: "",
      destinationaccount: "",
    };
  },
  mixins: [global],
  methods: {
    update() {
      const {
        amount,
        type,
        status,
        date,
        country,
        bank,
        destinationaccount,
        transactionid,
      } = this;

      const transaction = {
        id: transactionid,
        amount,
        type,
        status,
        date,
        destinationaccount,
        destinationcountry: country,
        destinationbank: bank,
      };

      this.toggleverbiage("Editing Transaction");
      this.onspinner();

      this.editusertransaction(transaction).then(() => {
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
      const { amount, type, status, date, country, bank, destinationaccount } = this;

      if (
        amount &&
        type.length &&
        status.length &&
        date.length &&
        country.length &&
        bank.length &&
        destinationaccount.length
      ) {
        return true;
      }

      return false;
    },
    userid() {
      return this.$route.params.edit;
    },
    transactionid() {
      return this.$route.query.transaction;
    },
    transaction() {
      const { usertxns, transactionid } = this;

      if (usertxns.length) {
        const transaction = usertxns.find((usertxn) => usertxn._id === transactionid);

        return transaction;
      }

      return null;
    },
  },
  watch: {
    transaction(newval, oldval) {
      this.amount = newval.amount;
      this.type = newval.type;
      this.status = newval.status;
      this.date = newval.date;
      this.country = newval.destinationcountry;
      this.bank = newval.destinationbank;
      this.destinationaccount = newval.destinationaccount;
    },
  },
  mounted() {
    this.getuser(this.userid);
    this.getusertransactions(this.userid);
  },
};
</script>
