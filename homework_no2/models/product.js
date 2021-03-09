let products = require('../products.json')
const {
    v4: uuidv4
} = require('uuid')
const {
    writeToFile
} = require('../utils')

function getAll() {
    return new Promise((resolve, reject) => {
        resolve(products)
    })
}

function getById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((p) => p.id == id)
        resolve(product)
    })
}

function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = {
            id: uuidv4(),
            ...product
        }
        products.push(newProduct)
        writeToFile('./products.json', products)
        resolve(newProduct)
    })
}

function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id === id)
        products[index] = {
            id,
            ...product
        }
        writeToFile('./products.json', products)
        resolve(products[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((p) => p.id != id)
        writeToFile('./products.json', products)
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