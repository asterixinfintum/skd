<template>
  <div>
    <div class="overview" @click="closedrops">
      <Chat :user="user" />

      <UserHeader
        :notifsbodstate="opennotificationsbody"
        :opennotifsbod="opennotifications"
        :openprofilebod="openprofiledrop"
        :profilebod="profilebody"
      />

      <div v-if="addMoneyOpen">
        <AddMoney :toggleAddMoney="toggleAddMoney" />
      </div>

      <div v-if="interacTransfer">
        <InteracTransfer
          :toggleInteracTransfer="toggleInteracTransfer"
          :interacEmail="client.accountInteracCryptoEmail"
        />
      </div>

      <div v-if="createcontactformopen">
        <CreateContactForm
          :open="opencreatecontactform"
          :close="closecreatecontactform"
        />
      </div>

      <div v-if="confirmationmsg">
        <Confirm
          :subject="comfimationsbj"
          :msg="confirmationmsg"
          :confirmationfunc="submittransfer"
          :transferdetails="{
            nameofbnk,
            country,
            accountno,
            amounttosend,
          }"
        />
      </div>

      <div class="overview__content" v-if="account && client">
        <div class="overview__body boxshadowbox">
          <div class="overview__left white-background boxshadowbox">
            <div class="overview__card">
              <div class="overview__savingbottom--head">
                <div class="overview__transaction--header">
                  <div class="overview__transaction--h2 header-label">My Cards</div>
                </div>

                <span class="svgspan faint cursorpointer" v-if="cardview === 'visa'">
                  <label
                    class="smlabel orange fontweight-5"
                    @click.stop="togglecardview('master')"
                    >View Master Card</label
                  >
                </span>
                <span class="svgspan faint cursorpointer" v-if="cardview === 'master'">
                  <label
                    class="smlabel orange fontweight-5"
                    @click.stop="togglecardview('visa')"
                    >View Visa Card</label
                  >
                </span>
              </div>

              <figure class="overview__card--img" v-if="cardview === 'visa'">
                <img
                  src="@/assets/imgs/cardback.jpg"
                  class="overview__card--background"
                />
                <figure class="overview__card--platformlogo">
                  <img src="@/assets/imgs/logo-nobackground.png" />
                </figure>
                <figure class="overview__card--cardlogo">
                  <img src="@/assets/imgs/visacardlogo.png" />
                </figure>
                <div class="overview__card--text">
                  <div class="overview__card--textarea">
                    <label class="name capitalize">{{
                      `${client.firstname} ${client.lastname}`
                    }}</label>
                    <label class="date">{{ cards[0].expiry }}</label>
                  </div>
                  <div class="overview__card--textarea">
                    <label class="cardnum" v-if="!detailshide">{{
                      cards[0].digits
                    }}</label>
                    <label class="cardnum" v-if="detailshide">**********</label>
                  </div>
                </div>
              </figure>

              <figure class="overview__card--img" v-if="cardview === 'master'">
                <img
                  src="@/assets/imgs/cardback.jpg"
                  class="overview__card--background"
                />
                <figure class="overview__card--platformlogo">
                  <img src="@/assets/imgs/logo-nobackground.png" />
                </figure>
                <figure class="overview__card--cardlogo">
                  <img src="@/assets/imgs/mastercardlogo.png" />
                </figure>
                <div class="overview__card--text">
                  <div class="overview__card--textarea">
                    <label class="name capitalize">{{
                      `${client.firstname} ${client.lastname}`
                    }}</label>
                    <label class="date">{{ cards[1].expiry }}</label>
                  </div>
                  <div class="overview__card--textarea">
                    <label class="cardnum" v-if="!detailshide">{{
                      cards[1].digits
                    }}</label>
                    <label class="cardnum" v-if="detailshide">**********</label>
                  </div>
                </div>
              </figure>
            </div>

            <div class="overview__orangebox">
              <div class="overview__orangebox--area">
                <p>Balance</p>
                <p class="balancefigure">${{ formatNumber(account.balance, 15) }}</p>
              </div>
              <div class="overview__orangebox--area mobile">
                <div class="overview__savingstop--card">
                  <label class="smlabel white fontweight-4">Currency</label>
                  <span class="normblack">USD/US Dollar</span>
                </div>

                <div class="overview__savingstop--card">
                  <label class="smlabel white fontweight-4">Account plan</label>
                  <span class="normblack capitalize">{{ account.type }}</span>
                </div>
                <div
                  class="overview__savingstop--card fontweight-4"
                  v-if="cardview === 'visa'"
                >
                  <label class="smlabel white">Visa card Cvv</label>
                  <span class="normblack" v-if="!detailshide">{{ cards[0].cvv }}</span>
                  <span class="normblack" v-if="detailshide">**********</span>
                </div>
                <div
                  class="overview__savingstop--card fontweight-4"
                  v-if="cardview === 'master'"
                >
                  <label class="smlabel white">Master card Cvv</label>
                  <span class="normblack" v-if="!detailshide">{{ cards[1].cvv }}</span>
                  <span class="normblack" v-if="detailshide">**********</span>
                </div>
              </div>
              <div class="overview__orangebox--area column">
                <div class="overview__savingstop--card column-savedto">
                  <div class="flex-default">
                    <span class="walletsvg">
                      <svg>
                        <use xlink:href="@/assets/imgs/sprite.svg#icon-wallet"></use>
                      </svg>
                    </span>
                    <label class="smlabel white fontweight-4 nobottom-mobile"
                      >Savings Target Reached</label
                    >
                  </div>
                </div>
                <div class="overview__savingbottom--spent">
                  <span class="fontweight-5 savingsaggregate"
                    >${{ account.savingsaggregate }}</span
                  >
                  <span class="normblack fontweight-4">saved to</span>
                  <span class="fontweight-5">${{ account.savingsaggregatetarget }}</span>
                </div>
              </div>

              <div class="overview__orangebox--area">
                <button
                  class="button curved white overview__orangebox--button small-mobile-btn"
                  @click="toggleAddMoney"
                >
                  <span class="svg">
                    <svg>
                      <use xlink:href="@/assets/imgs/sprite.svg#icon-plus"></use>
                    </svg>
                  </span>
                  <span>Add money</span>
                </button>

                <button
                  class="button curved white overview__orangebox--button small-mobile-btn"
                  @click="toggleInteracTransfer"
                >
                  <span class="img"><img src="@/assets/imgs/interaclogo.jpg" /></span>
                  <span>Interac Transfer</span>
                </button>

                <figure class="overview__orangebox--eye" @click="toggledetailshide">
                  <img src="@/assets/imgs/eyeopen.svg" />
                </figure>
              </div>
            </div>

            <div class="overview__finsum">
              <div class="overview__finsumcard">
                <span class="overview__savingsplan--headersvg">
                  <svg class="feature__icon">
                    <use xlink:href="@/assets/imgs/sprite.svg#icon-wallet"></use>
                  </svg>
                </span>
                <label class="tinylabel">Loans</label>
                <span class="normblack fontweight-5"
                  >${{ formatNumber(account.loansaggregate) }}</span
                >
              </div>

              <div class="overview__finsumcard">
                <span class="overview__savingsplan--headersvg">
                  <svg class="feature__icon">
                    <use xlink:href="@/assets/imgs/sprite.svg#icon-coin-dollar"></use>
                  </svg>
                </span>
                <label class="tinylabel">Investments</label>
                <span class="normblack fontweight-5"
                  >${{ formatNumber(account.investmentgrowth) }}</span
                >
              </div>

              <div class="overview__finsumcard">
                <span class="overview__savingsplan--headersvg">
                  <svg class="feature__icon">
                    <use xlink:href="@/assets/imgs/sprite.svg#icon-banknote"></use>
                  </svg>
                </span>
                <label class="tinylabel">Income</label>
                <span class="normblack fontweight-5"
                  >${{ formatNumber(account.income) }}</span
                >
              </div>
            </div>
          </div>

          <div class="overview__right">
            <div class="overview__righttop">
              <div
                class="overview__transaction overview__tranxs white-background overview__blueborder"
              >
                <div class="overview__background">
                  <div class="overview__savingbottom--head">
                    <div class="overview__transaction--header">
                      <div class="overview__transaction--h2 header-label orange">
                        Transactions
                      </div>
                    </div>

                    <span class="svgspan faint" @click="toroute('transactions/all')">
                      <label class="smlabel orange fontweight-5">View all</label>
                    </span>
                  </div>

                  <div v-if="!trnxs.length">
                    <Empty :item="'Transactions'" />
                  </div>

                  <div class="overview__transaction--list" v-if="trnxs.length">
                    <div>
                      <div
                        class="overview__tranx"
                        v-for="{ amount, date, status, type, destinationbank } in trnxs"
                      >
                        <div class="overview__tranx--logoarea">
                          <figure class="overview__tranx--logo">
                            <img src="@/assets/imgs/logo-nobackground.png" />
                          </figure>
                        </div>

                        <div class="overview__tranxbody">
                          <div class="overview__tranxbody--left">
                            <p class="overview__tranxbody--bottommargin capitalize">
                              {{ destinationbank }}
                            </p>
                            <div class="smlabel">
                              {{ formatDate(date) }}
                            </div>
                          </div>
                          <div class="overview__tranxbody--right">
                            <span class="overview__tranxbody--normblack normblack"
                              >${{ formatNumber(amount, 12) }}</span
                            >
                            <span class="tinylabel">{{ type }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="overview__imgslider">
                <div class="overview__imgslider--slide">
                  <figure
                    class="overview__imgslider--fig"
                    :class="{
                      center: currentslide === 1,
                      left: currentslide === 2,
                      right: currentslide === 3,
                      offcreen: currentslide === 2 || currentslide === 3,
                    }"
                    @click="toroute('savings')"
                  >
                    <div class="overview__imgslider--textarea">
                      <span>Find out what savings program is best for you</span>
                    </div>
                    <img src="@/assets/imgs/slideitem1.png" />
                  </figure>

                  <figure
                    class="overview__imgslider--fig"
                    :class="{
                      center: currentslide === 2,
                      left: currentslide === 3,
                      right: currentslide === 1,
                      offcreen: currentslide === 3 || currentslide === 1,
                    }"
                    @click="toroute('investmentplans')"
                  >
                    <div class="overview__imgslider--textarea">
                      <span>Our investment plans are tailored to help you proper</span>
                    </div>
                    <img src="@/assets/imgs/slideitem4.png" />
                  </figure>

                  <figure
                    class="overview__imgslider--fig"
                    :class="{
                      center: currentslide === 3,
                      left: currentslide === 1,
                      right: currentslide === 2,
                      offcreen: currentslide === 2 || currentslide === 1,
                    }"
                  >
                    <div class="overview__imgslider--textarea">
                      <span>Get loans of up to $1,000,000 and build your business</span>
                    </div>
                    <img src="@/assets/imgs/slideitem5.png" />
                  </figure>
                </div>
              </div>
            </div>

            <div class="overview__rightbottom">
              <div
                class="overview__transaction overview__transfer overview__blueborder overview__orangeborder white-background"
              >
                <div class="overview__background">
                  <div class="overview__savingbottom--head">
                    <div class="overview__transaction--header">
                      <div class="overview__transaction--h2 header-label orange">
                        Money transfer
                      </div>
                    </div>

                    <span class="svgspan faint">
                      <!--<svg class="feature__icon">
                        <use
                          xlink:href="@/assets/imgs/sprite.svg#icon-more-horizontal"
                        ></use>
                      </svg>-->
                    </span>
                  </div>

                  <div class="overview__transfer">
                    <div class="input-area">
                      <label class="smlabel">Destination Bank</label>
                      <label
                        class="smlabel tinylabel fontweight-5"
                        v-if="nameofbnkerror"
                        :class="{
                          fonterror: nameofbnkerror,
                        }"
                      >
                        should contain only letters
                      </label>
                      <div class="input">
                        <input placeholder="Name of Bank" v-model="nameofbnk" />
                      </div>
                    </div>
                    <div class="input-area">
                      <label class="smlabel">Destination Country</label>
                      <label
                        class="smlabel tinylabel fontweight-5"
                        v-if="countryerror"
                        :class="{
                          fonterror: countryerror,
                        }"
                      >
                        should contain only letters
                      </label>
                      <div class="input">
                        <input placeholder="Country" v-model="country" />
                      </div>
                    </div>
                    <div class="input-area">
                      <label class="smlabel">Account number</label>
                      <div class="input">
                        <input placeholder="Recipient account no" v-model="accountno" />
                      </div>
                    </div>
                    <div class="input-area">
                      <label class="smlabel">Amount to send</label>
                      <label
                        class="smlabel tinylabel fontweight-5"
                        v-if="amounttosenderror"
                        :class="{
                          fonterror: amounttosenderror,
                        }"
                      >
                        should contain only contain numbers
                      </label>
                      <div class="input">
                        <input placeholder="Amount" v-model="amounttosend" />
                      </div>
                    </div>

                    <div class="overview__withddep">
                      <!--<button
                      class="button orange-btn-faint fontweight-3 half-flex-space"
                      v-if="!allowsubmit"
                    >
                      Save as draft
                    </button>-->

                      <button
                        class="button orange-btn-faint fontweight-3 half-flex-space"
                        v-if="!allowsubmit"
                      >
                        Send money
                      </button>
                      <button
                        class="button orange-btn fontweight-3 half-flex-space"
                        v-if="allowsubmit"
                        @click="
                          openconfirmation(
                            `transfer`,
                            `Confirm transfer of $${amounttosend}`
                          )
                        "
                      >
                        Send money
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="overview__transaction overview__savingsplans overview__blueborder overview__greenborder white-background"
              >
                <div class="overview__background">
                  <div class="overview__savingbottom--head">
                    <div class="overview__transaction--header">
                      <div class="overview__transaction--h2 header-label orange">
                        Savings plans
                      </div>
                    </div>

                    <span class="svgspan faint" @click="toroute('yoursavings')">
                      <label class="smlabel orange fontweight-5">View all</label>
                    </span>
                  </div>

                  <div class="overview__savingsplans">
                    <div
                      v-if="savingsplns.length"
                      class="overview__savingsplans--content"
                    >
                      <div
                        class=""
                        v-for="{ usersaving, savingsplanname } in savingsplns"
                      >
                        <div v-if="usersaving.target">
                          <UserSavings
                            :amount="usersaving.amount"
                            :target="usersaving.target"
                            :nameofsavingsplan="usersaving.nameofsavingsplan"
                            :savingsplanname="savingsplanname"
                            :overviewone="true"
                          />
                        </div>
                      </div>
                    </div>

                    <div v-if="account">
                      <div v-if="!savingsplns.length">
                        <Empty :item="'Savings'" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="no-margin">
            <div class="overview__rightbottom"></div>
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
      nameofbnk: "",
      country: "",
      accountno: "",
      amounttosend: "",
      nameofbnkerror: false,
      countryerror: false,
      accountnoerror: false,
      amounttosenderror: false,
      cardview: "visa",
      createcontactformopen: false,
      detailshide: true,
      currentslide: 1,
      interacTransfer: false,
      addMoneyOpen: false,
    };
  },
  mixins: [global],
  computed: {
    trnxs() {
      const { clienttransactions } = this;

      const trnxs = clienttransactions.slice(-2).reverse();

      return trnxs;
    },
    savingsplns() {
      const { usersavingsplans } = this;

      const savingspls = usersavingsplans.slice(-2).reverse();

      return savingspls;
    },
    allowsubmit() {
      const {
        nameofbnk,
        country,
        accountno,
        amounttosend,
        nameofbnkerror,
        countryerror,
        accountnoerror,
        amounttosenderror,
      } = this;

      if (nameofbnk.length && country.length && accountno.length && amounttosend.length) {
        if (!nameofbnkerror && !countryerror && !accountnoerror && !amounttosenderror) {
          return true;
        }

        return false;
      }

      return false;
    },
  },
  mounted() {
    this.getcontacts();

    this.sliderrun();
  },
  watch: {
    client(newval, oldval) {
      if (newval) {
        if (this.$route.query.confirm) {
          this.confirmemail(this.client._id)
            .then(() => {
              if (!this.client.emailcofirmed) {
                this.getcurrentclient(this.client._id);
                //this.$router.push(`/overview/${client._id}`)
              }
            })
            .catch(() => {});
        }
      }
    },
    nameofbnk(newval, oldval) {},
    country(newval, oldval) {},
    amounttosend(newval, oldval) {
      const { isOnlyNumbers } = this;

      if (isOnlyNumbers(newval)) {
        return (this.amounttosenderror = false);
      }

      return (this.amounttosenderror = true);
    },
  },
  methods: {
    toggleAddMoney() {
      this.addMoneyOpen = !this.addMoneyOpen;
    },
    toggleInteracTransfer() {
      this.interacTransfer = !this.interacTransfer;
    },
    sliderrun() {
      setInterval(() => {
        if (this.currentslide === 3) {
          this.currentslide = 1;
        } else {
          let tracker = this.currentslide;
          tracker += 1;
          this.currentslide = tracker;
        }
      }, 3000);
    },
    toggledetailshide() {
      this.detailshide ? (this.detailshide = false) : (this.detailshide = true);
    },
    opencreatecontactform() {
      this.createcontactformopen = true;
    },
    closecreatecontactform() {
      this.createcontactformopen = false;
    },
    togglecardview(cardview) {
      this.cardview = cardview;
    },
    submittransfer() {
      const { nameofbnk, country, accountno, amounttosend } = this;

      this.closeconfirmation();
      this.toggleverbiage(`Processing transfer of $${amounttosend} to ${accountno}`);
      this.onspinner();
      this.createtransfer({ nameofbnk, country, accountno, amounttosend })
        .then(() => {
          this.toggleverbiage(null);
          this.offspinner();
          this.clearinputs();
        })
        .catch((error) => {});
    },
  },
};
</script>
