<template>
  <div>
    <div class="dashboard overview">
      <AdminHeader />

      <div v-if="currentitem">
        <SidePopup
          :header="header"
          :text="text"
          :buttontext="buttontext"
          :current="currentitem"
          :btntext="'Edit'"
          :deletebtn="'Delete'"
          :admin="true"
          :updatemethod="updatemethod"
          :deletemethod="deletesavingsplan"
          :itemid="currentitem"
        />
      </div>

      <div class="dashboard__content">
        <div class="overview__transaction--header bottom-margin">
          <div class="overview__transaction--h2 header-label capitalize bottom-margin">
            Savings Plans
          </div>

          <button
            class="dashboard__usersubbtns--btn button curved fontweight-4"
            @click="toadminroute('admin/dashboard/savingsplans/create')"
            v-if="!userid"
          >
            Add savings plan item
          </button>

          <button
            class="dashboard__usersubbtns--btn button curved fontweight-4"
            @click="toadminroute(`admin/dashboard/savingsplans/create?user=${userid}`)"
            v-if="userid"
          >
            Create savings plan item for this user
          </button>
        </div>

        <div
          class="loans__body"
          v-for="{ name, requirement, description, _id } in userid
            ? usersavingsplans
            : savingsplans"
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
                  {{ description }}
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
      currentitem: "",
    };
  },
  mixins: [global],
  mounted() {
    this.getsavingsplans();
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
    usersavingsplans() {
      const { savingsplans } = this;

      const usersavingsplans = savingsplans.filter(
        (savingsplan) => savingsplan.foruser === this.userid
      );
      return usersavingsplans;
    },
  },
  watch: {
    savingsplans(newval, oldval) {
      if (newval.length) {
        if (this.userid) {
          if (this.usersavingsplans.length) {
            const { name, requirement, description, _id } = this.usersavingsplans[0];
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
  methods: {
    setcurrent({ name, requirement, description, _id }) {
      this.header = name;
      this.text = description;
      this.currentitem = _id;
    },
    async deletesavingsplan() {
      const { currentitem } = this;

      await this.deleteitem({ currentitem: currentitem, type: "savingsplan" });

      this.getsavingsplans();
    },
    updatemethod() {
      const { currentadmin, toadminroute, currentitem } = this;

      return toadminroute(`admin/dashboard/savingsplans/edit?currentitem=${currentitem}`);
    },
  },
};
</script>
