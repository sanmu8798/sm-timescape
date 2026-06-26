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
import { reactive, onMounted } from "vue"
import { useVibrate } from "@/hooks"
import { useRouter, useRoute } from "vue-router"

import tababr_bb from "@/assets/images/tab-bar-bb.png"
import bill from "@/assets/images/bill.png"
import activeBill from "@/assets/images/bill-active.png"
import chart from "@/assets/images/chart.png"
import activeChart from "@/assets/images/chart-active.png"
import activeAccounting from "@/assets/images/accounting-active.png"
import asset from "@/assets/images/asset.png"
import activeAsset from "@/assets/images/asset-active.png"
import my from "@/assets/images/my.png"
import activeMy from "@/assets/images/my-active.png"

const router = useRouter()
const route = useRoute()

const state = reactive({
	currentTabbarIndex: 0,
	tabbarData: [
		{
			pagePath: "/index",
			pageName: "PageIndex",
			text: "首页",
			icon: bill,
			activeIcon: activeBill,
			showStyle: false,
		},
		{
			pagePath: "/discover",
			pageName: "PageDiscover",
			text: "发现",
			icon: chart,
			activeIcon: activeChart,
			showStyle: false,
		},
		{
			pagePath: "",
			pageName: "",
			text: "打卡",
			icon: activeAccounting,
			activeIcon: activeAccounting,
			showStyle: true,
		},
		{
			pagePath: "/square",
			pageName: "PageSquare",
			text: "广场",
			icon: asset,
			activeIcon: activeAsset,
			showStyle: false,
		},
		{
			pagePath: "/profile",
			pageName: "PageProfile",
			text: "我的",
			icon: my,
			activeIcon: activeMy,
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

const switchTab = (index, pageName) => {
	if (index === 2) {
		state.currentItem = null
	} else {
		state.currentTabbarIndex = index
		router.push({ name: pageName })
	}
	useVibrate()
}

onMounted(() => {
	switchTab(state.currentTabbarIndex, state.tabbarData[state.currentTabbarIndex]?.pageName)
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
			top: -1px;
			left: 50%;
			width: 619px;
			height: 39px;
			margin-left: -309.5px;
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
