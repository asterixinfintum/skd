<template>
  <div
    class="bubble"
    :class="{
      receiver: role === 'receiver',
      sender: role === 'sender',
    }"
  >
    <div
      class="bubble__body bubble__sender"
      :class="{ bubble__receiver: role === 'receiver' }"
    >
      <div class="bubble__body--content">
        {{ content }}
      </div>
      <div class="bubble__body--time">
        <span></span>
        <span>{{ time }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["role", "content", "time"], //role being sender or receiver
  methods: {},
};
</script>

<style lang="scss" scoped>
.bubble {
  color: $font-black;
  margin-bottom: #{scaleValue(20)};
  color: $font-white;
  line-height: #{scaleValue(20)};
  font-size: #{scaleValue(15)};

  @media only screen and (max-width: 414px) {
    font-size: #{scaleValue(70)};
    line-height: #{scaleValue(90)};
  }

  &.receiver {
    padding-left: #{scaleValue(150)};
    transform: translateX(#{scaleValue(-55)});
  }

  &.sender {
    padding-right: #{scaleValue(150)};
  }

  &__body {
    border-radius: 0.5rem;
    padding: #{scaleValue(20)} #{scaleValue(10)};
    padding-bottom: #{scaleValue(10)};

    width: #{scaleValue(195)};
    overflow: hidden;
    text-overflow: clip;

    &--content {
      width: 100%;
      word-wrap: break-word;
      word-break: break-word;
      white-space: normal;
    }

    @media only screen and (max-width: 414px) {
      padding: #{scaleValue(30)} #{scaleValue(100)};
      border-radius: 1.5rem;
      width: #{scaleValue(1200)};
    }

    &--time {
      display: flex;
      justify-content: space-between;
      font-size: #{scaleValue(10)};
      opacity: 0.5;

      @media only screen and (max-width: 414px) {
        font-size: #{scaleValue(40)};
      }
    }
  }

  &__sender {
    background: $darker-blue;
  }

  &__receiver {
    background: $button-blue;
  }
}
</style>
