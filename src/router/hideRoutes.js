export default [
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/login/Login.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    name: "AddNew",
    path: "/news/add",
    component: () => import("@/views/about/news/components/AddNew.vue"),
    meta: {
      title: "添加新闻",
    },
  },
  {
    name: "EditNew",
    path: "/news/edit",
    component: () => import("@/views/about/news/components/EditNew.vue"),
    meta: {
      title: "修改新闻",
    },
  },

];
