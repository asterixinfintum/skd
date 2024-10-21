<template>
  <div>
    <div class="overview" @click="closedrops">
      <UserHeader
        :notifsbodstate="opennotificationsbody"
        :opennotifsbod="opennotifications"
        :openprofilebod="openprofiledrop"
        :profilebod="profilebody"
      />

      <div class="overview__content white-background content-body">
        <div class="padding-top-bottom"></div>
        <div class="overview__transaction--header">
          <div class="overview__transaction--h2 header-label">Your savings plans</div>
        </div>

        <div class="padding-top-bottom"></div>

        <div class="flex-reverse-column relativeposition halfscreen-width-2">
          <div
            v-for="{ usersaving, savingsplanname } in usersavingsplans"
          >

            <div v-if="usersaving.target && usersaving.nameofsavingsplan">
              <UserSavings 
                :amount="usersaving.amount"
                :target="usersaving.target"
                :nameofsavingsplan="usersaving.nameofsavingsplan"
                :savingsplanname="savingsplanname"
                :bonus="usersaving.bonus"
                :message="usersaving.message"
                :status="usersaving.status"
                :id="usersaving._id"/>
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
};
</script>
