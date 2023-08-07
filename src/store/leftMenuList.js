export default [
  {
    name: "home",
    label: "首页",
    path: "/home",
    iconClass: "iconfont icon-home-fill",
    pathExp: /home|swiperSlide|quickEntry/,
    componentPath: "views/home/index.vue",
    subMenu: [
      {
        name: "swiperSlide",
        label: "轮播图",
        path: "/swiperSlide",
        componentPath: "views/home/swiperSlide/index.vue",
      },
      {
        name: "quickEntry",
        label: "快捷入口",
        path: "/quickEntry",
        componentPath: "views/home/quickEntry/index.vue",
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
        label: "公司简介",
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
        label: "新闻资讯",
        path: "/news",
        iconClass: "iconfont icon-database",
        componentPath: "views/about/news/index.vue",
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
];
