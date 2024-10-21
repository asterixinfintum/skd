<template>
    <div class="landingoffers" id="landingoffers">
        <div class="landingoffers__section">
            <div class="landingoffers__sectionone landingoffers__sectioncontainer">
                <div class="landingoffers__sectionone--card">
                    <figure>
                        <img src="@/assets/imgs/Account_Snippet.jpg">
                    </figure>
                    <label class="">Apply for a full UK current account in 15 minutes</label>
                </div>
                <div class="landingoffers__sectionone--card">
                    <figure>
                        <img src="@/assets/imgs/Pots_Snippet.png">
                    </figure>
                    <label>
                        Organise your money however you like
                    </label>
                </div>
                <div class="landingoffers__sectionone--card">
                    <figure>
                        <img src="@/assets/imgs/Trends_Snippet.jpg">
                    </figure>
                    <label>See your money in a whole new light with Trends</label>
                </div>
            </div>

            <div class="landingoffers-centerbtn">
                <button class="button jumbotron-btn" @click="$router.push('/auth/signup')">Open a {{ sitename }} account</button>
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