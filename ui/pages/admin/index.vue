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
              <div class="input">
                <span class="input-passwordeye" @click="setvisible('password')">
                  <img src="@/assets/imgs/eyeopen.svg" />
                </span>
                <input placeholder="Password" :type="pw" v-model="password" />
              </div>
            </div>

            <div class="overview__withddep">
              <button
                class="button orange-btn-faint fontweight-3 half-flex-space"
                v-if="!allowentry"
              >
                Login
              </button>
              <button
                class="button orange-btn fontweight-3 half-flex-space"
                v-if="allowentry"
                @click="calladminentry"
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

export default {
  data() {
    return {
      username: "",
    };
  },
  mixins: [auth],
  methods: {
    calladminentry() {
      const { username, password } = this;

      this.toggleverbiage("Login admin");
      this.onspinner();
      this.adminentry({ username, password })
        .then((_id) => {
          this.toggleverbiage(null);
          this.offspinner();
          this.$router.push(`/admin/dashboard?admin=${_id}`);
        })
        .catch((error) => {});
    },
  },
  computed: {
    allowentry() {
      const { username, password } = this;

      if (password.length && username.length) {
        return true;
      }

      return false;
    },
  },
};
</script>
