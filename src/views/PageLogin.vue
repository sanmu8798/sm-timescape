<template>
	<div class="page-login">
		<!-- Floating Orbs -->
		<div class="orb orb-1" />
		<div class="orb orb-2" />
		<div class="orb orb-3" />

		<!-- Page -->
		<div class="login-page">
			<!-- Brand -->
			<div class="brand-area">
				<div class="brand-icon-wrap">
					<div class="brand-glow" />
					<MapPin :size="34" color="rgba(212,168,67,0.8)" />
				</div>
				<div class="brand-name">时光集</div>
				<div class="brand-slogan">SM TIMESCAPE</div>
			</div>

			<!-- Form Area -->
			<div class="form-area">
				<div class="input-group">
					<div class="input-wrap">
						<User class="input-icon" :size="18" />
						<input v-model="state.account" class="input-field" type="text" placeholder="请输入账号" required />
						<div v-if="state.account" class="input-clear" @click="state.account = ''">
							<X :size="10" />
						</div>
					</div>
				</div>

				<div class="input-group">
					<div class="input-wrap">
						<KeyRound class="input-icon" :size="18" />
						<input v-model="state.password" class="input-field" :type="state.pwdVisible ? 'text' : 'password'" placeholder="请输入密码" />
						<div class="pwd-toggle" @click="state.pwdVisible = !state.pwdVisible">
							<EyeOff v-if="!state.pwdVisible" :size="18" />
							<Eye v-if="state.pwdVisible" :size="18" />
						</div>
					</div>
				</div>

				<div>
					<button :class="['submit-btn', 'primary', { loading: state.loading }]" @click="handleLogin">
						<span class="btn-text">登 录</span>
						<div class="btn-loading-spinner" />
					</button>
				</div>

				<div>
					<button class="submit-btn secondary" @click="handleBackHome">
						<span class="btn-text">返回首页</span>
					</button>
				</div>

				<div class="form-extras">
					<span class="form-link">忘记密码？</span>
					<span class="form-link">注册账号</span>
				</div>
			</div>

			<!-- Terms -->
			<div class="terms-area">
				<div :class="['terms-wrap', { shake: state.shakeTerms }]">
					<div :class="['terms-checkbox', { checked: state.termsAccepted }]" @click="state.termsAccepted = !state.termsAccepted">
						<Check :size="10" />
					</div>
					<div class="terms-text">
						登录即表示同意 <a href="javascript:void(0)">《用户协议》</a>和<a href="javascript:void(0)">《隐私政策》</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { reactive } from "vue"
import { MapPin, User, KeyRound, EyeOff, Eye, X, Check } from "lucide-vue-next"
import { useRouter } from "vue-router"

const router = useRouter()

const state = reactive({
	account: "",
	password: "",
	pwdVisible: false,
	termsAccepted: false,
	loading: false,
	shakeTerms: false,
})

function handleLogin() {
	if (!state.termsAccepted) {
		state.shakeTerms = true
		setTimeout(() => {
			state.shakeTerms = false
		}, 400)
		return
	}

	state.loading = true

	setTimeout(() => {
		state.loading = false
		// TODO: implement login logic
	}, 2000)
}

function handleBackHome() {
	router.push("/")
}
</script>

<style lang="less" scoped>
.page-login {
	min-height: 100vh;
	background: var(--bg-primary);
	color: var(--text-primary);
	max-width: 430px;
	margin: 0 auto;
	overflow-x: hidden;
	position: relative;

	/* Atmospheric BG */
	&::before {
		content: "";
		position: fixed;
		inset: 0;
		background:
			radial-gradient(ellipse at 30% 0%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
			radial-gradient(ellipse at 70% 30%, rgba(14, 165, 233, 0.06) 0%, transparent 45%),
			radial-gradient(ellipse at 50% 80%, rgba(212, 168, 67, 0.04) 0%, transparent 40%);
		pointer-events: none;
		z-index: 0;
	}

	/* Floating orbs */
	.orb {
		position: fixed;
		border-radius: 50%;
		pointer-events: none;
		filter: blur(60px);
		z-index: 0;

		&.orb-1 {
			width: 200px;
			height: 200px;
			top: -40px;
			right: -60px;
			background: rgba(139, 92, 246, 0.1);
			animation: orbFloat1 12s ease-in-out infinite;
		}

		&.orb-2 {
			width: 160px;
			height: 160px;
			bottom: 15%;
			left: -40px;
			background: rgba(14, 165, 233, 0.08);
			animation: orbFloat2 15s ease-in-out infinite;
		}

		&.orb-3 {
			width: 120px;
			height: 120px;
			top: 40%;
			right: -30px;
			background: rgba(212, 168, 67, 0.06);
			animation: orbFloat3 10s ease-in-out infinite;
		}
	}

	@keyframes orbFloat1 {
		0%,
		100% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(-20px, 30px);
		}
	}

	@keyframes orbFloat2 {
		0%,
		100% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(25px, -20px);
		}
	}

	@keyframes orbFloat3 {
		0%,
		100% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(-15px, -25px);
		}
	}

	/* Page Content */
	.login-page {
		position: relative;
		z-index: 1;
		min-height: calc(100vh - 28px);
		display: flex;
		flex-direction: column;
		padding: 0 28px;
	}

	/* Brand Area */
	.brand-area {
		padding: 48px 0 40px;
		text-align: center;

		.brand-icon-wrap {
			width: 72px;
			height: 72px;
			margin: 0 auto 20px;
			border-radius: 20px;
			background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
			border: 1px solid var(--border-glow);
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			box-shadow:
				0 8px 32px rgba(0, 0, 0, 0.3),
				0 0 60px rgba(139, 92, 246, 0.06),
				inset 0 1px 0 rgba(255, 255, 255, 0.08);

			&::before {
				content: "";
				position: absolute;
				inset: -1px;
				border-radius: 20px;
				background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent 60%);
				pointer-events: none;
			}
		}

		.brand-glow {
			position: absolute;
			inset: -20px;
			border-radius: 50%;
			background: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%);
			pointer-events: none;
			z-index: -1;
		}

		.brand-name {
			font-family: "Noto Serif SC", serif;
			font-size: 26px;
			font-weight: 900;
			color: var(--text-primary);
			letter-spacing: 4px;
			margin-bottom: 6px;
		}

		.brand-slogan {
			font-size: 13px;
			color: var(--text-tertiary);
			letter-spacing: 2px;
		}
	}

	/* Form Area */
	.form-area {
		flex: 1;
	}

	/* Input Group */
	.input-group {
		margin-bottom: 16px;
	}

	.input-wrap {
		display: flex;
		align-items: center;
		gap: 12px;
		background: var(--bg-input, rgba(255, 255, 255, 0.03));
		border: 1px solid var(--border-color);
		border-radius: var(--radius-md);
		padding: 0 16px;
		transition: all 0.3s ease;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);

		&:focus-within {
			border-color: var(--border-focus, rgba(14, 165, 233, 0.4));
			background: rgba(14, 165, 233, 0.03);
			box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.06);

			.input-icon {
				color: var(--accent-blue);
			}
		}

		.input-icon {
			color: var(--text-tertiary);
			flex-shrink: 0;
			transition: color 0.3s;
		}

		.input-field {
			flex: 1;
			background: transparent;
			background-color: transparent; // 强制覆盖浏览器默认背景
			border: none;
			outline: none;
			padding: 15px 10px;
			font-size: 15px;
			color: var(--text-primary);
			font-weight: 500;
			-webkit-appearance: none; // 移除 WebKit 浏览器默认样式
			appearance: none;

			&::placeholder {
				color: var(--text-tertiary);
				font-weight: 400;
			}

			// 自动填充时的背景色
			&:-webkit-autofill,
			&:-webkit-autofill:hover,
			&:-webkit-autofill:focus {
				-webkit-box-shadow: 0 0 0 1000px var(--bg-input, rgba(255, 255, 255, 0.03)) inset;
				-webkit-text-fill-color: var(--text-primary);
				transition: background-color 5000s ease-in-out 0s;
			}
		}

		.input-clear {
			width: 20px;
			height: 20px;
			border-radius: 50%;
			background: rgba(255, 255, 255, 0.06);
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			flex-shrink: 0;
			transition: background 0.2s;
			color: var(--text-tertiary);
		}
	}

	/* Submit Button */
	.submit-btn {
		width: 100%;
		padding: 15px;
		border: none;
		border-radius: var(--radius-md);
		font-size: 15px;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
		letter-spacing: 1px;
		margin-top: 8px;

		&.primary {
			background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary));
			color: var(--text-primary);
			border: 1px solid var(--border-glow);
			box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

			&::before {
				content: "";
				position: absolute;
				inset: 0;
				background: linear-gradient(135deg, rgba(255, 255, 255, 0.06), transparent 50%);
				pointer-events: none;
			}

			&.loading {
				pointer-events: none;
				opacity: 0.8;

				.btn-text {
					display: none;
				}

				.btn-loading-spinner {
					display: block;
				}
			}
		}

		&.secondary {
			background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), var(--color-primary-light));
			color: var(--text-primary);
			border: 1px solid var(--border-glow);
			box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
			margin-top: 10px;

			&::before {
				content: "";
				position: absolute;
				inset: 0;
				background: linear-gradient(135deg, rgba(255, 255, 255, 0.14), transparent 50%);
				pointer-events: none;
			}
		}

		.btn-loading-spinner {
			display: none;
			width: 18px;
			height: 18px;
			border: 2px solid rgba(255, 255, 255, 0.2);
			border-top-color: var(--text-primary);
			border-radius: 50%;
			margin: 0 auto;
		}
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* Extra Links */
	.form-extras {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 16px;
		padding: 0 2px;

		.form-link {
			font-size: 12px;
			color: var(--text-tertiary);
			cursor: pointer;
			transition: color 0.2s;
		}
	}

	/* Terms Area */
	.terms-area {
		padding: 0 0 40px;
		text-align: center;

		.terms-wrap {
			display: flex;
			align-items: flex-start;
			justify-content: center;
			gap: 8px;

			&.shake {
				animation: shake 0.4s ease;
			}
		}

		.terms-checkbox {
			width: 16px;
			height: 16px;
			border-radius: 4px;
			border: 1.5px solid var(--border-glow);
			flex-shrink: 0;
			margin-top: 1px;
			cursor: pointer;
			transition: all 0.25s ease;
			display: flex;
			align-items: center;
			justify-content: center;
			background: transparent;

			&.checked {
				background: var(--accent-blue);
				border-color: var(--accent-blue);
			}

			svg {
				stroke: #fff;
				fill: none;
				stroke-width: 3;
			}
		}

		.terms-text {
			font-size: 12px;
			color: var(--text-tertiary);
			line-height: 1.7;
			text-align: left;

			a {
				color: var(--accent-blue);
				text-decoration: none;
			}
		}
	}

	/* Password Toggle */
	.pwd-toggle {
		cursor: pointer;
		flex-shrink: 0;
		color: var(--text-tertiary);
		padding: 4px;
		transition: color 0.2s;
	}

	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		20% {
			transform: translateX(-6px);
		}
		40% {
			transform: translateX(6px);
		}
		60% {
			transform: translateX(-4px);
		}
		80% {
			transform: translateX(4px);
		}
	}
}
</style>
