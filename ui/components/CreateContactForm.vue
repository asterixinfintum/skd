<
<template>
  <div>
    <div class="popup-overlay" @click.stop="close">
      <div class="popup createmessage">
        <div class="overview__transaction--header">
          <div class="overview__transaction--h2 header-label">Add a quick contact</div>
        </div>

        <div class="createmessage__form" @click.stop="open">
          <div class="input-area">
            <label class="smlabel tinylabel fontweight-5">Contact Name</label>
            <div class="input">
              <input placeholder="Choose a name" v-model="contactname" />
            </div>
          </div>

          <div class="input-area">
            <label class="smlabel tinylabel fontweight-5">Contact Account number</label>
            <div class="input">
              <input placeholder="Account number" v-model="contactaccountno" />
            </div>
          </div>

          <div class="input-area">
            <label class="smlabel tinylabel fontweight-5">Contact Bank</label>
            <div class="input">
              <input placeholder="Bank of account number" v-model="contactbank" />
            </div>
          </div>

          <div class="overview__withddep">
            <button
              class="button orange-btn-faint fontweight-3 half-flex-space"
              v-if="!allowsubmit"
            >
              Send Message
            </button>
            <button
              class="button orange-btn fontweight-3 half-flex-space"
              v-if="allowsubmit"
              @click="sumbitcontact"
            >
              Send Message
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
  data() {
    return {
      contactname: "",
      contactaccountno: "",
      contactbank: "",
    };
  },
  props: ["open", "close"],
  mixins: [global],
  computed: {
    allowsubmit() {
      const { contactname, contactaccountno, contactbank } = this;

      if (contactname.length && contactaccountno.length && contactbank.length) {
        return true;
      }

      return false;
    },
  },
  methods: {
    sumbitcontact() {
      const { contactname, contactaccountno, contactbank } = this;
      this.close();
      this.toggleverbiage(`creating contact`);
      this.onspinner();
      this.createcontact({ contactname, contactaccountno, contactbank })
        .then(() => {
          this.toggleverbiage(null);
          this.offspinner();
          this.setdonemsg(
            `Contact successfully created`
          );
          this.getcontacts()
        })
        .catch((error) => {});
    },
  },
};
</script>

<style lang="scss">
.createmessage {
  width: #{scaleValue(400)};

  @media only screen and (max-width: 768px) {
    width: #{scaleValue(1500)} !important;
  }

  &__form {
    width: 100%;
  }
}
</style>
