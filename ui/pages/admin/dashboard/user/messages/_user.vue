<template>
  <div>
    <div class="dashboard overview">
      <AdminHeader />

      <div class="dashboard__content" v-if="userprofile">
        <div class="content-body">
          <div class="overview__transaction--header bottom-margin">
            <div class="overview__transaction--h2 header-label capitalize">
              {{
                `${userprofile.details.firstname} ${userprofile.details.lastname} messages`
              }}
            </div>

            <div class="cardlist">
              <div class="cardlist__item nosidepadding" v-for="usermsg in usermsgs">
                <h3 class="cardlist__item--h3">{{ usermsg.label }}</h3>
                <p class="cardlist__item--para">
                  {{
                    limitTextLength(
                      `${usermsg.content}`,
                      150
                    )
                  }}
                </p>
                <p class="cardlist__item--date capitalize">{{ usermsg.adminmsg ? 'by admin' : `by ${userprofile.details.firstname} ${userprofile.details.lastname}`  }}</p>
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
    this.getuser(this.userid, 'hello');
    console.log(this.userid);
    this.getusermsgs(this.userid);
  },
};
</script>
