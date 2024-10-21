<template>
  <div class="documentdisplay" @click.stop="closedocs">
    <div class="documentdisplay__body equal-padding-40" v-if="!files.length">
      <p>No files or photos to display yet</p>
    </div>
    <div class="documentdisplay__body" v-if="files.length">
      <div
        @click.stop="opendoc"
        class="documentdisplay__body--opendoc"
        v-for="file in files"
        :key="file._id"
      >
      <a :href="`${returnURL()}/${file.path}`" target="_blank"  rel="noopener noreferrer">{{ `${file.path}` }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import global from "@/mixins/global";

export default {
  data() {
    return {
      files: [],
    };
  },
  props: ["userid", "closedocs"],
  mixins: [global],
  mounted() {
    this.getDocuments();
  },
  methods: {
    async getDocuments() {
      this.files = await this.getuserdocs(this.userid);
    },
    opendoc() {},
    returnURL() {
      function getCurrentPageDomain() {
        if (process.client) {
          // Check if the code is running on the client side
          const currentURL = window.location.href;
          const url = new URL(currentURL);
          return url.protocol + "//" + "api." + url.hostname;
        } else {
          // Handle server-side rendering (optional)
          return ""; // You can return a default value or handle it differently for SSR
        }
      }

      let BASE = getCurrentPageDomain();

      if (BASE.includes("localhost")) {
        BASE = `http://localhost:8081`;
      } else {
        BASE = getCurrentPageDomain();
      }

      return BASE;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
