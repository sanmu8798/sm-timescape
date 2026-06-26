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
	// eslint-disable-next-line no-undef
	if (window.plus) plus.device.vibrate(40)
	else if ("vibrate" in navigator) navigator.vibrate(40)
}

// 命名导出
export { getStorage, setStorage, removeStorage, useVibrate }
