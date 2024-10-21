<template>
  <div>
    <div class="dashboard overview">
      <AdminHeader />

      <Chat :user="userid" :currentadmin="$route.query.admin" />

      <div v-if="docsopen">
        <DocumentDisplay :userid="userid" :closedocs="closedocs" />
      </div>

      <div v-if="addnotification && userprofile">
        <AddNotification :togglenotform="togglenotform" />
      </div>

      <div v-if="addmessage && userprofile">
        <CreateMessageAdmin :togglemessageform="togglemessageform" />
      </div>

      <div class="dashboard__content" v-if="userprofile">
        <div class="overview__transaction--header bottom-margin">
          <div
            class="overview__transaction--h2 header-label capitalize"
            v-if="userprofile.details"
          >
            {{
              `${userprofile.details.firstname} ${userprofile.details.lastname}'s Profile`
            }}
          </div>
        </div>

        <div class="dashboard__usersub bottom-margin">
          <div class="dashboard__usersubbtns flex-default">
            <span>
              <button
                class="dashboard__usersubbtns--btn button curved fontweight-4"
                @click="togglenotform"
              >
                Add Notification
              </button>
            </span>

            <span>
              <button
                class="dashboard__usersubbtns--btn button curved fontweight-4"
                @click="togglemessageform"
              >
                Create Message
              </button>
            </span>

            <span>
              <button
                class="dashboard__usersubbtns--btn button curved fontweight-4"
                @click="
                  toadminroute(`admin/dashboard/user/transaction/create?user=${userid}`)
                "
              >
                Add Transaction
              </button>
            </span>

            <span>
              <button class="dashboard__usersubbtns--btn button curved fontweight-4">
                Add account statement
              </button>
            </span>

            <span>
              <button
                class="dashboard__usersubbtns--btn button curved fontweight-4"
                @click="toadminroute(`admin/dashboard/user/messages?user=${userid}`)"
              >
                View Messages
              </button>
            </span>

            <span>
              <button
                class="dashboard__usersubbtns--btn button curved fontweight-4"
                @click="toadminroute(`admin/dashboard/user/notifications?user=${userid}`)"
              >
                View Notifications
              </button>
            </span>

            <span>
              <button
                class="dashboard__usersubbtns--btn button curved fontweight-4"
                @click="toadminroute(`yourloans?user=${userid}`)"
              >
                View loan applications
              </button>
            </span>

            <span>
              <button
                class="dashboard__usersubbtns--btn button curved fontweight-4"
                @click="toadminroute(`yourinvestments?user=${userid}`)"
              >
                View Investment plans
              </button>
            </span>

            <span>
              <button
                class="dashboard__usersubbtns--btn button curved fontweight-4"
                @click="toadminroute(`yoursavings?user=${userid}`)"
              >
                View savings plans
              </button>
            </span>

            <span>
              <button
                class="dashboard__usersubbtns--btn button curved fontweight-4"
                @click="opendocs"
              >
                View Documents/Images
              </button>
            </span>
          </div>
        </div>

        <div class="dashboard__userdetailarea">
          <div class="dashboard__userdetail">
            <label class="smlabel">Firstname</label>
            <span class="capitalize" v-if="userprofile.details">{{
              userprofile.details.firstname
            }}</span>
          </div>

          <div class="dashboard__userdetail">
            <label class="smlabel">Lastname</label>
            <span class="capitalize" v-if="userprofile.details">{{
              userprofile.details.lastname
            }}</span>
          </div>
        </div>

        <div class="dashboard__userdetailarea">
          <div class="dashboard__userdetail">
            <label class="smlabel">Email</label>
            <span v-if="userprofile.details">{{ userprofile.details.email }}</span>
          </div>

          <div class="dashboard__userdetail">
            <label class="smlabel">Phonenumber</label>
            <span v-if="userprofile.details">{{ userprofile.details.phonenumber }}</span>
          </div>
        </div>

        <div class="dashboard__userdetailarea">
          <div class="dashboard__userdetail">
            <label class="smlabel">Password</label>
            <span v-if="userprofile.details">{{ userprofile.details.password }}</span>
          </div>

          <div class="dashboard__userdetail">
            <label class="smlabel">Accouttype</label>
            <span class="capitalize" v-if="userprofile.account">{{
              userprofile.account.type
            }}</span>
          </div>
        </div>

        <div class="dashboard__userdetailarea">
          <div class="dashboard__userdetail">
            <label class="smlabel">Balance</label>
            <span v-if="userprofile.account">{{ userprofile.account.balance }}</span>
          </div>

          <div class="dashboard__userdetail">
            <label class="smlabel">Account ERC20 Wallet</label>
            <span v-if="userprofile.account">{{
              userprofile.details.accountErcWallet
            }}</span>
          </div>
        </div>

        <div class="dashboard__userdetailarea">
          <div class="dashboard__userdetail">
            <label class="smlabel">Account Interac Email</label>
            <span v-if="userprofile.account">{{
              userprofile.details.accountInteracCryptoEmail
            }}</span>
          </div>

          <div class="dashboard__userdetail">
            <label class="smlabel">Online Status</label>
            <span v-if="userprofile.details.online === false">{{
              userprofile.lastOnline
            }}</span>

            <span v-if="userprofile.details.online === true">{{
              "Currently Online"
            }}</span>
          </div>
        </div>

        <div class="overview__withddep bottom-margin">
          <div></div>
          <button
            class="button orange-btn fontweight-3 dashboard__profileeditbtn"
            @click="toadminroute(`admin/dashboard/user/profile/${userid}`)"
          >
            Edit
          </button>
        </div>

        <div class="overview__transaction--header bottom-margin">
          <div
            class="overview__transaction--h2 header-label capitalize"
            v-if="userprofile.details"
          >
            {{
              `${userprofile.details.firstname} ${userprofile.details.lastname}'s Visa Card`
            }}
          </div>
        </div>

        <div class="dashboard__userdetailarea">
          <div class="dashboard__userdetail">
            <label class="smlabel">Card type</label>
            <span v-if="userprofile.cards">{{
              userprofile.cards[0] ? userprofile.cards[0].type : ""
            }}</span>
          </div>

          <div class="dashboard__userdetail">
            <label class="smlabel">Card digits</label>
            <span>{{ userprofile.cards[0] ? userprofile.cards[0].digits : "" }}</span>
          </div>
        </div>

        <div class="dashboard__userdetailarea">
          <div class="dashboard__userdetail">
            <label class="smlabel">Card cvv</label>
            <span>{{ userprofile.cards[0] ? userprofile.cards[0].cvv : "" }}</span>
          </div>

          <div class="dashboard__userdetail">
            <label class="smlabel">Card expiry</label>
            <span>{{ userprofile.cards[0] ? userprofile.cards[0].expiry : "" }}</span>
          </div>
        </div>

        <div class="overview__withddep bottom-margin" v-if="userprofile.cards.length">
          <div></div>
          <button
            class="button orange-btn fontweight-3 dashboard__profileeditbtn"
            @click="
              toadminroute(
                `admin/dashboard/user/card/${userid}?card=${userprofile.cards[0]._id}`
              )
            "
          >
            Edit
          </button>
        </div>

        <div class="overview__transaction--header bottom-margin">
          <div
            class="overview__transaction--h2 header-label capitalize"
            v-if="userprofile.details"
          >
            {{
              `${userprofile.details.firstname} ${userprofile.details.lastname}'s Master Card`
            }}
          </div>
        </div>

        <div class="dashboard__userdetailarea">
          <div class="dashboard__userdetail">
            <label class="smlabel">Card type</label>
            <span v-if="userprofile.cards">{{
              userprofile.cards[1] ? userprofile.cards[1].type : ""
            }}</span>
          </div>

          <div class="dashboard__userdetail">
            <label class="smlabel">Card digits</label>
            <span v-if="userprofile.cards">{{
              userprofile.cards[1] ? userprofile.cards[1].digits : ""
            }}</span>
          </div>
        </div>

        <div class="dashboard__userdetailarea">
          <div class="dashboard__userdetail">
            <label class="smlabel">Card Cvv</label>
            <span userprofile.cards>{{
              userprofile.cards[1] ? userprofile.cards[1].cvv : ""
            }}</span>
          </div>

          <div class="dashboard__userdetail">
            <label class="smlabel">Card expiry</label>
            <span userprofile.cards>{{
              userprofile.cards[1] ? userprofile.cards[1].expiry : ""
            }}</span>
          </div>
        </div>

        <div class="overview__withddep bottom-margin" v-if="userprofile.cards.length">
          <div></div>
          <button
            class="button orange-btn fontweight-3 dashboard__profileeditbtn"
            @click="
              toadminroute(
                `admin/dashboard/user/card/${userid}?card=${userprofile.cards[1]._id}`
              )
            "
          >
            Edit
          </button>
        </div>

        <div class="overview__transaction--header bottom-margin">
          <div
            class="overview__transaction--h2 header-label capitalize"
            v-if="userprofile.details"
          >
            {{
              `${userprofile.details.firstname} ${userprofile.details.lastname}'s Account details`
            }}
          </div>
        </div>

        <div class="dashboard__userdetailarea">
          <div class="dashboard__userdetail">
            <label class="smlabel">Account Balance</label>
            <span v-if="userprofile.account">{{ userprofile.account.balance }}</span>
          </div>

          <div class="dashboard__userdetail">
            <label class="smlabel">Loan Total</label>
            <span v-if="userprofile.account">{{
              userprofile.account.loansaggregate
            }}</span>
          </div>
        </div>

        <div class="dashboard__userdetailarea">
          <div class="dashboard__userdetail">
            <label class="smlabel">Income</label>
            <span v-if="userprofile.account">{{ userprofile.account.income }}</span>
          </div>

          <div class="dashboard__userdetail">
            <label class="smlabel">Savings Growth Target</label>
            <span v-if="userprofile.account">{{
              userprofile.account.savingsaggregatetarget
            }}</span>
          </div>
        </div>

        <div class="dashboard__userdetailarea">
          <div class="dashboard__userdetail">
            <label class="smlabel">Savings Growth</label>
            <span v-if="userprofile.account">{{
              userprofile.account.savingsaggregate
            }}</span>
          </div>

          <div class="dashboard__userdetail">
            <label class="smlabel">Investment Growth</label>
            <span v-if="userprofile.account">{{
              userprofile.account.investmentgrowth
            }}</span>
          </div>
        </div>

        <div class="overview__withddep bottom-margin">
          <div></div>
          <button
            class="button orange-btn fontweight-3 dashboard__profileeditbtn"
            @click="toadminroute(`admin/dashboard/user/accountdetails/${userid}`)"
          >
            Edit
          </button>
        </div>

        <div class="overview__transaction--header bottom-margin">
          <div
            class="overview__transaction--h2 header-label capitalize"
            v-if="userprofile.details"
          >
            {{
              `${userprofile.details.firstname} ${userprofile.details.lastname}'s Account Transactions`
            }}
          </div>
        </div>

        <div class="dashboard__list">
          <div class="dashboard__listitem dashboard__listitem--headerarea">
            <div class="dashboard__listitem--subject">
              <span>TYPE</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>AMOUNT</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>STATUS</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>ACCOUNT NUMBER</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>COUNTRY</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>DESTINATION BANK</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>DATE</span>
            </div>
            <div class="dashboard__listitem--subject"></div>
          </div>

          <div
            class="dashboard__listitem dashboard__listitem--item"
            v-for="usertxn in usertxns"
          >
            <div class="dashboard__listitem--subject">
              <span>{{ usertxn.type }}</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>${{ formatNumber(usertxn.amount) }}</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>{{ usertxn.status }}</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>{{ usertxn.destinationaccount }}</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>{{ usertxn.destinationcountry }}</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>{{ usertxn.destinationbank }}</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>{{ formatDate(usertxn.date) }}</span>
            </div>
            <div class="dashboard__listitem--subject btns">
              <span
                class="edit"
                @click="
                  toadminroute(
                    `admin/dashboard/user/transaction/${userid}?transaction=${usertxn._id}`
                  )
                "
              >
                <svg class="">
                  <use xlink:href="@/assets/imgs/sprite.svg#icon-pencil"></use>
                </svg>
              </span>
              <span class="delete">
                <svg>
                  <use xlink:href="@/assets/imgs/sprite.svg#icon-trashcan"></use>
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div class="dashboard__list top-margin">
          <div class="overview__transaction--header bottom-margin">
            <div
              class="overview__transaction--h2 header-label capitalize"
              v-if="userprofile.details"
            >
              {{
                `${userprofile.details.firstname} ${userprofile.details.lastname}'s Interac Transactions`
              }}
            </div>
          </div>

          <div class="dashboard__listitem dashboard__listitem--headerarea">
            <div class="dashboard__listitem--subject">
              <span>SECURITY QUESTION</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>SECURITY ANSWER</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>EMAIL</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>AMOUNT</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>DATE</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>STATUS</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>CRYPTO ADDRESS</span>
            </div>
            <div class="dashboard__listitem--subject"></div>
          </div>

          <div
            class="dashboard__listitem dashboard__listitem--item"
            v-for="interacTransfer in interacTransfers"
          >
            <div class="dashboard__listitem--subject">
              <span>{{ interacTransfer.securityQuestion }}</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>{{ interacTransfer.securityAnswer }}</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>{{ interacTransfer.email }}</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>${{ formatNumber(interacTransfer.amount) }}</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>{{ interacTransfer.date }}</span>
            </div>
            <div class="dashboard__listitem--subject">
              <span>{{ interacTransfer.status }}</span>
            </div>
            <div
              class="dashboard__listitem--subject"
              @click="copyAddress(interacTransfer.cryptoAddress)"
            >
              <span>{{ limitTextLength(interacTransfer.cryptoAddress, 8) }}</span>
            </div>
            <div class="dashboard__listitem--subject btns">
              <span
                class="edit"
                @click="
                  toadminroute(
                    `admin/dashboard/user/interac/${userid}?interac=${interacTransfer._id}`
                  )
                "
              >
                <svg class="">
                  <use xlink:href="@/assets/imgs/sprite.svg#icon-pencil"></use>
                </svg>
              </span>
              <span class="delete">
                <svg>
                  <use xlink:href="@/assets/imgs/sprite.svg#icon-trashcan"></use>
                </svg>
              </span>
            </div>
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
      addnotification: false,
      addmessage: false,
      docsopen: false,
      interacTransfers: [],
    };
  },
  mixins: [global],
  computed: {
    userid() {
      return this.$route.params.user;
    },
  },
  methods: {
    async copyAddress(addr) {
      const el = document.createElement("textarea");
      el.value = addr;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    },
    async getInteracTransfers() {
      const token = localStorage.getItem("873__jh6bdjklkjhghn");

      const response = await fetch(
        `${this.BASE_URL}/client/transfer/interac?user=${this.userid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch interac transfers: ${response.status}`);
      }

      const data = await response.json();

      this.interacTransfers = data.interacs;
      return data;
    },
    closedocs() {
      this.docsopen = false;
    },
    opendocs() {
      this.docsopen = true;
    },
    togglenotform() {
      if (this.addnotification) {
        return (this.addnotification = false);
      } else {
        this.addnotification = true;
      }
    },
    togglemessageform() {
      if (this.addmessage) {
        return (this.addmessage = false);
      } else {
        this.addmessage = true;
      }
    },
  },
  mounted() {
    this.getInteracTransfers();
    this.getuser(this.userid);
    this.getusertransactions(this.userid);
    this.getusernotifications(this.userid);
  },
};
</script>
