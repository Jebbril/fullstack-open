import axios from "axios"

const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const update = newObject => {
	const request = axios.post(baseUrl, newObject)
	return request.then(response => response.data)
}

const destroy = (id) => {
	return axios.delete(`${baseUrl}/${id}`)
}

export {getAll, update, destroy}