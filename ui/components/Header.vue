<template>
  <div>
    <div class="header">
      <div class="header__top">
        <div class="header__side">
          <div class="header__name" @click="$router.push('/')">
            <h1>{{ sitename }}</h1>
          </div>
        </div>
        <div class="header__side menu" :class="{ sidenavopen }">
          <div
            class="header__menuitem"
            @click="scrolltodiv({ elementid: 'landingoffers' })"
          >
            <p>Accounts</p>
          </div>
          <div class="header__menuitem" @click="scrolltodiv({ elementid: 'save' })">
            <p>Savings</p>
          </div>
          <div class="header__menuitem" @click="scrolltodiv({ elementid: 'loans' })">
            <p>Loans</p>
          </div>
          <div
            class="header__menuitem"
            @click="scrolltodiv({ elementid: 'investments' })"
          >
            <p>Borrowing & Investmements</p>
          </div>
          <div class="header__menuitem" @click="scrolltodiv({ elementid: 'partners' })">
            <p>Partners</p>
          </div>
          <div class="header__menuitem" @click="scrolltodiv({ elementid: 'reviews' })">
            <p>Reviews & Quality</p>
          </div>
          <div class="header__menuitem last-child" @click="$router.push('/auth/signup')">
            <button class="button">Sign up</button>
          </div>

          <div class="header__mobilemenu" @click="togglesidenav">
            <div class="header__mobilemenu--logo">
              <h1>{{ sitename }}</h1>
            </div>
            <div>
              <img src="@/assets/imgs/close.svg" />
            </div>
          </div>
        </div>

        <div class="header__mobilemenubtn" @click="togglesidenav">
          <p>Menu</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sitename from "@/mixins/sitename";

export default {
  mixins: [sitename],
  data() {
    return {
      sidenavopen: false,
    };
  },
  methods: {
    scrolltodiv({ elementid }) {
      const elemnt = document.getElementById(`${elementid}`);
      
      if (elemnt) {
        elemnt.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        this.$router.push("/");
      }
    },
    togglesidenav() {
      this.sidenavopen ? (this.sidenavopen = false) : (this.sidenavopen = true);
    },
  },
};
</script>
