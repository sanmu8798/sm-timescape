<template>
	<div class="page-check-in">
		<!-- Header -->
		<div class="checkin-header">
			<div class="checkin-back" @click="router.back()">
				<ChevronLeft :size="22" />
			</div>
			<div class="checkin-title">发布打卡</div>
			<div class="checkin-submit" :class="{ disabled: !state.content.trim() }" @click="handleSubmit">发布</div>
		</div>

		<!-- Target Card -->
		<div class="checkin-target">
			<div class="target-icon">{{ targetIcon }}</div>
			<div class="target-info">
				<div class="target-type">{{ targetTypeText }}</div>
				<h2 class="target-name">{{ target?.name }}</h2>
				<div class="target-city" @click="goCity">
					<MapPin :size="12" />
					<span>{{ city?.name }}</span>
				</div>
			</div>
		</div>

		<!-- Content -->
		<div class="checkin-form">
			<textarea v-model="state.content" class="checkin-textarea" placeholder="分享你的旅行故事，让更多人看到这座城市的美..." maxlength="500" />
			<div class="checkin-word-count">{{ state.content.length }}/500</div>

			<!-- Images -->
			<div class="checkin-images">
				<div v-for="(img, idx) in state.images" :key="idx" class="checkin-image-item">
					<img :src="img" :alt="`图片${idx + 1}`" />
					<div class="image-remove" @click="removeImage(idx)">
						<X :size="14" />
					</div>
				</div>
				<div v-if="state.images.length < 9" class="checkin-image-add" @click="addImage">
					<Camera :size="24" />
					<span>添加图片</span>
				</div>
			</div>
		</div>

		<!-- Location -->
		<div class="checkin-options">
			<div class="option-row">
				<div class="option-left">
					<MapPin :size="18" />
					<span class="option-label">所在位置</span>
				</div>
				<div class="option-right">
					<span class="option-value">{{ state.location || targetLocation }}</span>
					<ChevronRight :size="16" />
				</div>
			</div>
			<div class="option-row">
				<div class="option-left">
					<Tag :size="18" />
					<span class="option-label">添加话题</span>
				</div>
				<div class="option-right">
					<span class="option-value">{{ state.topic || "可选" }}</span>
					<ChevronRight :size="16" />
				</div>
			</div>
		</div>

		<!-- Tips -->
		<div class="checkin-tips">
			<div class="tips-title">
				<Sparkles :size="14" />
				<span>打卡小贴士</span>
			</div>
			<p class="tips-text">上传真实照片、写下真实感受，有机会解锁「{{ city?.badge_name || "城市探索者" }}」徽章哦。</p>
		</div>

		<!-- Submit Button -->
		<div class="checkin-footer">
			<button class="checkin-publish-btn" :disabled="!state.content.trim()" @click="handleSubmit">
				<MapPin :size="18" />
				<span>立即打卡</span>
			</button>
		</div>
	</div>
</template>

<script setup>
import { reactive, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { ChevronLeft, MapPin, Camera, X, ChevronRight, Tag, Sparkles } from "lucide-vue-next"
import { showToast } from "vant"
import { getCityById, getTargetByTypeAndId } from "@/mock/destinations"
import { addCheckin } from "@/mock/checkins"
import { refreshBadges } from "@/mock/badges"
import { profile, syncUserStats } from "@/mock/user"
import { useBaseStore } from "@/stores/base"
import cityImage from "@/assets/images/city.jpg"

const route = useRoute()
const router = useRouter()
const baseStore = useBaseStore()

const targetType = computed(() => route.query.type || "city")
const targetId = computed(() => route.query.target_id)
const cityId = computed(() => route.query.city_id)

const target = computed(() => getTargetByTypeAndId(targetType.value, targetId.value))
const city = computed(() => getCityById(cityId.value))

const targetTypeMap = {
	city: { text: "城市打卡", icon: "🏙" },
	attraction: { text: "景点打卡", icon: "🏔" },
	food: { text: "美食打卡", icon: "🍜" },
	custom: { text: "风俗打卡", icon: "🎭" },
}

const targetTypeText = computed(() => targetTypeMap[targetType.value]?.text || "打卡")
const targetIcon = computed(() => targetTypeMap[targetType.value]?.icon || "📍")
const targetLocation = computed(() => {
	if (targetType.value === "attraction") return target.value?.address
	if (targetType.value === "food") return target.value?.restaurant
	return city.value?.name
})

const state = reactive({
	content: "",
	images: [],
	location: "",
	topic: "",
})

function addImage() {
	state.images.push(cityImage)
}

function removeImage(idx) {
	state.images.splice(idx, 1)
}

function goCity() {
	if (city.value?.id) {
		router.push({ name: "PageCityDetail", params: { id: city.value.id } })
	}
}

function handleSubmit() {
	if (!state.content.trim()) {
		showToast({ message: "请输入打卡内容", icon: "warning-o" })
		return
	}

	addCheckin({
		user_id: profile.id,
		target_type: targetType.value,
		target_id: Number(targetId.value),
		target_name: target.value?.name || city.value?.name || "",
		city_id: Number(cityId.value),
		content: state.content.trim(),
		images: state.images.length ? state.images : [cityImage],
		location: state.location || targetLocation.value || city.value?.name || "",
	})

	refreshBadges()
	syncUserStats()
	baseStore.setUser(profile)

	showToast({
		message: "打卡成功，徽章进度已更新",
		icon: "success-o",
	})

	setTimeout(() => {
		router.push({ name: "PageCheckInRecord" })
	}, 1500)
}
</script>

<style lang="less" scoped>
.page-check-in {
	min-height: 100vh;
	background: var(--bg-primary);
	color: var(--text-primary);
	max-width: 430px;
	margin: 0 auto;
	padding-bottom: 100px;
	position: relative;
	overflow-x: hidden;

	.checkin-header {
		position: sticky;
		top: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 16px;
		background: var(--bg-primary);
		border-bottom: 1px solid var(--border-color);

		.checkin-back {
			width: 36px;
			height: 36px;
			border-radius: 50%;
			background: var(--bg-glass);
			border: 1px solid var(--border-color);
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			color: var(--text-primary);
		}

		.checkin-title {
			font-size: 16px;
			font-weight: 700;
		}

		.checkin-submit {
			padding: 7px 16px;
			border-radius: 18px;
			background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary));
			color: #fff;
			font-size: 13px;
			font-weight: 700;
			cursor: pointer;

			&.disabled {
				opacity: 0.5;
				cursor: not-allowed;
			}
		}
	}

	.checkin-target {
		display: flex;
		align-items: center;
		gap: 14px;
		margin: 20px;
		padding: 16px;
		background: var(--bg-card);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);

		.target-icon {
			width: 52px;
			height: 52px;
			border-radius: 50%;
			background: linear-gradient(135deg, rgba(212, 168, 67, 0.15), rgba(212, 168, 67, 0.05));
			border: 1px solid rgba(212, 168, 67, 0.2);
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 24px;
			flex-shrink: 0;
		}

		.target-info {
			flex: 1;
			min-width: 0;

			.target-type {
				font-size: 11px;
				color: var(--accent-gold);
				margin-bottom: 4px;
			}

			.target-name {
				font-size: 17px;
				font-weight: 700;
				margin-bottom: 6px;
			}

			.target-city {
				display: flex;
				align-items: center;
				gap: 4px;
				font-size: 12px;
				color: var(--text-tertiary);
				cursor: pointer;
			}
		}
	}

	.checkin-form {
		margin: 0 20px 20px;
		padding: 16px;
		background: var(--bg-card);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);

		.checkin-textarea {
			width: 100%;
			min-height: 140px;
			background: transparent;
			border: none;
			outline: none;
			color: var(--text-primary);
			font-size: 15px;
			line-height: 1.7;
			resize: none;

			&::placeholder {
				color: var(--text-tertiary);
			}
		}

		.checkin-word-count {
			text-align: right;
			font-size: 11px;
			color: var(--text-tertiary);
			margin-bottom: 16px;
		}

		.checkin-images {
			display: flex;
			flex-wrap: wrap;
			gap: 10px;

			.checkin-image-item {
				width: 80px;
				height: 80px;
				border-radius: var(--radius-md);
				overflow: hidden;
				position: relative;

				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}

				.image-remove {
					position: absolute;
					top: 4px;
					right: 4px;
					width: 20px;
					height: 20px;
					border-radius: 50%;
					background: rgba(0, 0, 0, 0.5);
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
				}
			}

			.checkin-image-add {
				width: 80px;
				height: 80px;
				border-radius: var(--radius-md);
				border: 1px dashed var(--border-color);
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				gap: 6px;
				color: var(--text-tertiary);
				cursor: pointer;

				span {
					font-size: 11px;
				}
			}
		}
	}

	.checkin-options {
		margin: 0 20px 20px;
		background: var(--bg-card);
		border: 1px solid var(--border-color);
		border-radius: var(--radius-xl);
		overflow: hidden;

		.option-row {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 16px;
			cursor: pointer;

			&:not(:last-child) {
				border-bottom: 1px solid var(--border-color);
			}

			.option-left {
				display: flex;
				align-items: center;
				gap: 10px;
				color: var(--text-secondary);

				svg {
					color: var(--accent-gold);
				}

				.option-label {
					font-size: 14px;
					font-weight: 500;
				}
			}

			.option-right {
				display: flex;
				align-items: center;
				gap: 6px;
				color: var(--text-tertiary);

				.option-value {
					font-size: 13px;
					max-width: 160px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				svg {
					color: var(--text-tertiary);
				}
			}
		}
	}

	.checkin-tips {
		margin: 0 20px;
		padding: 16px;
		background: rgba(212, 168, 67, 0.06);
		border: 1px solid rgba(212, 168, 67, 0.12);
		border-radius: var(--radius-xl);

		.tips-title {
			display: flex;
			align-items: center;
			gap: 6px;
			font-size: 13px;
			font-weight: 700;
			color: var(--accent-gold);
			margin-bottom: 8px;
		}

		.tips-text {
			font-size: 12px;
			color: var(--text-secondary);
			line-height: 1.6;
		}
	}

	.checkin-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 12px 20px 24px;
		background: var(--bg-primary);
		max-width: 430px;
		margin: 0 auto;
		z-index: 50;

		.checkin-publish-btn {
			width: 100%;
			padding: 15px;
			border: none;
			border-radius: var(--radius-md);
			background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary));
			color: #fff;
			font-size: 15px;
			font-weight: 700;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 8px;
			cursor: pointer;
			box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

			&:disabled {
				opacity: 0.5;
				cursor: not-allowed;
			}
		}
	}
}
</style>
