<template>
  <div>
    <div class="displaycard savings">
      <div class="displaycard__wrapper">
        <div class="displaycard__top">
          <figure class="displaycard__top--logo">
            <img src="@/assets/imgs/logo-nobackground.png" />
          </figure>
          <h2 class="displaycard__name loan">{{ name }}</h2>
          <span class="displaycard__interest orange"
            >Compounding frequency: {{ toPercentage(compoundingfrequency) }}</span
          >
        </div>
        <div class="displaycard__content">
          <div class="displaycard__base">
            <figure class="displaycard__base--figure">
              <span class="displaycard__base--itemlogo">
                <svg>
                  <use xlink:href="@/assets/imgs/sprite.svg#icon-wallet"></use>
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
                >${{ formatNumber(minimumaccountbalance, 20) }}</span
              >
            </div>

            <div class="displaycard__minbalance displaycard__term">
              <div class="displaycard__term--header displaycard__minbalance--label">
                Compounding Duration:
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

            <div class="displaycard__minbalance displaycard__term">
              <div class="displaycard__term--header displaycard__minbalance--label">
                Savings deposit frequency:
              </div>
              <div class="displaycard__term--content darkerblue">
                <label class="displaycard__term--duration displaycard__minbalance--label">
                  {{ contributionplan.frequency }}
                </label>
                <span class="displaycard__term--unit displaycard__minbalance--label">
                  {{ contributionplan.frequencyunit }}
                </span>
              </div>
            </div>

            <button
              class="displaycard__rightbase--btn"
              @click="
                setcurrent({
                  name,
                  description,
                  requirements,
                  minimumaccountbalance,
                  minimumdeposit,
                  compoundingfrequency,
                  contributionplan,
                  term,
                  tax,
                  _id,
                })
              "
            >
              <span class="displaycard__rightbase--btnsvg">
                <svg>
                  <use xlink:href="@/assets/imgs/sprite.svg#icon-plus"></use>
                </svg>
              </span>
              <span>Start this savings plan</span>
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
    "description",
    "requirements",
    "minimumaccountbalance",
    "minimumdeposit",
    "compoundingfrequency",
    "contributionplan",
    "term",
    "_id",
    "tax",
    "setcurrent"
  ],
  mixins: [global],
};
</script>
