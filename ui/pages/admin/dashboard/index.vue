<template>
  <div>
    <div class="dashboard overview">
      <AdminHeader />

      <div class="dashboard__search">
        <div class="dashboard__search--input">
          <input placeholder="Find a user" v-model="searchterm" />
        </div>
      </div>

      <div class="dashboard__content">
        <div class="dashboard__list--pagination">
          <span>Total Users: {{ totalUsers }}</span>
        </div>

        <div class="dashboard__list">
          <div class="dashboard__listitem dashboard__listitem--headerarea">
            <div class="dashboard__listitem--subject">
              <span>FULL NAME </span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>EMAIL</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>PHONENUMBER</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>ACCOUNT TYPE</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span> BALANCE </span>
            </div>
            <div class="dashboard__listitem--subject">
              <span> SAVINGS TOTAL </span>
            </div>
            <div class="dashboard__listitem--subject">
              <span> LOANS TOTAL </span>
            </div>
            <div class="dashboard__listitem--subject">
              <span> INVESTMENTS TOTAL </span>
            </div>
            <div class="dashboard__listitem--subject btns"></div>
          </div>
        </div>

        <div class="dashboard__list">
          <div
            class="dashboard__listitem dashboard__listitem--item"
            v-for="user in userslist"
            @click="toadminroute(`admin/dashboard/user/${user.details._id}`)"
          >
            <div class="dashboard__listitem--subject">
              <span>{{
                limitTextLength(`${user.details.firstname} ${user.details.lastname}`, 25)
              }}</span>
              <span
                class="onlineofflineindicator online"
                v-if="user.details.online === true"
              ></span
              ><span
                class="onlineofflineindicator offline"
                v-if="user.details.online === false"
              ></span>
            </div>
            <div class="dashboard__listitem--subject">
              <span v-if="user.details">{{ limitTextLength(user.details.email, 17) }}</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span v-if="user.details">{{ user.details.phonenumber }}</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span v-if="user.account">{{ user.account.type }}</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span v-if="user.account">${{ user.account.balance }}</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span v-if="user.account">${{ user.account.savingsaggregate }}</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span v-if="user.account">${{ user.account.loansaggregate }}</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span></span>
            </div>
            <div class="dashboard__listitem--subject btns">
              <span class="redtext" @click.stop="deleteuser(user.details._id)"
                >delete</span
              >
            </div>
          </div>
        </div>

        <div class="dashboard__list--pagination">
          <span>Items remaining: {{ remainingItems }}</span>
        </div>

        <div class="dashboard__list--pagination wrap">
          <span
            v-for="pageNumber in pageNumbers"
            :class="{ current: currentPage === pageNumber }"
            @click="getuserbatch(pageNumber)"
            class="paginator"
            >{{ pageNumber }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

import global from "@/mixins/global";

export default {
  mounted() {
    const { currentPage } = this;
    this.getusers({ currentPage, searchquery: this.searchterm });
  },
  computed: {
    ...mapState({
      totalUsers: (state) => state.admin.totalPages,
      remainingItems: (state) => state.admin.remainingItems,
      pageNumbers: (state) => state.admin.pageNumbers,
    }),
  },
  mixins: [global],
  methods: {
    deleteuser(id) {
      this.removeuser(id).then(this.getusers({ currentPage: this.currentPage, searchquery: this.searchterm }));
    },
    getuserbatch(batch) {
      this.currentPage = batch;
      this.getusers({ currentPage: this.currentPage, searchquery: this.searchterm });
    },
  },
  data() {
    return {
      searchterm: "",
      userslist: [],
      currentPage: 1,
    };
  },
  watch: {
    users(newval, oldval) {
      this.userslist = newval;
    },
    searchterm(newval, oldval) {
      this.currentPage = 1;
      this.getusers({ currentPage: this.currentPage, searchquery: newval });
      //const { users } = this;

      /*if (users.length) {
        const searchTerm = this.searchterm.trim().toLowerCase();
        const filtered = users.filter(
          (user) =>
            user.details.firstname.trim().toLowerCase().includes(searchTerm) ||
            user.details.lastname.trim().toLowerCase().includes(searchTerm) ||
            user.details.email.trim().toLowerCase().includes(searchTerm)
        );

        this.userslist = filtered;
      }*/
    },
  },
};
</script>