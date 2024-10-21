<template>
  <div>
    <div class="overview" @click="closedrops">
      <UserHeader
        :notifsbodstate="opennotificationsbody"
        :opennotifsbod="opennotifications"
        :openprofilebod="openprofiledrop"
        :profilebod="profilebody"
      />
      <div class="overview__content white-background content-body">
        <div class="overview__transaction--header">
          <div class="overview__transaction--h2 header-label">Transactions</div>
        </div>

        <TransactionsSub />

        <div class="overview__transaction--list">
          <div class="overview__transaction--list-header transactions-page header-area">
            <label class="smlabel">Subject</label>
            <label class="smlabel">Date</label>
            <label class="smlabel">Status</label>
            <label class="smlabel">Destination</label>
            <label class="smlabel">Amount</label>
          </div>

          <div
            class="overview__transaction--list-item transactions-page item-area bordered mobile"
            v-for="clienttransaction in withdrawals"
          >
            <span class="subject fontweight-5 capitalise"
              ><span class="mobilelabel">Subject:</span>{{ clienttransaction.type }}</span
            >
            <span class="date smlabel"
              ><span class="mobilelabel">Date:</span
              >{{ formatDate(clienttransaction.date) }}</span
            >
            <span class="status">
              <label class="capitalise"
                ><span class="mobilelabel">Status:</span
                ><label class="success">{{ clienttransaction.status }}</label></label
              >
            </span>
            <span class="amount fontweight-5"
              ><span class="mobilelabel">Destination:</span
              >{{ limitTextLength(clienttransaction.destinationbank, 10) }}</span
            >
            <span class="amount fontweight-5"
              ><span class="mobilelabel">Amount:</span>${{
                formatNumber(clienttransaction.amount, 10)
              }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import global from "@/mixins/global";

export default {
  mixins: [global],
};
</script>
