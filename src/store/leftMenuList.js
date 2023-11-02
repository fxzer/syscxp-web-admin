export default [
  {
    name: "home",
    label: "首页",
    path: "/home",
    iconClass: "iconfont icon-home-fill",
    pathExp: /home|swiperSlide|quickAccess/,
    componentPath: "views/home/index.vue",
    subMenu: [
      {
        name: "swiperSlide",
        label: "轮播图",
        path: "/swiperSlide",
        componentPath: "views/home/swiperSlide/index.vue",
      },
      {
        name: "quickAccess",
        label: "快捷入口",
        path: "/quickAccess",
        componentPath: "views/home/quickAccess/index.vue",
      },
    ]
  },
 
  {
    name: "cases",
    label: "客户案例",
    path: "/cases",
    iconClass: "iconfont icon-database",
    pathExp: /cases|selectedCase|industryCase/,
    componentPath: "views/cases/index.vue",
    subMenu: [
      {
        name: "selectedCase",
        label: "精选案例",
        path: "/selectedCase",
        componentPath: "views/cases/selectedCase/index.vue",
      },
      {
        name: "industryCase",
        label: "行业案例",
        path: "/industryCase",
        componentPath: "views/cases/industryCase/index.vue",
      },
    ]
  },
  {
    name: "data",
    label: "资料中心",
    path: "/data",
    iconClass: "iconfont icon-database",
    pathExp: /data|knowledge|whitepaper/,
    componentPath: "views/data/index.vue",
    subMenu: [
      {
        name: "whitepaper",
        label: "白皮书",
        path: "/whitepaper",
        componentPath: "views/data/whitepaper/index.vue",
      },
      {
        name: "knowledge",
        label: "知识库",
        path: "/knowledge",
        componentPath: "views/data/knowledge/index.vue",
      },

    ]
  },
  {
    name: "about",
    label: "关于我们",
    path: "/about",
    iconClass: "iconfont icon-about",
    pathExp: /about|Pagenews|devHistory|professionQual/,
    componentPath: "views/home/index.vue",
    subMenu: [
      {
        name: "introduction",
        label: "犀思简介",
        path: "/introduction",
        componentPath: "views/about/introduction/index.vue",
      },
      {
        name: "professionQual",
        label: "专业资质",
        path: "/professionQual",


        componentPath: "views/about/professionQual/index.vue",
      },
      {
        name: "devHistory",
        label: "发展史",
        path: "/devHistory",
        componentPath: "views/about/devHistory/index.vue",
      },
      {
        name: "news",
        label: "新闻媒体",
        path: "/news",
        iconClass: "iconfont icon-database",
        componentPath: "views/about/news/index.vue",
      },

    ]
  },
];
