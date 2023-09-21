<template>
  <div class="sdwan-app" :class="{ 'min-width': isLogin }">
    <LeftNav class="sdwan-nav" v-if="isLogin" />
    <div
      class="sdwan-container"
      :class="{
        'left-side-close': !leftMenuOpen,
        'is-login-wrapper': !isLogin,
      }"
    >
      <TopHeader
        class="sdwan-header"
        @logout="topLogout"
        v-if="isLogin && $route.path !== '/overview'"
      />
      <div class="sdwan-main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import TopHeader from "@/views/TopHeader.vue";
import LeftNav from "@/views/LeftNav.vue";
import Cookies from "js-cookie";
import { mapMutations, mapState } from "vuex";
export default {
  name: "App",
  components: {
    TopHeader,
    LeftNav,
  },
  provide:{
    backendFileBasePath:'web_site_file/',
  },
  
  data() {
    return {
      isLogin: false,
    };
  },
  computed: {
    ...mapState(["leftMenuOpen"]),
  },
  methods: {
    ...mapMutations([
      "toggleLeftMenu",
      "setUserName",
      "setAccountUuid",
      "setSessionId",
      "setSearchAccount",
    ]),
    topLogout(logout) {
      this.isLogin = !logout;
      if (logout) {
        let lastPath = window.location.href;
        if (lastPath.indexOf("login") > -1) {
          lastPath = process.env.BASE_URL;
        }
        Cookies.set("lastLogoutPath_CXP_WEB", lastPath, { path: "/" });
        this.$nextTick(() => {
          Cookies.remove("accountName");
          Cookies.remove("accountUuid");
          Cookies.remove("accountType");
          Cookies.remove("sessionid");
          Cookies.remove("searchAccount");
          this.$router.push("/login");
        });
      }
    },
  },
  mounted() {
    const sessionid = Cookies.get("sessionid");
    if (sessionid) {
      this.isLogin = true;
      const username = Cookies.get("accountName");
      const accountUuid = Cookies.get("accountUuid");
      const sidebar = Cookies.get("sdwan_sidebar") || "open";
      const searchAccount = Cookies.get("searchAccount");
      if (searchAccount) {
        this.setSearchAccount(JSON.parse(searchAccount));
      }
      this.toggleLeftMenu(sidebar === "open");
      this.setUserName(username);
      this.setAccountUuid(accountUuid);
      this.setSessionId(sessionid);
    } else {
      this.isLogin = false;
      const currentPath = this.$route.path;
      if (currentPath !== "/login") {
        let lastPath = window.location.href;
        if (lastPath.indexOf("login") === -1) {
          Cookies.set("lastLogoutPath_CXP_WEB", lastPath, { path: "/" });
        }
        this.$router.replace("/login");
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.sdwan-app {
  position: relative;
  height: 100%;
  box-sizing: border-box;
}
.min-width {
  min-width: 1200px;
}
.sdwan-nav {
  //height: 100%;
  z-index: 1000;
  top: 0;
  bottom: 0;
}
.sdwan-container {
  position: relative;
  margin-left: 201px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
  &.left-side-close {
    margin-left: 65px;
  }
}
.is-login-wrapper {
  margin: 0 !important;
}

.sdwan-header {
  flex: 0 0 60px;
  height: 60px;
}
.sdwan-main {
  padding: 5px 10px;
  flex: 1 0 0;
  overflow: auto;
}

</style>
