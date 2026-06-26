import { defineStore } from "pinia"
import { ref } from "vue"

const USER_KEY = 'timescape_user'

const loadUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const saveUser = (value) => {
  try {
    if (value) {
      localStorage.setItem(USER_KEY, JSON.stringify(value))
    } else {
      localStorage.removeItem(USER_KEY)
    }
  } catch {
    // ignore
  }
}

const useUserStore = defineStore("user", () => {
  const user = ref(loadUser())

  const setUser = (value) => {
    user.value = value
    saveUser(value)
  }

  const logout = () => {
    user.value = null
    saveUser(null)
  }

  return { user, setUser, logout }
})

export default useUserStore
