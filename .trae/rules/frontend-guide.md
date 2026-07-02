# 前端开发指南

> 前端编码规范，适用于所有基于 vite + less + pinia 的项目。

## 导入规范

| 依赖     | 导入路径                                           | 用途                                                 |
| -------- | -------------------------------------------------- | ---------------------------------------------------- |
| 公共函数 | `import { setStorage, getStorage } from "@/hooks"` | **查看vite.config.js是否有快捷配置**，禁止硬编码路径 |

---

## 命名规范

| 类型       | 格式       | 示例                                  |
| ---------- | ---------- | ------------------------------------- |
| 页面文件   | PascalCase | `PageHome.vue`, `PageLogin.vue`       |
| Hooks 文件 | kebab-case | `use-pro-table-data.js`               |
| 变量/函数  | camelCase  | `const userId = 1;`                   |
| 组件函数   | PascalCase | `export default function OrderPage()` |

---

## 页面文件结构规范

**Vue 文件内部结构必须按照以下顺序排列：**

```vue
<template>
	<!-- 模板内容 -->
</template>

<script setup>
// 脚本内容
</script>

<style lang="less" scoped>
// 样式内容
</style>
```

**规则说明**：

1. `<template>` 必须在最前面
2. `<script setup>` 在中间
3. `<style lang="less" scoped>` 在最后面

---

## 组件导出规范

```js
// ✅ 正确：命名函数导出
const getPublicImage = () => {
	return xxx
}
export { getPublicImage }

// ❌ 错误：箭头函数组件
export default function getPublicImage() {
	return xxx
}
```

**原因**：统一导出风格，便于项目维护。

---

## 类型定义规范

```js
// ✅ 正确：变量定义
import { reactive, ref } from "vue"

// 实例化变量使用ref
const refForm = ref(null)
const refTable = ref(null)

// 其他变量使用reactive
const state = reactive({
	showEditTable: false,
	form: {
		userId: 0,
		title: "",
		content: "",
	},
})

// ❌ 错误：变量定义太多
const showEditTable = ref(false)

const form = reactive({
	userId: 0,
	title: "",
	content: "",
})
```

**原因**：统一导出风格，便于项目维护。

**命名规则**：

- 字段名保持与后端一致（`snake_case`）
- 时间字段使用 `string` 类型
- 可选字段使用 `?` 标记

---

## HTTP 请求规范

```js
const { get, post, loading } = useHttp()

// ✅ 正确：GET 参数传递给 route()
const res = await get(route("api.manager.order.items", { page: 1, pageSize: 20 }))

// ❌ 错误：参数传递给 get()
const res = await get(route("api.manager.order.items"), { page: 1 })

// ❌ 错误：硬编码路径
const res = await get("/api/v1/manager/order/items")
```

### 响应处理

```js

```

---

## 样式规范

### 5.1 样式语言

```vue
<!-- ✅ 正确：使用 Less 预处理器 -->
<style lang="less" scoped>

<!-- ❌ 错误：不使用 scoped 或不用 Less -->
<style scoped>
</style>
```

### 5.2 样式嵌套规范

采用深层次嵌套写法，以页面名为最外层样式头，防止样式污染：

```less
// ✅ 正确：深层次嵌套
.index-page {
	.header-section {
		.nav-menu {
			.nav-item {
				// 样式
			}
		}
	}

	.content-section {
		.sidebar {
			.menu-item {
				// 样式
			}
		}

		.main-container {
			.post-card {
				.card-header {
					// 样式
				}
				.card-body {
					// 样式
				}
			}
		}
	}
}

// ❌ 错误：平铺写法，容易污染全局样式
.header-section {
}
.nav-menu {
}
.nav-item {
}
.content-section {
}
```

### 5.3 样式变量使用

统一样式变量定义在对应项目的 `@/assets/css/base.css` 中，使用时通过 CSS 变量引用：

```less
// ✅ 正确：使用 CSS 变量
.post-card {
	background: var(--bg-card);
	border: 1px solid var(--border-color);
	border-radius: var(--border-radius-lg);
	padding: var(--spacing-md);

	&:hover {
		background: var(--bg-hover);
		box-shadow: var(--shadow-md);
	}

	.card-title {
		color: var(--text-primary);
		font-size: var(--font-size-lg);
	}
}

// ❌ 错误：硬编码样式值
.post-card {
	background: rgba(255, 255, 255, 0.03);
	border: 1px solid rgba(255, 255, 255, 0.08);
	border-radius: 12px;
	padding: 16px;

	.card-title {
		color: #ffffff;
		font-size: 18px;
	}
}
```

### 5.4 样式文件位置

基础样式及变量定义在 `@/assets/css/base.css` 中，请多采用变量开发页面，减少硬编码样式，如果已有的变量样式不符合需求，可以添加新的变量，但是禁止更改已有的变量。

### 5.5 常用 CSS 变量

```css
/* 颜色 */
--color-primary: #667eea;
--bg-primary: #0a0a0f;
--bg-secondary: #12121a;
--text-primary: #ffffff;
--text-secondary: rgba(255, 255, 255, 0.65);

/* 边框 */
--border-color: rgba(255, 255, 255, 0.08);
--border-radius-sm: 6px;
--border-radius-md: 8px;
--border-radius-lg: 12px;

/* 间距 */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;

/* 阴影 */
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.2);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.3);
```

### 5.6 样式使用

1、能使用css变量的就尽量使用css变量，避免使用硬编码样式值
2、如果是移动端的页面，就不要定义hover等伪类样式，因为移动端没有鼠标悬停事件
3、如果没有要求，就不需要定义响应式样式
4、如果是重复样式的话，定义在 `src/assets/css/main.less` 中，且样式类名要添加前缀 `public-`，其他页面直接引用即可

---

## 图标使用规范

使用 `lucide-vue-next` 图标库，禁止使用自定义 SVG：

```vue
<template>
	<!-- ✅ 正确：使用 lucide 图标 -->
	<Home :size="20" />
	<User :size="24" color="#667eea" />
	<Heart class="icon-heart" />

	<!-- ❌ 错误：自定义 SVG -->
	<svg>...</svg>
</template>

<script setup>
import { Home, User, Settings, Heart } from "lucide-vue-next"
</script>
```

---

## 外部依赖引入规范

1. **查找优先**：如需引入其他文件方法，请先查找文件方法来源，避免硬编码找不到位置
2. **路由跳转**：必须使用 `useRouter`，禁止硬编码路径如 `router.push("/page")`，应使用 `router.push({ name: "PageName" })`
3. **组件引入**：优先从 `@/components` 统一入口引入，避免深层相对路径

---

## Mock 数据规范

暂无接口的数据不要写死在页面中，统一放在 `resources/js/mock` 目录下：
1、mock文件里面的数据都是以后编写后端接口时返回的数据，所以结构不要乱写，需要合理组织；

```
resources/js/mock/
├── client/
│   ├── index.js      # 首页数据
│   ├── post.js      # 文章数据
│   └── user.js      # 用户数据
└── manager/
    └── ...
```

使用方式：

```js
import { recommendedPosts, hotPosts } from "@/js/mock/client/index.js"

const state = reactive({
	posts: recommendedPosts,
	hotList: hotPosts,
})
```

### 数据统一性原则

Mock 数据必须严格遵守数据关联一致性原则：

- 不同数据表之间的关联字段（如 `city_id`、`type_id`、`user_id` 等）必须与对应数据的 `id` 保持一致
- 示例：首页热门城市目的地数据 `id` 为 1，关联的目的地数据 `city_id` 即为 1；如果另一份数据引用北京时，对应的 `id` 也应为 1
- 不同数据若还有关联则继续同步 `type_id` 与对应数据 `id` 一致
- 原因：后续开发数据库数据表时，数据会严格参照 mock 数据进行开发，保持数据一致性可避免后期联调问题

---

## 开发流程规范

1. **编译测试**：编写完页面后不要自己执行 `npm run dev` 启动开发服务器，由用户自行启动编译查看效果，可适当提醒用户启动编译
2. **风格参照**：编写页面时，请参照项目原有页面的风格及写法；如没有可参照的页面时，再按常规写法进行编写
3. **局部替换原则**：如没有明显提醒是重新编写或者重构时，请严格遵守局部替换代码规则（search replace），不要重新编写整个文件
4. **用户代码保护**：开发过程中如果发现用户有更改、删除代码等行为，请先询问用户是否恢复原代码，而不是主动恢复或补充代码
5. **前后端规则分离**：后续开发中，如果用户有指令记录规则的话，请自动区别前后端写法规则，并记录在对应的规则文件里

---
