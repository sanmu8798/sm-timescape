import { mockCheckIns } from "@/mock/checkin"

export const getCheckIns = async (userId) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const userCheckIns = mockCheckIns.filter((c) => c.userId === userId)
			resolve({ code: 200, data: userCheckIns, message: "success" })
		}, 300)
	})
}

export const createCheckIn = async (data) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const newCheckIn = {
				id: Date.now().toString(),
				...data,
				createTime: new Date().toISOString(),
			}
			mockCheckIns.push(newCheckIn)
			resolve({ code: 200, data: newCheckIn, message: "打卡成功" })
		}, 300)
	})
}
