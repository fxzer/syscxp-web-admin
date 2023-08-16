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
  {
    name: "AddKnowledge",
    path: "/knowledge/add",
    component: () => import("@/views/data/knowledge/components/AddKnowledge.vue"),
    meta: {
      title: "添加知识",  
    },
  },
  {
    name: "EditKnowledge",
    path: "/knowledge/edit",
    component: () => import("@/views/data/knowledge/components/EditKnowledge.vue"),
    meta: {
      title: "修改知识",
    },
  },

];
