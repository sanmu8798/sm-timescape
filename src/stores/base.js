import { defineStore } from "pinia"
import { ref } from "vue"
import { setStorage, getStorage } from "@/hooks"

export const useBaseStore = defineStore("base", () => {
	const authToken = ref(getStorage("timescape_token"))
	const user = ref(null)

	const setAuthToken = (value) => {
		authToken.value = value
		setStorage("bill_token", value)
	}

	const setUser = (value) => {
		user.value = value
	}

	return { authToken, user, setUser, setAuthToken }
})
