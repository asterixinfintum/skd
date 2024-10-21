<template>
  <div>
    <div v-if="!adminid && client">
      <div class="userheader">
        <div
          class="userheader__logoarea"
          @click="$router.push(`/overview?user=${client._id}`)"
        >
          <figure>
            <img src="@/assets/imgs/logo.png" />
          </figure>
        </div>
        <div class="userheader__menu" :class="{ sidenavopen }">
          <div class="flex-default spacebetween">
            <div></div>

            <div class="mobile-burger side-nav" @click="togglesidenav">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div class=""></div>

          <div v-if="msgpopupopen">
            <CreateMessageUser
              :header="'Contact support'"
              :openbtn="openmsgform"
              :closebtn="closemsgform"
            />
          </div>

          <div
            class="userheader__menuitem"
            :class="{
              current: currnt('overview'),
            }"
            @click="toroute('overview')"
          >
            <span>
              <svg class="feature__icon">
                <use xlink:href="@/assets/imgs/sprite.svg#icon-dashboard"></use>
              </svg>
            </span>
            <label>Overview</label>
          </div>
          <div
            class="userheader__menuitem"
            :class="{
              current: currnt('transactions'),
            }"
            @click="toroute('transactions/all')"
          >
            <span>
              <svg class="feature__icon">
                <use xlink:href="@/assets/imgs/sprite.svg#icon-clock"></use>
              </svg>
            </span>
            <label>Transactions</label>
          </div>

          <div
            class="userheader__menuitem"
            :class="{
              current: currnt('loans'),
            }"
            @click="toroute('loans')"
          >
            <span>
              <svg class="feature__icon">
                <use xlink:href="@/assets/imgs/sprite.svg#icon-banknote"></use>
              </svg>
            </span>
            <label>Apply for Loans</label>
          </div>

          <div
            class="userheader__menuitem"
            :class="{
              current: currnt('investmentplans'),
            }"
            @click="toroute('investmentplans')"
          >
            <span>
              <svg class="feature__icon">
                <use xlink:href="@/assets/imgs/sprite.svg#icon-tree"></use>
              </svg>
            </span>
            <label>Investment plans</label>
          </div>

          <div
            class="userheader__menuitem"
            :class="{
              current: currnt('savings'),
            }"
            @click="toroute('savings')"
          >
            <span>
              <svg class="feature__icon">
                <use xlink:href="@/assets/imgs/sprite.svg#icon-wallet"></use>
              </svg>
            </span>
            <label>Savings Plans</label>
          </div>
          <div
            class="userheader__menuitem"
            :class="{
              current: currnt('support'),
            }"
            @click="openmsgform"
          >
            <span>
              <svg class="feature__icon">
                <use xlink:href="@/assets/imgs/sprite.svg#icon-message-circle"></use>
              </svg>
            </span>
            <label>Support</label>
          </div>
          <div
            class="userheader__menuitem"
            :class="{
              current: currnt('verification'),
            }"
            @click="toroute('verification')"
          >
            <span>
              <svg class="feature__icon">
                <use xlink:href="@/assets/imgs/sprite.svg#icon-account_circle"></use>
              </svg>
            </span>
            <label>Verification</label>
          </div>
          <!-- <div
          class="userheader__menuitem"
          :class="{
            current: currnt('security'),
          }"
          @click="toroute('security')"
        >
          <span>
            <svg class="feature__icon">
              <use xlink:href="@/assets/imgs/sprite.svg#icon-shield"></use>
            </svg>
          </span>
          <label>Security</label>
        </div>-->
        </div>

        <div class="userheader__userarea">
          <span class="cursorpointer relativeposition" @click.stop="opennotifsbod">
            <label class="notificationbubble" v-if="unreadclientnotifs.length">{{
              unreadclientnotifs.length
            }}</label>
            <svg class="feature__icon">
              <use xlink:href="@/assets/imgs/sprite.svg#icon-bell"></use>
            </svg>
            <div class="" v-if="notifsbodstate">
              <Notifications :dropdown="true" />
            </div>
          </span>
          <!--<span class="margin-left-thirty relativeposition cursorpointer">
          <label class="notificationbubble">6</label>
          <svg class="feature__icon">
            <use xlink:href="@/assets/imgs/sprite.svg#icon-messages"></use>
          </svg>
        </span>-->
          <span
            class="margin-left-thirty cursorpointer relativeposition"
            @click.stop="openprofilebod"
          >
            <svg class="feature__icon">
              <use xlink:href="@/assets/imgs/sprite.svg#icon-user"></use>
            </svg>
            <div class="" v-if="profilebod">
              <ProfileDropdown />
            </div>
          </span>

          <div class="mobile-burger side-nav side-nav-header" @click="togglesidenav">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div class="userheader__confirmemail" v-if="!client.emailcofirmed">
        We sent a confirmation email to your email {{ client.email }}, please check your
        email and confirm your account
      </div>
    </div>

    <div v-if="adminid">
      <AdminHeader />
    </div>
  </div>
</template>

<script>
import global from "@/mixins/global";

export default {
  data() {
    return {
      current: "overview",
      sidenavopen: false,
    };
  },
  props: ["notifsbodstate", "opennotifsbod", "openprofilebod", "profilebod"],
  mixins: [global],
  watch: {
    socket(newval, oldval) {
      if (newval) {
        this.socket.on("notification", (data) => {
          //console.log('Notification received:', data.userid);
          if (this.client) {
            if (this.client._id === data.userid) {
              this.getusernotifications(data.userid);
            }
          }
        });
      }
    },
    client(newval, oldval) {
      if (newval) {
       console.log("newval client:", newval._id);
        this.connect(newval._id);
        if (process) {
          if (process.client) {
            //this.connect(newval._id);
          }
        } else {
          //this.connect(newval._id);
        }
      } else {
        if (this.socket) {
          this.socket.disconnect();
        }
      }
    },
  },
  mounted() {
    let id = this.$route.params.overview;

    if (id) {
      this.getcurrentclient(id);
      this.getusernotifications(id);
    } else {
      id = this.$route.query.user;
      this.getcurrentclient(id);
      this.getusernotifications(id);
      this.getuserloans(id);
      this.getuserinvestments(id);
      this.getusersavingsplans(id);
    }

    this.gettransfers();
    this.getloans();
    this.getinvestmentplans();
    this.getsavingsplans();
    //this.getnotifications();
  },
  methods: {
    togglesidenav() {
      this.sidenavopen ? (this.sidenavopen = false) : (this.sidenavopen = true);
    },
  },
};
</script>
