<template>
	<div class="side-bar" :class="{ 'side-bar_open': leftMenuOpen, 'side-bar_close': !leftMenuOpen }">
		<h1 class="side-title">
			<img src="../assets/images/logo.svg" width="40" height="40" v-show="!leftMenuOpen" />
			<span v-show="leftMenuOpen">官网后台管理</span>
		</h1>
		<vuescroll>
			<el-menu router class="el-menu-vertical" active-text-color="#fff" background-color="#001529" text-color="#fff"
				:collapse="!leftMenuOpen" :collapse-transition="false" :default-active="currentPath">
				<template v-for="(item, idx) in leftMenuList">
					<el-submenu :key="item.name" v-if="item.subMenu" :index="item.path" :show-timeout="100" :hide-timeout="100">
						<template slot="title">
							<i class="menu-icon" :class="item.iconClass"></i>
							<span>{{ item.label }}</span>
						</template>
						<el-menu-item v-for="menuItem in item.subMenu" :class="{ 'divider-menu-item': menuItem.isDivider }"
							:index="menuItem.path" :key="menuItem.name">{{ menuItem.label }}</el-menu-item>
					</el-submenu>
					<el-menu-item :key="idx" v-else :index="item.path">
						<i class="menu-icon" :class="item.iconClass"></i>
						<span slot="title">{{ item.label }}</span>
					</el-menu-item>
				</template>
			</el-menu>
		</vuescroll>
		<span class="toggle-left-menu" :title="leftMenuOpen ? '收起' : '展开'" :class="{
			'el-icon-s-unfold': !leftMenuOpen,
			'el-icon-s-fold': leftMenuOpen,
		}" @click="toggleLeftMenu"></span>
	</div>
</template>

<script>
import { mapState } from "vuex"
import Cookies from "js-cookie";

export default {
	name: "LeftNav",
	computed: {
		...mapState(["leftMenuOpen", "leftMenuList"]),
	},
	data() {
		return {
			currentPath: '',
		}
	},
	methods: {
		toggleLeftMenu() {
			Cookies.set("sdwan_sidebar", this.leftMenuOpen ? "close" : "open", {
				path: "/",
			});
			this.$store.commit("toggleLeftMenu", !this.leftMenuOpen);
		},
	},
	watch: {
		'$route': function (val) {
			if (val) {
				const path = val.path;
				const nextIndex = path.indexOf('/', 1);
				this.currentPath = nextIndex === -1 ? path : path.slice(0, nextIndex);

			}
		}
	}
}
</script>

<style lang="scss" scoped>
.side-bar {
	position: absolute;
	padding-top: 60px;
	padding-bottom: 40px;
	height: 100%;
	background: #001529;
	box-sizing: border-box;
}

.toggle-left-menu {
	position: absolute;
	bottom: 10px;
	right: 20px;
	color: #fff;
	cursor: pointer;

	&:hover {
		color: #57A9FB
	}
}

.side-bar_close {
	width: 64px;
}

.side-bar_open {
	width: 200px;
}

.side-title {
	position: absolute;
	top: 0;
	padding-left: 10px;
	height: 60px;
	line-height: 60px;
	color: #fff;

	img {
		vertical-align: middle;
	}

	span {
		margin-left: 10px;
	}
}

.iconfont {
	display: inline-block;
	width: 24px;
	text-align: center;
	font-size: 18px;
}

.menu-icon {
	color: rgb(238, 238, 238);
	padding-right: 3px;
}

.menu-icon:hover {
	transform: scale(1.2);
	transition: .1s ease-in;
}

//收缩前样式

.el-submenu ::v-deep .el-menu-item {
	background-color: #0e2133 !important;
}

.el-menu ::v-deep .el-submenu .el-submenu__title:hover,
.el-menu .el-menu-item:hover,
.el-submenu ::v-deep .el-menu-item:hover {
	background-color: #69b1f99e !important;
}

.el-submenu ::v-deep .el-menu-item.is-active {
	background-color: #57A9FB !important;
}

.el-submenu .el-menu-item.divider-menu-item {
	height: 24px !important;
	line-height: 24px !important;
	background-color: #2e4152 !important;
	font-size: 14px;
	cursor: not-allowed;
}

// 收缩后副菜单样式
.el-menu-vertical {
	border-right: 0;
}

.el-menu--vertical .divider-menu-item {
	height: 24px !important;
	line-height: 24px !important;
	background-color: #2E4152 !important;
	font-size: 12px;
	cursor: not-allowed;
}

.el-menu--vertical .el-menu-item.is-active {
	background-color: #57A9FB !important;
}
</style>
