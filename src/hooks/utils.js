const getStorage = (key) => {
	return window.localStorage.getItem(key)
}

const setStorage = (key, value) => {
	window.localStorage.setItem(key, value)
}

const removeStorage = (key) => {
	window.localStorage.removeItem(key)
}

/**
 * 增加用户体验【震动提示】
 */
const useVibrate = () => {
	// 5+ App 环境
	if (typeof window !== "undefined" && window.plus?.device) {
		// iOS 传 true，Android 传时长(ms)
		const isIOS = window.plus.os?.name === "iOS"
		window.plus.device.vibrate(isIOS ? true : 40)
	}
	// 降级到 Web API (Android 可用，iOS 无效)
	else if (navigator?.vibrate) {
		navigator.vibrate(40)
	}
}

// 命名导出
export { getStorage, setStorage, removeStorage, useVibrate }
