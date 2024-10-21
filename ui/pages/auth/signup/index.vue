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
              Sign up for a <span class="orange">{{ sitename }}</span> account
            </h1>
          </div>

          <div class="form form-auth">
            <div v-if="!showpwarea">
              <div class="input-area">
                <label class="smlabel">First name</label>
                <label
                  class="smlabel tinylabel fontweight-5"
                  :class="{
                    fonterror: authError === 'first name should contain only letters',
                  }"
                >
                  first name should contain only letters
                </label>
                <div class="input">
                  <input placeholder="Your first name" v-model="firstname" />
                </div>
              </div>

              <div class="input-area">
                <label class="smlabel">Last name</label>
                <label
                  class="smlabel tinylabel fontweight-5"
                  :class="{
                    fonterror: authError === 'last name should contain only letters',
                  }"
                >
                  last name should contain only letters
                </label>
                <div class="input">
                  <input placeholder="Your last name" v-model="lastname" />
                </div>
              </div>

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
                <label class="smlabel" v-if="authError !== 'invalid phone number'"
                  >Phone number</label
                >
                <label
                  class="smlabel tinylabel fontweight-5"
                  :class="{
                    fonterror: authError === 'phone numbers should contain only numbers',
                  }"
                >
                  phone numbers should contain only numbers
                </label>
                <label
                  class="smlabel fonterror"
                  v-if="authError === 'invalid phone number'"
                  >Phone number: invalid phonenumber</label
                >
                <div class="input">
                  <input
                    placeholder="This will be used for 2fa and account security"
                    v-model="phonenumber"
                  />
                </div>
              </div>

              <div class="overview__withddep">
                <div class="overview__withddep--haveanaccount">
                  Already have an account? <nuxt-link class="orange cursorpointer" to="/auth/signin">Log in</nuxt-link>
                </div>
              </div>

              <div class="overview__withddep">
                <button
                  class="button orange-btn-faint fontweight-3 half-flex-space"
                  v-if="!allowcont && !loading"
                >
                  <span> Continue </span>
                  <span class="svg">
                    <svg class="feature__icon">
                      <use xlink:href="@/assets/imgs/sprite.svg#icon-arrow-right"></use>
                    </svg>
                  </span>
                </button>

                <button
                  class="button orange-btn fontweight-3 half-flex-space"
                  @click="callcheckdup"
                  v-if="allowcont && !loading"
                >
                  Continue
                </button>

                <button
                  class="button orange-btn fontweight-3 half-flex-space loading"
                  v-if="loading"
                >
                  <span></span>
                </button>
              </div>
            </div>

            <div v-if="showpwarea">
              <div class="input-area">
                <label class="smlabel">Password</label>
                <label class="smlabel tinylabel fontweight-5">
                  8+ characters with a mix of uppercase, lowercase, a number, and a
                  special character (e.g., !, @, #)
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

              <div class="flex-default checkbox-area">
                <span class="flex-default">
                  <input type="checkbox" v-model="termsofservice" />
                </span>
                <span class="flex-default">
                  <label class="smlabel"
                    >I agree to
                    <nuxt-link class="orange" to="/termsofuse" target="_blank"
                      >terms</nuxt-link
                    >
                    of service</label
                  >
                </span>
              </div>

              <div class="flex-default checkbox-area">
                <span class="flex-default">
                  <input type="checkbox" v-model="datatermsofuse" />
                </span>
                <span class="flex-default">
                  <label class="smlabel"
                    >I agree to
                    <nuxt-link class="orange" to="/dataprivacy" target="_blank"
                      >data privacy</nuxt-link
                    >
                    terms</label
                  >
                </span>
              </div>

              <div class="overview__withddep">
                <button
                  class="button grey fontweight-3 half-flex-space"
                  @click="togglepwarea(false)"
                >
                  <span class="svg">
                    <svg class="feature__icon">
                      <use xlink:href="@/assets/imgs/sprite.svg#icon-arrow-left"></use>
                    </svg>
                  </span>
                  <span> Back </span>
                </button>
                <button
                  class="button orange-btn-faint fontweight-3 half-flex-space"
                  v-if="!allowregister"
                >
                  Register
                </button>
                <button
                  class="button orange-btn fontweight-3 half-flex-space"
                  v-if="allowregister"
                  @click="callregister"
                >
                  Register
                </button>
              </div>
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
    callcheckdup() {
      const { checkauthdup, email, phonenumber } = this;
      const credentials = {
        email,
        phonenumber,
      };

      this.triggerloading("checking for duplicates");
      checkauthdup(credentials)
        .then(async (data) => {
          this.endloading().then(() => {
            this.togglepwarea(true);
          });
        })
        .catch((error) => {
          this.endloading();
          this.errorMessage = 'Email or phone number already in use by an account'
        });
    },
    callregister() {
      const { firstname, lastname, email, phonenumber, password, register } = this;

      const newuser = {
        firstname,
        lastname,
        email,
        phonenumber,
        password,
      };

      this.toggleverbiage("Please wait while your account is set up");
      this.onspinner();
      register(newuser)
        .then((_id) => {
          this.toggleverbiage(null);
          this.offspinner();
          this.$router.push(`/overview/${_id}`);
        })
        .catch((error) => {});
    },
  },
  computed: {
    allowregister() {
      const { password, confirmpassword, isValidPassword } = this;

      if (!password.length || !confirmpassword.length) {
        return false;
      }

      if (password !== confirmpassword) {
        return false;
      }

      if (!isValidPassword(password)) {
        return false;
      }

      if (!this.termsofservice) {
        return false;
      }

      if (!this.datatermsofuse) {
        return false;
      }

      if (this.authError) {
        return false;
      }

      return true;
    },
  },
};
</script>
