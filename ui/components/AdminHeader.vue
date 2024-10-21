<template>
  <div>
    <div class="dashboard__header userheader">
      <div class="userheader__logoarea">
        <figure>
          <img src="@/assets/imgs/logo.png" />
        </figure>
      </div>

      <div class="userheader__menu">
        <div class="userheader__menuitem" @click="toadminroute('admin/dashboard/')">
          <span>
            <svg class="feature__icon">
              <use xlink:href="@/assets/imgs/sprite.svg#icon-user"></use>
            </svg>
          </span>
          <label>Users</label>
        </div>

        <div class="userheader__menuitem">
          <span>
            <svg class="feature__icon">
              <use xlink:href="@/assets/imgs/sprite.svg#icon-hotairballoon"></use>
            </svg>
          </span>
          <label>General Notifications</label>
        </div>

        <div class="userheader__menuitem" @click="toadminroute('admin/dashboard/loans')">
          <span>
            <svg class="feature__icon">
              <use xlink:href="@/assets/imgs/sprite.svg#icon-pig"></use>
            </svg>
          </span>
          <label>Loans</label>
        </div>

        <div
          class="userheader__menuitem"
          @click="toadminroute('admin/dashboard/investmentplans')"
        >
          <span>
            <svg class="feature__icon">
              <use xlink:href="@/assets/imgs/sprite.svg#icon-tree"></use>
            </svg>
          </span>
          <label>Investment Plans</label>
        </div>

        <div
          class="userheader__menuitem"
          @click="toadminroute('admin/dashboard/savingsplans')"
        >
          <span>
            <svg class="feature__icon">
              <use xlink:href="@/assets/imgs/sprite.svg#icon-wallet"></use>
            </svg>
          </span>
          <label>Savings Plans</label>
        </div>

        <div class="userheader__menuitem">
          <span>
            <svg class="feature__icon">
              <use xlink:href="@/assets/imgs/sprite.svg#icon-gift"></use>
            </svg>
          </span>
          <label>Messages</label>
        </div>
        <div class="userheader__menuitem" @click="triggerlogout">
          <span>
            <svg class="feature__icon">
              <use xlink:href="@/assets/imgs/sprite.svg#icon-key"></use>
            </svg>
          </span>
          <label>Logout</label>
        </div>
      </div>

      <div></div>
    </div>
  </div>
</template>

<script>
import global from "@/mixins/global";

export default {
  mixins: [global],
  watch: {
    socket(newval, oldval) {
      if (newval) {
        this.socket.on("useractivity", () => {
          
        });
      }
    },
  },
  mounted() {
    let id = this.$route.query.admin;

    this.getcurrentadmin(id);

   // this.getusers();
    //this.getloans();
    //this.getinvestmentplans();
    //this.getsavingsplans();
    //this.getnotifications();

    //this.connect();
  },
};
</script>
