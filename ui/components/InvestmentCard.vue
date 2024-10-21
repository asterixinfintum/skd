<template>
  <div>
    <div class="displaycard investment">
      <div class="displaycard__wrapper">
        <div class="displaycard__top">
          <figure class="displaycard__top--logo">
            <img src="@/assets/imgs/logo-nobackground.png" />
          </figure>
          <h2 class="displaycard__name loan">{{ name }}</h2>
          <span class="displaycard__interest orange"
            >Return rate: {{ toPercentage(returnpercentage) }}</span
          >
        </div>
        <div class="displaycard__content">
          <div class="displaycard__base">
            <figure class="displaycard__base--figure">
              <span class="displaycard__base--itemlogo">
                <svg>
                  <use xlink:href="@/assets/imgs/sprite.svg#icon-tree"></use>
                </svg>
              </span>
              <img src="@/assets/imgs/hdassets/guyinglasses.png" />

              <div class="displaycard__base--phototext">
                <label>Minimum deposit</label>
                <span>${{ formatNumber(minimumdeposit, 10) }}</span>
              </div>
            </figure>
          </div>

          <div class="displaycard__rightbase">
            <p class="displaycard__rightbase--p">
              {{ description }}
            </p>

            <div class="displaycard__minbalance">
              <label class="displaycard__minbalance--label"
                >Minimum balance required:</label
              >
              <span class="displaycard__minbalance--balance darkerblue"
                >${{ formatNumber(minimumbalanceallowed, 20) }}</span
              >
            </div>

            <div class="displaycard__minbalance displaycard__term">
              <div class="displaycard__term--header displaycard__minbalance--label">
                Growth Period:
              </div>
              <div class="displaycard__term--content darkerblue">
                <label class="displaycard__term--duration displaycard__minbalance--label">
                  {{ durationofinvestment.duration }}
                </label>
                <span class="displaycard__term--unit displaycard__minbalance--label">
                  {{ durationofinvestment.unit }}
                </span>
              </div>
            </div>

            <button
              class="displaycard__rightbase--btn"
              @click="
                setcurrent({
                  name,
                  description,
                  _id,
                  minimumbalanceallowed,
                  minimumdeposit,
                  requirements,
                  returnpercentage,
                  durationofinvestment,
                })
              "
            >
              <span class="displaycard__rightbase--btnsvg">
                <svg>
                  <use xlink:href="@/assets/imgs/sprite.svg#icon-plus"></use>
                </svg>
              </span>
              <span>Apply for this Investment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import global from "@/mixins/global";

export default {
  props: [
    "name",
    "requirements",
    "_id",
    "description",
    "minimumbalanceallowed",
    "setcurrent",
    "minimumdeposit",
    "returnpercentage",
    "durationofinvestment",
  ],
  mixins: [global],
};
</script>
