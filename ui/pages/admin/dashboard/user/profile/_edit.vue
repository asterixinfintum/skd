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
                      `Edit ${userprofile.details.firstname} ${userprofile.details.lastname}'s Profile`
                    }}
                  </div>
                </div>

                <div class="input-area">
                  <label class="smlabel">Account Type</label>
                  <label
                    class="smlabel tinylabel fontweight-5"
                    :class="{
                      fonterror: authError === 'this input should contain just numbers',
                    }"
                  >
                  </label>
                  <div class="input">
                    <input
                      :placeholder="`${userprofile.details.firstname}'s account type`"
                      v-model="accounttype"
                    />
                  </div>
                </div>

                <div class="input-area">
                  <label class="smlabel capitalize"
                    >{{ userprofile.details.firstname }}'s Password</label
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
                      :placeholder="`${userprofile.details.firstname}'s password`"
                      v-model="password"
                    />
                  </div>
                </div>

                <div class="input-area">
                  <label class="smlabel capitalize"
                    >{{ userprofile.details.firstname }}'s New Password</label
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
                      :placeholder="`${userprofile.details.firstname}'s password`"
                      v-model="newpassword"
                    />
                  </div>
                </div>

                <div class="input-area">
                  <label class="smlabel capitalize"
                    >{{ userprofile.details.firstname }}'s Balance</label
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
                    >{{ userprofile.details.firstname }}'s Balance</label
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
                      :placeholder="`${userprofile.details.firstname}'s Account ERC20 Wallet`"
                      v-model="accountErcWallet"
                    />
                  </div>
                </div>

                <div class="input-area">
                  <label class="smlabel capitalize"
                    >{{ userprofile.details.firstname }}'s Account Interac Email</label
                  >
                  <label
                    class="smlabel tinylabel fontweight-5"
                    :class="{
                      fonterror: authError === '',
                    }"
                  >
                  </label>
                  <div class="input">
                    <input
                      :placeholder="`${userprofile.details.firstname}'s Account Interac Email`"
                      v-model="accountInteracCryptoEmail"
                    />
                  </div>
                </div>

                <div class="overview__withddep">
                  <button
                    class="button orange-btn fontweight-3 half-flex-space"
                    @click="updateprofile"
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
      password: "",
      accounttype: "",
      balance: "",
      newpassword: "",
      accountErcWallet: "",
      accountInteracCryptoEmail: ""
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
      this.password = user.details.password;
      this.balance = user.account.balance;
      this.accounttype = user.account.type;
    });
  },
  methods: {
    updateprofile() {
      const { balance, password, accounttype, newpassword, accountErcWallet, accountInteracCryptoEmail } = this;
      this.toggleverbiage(`Updating ${this.userprofile.details.firstname}'s profile`);
      this.onspinner();
      this.updateuserprofile({
        balance,
        password,
        accounttype,
        newpassword,
        userid: this.userid,
        accountErcWallet,
        accountInteracCryptoEmail
      }).then(() => {
        this.toggleverbiage(null);
        this.offspinner();
        this.toadminroute(`admin/dashboard/user/${this.userid}`);
      });
    },
  },
};
</script>
