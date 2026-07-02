<template>
	<div class="page-favorites">
		<!-- Header -->
		<div class="favorites-header">
			<div class="favorites-back" @click="router.back()">
				<ChevronLeft :size="22" />
			</div>
			<div class="favorites-title">我的收藏</div>
			<div class="favorites-action" />
		</div>

		<!-- List -->
		<div class="favorites-list">
			<div v-for="item in favorites" :key="item.id" class="favorite-card" @click="goTarget(item)">
				<img :src="item.image" :alt="item.name" class="favorite-img" />
				<div class="favorite-body">
					<div class="favorite-name">{{ item.name }}</div>
					<div class="favorite-meta">
						<span class="favorite-type">{{ getTypeText(item.target_type) }}</span>
						<span class="favorite-city">{{ getCityName(item.city_id) }}</span>
					</div>
					<div class="favorite-time">收藏于 {{ item.create_time }}</div>
				</div>
				<div class="favorite-arrow">
					<ChevronRight :size="16" />
				</div>
			</div>
		</div>

		<!-- Empty -->
		<div v-if="!favorites.length" class="favorites-empty">
			<Heart :size="48" />
			<p>还没有收藏内容</p>
			<button class="favorites-explore" @click="goDiscover">去发现</button>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { ChevronLeft, ChevronRight, Heart } from "lucide-vue-next"
import { getCityById } from "@/mock/destinations"
import { favorites } from "@/mock/favorites"

const router = useRouter()

const typeTextMap = {
	city: "城市",
	attraction: "景点",
	food: "美食",
	custom: "风俗",
}

function getTypeText(type) {
	return typeTextMap[type] || "其他"
}

function getCityName(cityId) {
	return getCityById(cityId)?.name || ""
}

function goTarget(item) {
	switch (item.target_type) {
		case "city":
			router.push({ name: "PageCityDetail", params: { id: item.target_id } })
			break
		case "food":
			router.push({ name: "PageFoodDetail", params: { id: item.target_id } })
			break
		case "custom":
			router.push({ name: "PageCustomDetail", params: { id: item.target_id } })
			break
		case "attraction":
		default:
			router.push({ name: "PageDestinationDetail", params: { id: item.target_id } })
	}
}

function goDiscover() {
	router.push({ name: "PageDiscover" })
}
</script>

<style lang="less" scoped>
.page-favorites {
	min-height: 100vh;
	background: var(--bg-primary);
	color: var(--text-primary);
	max-width: 430px;
	margin: 0 auto;
	padding-bottom: 24px;
	position: relative;
	overflow-x: hidden;

	.favorites-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 16px;
		max-width: 430px;
		margin: 0 auto;
		color: var(--text-primary);
		background: rgba(10, 10, 15, 0.85);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--border-color);

		.favorites-back {
			width: 36px;
			height: 36px;
			border-radius: 50%;
			background: rgba(255, 255, 255, 0.08);
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
		}

		.favorites-title {
			font-size: 16px;
			font-weight: 600;
		}

		.favorites-action {
			width: 36px;
		}
	}

	.favorites-list {
		padding: 76px 20px 0;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.favorite-card {
		display: flex;
		align-items: center;
		gap: 14px;
		background: var(--bg-card);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-lg);
		padding: 12px;
		cursor: pointer;

		.favorite-img {
			width: 72px;
			height: 72px;
			border-radius: var(--radius-md);
			object-fit: cover;
			flex-shrink: 0;
		}

		.favorite-body {
			flex: 1;
			min-width: 0;

			.favorite-name {
				font-size: 15px;
				font-weight: 600;
				margin-bottom: 6px;
			}

			.favorite-meta {
				display: flex;
				align-items: center;
				gap: 8px;
				margin-bottom: 6px;

				.favorite-type {
					font-size: 11px;
					padding: 2px 8px;
					border-radius: 20px;
					background: rgba(212, 168, 67, 0.12);
					color: var(--accent-gold);
				}

				.favorite-city {
					font-size: 12px;
					color: var(--text-secondary);
				}
			}

			.favorite-time {
				font-size: 11px;
				color: var(--text-tertiary);
			}
		}

		.favorite-arrow {
			color: var(--text-tertiary);
			flex-shrink: 0;
		}
	}

	.favorites-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 120px;
		color: var(--text-tertiary);

		p {
			margin: 16px 0 20px;
			font-size: 14px;
		}

		.favorites-explore {
			padding: 10px 24px;
			border-radius: var(--radius-md);
			background: var(--accent-gold);
			color: #fff;
			font-size: 14px;
			font-weight: 600;
			border: none;
			cursor: pointer;
		}
	}
}
</style>
