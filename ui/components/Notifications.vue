<template>
  <div class="cardlist" :class="{ dropdown }">
    <div class="cardlist__body" v-if="dropdown">
      <div class="cardlist__item" v-for="notification in clientnotifs">
        <h3 class="cardlist__item--h3">{{ notification.label }}</h3>
        <p class="cardlist__item--para">
          {{
            limitTextLength(
              `${notification.description}`,
              150
            )
          }}
        </p>
        <p class="cardlist__item--date">{{ formatDate(notification.time) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import global from "@/mixins/global";

export default {
  props: ["dropdown", "items"],
  mixins: [global],
};
</script>

<style lang="scss"></style>
