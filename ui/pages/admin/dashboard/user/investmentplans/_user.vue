<template>
  <div>
    <div class="dashboard overview">
      <AdminHeader />

      <div class="dashboard__content" v-if="userprofile">
        <div class="content-body">
          <div class="overview__transaction--header bottom-margin">
            <div class="overview__transaction--h2 header-label capitalize">
              {{
                `${userprofile.details.firstname} ${userprofile.details.lastname} investments`
              }}
            </div>
          </div>

          <div class="cardlist">
            <div class="cardlist__item nosidepadding">
                
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
  mixins: [global],
  computed: {
    userid() {
      return this.$route.query.user;
    },
  },
  mounted() {
    this.getuser(this.userid);
    this.getusernotifications(this.userid);
  },
};
</script>
