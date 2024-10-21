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
        <div class="overview__transaction--header">
          <div class="overview__transaction--h2 header-label">
            Security (protect yourself from intruders)
          </div>
        </div>

        <div class="profile">
          <div class="padding-top-bottom"></div>

          <div class="overview__transaction--header">
            <div class="overview__transaction--h2 header-label-smaller">
              Login details
            </div>
          </div>

          <div class="profile__area">
            <div class="profile__section">
              <label class="smlabel profile__section--label">Current password</label>
              <span class="normblack-two">********</span>
            </div>
            <div class="profile__section">
              <label class="smlabel profile__section--label">Security question</label>
              <span class="normblack-two">Male</span>
            </div>
          </div>

          <div class="padding-top-bottom"></div>

          <div class="overview__transaction--header">
            <div class="overview__transaction--h2 header-label-smaller">
              Security tethers
            </div>
          </div>

          <div class="profile__area">
            <div class="profile__section">
              <label class="smlabel profile__section--label">Session</label>
              <span class="normblack-two">mikelabel@gmail.com</span>
            </div>
            <div class="profile__section">
              <label class="smlabel profile__section--label">Transaction pin</label>
              <span class="normblack-two">***********</span>
            </div>
          </div>

          <div class="overview__withddep">
            <button class="button orange-btn fontweight-3 half-flex-space">Update</button>
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
