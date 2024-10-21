<template>
  <div class="empty">
    <div>
        <p>You have no {{ item }} to show at the moment...</p>
    </div>
  </div>
</template>

<script>
export default {
    props: ['item']
};
</script>

<style lang="scss">
.empty {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: #{scaleValue(80)};
    color: $darker-blue;

    @media only screen and (max-width: 768px) {
      margin-top: #{scaleValue(300)};
    }

    & p {
      padding: #{scaleValue(16)};
      border-radius: #{scaleValue(3)};
      background: rgba($darker-blue, .1);
      font-size: #{scaleValue(14)};
      font-weight: 500;
      border: 1px solid rgba($primary-orange, .3);

      @media only screen and (max-width: 768px) {
        font-size: #{scaleValue(60)};
      }
    }
}
</style>
