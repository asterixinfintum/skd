<template>
  <div>
    <div class="dashboard overview">
      <AdminHeader />

      <div v-if="currentloan">
        <SidePopup
          :header="header"
          :text="text"
          :buttontext="buttontext"
          :current="currentloan"
          :btntext="'Edit'"
          :deletebtn="'Delete'"
          :admin="true"
          :updatemethod="updatemethod"
          :deletemethod="deleteloan"
          :itemid="currentloan"
        />
      </div>

      <div class="dashboard__content">
        <div class="overview__transaction--header bottom-margin">
          <div class="overview__transaction--h2 header-label capitalize bottom-margin">
            Loans
          </div>
          <button
            class="dashboard__usersubbtns--btn button curved fontweight-4"
            @click="toadminroute('admin/dashboard/loans/create')"
            v-if="!userid"
          >
            Add loan item
          </button>

          <button
            class="dashboard__usersubbtns--btn button curved fontweight-4"
            @click="toadminroute(`admin/dashboard/loans/create?user=${userid}`)"
            v-if="userid"
          >
            Create loan item for this user
          </button>
        </div>

        <div
          class="loans__body"
          v-for="{ name, requirement, description, _id } in userid
            ? userloanitems
            : generalloans"
        >
          <div class="overview__savingsplan thick-border">
            <div class="overview__savingsplan--header alignup">
              <span class="overview__savingsplan--headersvg">
                <svg class="feature__icon">
                  <use xlink:href="@/assets/imgs/sprite.svg#icon-banknote"></use>
                </svg>
              </span>

              <div class="overview__savingsplan--headertext">
                <div class="flex-with-spacebetween">
                  <h3>{{ name }}</h3>
                </div>
                <label class="smlabel loan-text">
                  {{ requirement }}
                </label>

                <figure class="loan-img">
                  <img src="@/assets/imgs/hdassets/guyinglasses.png" />
                </figure>
              </div>
            </div>

            <div class="overview__withddep">
              <button
                class="button orange-btn fontweight-3 half-flex-space loanbtn curved"
                @click="setcurrent({ name, requirement, description, _id })"
              >
                Details
              </button>
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
      header: "",
      text: "",
      buttontext: "",
      currentloan: "",
    };
  },
  mixins: [global],
  watch: {
    loans(newval, oldval) {
      if (newval.length) {
        if (this.userid) {
          if (this.userloanitems.length) {
            const { name, requirement, description, _id } = this.userloanitems[0];
            this.setcurrent({ name, requirement, description, _id });
          }

          return;
        } else {
          const { name, requirement, description, _id } = newval[0];
          this.setcurrent({ name, requirement, description, _id });
        }
      }
    },
  },
  computed: {
    userid() {
      let userid = this.$route.query.user;

      if (userid) {
        return userid;
      } else {
        return null;
      }
    },
    userloanitems() {
      const { loans } = this;

      const userloanitems = loans.filter((loan) => loan.foruser === this.userid);
      return userloanitems;
    },
  },
  mounted() {
    this.getloans();
    
    if (this.userid) {
      this.foruser = this.userid;
      this.getuser(this.userid);
    }
  },
  methods: {
    setcurrent({ name, requirement, description, _id }) {
      this.header = name;
      this.text = description;
      this.currentloan = _id;
    },
    async deleteloan() {
      const { currentloan } = this;

      await this.deleteitem({ currentitem: currentloan, type: "loan" });

      this.getloans();
    },
    updatemethod() {
      const { currentadmin, toadminroute, currentloan } = this;

      return toadminroute(`admin/dashboard/loans/edit?currentloan=${currentloan}`);
    },
  },
};
</script>
