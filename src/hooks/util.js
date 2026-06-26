const getStorage = (key) => {
	return window.localStorage.getItem(key)
}

const setStorage = (key, value) => {
	window.localStorage.setItem(key, value)
}

const removeStorage = (key) => {
	window.localStorage.removeItem(key)
}

// 命名导出
export { getStorage, setStorage, removeStorage }
