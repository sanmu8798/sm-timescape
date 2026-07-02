<template>
	<div class="page-edit-profile">
		<!-- Header -->
		<div class="edit-header">
			<div class="edit-back" @click="router.back()">
				<ChevronLeft :size="22" />
			</div>
			<div class="edit-title">编辑资料</div>
			<div class="edit-save" :class="{ disabled: !state.nickname.trim() }" @click="handleSave">保存</div>
		</div>

		<!-- Avatar -->
		<div class="avatar-section">
			<div class="avatar-edit">
				<img :src="user.avatar" :alt="user.nickname" class="avatar-img" />
				<div class="avatar-mask">
					<Camera :size="18" />
				</div>
			</div>
			<div class="avatar-tip">点击更换头像</div>
		</div>

		<!-- Form -->
		<div class="edit-form">
			<div class="form-row">
				<div class="form-label">昵称</div>
				<input v-model="state.nickname" class="form-input" type="text" placeholder="请输入昵称" maxlength="20" />
			</div>
			<div class="form-row">
				<div class="form-label">个性签名</div>
				<input v-model="state.bio" class="form-input" type="text" placeholder="用一句话介绍自己" maxlength="50" />
			</div>
			<div class="form-row">
				<div class="form-label">手机号</div>
				<input v-model="state.phone" class="form-input" type="tel" placeholder="请输入手机号" maxlength="11" />
			</div>
		</div>

		<!-- Tips -->
		<div class="edit-tips">
			<Info :size="14" />
			<span>头像上传功能 Demo 阶段暂未开放</span>
		</div>
	</div>
</template>

<script setup>
import { reactive, computed } from "vue"
import { useRouter } from "vue-router"
import { ChevronLeft, Camera, Info } from "lucide-vue-next"
import { showToast } from "vant"
import { useBaseStore } from "@/stores/base"
import { profile, updateProfile } from "@/mock/user"

const router = useRouter()
const baseStore = useBaseStore()
const user = computed(() => baseStore.user || profile)

const state = reactive({
	nickname: user.value.nickname || "",
	bio: user.value.bio || "",
	phone: user.value.phone || "",
})

function handleSave() {
	if (!state.nickname.trim()) {
		showToast({ message: "昵称不能为空", icon: "warning-o" })
		return
	}

	updateProfile({
		nickname: state.nickname.trim(),
		bio: state.bio.trim(),
		phone: state.phone.trim(),
	})

	baseStore.setUser(profile)

	showToast({ message: "资料已保存", icon: "success-o" })

	setTimeout(() => {
		router.back()
	}, 800)
}
</script>

<style lang="less" scoped>
.page-edit-profile {
	min-height: 100vh;
	background: var(--bg-primary);
	color: var(--text-primary);
	max-width: 430px;
	margin: 0 auto;
	position: relative;
	overflow-x: hidden;

	.edit-header {
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

		.edit-back {
			width: 36px;
			height: 36px;
			border-radius: 50%;
			background: rgba(255, 255, 255, 0.08);
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
		}

		.edit-title {
			font-size: 16px;
			font-weight: 600;
		}

		.edit-save {
			font-size: 14px;
			font-weight: 600;
			color: var(--accent-gold);
			cursor: pointer;
			padding: 6px 10px;

			&.disabled {
				color: var(--text-tertiary);
				cursor: not-allowed;
			}
		}
	}

	.avatar-section {
		padding-top: 92px;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 28px;

		.avatar-edit {
			position: relative;
			width: 86px;
			height: 86px;
			border-radius: 50%;
			overflow: hidden;
			border: 2px solid var(--border-color);
			cursor: pointer;

			.avatar-img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}

			.avatar-mask {
				position: absolute;
				inset: 0;
				background: rgba(0, 0, 0, 0.45);
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
			}
		}

		.avatar-tip {
			margin-top: 10px;
			font-size: 12px;
			color: var(--text-tertiary);
		}
	}

	.edit-form {
		padding: 0 20px;

		.form-row {
			background: var(--bg-card);
			border: 1px solid var(--border-color);
			border-radius: var(--radius-lg);
			padding: 14px 16px;
			margin-bottom: 12px;

			.form-label {
				font-size: 12px;
				color: var(--text-tertiary);
				margin-bottom: 8px;
			}

			.form-input {
				width: 100%;
				background: transparent;
				border: none;
				outline: none;
				font-size: 15px;
				color: var(--text-primary);

				&::placeholder {
					color: var(--text-tertiary);
				}
			}
		}
	}

	.edit-tips {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		margin-top: 24px;
		font-size: 12px;
		color: var(--text-tertiary);

		svg {
			color: var(--text-tertiary);
		}
	}
}
</style>
