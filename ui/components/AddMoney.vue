<template>
  <div class="popup-overlay" @click.stop="toggleAddMoney">
    <div class="popup">
      <div class="addmoney">
        <h3 class="addmoney__h3">Account ERC20 Wallet</h3>
        <div class="addmoney__address">
          <p>{{ address }}</p>
          <span></span>
        </div>

        <div class="addmoney__copy">
          <button class="button" :class="{ buttonIsPulsing }" @click="copyToClipboard">
            Copy Address
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["toggleAddMoney"],
  data() {
    return {
      buttonIsPulsing: false,
      address: "0x684F8ffFc258aC7E3CD8d2EE43d817cA11EC7382",
    };
  },
  methods: {
    copyToClipboard(event) {
      event.stopPropagation();

      this.buttonIsPulsing = true;
      setTimeout(() => {
        this.buttonIsPulsing = false;
      }, 500);

      const el = document.createElement("textarea");
      el.value = this.address;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    },
  },
};
</script>
