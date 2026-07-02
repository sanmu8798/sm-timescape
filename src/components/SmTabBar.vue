<template>
	<div class="tab-bar">
		<div class="tab-bar-border"></div>
		<div
			v-for="(item, index) in state.tabbarData"
			:key="index"
			:class="['tab-bar-item', item.showStyle ? 'active' : '']"
			@click="switchTab(index, item.pageName)"
		>
			<img :src="tababr_bb" class="tab-bar-top-active" v-if="item.showStyle" />
			<img :src="tababr_bb" class="tab-bar-top" v-if="!item.showStyle" />
			<img :src="state.currentTabbarIndex === index ? item.activeIcon : item.icon" class="tab-bar-logo" />
			<div class="tab-bar-text">{{ item.text }}</div>
		</div>
	</div>
</template>

<script setup>
import { reactive, watch, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"

import tababr_bb from "@/assets/images/tab-bar-bb.png"
import home from "@/assets/images/home.png"
import homeActive from "@/assets/images/home-active.png"
import discover from "@/assets/images/discover.png"
import discoverActive from "@/assets/images/discover-active.png"
import addActive from "@/assets/images/add-active.png"
import square from "@/assets/images/square.png"
import squareActive from "@/assets/images/square-active.png"
import my from "@/assets/images/my.png"
import myActive from "@/assets/images/my-active.png"

const router = useRouter()
const route = useRoute()

const state = reactive({
	currentTabbarIndex: 0,
	tabbarData: [
		{
			pagePath: "/index",
			pageName: "PageIndex",
			text: "首页",
			icon: home,
			activeIcon: homeActive,
			showStyle: false,
		},
		{
			pagePath: "/discover",
			pageName: "PageDiscover",
			text: "发现",
			icon: discover,
			activeIcon: discoverActive,
			showStyle: false,
		},
		{
			pagePath: "",
			pageName: "",
			text: "打卡",
			icon: addActive,
			activeIcon: addActive,
			showStyle: true,
		},
		{
			pagePath: "/square",
			pageName: "PageSquare",
			text: "广场",
			icon: square,
			activeIcon: squareActive,
			showStyle: false,
		},
		{
			pagePath: "/profile",
			pageName: "PageProfile",
			text: "我的",
			icon: my,
			activeIcon: myActive,
			showStyle: false,
		},
	],
})

const processPage = () => {
	const index = state.tabbarData.findIndex((item) => item.pageName === route.name)
	if (index !== -1) {
		state.currentTabbarIndex = index
	}
}
processPage()

watch(
	() => route.name,
	() => {
		processPage()
	},
)

const switchTab = (index, pageName) => {
	if (index === 2) {
		router.push({ name: "PageCheckIn" })
	} else {
		state.currentTabbarIndex = index
		router.push({ name: pageName })
	}
}

onMounted(() => {
	processPage()
})
</script>

<style lang="less" scoped>
.tab-bar {
	position: fixed;
	z-index: 2000;
	bottom: 0;
	left: 0;
	right: 0;
	height: 90px;
	background: transparent;
	display: flex;
	align-items: flex-end;
	.tab-bar-border {
		background-color: #ffffff;
		z-index: 999;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 60px;
	}
	.tab-bar-item {
		margin-left: -1px; //为了解决深色背景下，每个item之间看起来好像有一点空隙间距
		flex: 1;
		z-index: 2000;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		overflow: hidden;
		height: 90px;
		position: relative;
		&.active {
			.tab-bar-logo {
				margin-top: 0 !important;
				width: 48px !important;
				height: 48px !important;
			}
		}
		.tab-bar-top-active {
			position: absolute;
			top: -2px;
			left: 50%;
			width: 619px;
			height: 39px;
			transform: translateX(-50%);
		}
		.tab-bar-top {
			position: absolute;
			top: -2.5px;
			left: 0;
			width: 619px;
			height: 39px;
		}
		.tab-bar-logo {
			position: relative;
			width: 24px;
			height: 24px;
			margin-top: 24px;
		}
		.tab-bar-text {
			font-size: 12px;
			padding-top: 5px;
			color: #878787;
		}
	}
}
</style>
