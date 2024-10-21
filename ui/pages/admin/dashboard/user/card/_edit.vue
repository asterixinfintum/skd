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
                      `Edit ${userprofile.details.firstname} ${userprofile.details.lastname}'s ${this.cardtype} Card`
                    }}
                  </div>
                </div>

                <div class="input-area">
                  <label class="smlabel">Card Digits</label>
                  <label
                    class="smlabel tinylabel fontweight-5"
                    :class="{
                      fonterror: authError === 'this input should contain just numbers',
                    }"
                  >
                  </label>
                  <div class="input">
                    <input
                      :placeholder="`${userprofile.details.firstname}'s card digits`"
                      v-model="digits"
                    />
                  </div>
                </div>

                <div class="input-area">
                  <label class="smlabel capitalize"
                    >{{ userprofile.details.firstname }}'s Card Expiry Date</label
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
                      :placeholder="`${userprofile.details.firstname}'s card exp date`"
                      v-model="expiry"
                    />
                  </div>
                </div>

                <div class="input-area">
                  <label class="smlabel capitalize"
                    >{{ userprofile.details.firstname }}'s Card CVV</label
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
                      :placeholder="`${userprofile.details.firstname}'s card cvv`"
                      v-model="cvv"
                    />
                  </div>
                </div>

                <div class="overview__withddep">
                  <button
                    class="button orange-btn fontweight-3 half-flex-space"
                    @click="updatecard"
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
      digits: "",
      expiry: "",
      cvv: "",
      cardtype: "",
    };
  },
  mixins: [global],
  computed: {
    userid() {
      return this.$route.params.edit;
    },
  },
  mounted() {
    this.getuser(this.userid);
  },
  watch: {
    userprofile(newval, oldval) {
      const cardid = this.$route.query.card;
      const card = newval.cards.find((card) => card._id === cardid);
      this.digits = card.digits;
      this.expiry = card.expiry;
      this.cvv = card.cvv;
      this.cardtype = card.type;
    },
  },
  methods: {
    updatecard() {
      const { digits, expiry, cvv } = this;
      const cardid = this.$route.query.card;

      this.toggleverbiage(
        `Updating ${this.userprofile.details.firstname}'s ${this.cardtype} card`
      );
      this.onspinner();

      this.updateusercard({ digits, expiry, cvv, cardid }).then(() => {
        this.toggleverbiage(null);
        this.offspinner();
        this.toadminroute(`admin/dashboard/user/${this.userid}`)
      });
    },
  },
};
</script>
