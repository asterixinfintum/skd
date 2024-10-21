<template>
  <div>
    <div class="landing">
      <div class="auth">
        <div class="auth__left"></div>

        <div class="auth__right">
          <div class="overview__transaction--header">
            <h1 class="auth-header">Sign in to Admin account</h1>
          </div>

          <div class="form form-auth">
            <div class="input-area">
              <label class="smlabel" v-if="authError !== 'invalid email'">Username</label>
              <div class="input">
                <input placeholder="username" type="text" v-model="username" />
              </div>
            </div>

            <div class="input-area">
              <label class="smlabel">Password</label>
              <label class="smlabel tinylabel fontweight-5">
                8+ characters with a mix of uppercase, lowercase, a number, and a special
                character (e.g., !, @, #)
              </label>
              <label class="smlabel fonterror" v-if="authError === 'invalid password'"
                >Password must have 8+ characters with a mix of uppercase, lowercase, a
                number, and a special character (e.g., !, @, #)</label
              >
              <label
                class="smlabel fonterror"
                v-if="authError === 'password should be the same as confirm password'"
                >Password should be the same as confirm password</label
              >
              <div class="input">
                <span class="input-passwordeye" @click="setvisible('password')">
                  <img src="@/assets/imgs/eyeopen.svg" />
                </span>
                <input
                  placeholder="Create an effective password"
                  :type="pw"
                  v-model="password"
                />
              </div>
            </div>

            <div class="input-area">
              <label class="smlabel">Confirm Password</label>
              <label
                class="smlabel fonterror"
                v-if="authError === 'confirm password should be the same as password'"
                >Confirm password should be the same as password</label
              >
              <label class="smlabel tinylabel fontweight-5">
                should equal password
              </label>
              <div class="input">
                <span class="input-passwordeye" @click="setvisible('confirmpassword')">
                  <img src="@/assets/imgs/eyeopen.svg" />
                </span>
                <input
                  placeholder="Confirm new password"
                  :type="confpw"
                  v-model="confirmpassword"
                />
              </div>
            </div>

            <div class="overview__withddep">
              <button
                class="button orange-btn-faint fontweight-3 half-flex-space"
                v-if="!allowcreate"
              >
                Login
              </button>
              <button
                class="button orange-btn fontweight-3 half-flex-space"
                v-if="allowcreate"
                @click="calladmincreate"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "@/mixins/auth";

export default {
  data() {
    return {
      username: "",
    };
  },
  mixins: [auth],
  methods: {
    calladmincreate() {
      const { username, password } = this;

      this.toggleverbiage("Creating admin");
      this.onspinner();
      this.admincreate({ username, password })
        .then((_id) => {
          this.toggleverbiage(null);
          this.offspinner();
          this.$router.push(`/admin/dashboard?admin=${_id}`);
        })
        .catch((error) => {});
    },
  },
  computed: {
    allowcreate() {
      const { username, password, confirmpassword } = this;

      if (password.length && confirmpassword.length && username.length) {
        if (password === confirmpassword) {
          return true;
        }
      }

      return false;
    },
  },
};
</script>
