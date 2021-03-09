let clients = require('../clients.json')
const {
    v4: uuidv4
} = require('uuid')
const {
    writeToFile
} = require('../utils')

function getAll() {
    return new Promise((resolve, reject) => {
        resolve(clients)
    })
}

function getById(id) {
    return new Promise((resolve, reject) => {
        const client = clients.find((p) => p.id == id)
        resolve(client)
    })
}

function create(client) {
    return new Promise((resolve, reject) => {
        const newClient = {
            id: uuidv4(),
            ...client
        }
        clients.push(newClient)
        writeToFile('./clients.json', clients)
        resolve(newClient)
    })
}

function update(id, client) {
    return new Promise((resolve, reject) => {
        const index = clients.findIndex((p) => p.id === id)
        clients[index] = {
            id,
            ...client
        }
        writeToFile('./clients.json', clients)
        resolve(clients[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        clients = clients.filter((p) => p.id != id)
        writeToFile('./clients.json', clients)
        resolve()
    })
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}