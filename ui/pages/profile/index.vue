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
          <div class="overview__transaction--h2 header-label">Profile Settings</div>
        </div>

        <div class="profile">
          <div class="padding-top-bottom"></div>

          <div class="overview__transaction--header">
            <div class="overview__transaction--h2 header-label-smaller">
              Account Information
            </div>
          </div>

          <div class="profile__area">
            <div class="profile__section">
              <label class="smlabel profile__section--label">Full name</label>
              <span class="normblack-two">Mike Label</span>
            </div>
            <div class="profile__section">
              <label class="smlabel profile__section--label">Gender</label>
              <span class="normblack-two">Male</span>
            </div>
            <div class="profile__section">
              <label class="smlabel profile__section--label">Date of birth</label>
              <span class="normblack-two">January 24, 1894</span>
            </div>
          </div>

          <div class="padding-top-bottom"></div>

          <div class="overview__transaction--header">
            <div class="overview__transaction--h2 header-label-smaller">
              Contact details
            </div>
          </div>

          <div class="profile__area">
            <div class="profile__section">
              <label class="smlabel profile__section--label">Email address</label>
              <span class="normblack-two">mikelabel@gmail.com</span>
            </div>
            <div class="profile__section">
              <label class="smlabel profile__section--label">Phone number</label>
              <span class="normblack-two">078345667</span>
            </div>
            <div class="profile__section">
              <label class="smlabel profile__section--label">Address</label>
              <span class="normblack-two">no 15 address at the place</span>
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
