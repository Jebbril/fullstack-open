import axios from "axios"

const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = newObject => {
	const request = axios.post(baseUrl, newObject)
	return request.then(response => response.data)
}

const destroy = (id) => {
	return axios.delete(`${baseUrl}/${id}`)
}

const update = (personObject, id) => {
	// console.log("inside update function",personObject)
	const request = axios.put(`${baseUrl}/${id}`, personObject)
	return request.then(response => response.data)
}

export {getAll, create, destroy, update}