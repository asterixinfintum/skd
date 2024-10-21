<template>
  <div>
    <div class="jumbotron">
      <div class="jumbotron__strand">
        <img alt="a decorative background with strands of white and purple as the hero image background" fetchpriority="high" width="1440" height="1206" decoding="async" data-nimg="1" class="absolute top-0 -z-[1] w-full opacity-45" style="color:transparent" src="@/assets/imgs/strands.b6644516.svg">
      </div>
      <div class="jumbotron__strand map">
        <img alt="a decorative background with strands of white and purple as the hero image background" fetchpriority="high" width="1440" height="1206" decoding="async" data-nimg="1" class="absolute top-0 -z-[1] w-full opacity-45" style="color:transparent" src="@/assets/imgs/world-map.svg">
      </div>
      <div class="jumbotron__left">
        <h1 class="jumbotron__left--h1 flex-column">
          <span>Simple Banking</span>
          <span>fast</span>
        </h1>

        <h2 class="jumbotron__left--h2 flex-column">
          <span>Spend, save and manage your money, all in one place. Open</span>
          <span>a full UK bank account from your phone, for free.</span>
        </h2>

        <div class="flex-default">
          <button class="button jumbotron-btn" @click="$router.push('/auth/signup')">
            Open a {{ sitename }} account
          </button>

          <button class="button jumbotron-mobile transparent margin-left-thirty orange" @click="$router.push('/auth/signin')">Login</button>
        </div>
      </div>
      <div class="jumbotron__right">
        
      </div>
    </div>
  </div>
</template>

<script>
import sitename from "@/mixins/sitename";

export default {
  mixins: [sitename]
}
</script>
