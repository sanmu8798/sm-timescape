<template>
	<div class="page-city tabber-page">
		<!-- Header -->
		<header class="page-city__header">
			<div class="page-city__location" @click="state.showCityPicker = !state.showCityPicker">
				<MapPin :size="16" />
				<span class="page-city__city">{{ user.current_city }}</span>
				<ChevronDown :size="12" />
			</div>
			<div class="page-city__search">
				<Search :size="16" />
				<input v-model="state.searchKeyword" type="text" placeholder="请输入搜索关键词" />
			</div>
		</header>

		<!-- Category Tabs -->
		<div class="page-city__tabs">
			<div
				v-for="item in state.tabs"
				:key="item.key"
				:class="['page-city__tab', { active: state.activeTab === item.key }]"
				@click="() => (state.activeTab = item.key)"
			>
				<component :is="item.icon" :size="18" />
				<span>{{ item.label }}</span>
				<span v-if="item.badge" class="page-city__tab-badge">{{ item.badge }}</span>
			</div>
		</div>

		<!-- Content -->
		<div class="page-city__content">
			<!-- Food Tab -->
			<div v-show="state.activeTab === 'food'" class="page-city__tab-content">
				<div class="page-city__sub-filters">
					<div
						v-for="(item, index) in state.foodFilters"
						:key="index"
						:class="['page-city__filter-pill', { active: state.foodActiveFilter === item }]"
						@click="state.foodActiveFilter = item"
					>
						{{ item }}
					</div>
				</div>

				<!-- Featured Food -->
				<div class="page-city__food-featured" @click="onAlert()">
					<div class="page-city__food-featured-bg">
						<div class="page-city__food-featured-tag">今日必吃</div>
						<div class="page-city__food-featured-info">
							<h2 class="page-city__food-featured-name">{{ state.foodsList[0].name }}</h2>
							<p class="page-city__food-featured-origin">{{ state.foodsList[0].story.substring(0, 50) }}...</p>
							<div class="page-city__food-featured-meta">
								<span class="page-city__food-featured-rating"> <Star :size="12" /> {{ state.foodsList[0].rating }} </span>
								<span class="page-city__food-featured-city">{{ state.foodsList[0].city }}</span>
							</div>
						</div>
					</div>
				</div>

				<div class="page-city__section-title">
					<span>更多美食</span>
					<span class="page-city__section-more" @click="onAlert()">查看全部</span>
				</div>
				<div class="page-city__food-list">
					<div v-for="(item, index) in state.foodsList.slice(1)" :key="index" class="page-city__food-item" @click="onAlert()">
						<div class="page-city__food-item-img">
							<img :src="item.image" :alt="item.name" loading="lazy" />
							<div :class="['page-city__food-item-badge', item.checked ? 'done' : 'pending']">
								{{ item.checked ? "已打卡" : "待探索" }}
							</div>
						</div>
						<div class="page-city__food-item-body">
							<h3 class="page-city__food-item-name">{{ item.name }}</h3>
							<p class="page-city__food-item-city">{{ item.city }}</p>
							<p class="page-city__food-item-story">{{ item.story.substring(0, 60) }}...</p>
							<div class="page-city__food-item-footer">
								<span class="page-city__food-item-rating"> <Star :size="10" /> {{ item.rating }} </span>
								<span class="page-city__food-item-checkins">{{ item.checkIns }}人打卡</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Spot Tab -->
			<div v-show="state.activeTab === 'spot'" class="page-city__tab-content">
				<div class="page-city__sub-filters">
					<div
						v-for="filter in state.spotFilters"
						:key="filter"
						:class="['page-city__filter-pill', { active: state.spotActiveFilter === filter }]"
						@click="state.spotActiveFilter = filter"
					>
						{{ filter }}
					</div>
				</div>

				<div class="page-city__spot-list">
					<div v-for="(item, index) in state.spotsList" :key="index" class="page-city__spot-card" @click="onAlert()">
						<div class="page-city__spot-hero">
							<img :src="item.image" :alt="item.name" class="page-city__spot-hero-img" loading="lazy" />
							<div class="page-city__spot-hero-overlay" />
							<div class="page-city__spot-hero-tags">
								<span v-for="tag in item.tags" :key="tag" class="page-city__spot-hero-tag">{{ tag }}</span>
							</div>
							<div class="page-city__spot-hero-info">
								<p class="page-city__spot-hero-city">{{ item.city }} · {{ item.checked ? "已打卡" : "待探索" }}</p>
								<h2 class="page-city__spot-hero-name">{{ item.name }}</h2>
							</div>
						</div>
						<div class="page-city__spot-card-body">
							<p class="page-city__spot-desc">{{ item.story.substring(0, 80) }}...</p>
							<div class="page-city__spot-card-meta">
								<div class="page-city__spot-rating">
									<span class="page-city__spot-rating-score">{{ item.rating }}</span>
									<span class="page-city__spot-rating-count">{{ item.checkIns }}条评价</span>
								</div>
								<div :class="['page-city__spot-checkin-btn', item.checked ? 'done' : 'pending']">
									{{ item.checked ? "已打卡" : "去打卡" }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Custom Tab -->
			<div v-show="state.activeTab === 'custom'" class="page-city__tab-content">
				<div class="page-city__sub-filters">
					<div
						v-for="filter in state.customFilters"
						:key="filter"
						:class="['page-city__filter-pill', { active: state.customActiveFilter === filter }]"
						@click="state.customActiveFilter = filter"
					>
						{{ filter }}
					</div>
				</div>

				<!-- Featured Custom -->
				<div class="page-city__custom-featured" @click="onAlert()">
					<div class="page-city__custom-featured-tag">今日故事</div>
					<h2 class="page-city__custom-featured-title">{{ state.customsList[0].name }}</h2>
					<p class="page-city__custom-featured-excerpt">{{ state.customsList[0].story.substring(0, 100) }}...</p>
					<div class="page-city__custom-featured-meta">
						<span class="page-city__custom-author">{{ state.customsList[0].city }}</span>
						<span class="page-city__custom-read-more">阅读全文</span>
					</div>
				</div>

				<div class="page-city__section-title">
					<span>民俗文化</span>
					<span class="page-city__section-more" @click="onAlert()">更多</span>
				</div>

				<div class="page-city__custom-list">
					<div v-for="(item, index) in state.customsList.slice(1)" :key="index" class="page-city__custom-card" @click="onAlert()">
						<div class="page-city__custom-card-content">
							<div class="page-city__custom-card-tags">
								<span v-for="tag in item.tags" :key="tag" class="page-city__custom-card-tag">{{ tag }}</span>
							</div>
							<h3 class="page-city__custom-card-title">{{ item.name }}</h3>
							<p class="page-city__custom-card-region">{{ item.city }} · {{ item.province }}</p>
							<p class="page-city__custom-card-excerpt">{{ item.story.substring(0, 80) }}...</p>
						</div>
						<div class="page-city__custom-card-thumb">
							<img :src="item.image" :alt="item.name" loading="lazy" />
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- City Picker Modal -->
		<Transition name="modal">
			<div v-if="state.showCityPicker" class="page-city__modal-overlay" @click="state.showCityPicker = false">
				<div class="page-city__modal" @click.stop>
					<div class="page-city__modal-header">
						<h3 class="page-city__modal-title">选择城市</h3>
						<button class="page-city__modal-close" @click="state.showCityPicker = false">
							<X :size="16" />
						</button>
					</div>
					<div class="page-city__modal-section">
						<p class="page-city__modal-section-title">当前定位</p>
						<div class="page-city__location-card">
							<MapPin :size="20" />
							<div class="page-city__location-info">
								<p class="page-city__location-city">{{ user.current_city }}市</p>
								<p class="page-city__location-detail">{{ user.current_province }}省</p>
							</div>
						</div>
					</div>
					<div class="page-city__modal-section">
						<p class="page-city__modal-section-title">热门城市</p>
						<div class="page-city__city-grid">
							<div
								v-for="(item, index) in state.hotCities"
								:key="index"
								:class="['page-city__city-item', { active: user.current_city === item }]"
								@click="onAlert()"
							>
								{{ item }}
							</div>
						</div>
					</div>
					<div class="page-city__modal-section">
						<p class="page-city__modal-section-title">按省份浏览</p>
						<div class="page-city__province-list">
							<div v-for="(item, index) in state.provinces" :key="index" class="page-city__province-item" @click="onAlert()">
								{{ item.name }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script setup>
import { reactive, computed } from "vue"
import { MapPin, ChevronDown, Search, X, Star, UtensilsCrossed, Mountain, Palette } from "lucide-vue-next"
import { foodsList, spotsList, customsList, hotCities } from "@/mock/discover"
import { provinces } from "@/mock/base"
import { useBaseStore } from "@/stores/base"
import { showToast } from "vant"

const state = reactive({
	activeTab: "food",
	tabs: [
		{ key: "food", label: "美食", icon: UtensilsCrossed },
		{ key: "spot", label: "景点", icon: Mountain },
		{ key: "custom", label: "风俗", icon: Palette, badge: "新" },
	],
	foodFilters: ["全部", "川渝火锅", "粤式早茶", "西北面食", "江南小吃", "湘辣风味"],
	spotFilters: ["全部", "历史古迹", "自然风光", "古镇古村", "博物馆"],
	customFilters: ["全部", "传统节庆", "民间艺术", "饮食文化", "服饰民俗"],

	foodsList,
	spotsList,
	customsList,
	hotCities,
	provinces,
})

const baseStore = useBaseStore()
const user = computed(() => baseStore.user)

const onAlert = () => {
	showToast({
		message: "功能尚未开发，敬请期待",
		icon: "warning-o",
	})
}
</script>

<style lang="less" scoped>
.page-city {
	display: flex;
	flex-direction: column;
	height: 100vh;
	background: var(--bg-primary);

	.page-city__header {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-md);
		background: var(--color-primary);
		backdrop-filter: blur(12px);

		.page-city__location {
			display: flex;
			align-items: center;
			gap: 4px;
			padding: 8px 12px;
			background: rgba(255, 255, 255, 0.1);
			border-radius: 20px;
			color: rgba(255, 255, 255, 0.95);
			font-size: 13px;
			font-weight: 600;
			cursor: pointer;
			border: 1px solid rgba(255, 255, 255, 0.12);

			svg {
				color: rgba(255, 255, 255, 0.9);
			}
			.page-city__city {
				max-width: 60px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			svg:last-child {
				color: rgba(255, 255, 255, 0.6);
			}
		}

		.page-city__search {
			flex: 1;
			display: flex;
			align-items: center;
			gap: var(--spacing-sm);
			padding: 8px 14px;
			background: rgba(255, 255, 255, 0.1);
			border-radius: 20px;
			border: 1px solid rgba(255, 255, 255, 0.12);

			svg {
				color: rgba(255, 255, 255, 0.5);
				flex-shrink: 0;
			}
			input {
				flex: 1;
				background: transparent;
				border: none;
				outline: none;
				color: rgba(255, 255, 255, 0.95);
				font-size: 13px;
				&::placeholder {
					color: rgba(255, 255, 255, 0.4);
				}
			}
		}
	}

	.page-city__tabs {
		flex-shrink: 0;
		position: relative;
		display: flex;
		padding: 0 var(--spacing-md);
		gap: var(--spacing-sm);
		background: var(--color-primary);
		border-top: 1px solid #fff;
		.page-city__tab {
			position: relative;
			display: flex;
			align-items: center;
			gap: 6px;
			padding: 14px 0;
			font-size: 14px;
			font-weight: 500;
			color: rgba(255, 255, 255, 0.45);
			cursor: pointer;
			transition: all 0.3s ease;
			flex: 1;
			justify-content: center;

			svg {
				color: rgba(255, 255, 255, 0.45);
			}

			&.active {
				color: #fff;
				font-weight: 700;
				position: relative;
				svg {
					color: #fff;
				}
				&::after {
					content: "";
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					width: 60%;
					height: 4px;
					background: var(--accent-blue);
					border-radius: 2px;
				}
			}

			.page-city__tab-badge {
				position: absolute;
				top: 6px;
				right: 20%;
				background: var(--accent-blue);
				color: #fff;
				font-size: 9px;
				padding: 1px 6px;
				border-radius: 10px;
				font-weight: 600;
			}
		}
	}

	.page-city__content {
		flex: 1;
		overflow-y: auto;
		position: relative;
		z-index: 1;

		.page-city__tab-content {
			animation: fadeUp 0.4s ease;
		}

		.page-city__sub-filters {
			display: flex;
			gap: 8px;
			padding: var(--spacing-md) var(--spacing-md) var(--spacing-sm);
			overflow-x: auto;
			scrollbar-width: none;
			&::-webkit-scrollbar {
				display: none;
			}

			.page-city__filter-pill {
				padding: 7px 14px;
				border-radius: 20px;
				font-size: 12px;
				font-weight: 500;
				white-space: nowrap;
				cursor: pointer;
				transition: all 0.25s ease;
				background: var(--bg-card);
				color: var(--text-tertiary);
				border: 1px solid var(--border);
				flex-shrink: 0;

				&.active {
					background: var(--color-primary);
					color: #fff;
					border-color: transparent;
					box-shadow: 0 2px 12px rgba(35, 39, 48, 0.3);
				}
			}
		}

		.page-city__food-featured {
			margin: 8px var(--spacing-md) var(--spacing-lg);
			border-radius: var(--radius-lg);
			overflow: hidden;
			cursor: pointer;

			.page-city__food-featured-bg {
				height: 190px;
				background: var(--linear-gradient);
				position: relative;
				display: flex;
				align-items: flex-end;
				padding: var(--spacing-md);

				.page-city__food-featured-tag {
					position: absolute;
					top: var(--spacing-md);
					left: var(--spacing-md);
					background: rgba(0, 0, 0, 0.4);
					backdrop-filter: blur(8px);
					padding: 4px 10px;
					border-radius: 20px;
					font-size: 10px;
					color: rgba(255, 255, 255, 0.8);
					font-weight: 600;
					border: 1px solid rgba(255, 255, 255, 0.08);
				}

				.page-city__food-featured-info {
					position: relative;
					z-index: 2;

					.page-city__food-featured-name {
						font-size: 22px;
						font-weight: 900;
						color: #fff;
						margin: 0 0 6px;
					}

					.page-city__food-featured-origin {
						font-size: 12px;
						color: rgba(255, 255, 255, 0.5);
						line-height: 1.7;
						margin: 0 0 var(--spacing-sm);
					}

					.page-city__food-featured-meta {
						display: flex;
						align-items: center;
						gap: var(--spacing-md);

						.page-city__food-featured-rating {
							font-size: 12px;
							color: var(--accent-gold);
							font-weight: 600;
							display: flex;
							align-items: center;
							gap: 2px;
							svg {
								fill: var(--accent-gold);
							}
						}

						.page-city__food-featured-city {
							font-size: 11px;
							color: rgba(255, 255, 255, 0.35);
						}
					}
				}
			}
		}

		.page-city__section-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: var(--spacing-md) var(--spacing-md) var(--spacing-sm);
			font-size: 16px;
			font-weight: 700;
			color: var(--text-primary);

			.page-city__section-more {
				font-size: 12px;
				color: var(--text-tertiary);
				cursor: pointer;
			}
		}

		.page-city__food-list {
			padding: 0 var(--spacing-md) var(--spacing-lg);
			display: flex;
			flex-direction: column;
			gap: var(--spacing-md);

			.page-city__food-item {
				display: flex;
				align-items: center;
				padding: 12px 15px;
				gap: var(--spacing-md);
				background: var(--bg-card);
				border-radius: var(--radius-md);
				overflow: hidden;
				cursor: pointer;
				transition: all 0.3s ease;
				box-shadow: var(--shadow-soft);
				border: 1px solid var(--border);

				.page-city__food-item-img {
					width: 130px;
					height: 100px;
					flex-shrink: 0;
					position: relative;
					overflow: hidden;
					img {
						width: 100%;
						height: 100%;
						object-fit: cover;
						border-radius: var(--radius-sm);
					}

					.page-city__food-item-badge {
						position: absolute;
						top: 6px;
						left: 6px;
						padding: 2px 8px;
						border-radius: 10px;
						font-size: 9px;
						font-weight: 600;

						&.done {
							background: var(--color-primary);
							color: #fff;
						}
						&.pending {
							background: rgba(73, 73, 73, 0.8);
							color: #fff;
							border: 1px solid var(--border);
						}
					}
				}

				.page-city__food-item-body {
					flex: 1;
					min-width: 0;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.page-city__food-item-name {
						font-size: 15px;
						font-weight: 700;
						color: var(--text-primary);
						margin: 0 0 3px;
					}

					.page-city__food-item-city {
						font-size: 11px;
						color: var(--text-tertiary);
						margin: 0 0 6px;
					}

					.page-city__food-item-story {
						font-size: 11px;
						color: var(--text-secondary);
						line-height: 1.6;
						margin: 0 0 var(--spacing-sm);
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						overflow: hidden;
					}

					.page-city__food-item-footer {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.page-city__food-item-rating {
							font-size: 12px;
							color: var(--accent-gold);
							font-weight: 600;
							display: flex;
							align-items: center;
							gap: 2px;
							svg {
								fill: var(--accent-gold);
							}
						}

						.page-city__food-item-checkins {
							font-size: 10px;
							color: var(--text-tertiary);
						}
					}
				}
			}
		}

		.page-city__spot-list {
			padding: var(--spacing-sm) var(--spacing-md) var(--spacing-lg);
			display: flex;
			flex-direction: column;
			gap: var(--spacing-md);

			.page-city__spot-card {
				background: var(--bg-card);
				border-radius: var(--radius-lg);
				overflow: hidden;
				cursor: pointer;
				transition: all 0.3s ease;
				box-shadow: var(--shadow-card);
				border: 1px solid var(--border);

				.page-city__spot-hero {
					height: 170px;
					position: relative;

					.page-city__spot-hero-img {
						width: 100%;
						height: 100%;
						object-fit: cover;
					}

					.page-city__spot-hero-overlay {
						position: absolute;
						inset: 0;
						background: linear-gradient(to top, rgba(35, 39, 48, 0.85) 0%, rgba(35, 39, 48, 0.2) 50%, transparent 100%);
					}

					.page-city__spot-hero-tags {
						position: absolute;
						top: var(--spacing-md);
						left: var(--spacing-md);
						display: flex;
						gap: 6px;
						z-index: 2;

						.page-city__spot-hero-tag {
							padding: 3px 8px;
							border-radius: 6px;
							font-size: 10px;
							font-weight: 600;
							backdrop-filter: blur(8px);
							background: rgba(74, 142, 255, 0.7);
							color: #fff;
						}
					}

					.page-city__spot-hero-info {
						position: absolute;
						bottom: var(--spacing-md);
						left: var(--spacing-md);
						right: var(--spacing-md);
						z-index: 2;

						.page-city__spot-hero-city {
							font-size: 11px;
							color: rgba(255, 255, 255, 0.5);
							margin: 0 0 3px;
						}

						.page-city__spot-hero-name {
							font-size: 20px;
							font-weight: 900;
							color: #fff;
							margin: 0;
						}
					}
				}

				.page-city__spot-card-body {
					padding: var(--spacing-md);

					.page-city__spot-desc {
						font-size: 12px;
						color: var(--text-secondary);
						line-height: 1.8;
						margin: 0 0 var(--spacing-md);
					}

					.page-city__spot-card-meta {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.page-city__spot-rating {
							display: flex;
							align-items: center;
							gap: var(--spacing-sm);

							.page-city__spot-rating-score {
								font-size: 14px;
								font-weight: 700;
								color: var(--accent-gold);
							}

							.page-city__spot-rating-count {
								font-size: 11px;
								color: var(--text-tertiary);
							}
						}

						.page-city__spot-checkin-btn {
							padding: 7px 18px;
							border-radius: 20px;
							font-size: 12px;
							font-weight: 600;

							&.done {
								background: rgba(35, 39, 48, 0.1);
								color: var(--color-primary);
							}
							&.pending {
								background: var(--color-primary);
								color: #fff;
								box-shadow: 0 2px 12px rgba(35, 39, 48, 0.3);
							}
						}
					}
				}
			}
		}

		.page-city__custom-featured {
			margin: 8px var(--spacing-md) var(--spacing-md);
			background: var(--linear-gradient);
			border-radius: var(--radius-lg);
			padding: var(--spacing-lg);
			position: relative;
			overflow: hidden;
			cursor: pointer;
			border: 1px solid var(--border);

			&::before {
				content: "";
				position: absolute;
				top: -40%;
				right: -20%;
				width: 200px;
				height: 200px;
				background: radial-gradient(circle, rgba(35, 39, 48, 0.05) 0%, transparent 70%);
				border-radius: 50%;
			}

			.page-city__custom-featured-tag {
				display: inline-block;
				padding: 3px 10px;
				background: var(--accent-glow, rgba(35, 39, 48, 0.05));
				color: var(--color-primary-light);
				border-radius: 20px;
				font-size: 10px;
				font-weight: 600;
				margin-bottom: var(--spacing-md);
				border: 1px solid var(--border);
			}

			.page-city__custom-featured-title {
				font-size: 19px;
				font-weight: 900;
				color: var(--text-primary);
				margin: 0 0 var(--spacing-sm);
				line-height: 1.4;
			}

			.page-city__custom-featured-excerpt {
				font-size: 13px;
				color: var(--text-secondary);
				line-height: 1.8;
				margin: 0 0 var(--spacing-md);
			}

			.page-city__custom-featured-meta {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.page-city__custom-author {
					font-size: 11px;
					color: var(--text-tertiary);
				}

				.page-city__custom-read-more {
					font-size: 12px;
					color: var(--color-primary);
					font-weight: 600;
				}
			}
		}

		.page-city__custom-list {
			padding: 0 var(--spacing-md) var(--spacing-lg);
			display: flex;
			flex-direction: column;
			gap: var(--spacing-sm);

			.page-city__custom-card {
				background: var(--bg-card);
				border-radius: var(--radius);
				padding: var(--spacing-md);
				display: flex;
				gap: var(--spacing-md);
				cursor: pointer;
				transition: all 0.3s ease;
				box-shadow: var(--shadow-soft);
				border: 1px solid var(--border);

				.page-city__custom-card-content {
					flex: 1;
					min-width: 0;
				}

				.page-city__custom-card-tags {
					display: flex;
					gap: 6px;
					margin-bottom: var(--spacing-sm);

					.page-city__custom-card-tag {
						padding: 2px 8px;
						border-radius: 4px;
						font-size: 9px;
						font-weight: 600;
						background: rgba(35, 39, 48, 0.05);
						color: var(--color-primary-light);
					}
				}

				.page-city__custom-card-title {
					font-size: 15px;
					font-weight: 700;
					color: var(--text-primary);
					margin: 0 0 4px;
					line-height: 1.4;
				}

				.page-city__custom-card-region {
					font-size: 11px;
					color: var(--text-tertiary);
					margin: 0 0 var(--spacing-sm);
				}

				.page-city__custom-card-excerpt {
					font-size: 12px;
					color: var(--text-secondary);
					line-height: 1.7;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				.page-city__custom-card-thumb {
					width: 90px;
					height: 90px;
					border-radius: var(--radius-sm);
					flex-shrink: 0;
					overflow: hidden;
					img {
						width: 100%;
						height: 100%;
						object-fit: cover;
					}
				}
			}
		}
	}

	/* Modal */
	.page-city__modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		z-index: 300;
		display: flex;
		align-items: flex-start;
		justify-content: center;

		.page-city__modal {
			width: 100%;
			max-width: 430px;
			background: var(--bg-primary);
			border-radius: 0 0 24px 24px;
			max-height: 80vh;
			overflow-y: auto;

			.page-city__modal-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: var(--spacing-lg) var(--spacing-md) var(--spacing-md);
				border-bottom: 1px solid var(--border);

				.page-city__modal-title {
					font-size: 18px;
					font-weight: 700;
					color: var(--text-primary);
					margin: 0;
				}

				.page-city__modal-close {
					width: 32px;
					height: 32px;
					border-radius: 50%;
					background: var(--bg-card);
					border: 1px solid var(--border);
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
					color: var(--text-secondary);
				}
			}

			.page-city__modal-section {
				padding: var(--spacing-md);

				.page-city__modal-section-title {
					font-size: 11px;
					color: var(--text-tertiary);
					font-weight: 500;
					margin: 0 0 var(--spacing-sm);
					letter-spacing: 0.5px;
					text-transform: uppercase;
				}

				.page-city__location-card {
					background: var(--accent-glow, rgba(35, 39, 48, 0.05));
					border: 1px solid var(--border);
					border-radius: var(--radius);
					padding: var(--spacing-md);
					display: flex;
					align-items: center;
					gap: var(--spacing-md);

					svg {
						color: var(--color-primary);
					}

					.page-city__location-info {
						flex: 1;

						.page-city__location-city {
							font-size: 15px;
							font-weight: 700;
							color: var(--text-primary);
							margin: 0;
						}

						.page-city__location-detail {
							font-size: 11px;
							color: var(--text-tertiary);
							margin: 2px 0 0;
						}
					}
				}

				.page-city__city-grid {
					display: grid;
					grid-template-columns: repeat(4, 1fr);
					gap: 8px;

					.page-city__city-item {
						text-align: center;
						padding: 10px 4px;
						background: var(--bg-card);
						border-radius: var(--radius-sm);
						font-size: 13px;
						font-weight: 500;
						color: var(--text-secondary);
						cursor: pointer;
						transition: all 0.2s ease;
						border: 1px solid var(--border-light);

						&.active {
							background: var(--bg-hover);
							color: var(--color-primary);
							border-color: var(--color-primary);
							font-weight: 700;
						}
					}
				}

				.page-city__province-list {
					display: flex;
					flex-wrap: wrap;
					gap: 8px;

					.page-city__province-item {
						padding: 8px 14px;
						background: var(--bg-card);
						border-radius: 20px;
						font-size: 12px;
						color: var(--text-secondary);
						cursor: pointer;
						transition: all 0.2s ease;
						border: 1px solid var(--border-light);
					}
				}
			}
		}
	}
}

@keyframes fadeUp {
	from {
		opacity: 0;
		transform: translateY(10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.modal-enter-active,
.modal-leave-active {
	transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
	opacity: 0;
}
</style>
