<template>
  <div>
    <div class="displaycard loan">
      <div class="displaycard__wrapper">
        <div class="displaycard__top">
          <figure class="displaycard__top--logo">
            <img src="@/assets/imgs/logo-nobackground.png" />
          </figure>
          <h2 class="displaycard__name loan">{{ name }}</h2>
          <span class="displaycard__interest orange"
            >Interest: {{ toPercentage(interestRate) }}</span
          >
        </div>
        <div class="displaycard__content">
          <div class="displaycard__base">
            <figure class="displaycard__base--figure">
              <span class="displaycard__base--itemlogo">
                <svg>
                  <use xlink:href="@/assets/imgs/sprite.svg#icon-banknote"></use>
                </svg>
              </span>
              <img src="@/assets/imgs/hdassets/guyinglasses.png" />

              <div class="displaycard__base--phototext">
                <label>Get up to</label>
                <span>${{ formatNumber(maximumamountallowed, 10) }}</span>
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
                Payment plan duration: 
              </div>
              <div class="displaycard__term--content darkerblue">
                <label class="displaycard__term--duration displaycard__minbalance--label">
                  {{ term.duration }}
                </label>
                <span class="displaycard__term--unit displaycard__minbalance--label">
                  {{ term.unit }}
                </span>
              </div>
            </div>

            <button
              class="displaycard__rightbase--btn"
              @click="
                setcurrent({
                  name,
                  requirements,
                  description,
                  _id,
                  maximumamountallowed,
                  minimumbalanceallowed,
                  interestRate,
                  term,
                })
              "
            >
              <span class="displaycard__rightbase--btnsvg">
                <svg>
                  <use xlink:href="@/assets/imgs/sprite.svg#icon-plus"></use>
                </svg>
              </span>
              <span>Apply for this loan</span>
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
    "maximumamountallowed",
    "interestRate",
    "minimumbalanceallowed",
    "setcurrent",
    "term"
  ],
  mixins: [global],
};
</script>
