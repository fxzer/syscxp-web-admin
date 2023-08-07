<template>
  <header class="sys-header">
    <span
      class="toggle-left-menu  "
      :class="{
        'el-icon-s-unfold': !leftMenuOpen,
        'el-icon-s-fold': leftMenuOpen,
      }"
      @click="toggleLeftMenu"
    ></span>
    <el-breadcrumb separator="/" class="sys-header-crumb">
      <el-breadcrumb-item v-if="menuTitle">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ menuTitle }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="item in currentList"
              :key="item.name"
              :disabled="item.active"
              :class="item.active ? 'active-route' : ''"
              @click.native="linkTo(item.path)"
            >
              {{ item.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-breadcrumb-item>
      <el-breadcrumb-item v-if="currentTitle">
        <span v-html="currentTitle"></span>
       </el-breadcrumb-item>
    </el-breadcrumb>
    <div
      class="sys-dropdown"
      @mouseenter="openDropdown"
      @mouseleave="closeDropdown"
    >
      <span class="sys-dropdown-toggle">
        <i class="el-icon-s-custom"></i>
        <span>{{ userName }}</span>
        <i
          :class="{
            'el-icon-caret-top': dropdownOpen,
            'el-icon-caret-bottom': !dropdownOpen,
          }"
        ></i>
      </span>
      <ul class="sys-dropdown-menu" v-show="dropdownOpen">
        <li>
          <a href="/boss/account/#/setting/message"
            >账户设置</a
          >
        </li>
        <li>
          <a @click="loginWrapper">退出</a>
        </li>
      </ul>
    </div>

   
  </header>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Cookies from "js-cookie";

export default {
  name: "TopHeader",
  data() {
    let infoIsRead = localStorage.getItem('search-info-read') 
    
    return {
      isRead: infoIsRead ,
      dropdownOpen: false,
      currentTitle: "",
      currentList: [],
      showSearch: false,
      menuTitle: "",
    };
  },
  computed: {
    ...mapState(["userName", "leftMenuOpen", "leftMenuList", 'searchAccount']),
  },
  methods: {
    ...mapMutations(['setSearchAccount']),
    searchAccountHandler(account) {
      this.setSearchAccount(account);
      Cookies.set('searchAccount', account ? JSON.stringify(account) : '');
    },
    openDropdown() {
      this.dropdownOpen = true;
    },
    closeDropdown() {
      this.dropdownOpen = false;
    },
    toggleLeftMenu() {
      Cookies.set("sdwan_sidebar", this.leftMenuOpen ? "close" : "open", {
        path: "/",
      });
      this.$store.commit("toggleLeftMenu", !this.leftMenuOpen);
    },
    linkTo(path) {
      this.$router.push(path);
    },
    loginWrapper() {
      this.logout().then(success => {
        this.$emit('logout', success);
      });
    },
    readInfoHandle(){
      localStorage.setItem('search-info-read',true)
      this.isRead = true
    },
    ...mapActions(["logout"]),
  },
  watch: {
    $route:{
      deep: true,
      immediate:true,
      handler(val){
          if (val) {
          const path = val.path;
          const nextIndex = path.indexOf("/", 1);
          const currentPath = nextIndex === -1 ? path : path.slice(0, nextIndex);
          this.currentTitle = val.meta ? val.meta.title : "";
          this.showSearch = val.meta ? val.meta.account : false;
          let hasMenu = false;
          if (this.currentTitle) {
            this.leftMenuList.forEach((item) => {
              if (item.pathExp && item.pathExp.test(currentPath)) {
                hasMenu = true;
                this.menuTitle = item.label;
                if(item.subMenu){
                  this.currentList = item.subMenu.filter((sub) => !sub.isDivider).map((item) => {
                    // 判断是否当前路由
                    return {
                      ...item,
                      active: val.path.indexOf(item.path) > -1 ,
                    };
                  });
                }
              }
            });
          }
          if (!hasMenu) {
            this.currentList = [];
            this.menuTitle = "";
          }
      }

      }
    },
  },
  mounted() {
  },
  destroyed() {},
};
</script>

<style lang="scss" scoped>
.sys-header {
  height: 60px;
  padding: 0 10px;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 1px solid #eee;
  .sys-header-crumb {
    display: inline-block;
    margin-left: 10px;
  }
  .toggle-left-menu {
    display: inline-block;
    height: 60px;
    line-height: 60px;
    width: 34px;
    text-align: center;
    cursor: pointer;
    &:hover {
      background-color: #f6f6f6;
    }
  }
  .tunnel-label {
    background: #409EFF;
    color: #fff;
    margin-right: 10px;
    font-size: 14px;
    float: right;
    height: 24px;
    line-height: 24px;
    margin-top: 18px;
    border-radius: 2px;
    padding:1px 5px;
  }
  .sys-dropdown {
    float: right;
    position: relative;
  }
  .sys-dropdown-toggle {
    display: block;
    height: 60px;
    line-height: 60px;
    color: #333;
    font-size: 14px;
    span {
      display: inline-block;
      padding: 0 6px;
    }
  }

  .sys-dropdown-menu {
    position: absolute;
    top: 60px;
    right: 0;
    z-index: 99;
    width: 100%;
    min-width: 120px;
    padding: 5px 0;
    background: #fff;
    border-left: 1px solid rgba(0, 0, 0, 0.15);
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    border-right: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.18);
    li {
      height: 30px;
      line-height: 30px;
    }
    a {
      display: block;
      padding: 0 10px;
      cursor: pointer;
      &:hover {
        color: #fff;
        background: #409eff;
      }
      i {
        margin-right: 5px;
      }
    }
  }
}
  .el-dropdown:hover{
    cursor:pointer;
  }
  .el-dropdown-menu ::v-deep .el-dropdown-menu__item.active-route {
    color: #409eff !important;
    background-color: #ecf5ff !important;
    cursor: not-allowed;
  }
  .account-search {
    float: right;
    margin-right: 6px;
    margin-top: 14px;
  }
  .sys-header .el-icon-info{
    float: right;
    margin-right:28px;
    margin-top:22px;
    color:#ccc;
    font-size: 15px;
    cursor: pointer;
    position: relative;
    &.is-readed:after{
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: -1px;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 50%;
      animation: dot .5s linear infinite alternate;
    }
  }
  @keyframes dot{
    0%{transform:scale(1);opacity:.5}
    to{transform:scale(1.5);opacity:.8}
  }
  .el-dropdown-link{
    font-size: 14px;
    cursor: pointer;
  }
</style>