<template>
  <div>
    <div class="landing">
      <Header />

      <ErrorSuccess 
        :successMessage="successMessage"
        :errorMessage="errorMessage"
        :closeErrorSuccess="closeErrorSuccess"/>

      <div class="auth">
        <div class="auth__left">
          <figure class="auth__img">
            <img src="@/assets/imgs/hdassets/skyscraper.avif" />
          </figure>
        </div>

        <div class="auth__right">
          <div class="overview__transaction--header">
            <h1 class="auth-header">
              Sign in for a <span class="orange">{{ sitename }}</span> account
            </h1>
          </div>

          <div class="form form-auth">
            <div class="input-area">
              <label class="smlabel" v-if="authError !== 'invalid email'">Email</label>
              <label class="smlabel fonterror" v-if="authError === 'invalid email'"
                >Email: invalid email</label
              >
              <div class="input">
                <input placeholder="A valid email" type="email" v-model="email" />
              </div>
            </div>

            <div class="input-area">
              <label class="smlabel">Password</label>
              <div class="input">
                <span class="input-passwordeye" @click="setvisible('password')">
                  <img src="@/assets/imgs/eyeopen.svg" />
                </span>
                <input placeholder="Password" :type="pw" v-model="password" />
              </div>
            </div>

            <div class="overview__withddep">
                <div class="overview__withddep--haveanaccount">
                  Don't have an account? <nuxt-link class="orange cursorpointer" to="/auth/signup">Sign up</nuxt-link>
                </div>
              </div>

            <div class="overview__withddep">
              <button
                class="button orange-btn-faint fontweight-3 half-flex-space"
                v-if="!allowlogin"
              >
                Login
              </button>
              <button
                class="button orange-btn fontweight-3 half-flex-space"
                v-if="allowlogin"
                @click="calllogin"
              >
                Login
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
import sitename from "@/mixins/sitename";

export default {
  mixins: [auth, sitename],
  methods: {
    calllogin() {
      const { email, password } = this;
      this.toggleverbiage("");
      this.onspinner();
      this.login({ email, password })
        .then((_id) => {
          this.toggleverbiage(null);
          this.offspinner();
          this.$router.push(`/overview/${_id}`);
        })
        .catch((error) => {
          this.offspinner();
          this.errorMessage = 'Wrong Email or password'
        });
    },
  },
  computed: {
    allowlogin() {
      const { email, password, isValidEmail } = this;

      if (email.length && password.length) {
        if (isValidEmail(email)) {
          return true;
        }
      }

      return false;
    },
  },
};
</script>
