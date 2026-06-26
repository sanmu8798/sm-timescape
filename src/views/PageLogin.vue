<template>
  <div class="page-login">
    <div class="login-card">
      <div class="login-brand">
        <div class="brand-icon">
          <Flag :size="28" />
        </div>
        <h1 class="brand-name">时光集</h1>
        <p class="brand-slogan">记录旅行足迹，收藏美好时光</p>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-item">
          <User :size="18" />
          <input
            v-model="state.form.account"
            type="text"
            placeholder="请输入账号"
            class="form-input"
          />
        </div>

        <div class="form-item">
          <Lock :size="18" />
          <input
            v-model="state.form.password"
            :type="state.showPassword ? 'text' : 'password'"
            placeholder="请输入密码"
            class="form-input"
          />
          <button type="button" class="toggle-password" @click="togglePassword">
            <Eye v-if="!state.showPassword" :size="18" />
            <EyeOff v-else :size="18" />
          </button>
        </div>

        <div v-if="state.error" class="form-error">
          <AlertCircle :size="14" />
          <span>{{ state.error }}</span>
        </div>

        <button type="submit" class="login-btn" :disabled="state.loading">
          <Loader2 v-if="state.loading" :size="18" class="loading-icon" />
          <span>{{ state.loading ? '登录中...' : '登 录' }}</span>
        </button>
      </form>

      <div class="login-options">
        <span class="option-link">忘记密码？</span>
        <span class="option-link">注册新账号</span>
      </div>

      <div class="demo-tip">
        <div class="demo-tip-title">
          <Info :size="14" />
          <span>体验账号</span>
        </div>
        <div class="demo-tip-content">
          <span>账号：<code>sanmu_test</code></span>
          <span>密码：<code>123123</code></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Flag, User, Lock, Eye, EyeOff, AlertCircle, Loader2, Info } from 'lucide-vue-next'
import { useUserStore } from '@/stores/index'
import { mockUsers } from '@/mock/user'

const router = useRouter()
const userStore = useUserStore()

const state = reactive({
  form: {
    account: 'sanmu_test',
    password: '123123'
  },
  showPassword: false,
  loading: false,
  error: ''
})

const togglePassword = () => {
  state.showPassword = !state.showPassword
}

const handleLogin = async () => {
  const { account, password } = state.form
  if (!account || !password) {
    state.error = '请输入账号和密码'
    return
  }

  state.loading = true
  state.error = ''

  try {
    const user = mockUsers.find(u => u.phone === account && u.password === password)
    if (!user) {
      state.error = '账号或密码错误'
      return
    }
    userStore.setUser(user)
    router.push({ name: 'Index' })
  } catch (e) {
    state.error = e.message || '登录失败'
  } finally {
    state.loading = false
  }
}

</script>

<style lang="less" scoped>
.page-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: var(--bg-primary);

  .login-card {
    width: 100%;
    max-width: 380px;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    padding: 36px 28px;
    box-shadow: 0 12px 40px var(--shadow-color);
  }

  .login-brand {
    text-align: center;
    margin-bottom: 32px;

    .brand-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto 16px;
      border-radius: var(--radius-lg);
      background: var(--linear-gradient);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      box-shadow: 0 4px 16px rgba(26, 26, 46, 0.2);
    }

    .brand-name {
      font-size: 26px;
      font-weight: 800;
      color: var(--text-primary);
      margin: 0 0 6px;
      letter-spacing: 2px;
    }

    .brand-slogan {
      font-size: 13px;
      color: var(--text-secondary);
      margin: 0;
    }
  }

  .login-form {
    .form-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      margin-bottom: 14px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      transition: all 0.25s ease;

      svg {
        color: var(--text-tertiary);
        flex-shrink: 0;
      }

      &:focus-within {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px rgba(26, 26, 46, 0.06);
      }

      .form-input {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        color: var(--text-primary);
        font-size: 15px;

        &::placeholder {
          color: var(--text-tertiary);
        }
      }

      .toggle-password {
        background: none;
        border: none;
        cursor: pointer;
        color: var(--text-tertiary);
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.25s ease;

        &:hover {
          color: var(--color-primary);
        }
      }
    }

    .form-error {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 10px 14px;
      margin-bottom: 14px;
      background: rgba(194, 59, 34, 0.08);
      border: 1px solid rgba(194, 59, 34, 0.15);
      border-radius: var(--radius-sm);
      color: var(--accent-red);
      font-size: 13px;

      svg {
        flex-shrink: 0;
      }
    }

    .login-btn {
      width: 100%;
      padding: 15px;
      background: var(--linear-gradient);
      border: none;
      border-radius: var(--radius-md);
      color: #fff;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.25s ease;
      box-shadow: 0 4px 16px rgba(26, 26, 46, 0.2);

      &:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 8px 24px rgba(26, 26, 46, 0.25);
      }

      &:disabled {
        opacity: 0.8;
        cursor: not-allowed;
      }

      .loading-icon {
        animation: spin 1s linear infinite;
      }
    }
  }

  .login-options {
    display: flex;
    justify-content: space-between;
    margin-top: 18px;

    .option-link {
      font-size: 13px;
      color: var(--text-secondary);
      cursor: pointer;
      transition: color 0.25s ease;

      &:hover {
        color: var(--color-primary);
      }
    }
  }

  .demo-tip {
    margin-top: 28px;
    padding: 14px;
    background: var(--bg-secondary);
    border: 1px dashed var(--border-color);
    border-radius: var(--radius-md);

    .demo-tip-title {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: var(--text-secondary);
      margin-bottom: 8px;

      span {
        font-weight: 600;
      }
    }

    .demo-tip-content {
      display: flex;
      gap: 12px;
      font-size: 13px;
      color: var(--text-secondary);

      code {
        background: rgba(26, 26, 46, 0.06);
        padding: 2px 8px;
        border-radius: 4px;
        color: var(--color-primary);
        font-family: monospace;
      }
    }
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
