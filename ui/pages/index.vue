<template>
  <div>
    <div class="landing">
      <Header />
      <Announcement />
      <Jumbotron />
      <LandingJoin />
      <LandingOffers />
      <div class="curvedoffer" id="save">
        <div class="curvedoffer__body one">
          <div class="curvedoffer__image">
            <figure class="curvedoffer__image--fig">
              <img src="@/assets/imgs/Save.webp" />
            </figure>
          </div>
          <div class="curvedoffer__copy">
            <h3 class="curvedoffer__copy--h3">Save</h3>
            <div class="curvedoffer__copy--content">
              <p>
                Earn up to 5.60% (AER/Gross fixed) interest on your savings. That’s on a
                12-month Fixed Pot with a £500 minimum deposit to open. (Fixed means the
                money will be locked away for 12 months while you earn interest on it.)
              </p>

              <p>
                We offer Easy Access Savings too, which let you get your money the next
                working day!
              </p>
            </div>
            <div class="curvedoffer__copy--btn">
              <!-- <button class="button">Saving with {{ sitename }}</button>-->
            </div>
          </div>
        </div>
      </div>
      <div class="curvedoffer">
        <div class="curvedoffer__body transparent reverseflex">
          <div class="curvedoffer__image">
            <figure class="curvedoffer__image--fig">
              <img src="@/assets/imgs/Spend.jpg" />
            </figure>
          </div>
          <div class="curvedoffer__copy">
            <h3 class="curvedoffer__copy--h3">Spend</h3>
            <div class="curvedoffer__copy--content">
              <p>
                Get instant notifications the second you pay. Set budgets for things like
                groceries and going out, and get warnings if you’re spending too fast (if
                you want them).
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="curvedoffer">
        <div class="curvedoffer__body three">
          <div class="curvedoffer__image">
            <figure class="curvedoffer__image--fig">
              <img src="@/assets/imgs/Manage.jpg" />
            </figure>
          </div>
          <div class="curvedoffer__copy">
            <h3 class="curvedoffer__copy--h3">Manage</h3>
            <div class="curvedoffer__copy--content">
              <p>
                Pay Direct Debits through {{ sitename }} and we’ll tell you if they’re
                higher for the upcoming month. So no nasty surprises..
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="curvedoffer">
        <div class="curvedoffer__body reverseflex four top-margin">
          <div class="curvedoffer__image translateup">
            <figure class="curvedoffer__image--fig">
              <img src="@/assets/imgs/Save.webp" />
            </figure>
          </div>
          <div class="curvedoffer__copy">
            <h3 class="curvedoffer__copy--h3">Online banking that makes a statement</h3>
            <div class="curvedoffer__copy--content">
              <p>
                Turn heads with our white metal card, made from steel. Enjoy peace of mind
                with phone and travel insurance, interest and much more.
              </p>

              <p>
                {{ sitename }} Premium is £15 per month • 6 month minimum • Must be aged
                18-69 • Ts&Cs apply
              </p>
            </div>
            <div class="curvedoffer__copy--btn">
              <!--<button class="button">Explore {{ sitename }} Premium</button>-->
            </div>
          </div>
        </div>
      </div>
      <div class="curvedoffer">
        <div class="curvedoffer__body five top-margin">
          <div class="curvedoffer__image translateup">
            <figure class="curvedoffer__image--fig">
              <img src="@/assets/imgs/Plus.jpg" />
            </figure>
          </div>
          <div class="curvedoffer__copy">
            <h3 class="curvedoffer__copy--h3">Put money in your hands</h3>
            <div class="curvedoffer__copy--content">
              <p>
                Full financial visibility, with your other bank accounts and credit cards
                all in one place. Get interest on your money, personalised budgeting and
                much more.
              </p>

              <p>
                {{ sitename }} Plus is £5 per month • 3 month minimum • Must be aged 18+ •
                Ts&Cs apply
              </p>
            </div>
            <div class="curvedoffer__copy--btn">
              <!--<button class="button">Explore {{ sitename }} Plus</button>-->
            </div>
          </div>
        </div>
      </div>
      <div class="curvedoffer">
        <div class="curvedoffer__body reverseflex transparent top-margin">
          <div class="curvedoffer__image">
            <figure class="curvedoffer__image--fig">
              <img src="@/assets/imgs/Travelling.webp" />
            </figure>
          </div>
          <div class="curvedoffer__copy">
            <h3 class="curvedoffer__copy--h3">Using {{ sitename }} abroad</h3>
            <div class="curvedoffer__copy--content">
              <p>
                Use {{ sitename }} anywhere in the world that accepts Mastercard. We don't
                charge any fees for paying abroad and we pass Mastercard's exchange
                ratedirectly onto you, without sneaky fees or extra charges.
              </p>
            </div>
            <div class="curvedoffer__copy--btn">
              <!-- <button class="button">Travelling with {{ sitename }}</button>-->
            </div>
          </div>
        </div>
      </div>

      <div class="curvedoffer" id="investments">
        <div class="curvedoffer__body six top-margin">
          <div class="curvedoffer__image">
            <figure class="curvedoffer__image--fig">
              <img src="@/assets/imgs/Credit.jpg" />
            </figure>
          </div>
          <div class="curvedoffer__copy">
            <h3 class="curvedoffer__copy--h3 white-color">
              Credit with a dash of {{ sitename }} magic
            </h3>

            <div class="curvedoffer__copy--content">
              <p class="white-color">
                Use {{ sitename }} Flex to get more time to pay for pretty much anything.
                It’s 0% interest when you pay in full on your next payment date or in 3
                monthly payments. For more wiggle room it’s 29% APR representative
                (variable) when you pay in 6 or 12 monthly payments.
              </p>
            </div>

            <div class="curvedoffer__copy--btn">
              <!--<button class="button">Explore {{ sitename }} Flex</button>-->
            </div>

            <div class="curvedoffer__copy--content">
              <p class="top-margin white-color">
                Representative example: 29% APR representative (variable), with an assumed
                credit limit of £1,200 and an annual interest rate of 29% (variable).
              </p>

              <p class="white-color">
                Eligibility criteria and Ts&Cs apply. 18+ year olds only. Missed payments
                can negatively impact credit scores and you may lose the interest-free
                rate on existing plans.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="curvedoffer">
        <div class="curvedoffer__body reverseflex transparent top-margin">
          <div class="curvedoffer__image">
            <figure class="curvedoffer__image--fig">
              <img src="@/assets/imgs/Borrowing.avif" />
            </figure>
          </div>
          <div class="curvedoffer__copy" id="loans">
            <h3 class="curvedoffer__copy--h3">Loans and Overdrafts</h3>

            <div class="curvedoffer__copy--content">
              <p>
                We offer overdrafts up to £2,000 and loans up to £25,000. Checking if
                you're eligible won't leave a mark on your credit score, there are no
                lengthy forms to fill in, and no charges for paying us back early.
              </p>
            </div>

            <div class="curvedoffer__copy--btn">
              <!--<button class="button">Borrowing with {{ sitename }}</button>-->
            </div>

            <div class="curvedoffer__copy--content">
              <p class="top-margin">
                Our representative APR is 14.8% for loans more than £10,000, up to
                £25,000. For loans up to £10,000 it's 27.9%.
              </p>

              <p>
                How does our overdraft compare? Our representative APR is 39.0%. You can
                use the APR to compare the cost of different credit products.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="curvedoffer">
        <div class="curvedoffer__body three top-margin">
          <div class="curvedoffer__image">
            <figure class="curvedoffer__image--fig">
              <img src="@/assets/imgs/fraud-lock-icons.png" />
            </figure>
          </div>
          <div class="curvedoffer__copy">
            <h3 class="curvedoffer__copy--h3">Protect yourself from fraud</h3>
            <div class="curvedoffer__copy--content">
              <p>
                Don’t make payments or share your data if something seems unusual or
                unexpected - stop and challenge.
              </p>
              <p>
                Take a look at some common scams and learn how they work so you can keep
                your money safe. Fraudsters are clever and use sophisticated tactics, so
                knowing what to look out for can help stop them.
              </p>

              <div class="curvedoffer__copy--btn">
                <!--<button class="button">Protect yourself from fraud</button>-->
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="curvedoffer">
        <div class="curvedoffer__body reverseflex six top-margin">
          <div class="curvedoffer__image">
            <figure class="curvedoffer__image--fig">
              <img src="@/assets/imgs/illus_safe@2x.png" />
            </figure>
          </div>
          <div class="curvedoffer__copy">
            <h3 class="curvedoffer__copy--h3 white-color">Keep your money safe</h3>
            <div class="curvedoffer__copy--content">
              <p class="white-color">
                Cutting-edge technology, FSCS protection and 24/7 support if you need us
                urgently. Just a few of the reasons over 8 million customers trust us to
                keep their money safe.
              </p>

              <div class="curvedoffer__copy--btn">
                <button class="button" @click="$router.push('/auth/signup')">
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="curvedoffer">
        <div class="curvedoffer__body top-margin">
          <div class="curvedoffer__copy no-flex">
            <label class="curvedoffer__copy--label">Published September 2023</label>
            <h3 class="curvedoffer__copy--h3">
              Independent service quality survey results
            </h3>
            <h4 class="curvedoffer__copy--h4">Personal current accounts</h4>
            <div class="curvedoffer__copy--content">
              <p class="">
                As part of a regulatory requirement, independent surveys were conducted to
                ask customers of the largest personal current account providers in Great
                Britain and Northern Ireland if they would recommend their provider to
                friends and family. The results represent the view of customers who took
                part in the survey.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="curvedoffer" id="partners">
        <div class="curvedoffer__body six top-margin">
          <div class="curvedoffer__brands">
            <div class="curvedoffer__copy no-flex">
              <h3 class="curvedoffer__copy--h3 fontweight-4 white">
                Brands and companies we cooporate with
              </h3>
            </div>

            <div class="curvedoffer__brandsgrid">
              <figure class="curvedoffer__brand">
                <svg
                  width="224"
                  height="24"
                  viewBox="0 0 224 24"
                  fill="none"
                  class="Header__BlockchainLogo-ra9ecu-9 TdBAR"
                >
                  <g clip-path="url(#a)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M139.92 3.879a2.028 2.028 0 0 1 1.163-1.954 2.026 2.026 0 1 1 .862 3.859 1.968 1.968 0 0 1-1.853-1.158 1.969 1.969 0 0 1-.172-.747zm.15 3.645h3.735v13.5h-3.735v-13.5zm-99.87-4.5H33v18h7.71c4.035 0 6.195-2.115 6.195-4.98a4.17 4.17 0 0 0-3.96-4.365v-.18a3.84 3.84 0 0 0 3.255-3.87c0-2.685-2.025-4.605-6-4.605zm2.145 5.22c0 1.425-1.215 2.28-2.715 2.28l-2.88.045v-4.5h2.94c1.695 0 2.655.75 2.655 2.175zm.555 7.395c0 1.35-.87 2.235-3 2.235h-3.15v-4.77h3.15a2.626 2.626 0 0 1 3 2.535zm5.85 5.385h3.795l-.06-18H48.75v18zm5.76-6.705c0-4.185 2.55-6.975 6.645-6.975s6.645 2.79 6.645 6.975-2.55 6.96-6.645 6.96-6.645-2.79-6.645-6.96zm9.48-.008c-.002-2.35-.977-4.087-2.82-4.087-1.845 0-2.865 1.74-2.865 4.095 0 2.355.975 4.08 2.865 4.08 1.888 0 2.818-1.736 2.82-4.088zm11.85-6.967c-4.095 0-6.63 2.835-6.63 6.975 0 4.11 2.49 6.96 6.63 6.96 3.555 0 5.82-2.1 6-5.205H78.3a2.4 2.4 0 0 1-2.445 2.25c-1.755 0-2.88-1.545-2.88-4.05s1.14-4.005 2.88-4.005a2.4 2.4 0 0 1 2.445 2.25h3.54c-.12-3.12-2.475-5.175-6-5.175zm7.965-4.32h3.75v9.615h.195l4.335-5.115h4.29l-5.01 5.85 5.265 7.65h-4.38l-3.69-5.445-1.005 1.155v4.29h-3.75v-18zm19.44 4.32c-4.095 0-6.63 2.835-6.63 6.975 0 4.11 2.49 6.96 6.66 6.96 3.57 0 5.82-2.1 6-5.205h-3.525a2.414 2.414 0 0 1-2.46 2.25c-1.755 0-2.88-1.545-2.88-4.05s1.14-4.005 2.88-4.005a2.417 2.417 0 0 1 2.46 2.25h3.495c-.105-3.12-2.475-5.175-6-5.175zm11.715 13.68h-3.735v-18h3.63v6.885h.165a3.985 3.985 0 0 1 4.035-2.565c2.805 0 4.665 1.92 4.665 5.085v8.595h-3.75v-7.935a2.299 2.299 0 0 0-.577-1.882 2.292 2.292 0 0 0-1.823-.743 2.523 2.523 0 0 0-2.485 1.7 2.51 2.51 0 0 0-.125 1.06v7.8zm15.66-7.935c-2.67.255-5.07 1.17-5.07 4.17 0 2.67 1.905 4.02 4.485 4.02a4.141 4.141 0 0 0 3.945-2.13h.105v1.875h3.555v-9.12c0-3.225-2.73-4.575-5.73-4.575-3.24 0-5.355 1.545-5.88 4.005l3.465.285a2.25 2.25 0 0 1 2.4-1.5c1.275 0 1.995.645 1.995 1.755 0 .885-.915.99-3.27 1.215zm3.3 1.605v1.5a2.599 2.599 0 0 1-.891 1.805 2.591 2.591 0 0 1-1.914.625c-1.155 0-1.98-.525-1.98-1.575 0-1.05.87-1.575 2.19-1.755a9.189 9.189 0 0 0 2.595-.6zm12.33 6.33h3.81l-.06-7.8a2.473 2.473 0 0 1 2.55-2.76 2.31 2.31 0 0 1 2.4 2.625v7.935h3.75v-8.595c0-3.15-1.845-5.085-4.665-5.085a4.112 4.112 0 0 0-4.065 2.565h-.15V7.524h-3.57v13.5z"
                      fill="currentColor"
                    ></path>
                    <path
                      opacity=".6"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M199.95 7.524h-3.57l-.015 13.5h3.75v-8.1a2.268 2.268 0 0 1 1.292-2.276 2.26 2.26 0 0 1 .898-.214 1.977 1.977 0 0 1 1.959 1.339c.091.268.124.554.096.836v8.415h3.63v-8.25a2.114 2.114 0 0 1 2.175-2.34 2.01 2.01 0 0 1 2.085 2.25v8.34H216v-9a4.366 4.366 0 0 0-8.25-2.115h-.21a3.57 3.57 0 0 0-3.675-2.565 3.778 3.778 0 0 0-3.75 2.565h-.165V7.524zm-26.25-.18c-4.095 0-6.615 2.835-6.615 6.975 0 4.11 2.475 6.96 6.69 6.96 3.57 0 5.835-2.1 6-5.205h-3.525a2.414 2.414 0 0 1-2.46 2.25c-1.74 0-2.88-1.545-2.88-4.05s1.14-4.005 2.88-4.005a2.417 2.417 0 0 1 2.46 2.25h3.45c-.105-3.12-2.475-5.175-6-5.175zm-11.83 10.315a2.102 2.102 0 0 0 1.48 3.59 2.1 2.1 0 1 0-1.48-3.59zm19.27-3.34c0-4.185 2.55-6.975 6.645-6.975s6.63 2.79 6.63 6.975-2.535 6.96-6.63 6.96-6.645-2.79-6.645-6.96zm9.48-.007c-.002-2.352-.977-4.088-2.82-4.088-1.845 0-2.865 1.74-2.865 4.095 0 2.355.975 4.08 2.865 4.08 1.888 0 2.818-1.736 2.82-4.087z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M2.054 8.722.959 9.817a3.12 3.12 0 0 0 0 4.5l8.821 8.909c.21.214.452.391.72.525V12.952l-8.446-4.23z"
                      fill="#3D89F5"
                    ></path>
                    <path
                      d="m21.947 8.722 1.095 1.095a3.12 3.12 0 0 1 0 4.5l-8.822 8.909c-.21.214-.452.391-.72.525V12.952l8.447-4.23z"
                      fill="#1656B9"
                    ></path>
                    <path
                      d="M19.828 6.487 14.308.952a3.134 3.134 0 0 0-4.5 0L4.273 6.487l7.755 3.87 7.8-3.87z"
                      fill="#85B5F8"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="a">
                      <path fill="#fff" d="M0 0h216v24H0z"></path>
                    </clipPath>
                  </defs>
                </svg>
              </figure>

              <figure class="curvedoffer__brand">
                <img src="@/assets/imgs/Binance-Vertical-Logo.wine.svg" />
              </figure>

              <figure class="curvedoffer__brand">
                <img src="@/assets/imgs/trust-wallet-seeklogo.com.svg" />
              </figure>

              <figure class="curvedoffer__brand">
                <img src="@/assets/imgs/okx-seeklogo.com.svg" />
              </figure>

              <figure class="curvedoffer__brand">
                <img src="@/assets/imgs/bybit-seeklogo.com.svg" />
              </figure>

              <figure class="curvedoffer__brand">
                <img src="@/assets/imgs/krakenlogo.png" />
              </figure>

              <figure class="curvedoffer__brand">
                <img src="@/assets/imgs/coinbase.png" />
              </figure>

              <figure class="curvedoffer__brand">
                <img src="@/assets/imgs/metamask.png" />
              </figure>
            </div>
          </div>
        </div>
      </div>

      <!--<div class="curvedoffer" id="reviews">
        <div class="curvedoffer__body top-margin">
          <div class="curvedoffer__reviews">
            <div class="curvedoffer__copy no-flex">
              <h3 class="curvedoffer__copy--h3 fontweight-4">
                What people say about are saying about us
              </h3>
            </div>
           <div class="curvedoffer__reviewsgrid">
              <figure>
                <img src="@/assets/imgs/mungreview/reviewone.png" />
              </figure>

              <figure>
                <img src="@/assets/imgs/mungreview/reviewtwo.png" />
              </figure>

              <figure>
                <img src="@/assets/imgs/mungreview/reviewthree.png" />
              </figure>

              <figure>
                <img src="@/assets/imgs/mungreview/reviewfour.png" />
              </figure>

              <figure>
                <img src="@/assets/imgs/mungreview/reviewfive.png" />
              </figure>
              <figure>
                <img src="@/assets/imgs/mungreview/reviewsix.png" />
              </figure>
            </div>

            <!--<div class="curvedoffer__reviewsgrid">
              <figure>
                <img src="@/assets/imgs/dominreview/Screenshot (2).png" />
              </figure>

              <figure>
                <img src="@/assets/imgs/dominreview/Screenshot (3).png" />
              </figure>

              <figure>
                <img src="@/assets/imgs/dominreview/Screenshot (4).png" />
              </figure>

              <figure>
                <img src="@/assets/imgs/dominreview/Screenshot (5).png" />
              </figure>

              <figure>
                <img src="@/assets/imgs/dominreview/Screenshot (6).png" />
              </figure>
              <figure>
                <img src="@/assets/imgs/dominreview/Screenshot (7).png" />
              </figure>
            </div>
          </div>
        </div>
      </div>-->

      <!--<div class="curvedoffer">
        <div class="curvedoffer__body">
          <div class="curvedoffer__quality">
            <h3 class="curvedoffer__copy--h3">Great Britain</h3>
            <figure>
              <img src="@/assets/imgs/overall-service-quality (1).jpg" />
            </figure>
          </div>
          <div class="curvedoffer__quality">
            <h3 class="curvedoffer__copy--h3">Northern Ireland</h3>
            <figure>
              <img src="@/assets/imgs/overall-service-quality.jpg" />
            </figure>
          </div>
        </div>
      </div>-->

      <footer class="footer">
        <!-- <div class="footer__header">
          <h4>{{ sitename }}</h4>
        </div>
        <div class="footer__top">
          <div class="footer__links">
            <div class="footer__links--link">
              <NuxtLink to="/"> About us </NuxtLink>
            </div>
            <div class="footer__links--link">
              <NuxtLink to="/"> About us </NuxtLink>
            </div>
            <div class="footer__links--link">
              <NuxtLink to="/"> About us </NuxtLink>
            </div>
            <div class="footer__links--link">
              <NuxtLink to="/"> About us </NuxtLink>
            </div>
          </div>
          <div class="footer__links">
            <div class="footer__links--link">
              <NuxtLink to="/"> Terms & Conditions </NuxtLink>
            </div>
            <div class="footer__links--link">
              <NuxtLink to="/"> FAQ </NuxtLink>
            </div>
            <div class="footer__links--link">
              <NuxtLink to="/"> Privacy Notice </NuxtLink>
            </div>
            <div class="footer__links--link">
              <NuxtLink to="/"> Cookie Notice </NuxtLink>
            </div>
          </div>
        </div>-->
        <div class="footer__bottom">
          <h3 class="footer__bottom--h3">Existing customers can get help via the app</h3>
          <p class="footer__bottom--p">
            {{ sitename }} Bank Limited is a company registered in England and Wales
            (No.09446231). {{ sitename }} Bank Limited is authorised by the Prudential
            Regulation Authority and regulated by the Financial Conduct Authority and the
            Prudential Regulation Authority. Our financial Services Register number is
            730427. Our address is Broadwalk House, 5 Appold St, London EC2A 2AG.
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import sitenamemixin from "@/mixins/sitename";

export default {
  mixins: [sitenamemixin]
};
</script>
