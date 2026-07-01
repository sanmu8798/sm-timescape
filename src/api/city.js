import { mockCities, mockCityDetail } from "@/mock/city"

export const getCities = async () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({ code: 200, data: mockCities, message: "success" })
		}, 300)
	})
}

export const getCityById = async (id) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const city = mockCityDetail.find((c) => c.id === id) || mockCityDetail[0]
			resolve({ code: 200, data: city, message: "success" })
		}, 300)
	})
}
