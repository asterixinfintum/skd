<template>
  <div class="overview" @click="closedrops">
    <UserHeader
      :notifsbodstate="opennotificationsbody"
      :opennotifsbod="opennotifications"
      :openprofilebod="openprofiledrop"
      :profilebod="profilebody"
    />

    <div v-if="docsopen">
        <DocumentDisplay :userid="userid" :closedocs="closedocs"/>
    </div>

    <div class="overview__content white-background content-body">
      <div class="overview__transaction--header">
        <div class="overview__transaction--h2 header-label margin-bottom-20">
          Upload documents for verifications here
        </div>

        <div></div>
        <div>
          <button class="button curved loanbtn" @click="opendocs">View your documents and files</button>
        </div>
      </div>

      <div class="verification">
        <div class="verification__filepreview" v-if="file">
          <span>Chosen File:</span>
          <span>{{ file.name }}</span>
        </div>

        <div class="padding-top-bottom"></div>

        <div class="verification__upload">
          <label for="fileInput" class="verification__upload--input">
            <p>{{ displaytext }}</p>
            <input
              type="file"
              ref="fileInput"
              @change="onFileChange"
              id="fileInput"
              class="verification__upload--input"
            />
          </label>
        </div>

        <div class="padding-top-bottom"></div>

        <button
          v-if="file && !loadinglocal"
          @click="callFileUpload"
          class="orange-btn button padded-btn colored-btn"
        >
          Upload Document
        </button>

        <button
          v-if="file && loadinglocal"
          @click="callFileUpload"
          class="orange-btn button padded-btn colored-btn"
        >
          Uploading...
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import global from "@/mixins/global";

export default {
  data() {
    return {
      file: null,
      displaytext: "Click to Choose a document",
      loadinglocal: false,
      files: [],
      docsopen: false
    };
  },
  mixins: [global],
  mounted() {
    this.getDocuments();
  },
  computed: {
    userid() {
      return this.$route.query.user;
    }
  },
  methods: {
    closedocs() {
      this.docsopen = false;
    },
    opendocs() {
      this.docsopen = true;
    },
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
    async getDocuments() {
      this.files = await this.getuserdocs(this.userid);
    },
    callFileUpload() {
      this.loadinglocal = true;
      this.uploadfile(this.file)
        .then(() => {
          this.loadinglocal = false;
          this.file = null;
          this.displaytext = "File successfully uploaded";

          setTimeout(() => {
            this.displaytext = "Click to Choose a document";
          }, 1000);
        })
        .catch(() => {
          this.loadinglocal = false;
          this.file = null;
          this.displaytext = "File successfully uploaded";

          setTimeout(() => {
            this.displaytext = "Click to Choose a document";
          }, 1000);
        });
    },
    onFileChange(event) {
      this.file = event.target.files[0];
    },
  },
};
</script>

<style lang="scss" scoped>
.verification {
  margin: 0 auto;
  width: #{scaleValue(800)};
  height: #{scaleValue(400)};
  border: 1px solid $primary-orange;
  border-radius: #{scaleValue(10)};
  padding: #{scaleValue(30)} #{scaleValue(10)};

  &__upload {
    display: flex;
    flex-direction: column;

    &--input {
      display: inline-block;
      padding: #{scaleValue(15)} #{scaleValue(40)};
      cursor: pointer;
      background-color: $primary-orange;
      color: #fff;
      border-radius: #{scaleValue(10)};
      border: none;

      & p {
        font-weight: 500;
        font-size: #{scaleValue(15.5)};
      }

      & input[type="file"] {
        display: none;
      }
    }

    &--btn {
      margin-top: #{scaleValue(15.5)};
    }
  }
}
</style>
