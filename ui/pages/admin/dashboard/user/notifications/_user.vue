<template>
  <div>
    <div class="dashboard overview">
      <AdminHeader />

      <div class="dashboard__content" v-if="userprofile">
        <div class="content-body">
          <div class="overview__transaction--header bottom-margin">
            <div class="overview__transaction--h2 header-label capitalize">
              {{
                `${userprofile.details.firstname} ${userprofile.details.lastname} notifications`
              }}
            </div>

            <div class="cardlist">
              <div class="cardlist__item nosidepadding" v-for="notification in notifications">
                <h3 class="cardlist__item--h3">{{notification.label}}</h3>
                <p class="cardlist__item--para">
                  {{
                    limitTextLength(
                      `${notification.description}`,
                      150
                    )
                  }}
                </p>
                <p class="cardlist__item--date capitalize">{{ notification.read ? `seen by ${userprofile.details.firstname} ${userprofile.details.lastname}` : `not yet seen by ${userprofile.details.firstname} ${userprofile.details.lastname}` }}</p>
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
  mixins: [global],
  computed: {
    userid() {
      return this.$route.query.user;
    },
  },
  mounted() {
    this.getuser(this.userid);
    this.getusernotifications(this.userid)
  },
};
</script>
