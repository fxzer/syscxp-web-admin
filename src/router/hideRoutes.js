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
    name: "AddEditNew",
    path: "/news/add_edit",
    component: () => import("@/views/about/news/components/AddEditNew.vue"),
    meta: {
      title: "添加新闻",
    },
  },
  {
    name: "AddEditCase",
    path: "/cases/add_edit",
    component: () => import("@/views/cases/selectedCase/components/AddEditCase.vue"),
    meta: {
      title: "添加精选案例",
    },
  },
  {
    name: "AddEditKnowledge",
    path: "/knowledge/add_edit",
    component: () => import("@/views/data/knowledge/components/AddEditKnowledge.vue"),
    meta: {
      title: "添加知识",  
    },
  },
];
