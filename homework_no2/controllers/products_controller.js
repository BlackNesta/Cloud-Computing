const Product = require('../models/product')

const {
    getPostData
} = require('../utils')

// @desc Gets All Products
// @route GET /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.getAll()

        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error)
    }
}

// @desc Get Product by ID
// @route GET /api/products/:id
async function getProduct(req, res, id) {
    try {
        const product = await Product.getById(id)
        if (!product) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({
                message: 'Product Not Found'
            }))
        } else {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(product))
        }

    } catch (error) {
        console.log(error)
    }
}

// @desc Create New Product
// @route POST /api/products
async function createProduct(req, res) {
    try {
        const body = await getPostData(req)

        const {
            name,
            price
        } = JSON.parse(body)

        const product = {
            name,
            price
        }

        const newProduct = await Product.create(product)
        res.writeHead(201, {
            'Content-Type': 'application/json'
        })
        return res.end(JSON.stringify(newProduct))
    } catch (error) {
        console.log(error)
    }
}

// @desc Update Existring Product
// @route PUT /api/products/:id
async function updateProduct(req, res, id) {
    try {

        const product = await Product.getById(id)
        if (!product) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({
                message: 'Product Not Found'
            }))
        } else {
            const body = await getPostData(req)
            const {
                name,
                price
            } = JSON.parse(body)

            const productData = {
                name: name || product.name,
                price: price || product.price
            }

            const updatedProduct = await Product.update(id, productData)
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            return res.end(JSON.stringify(updatedProduct))
        }

    } catch (error) {
        console.log(error)
    }
}

// @desc Delete Product
// @route DELETE /api/products/:id
async function deleteProduct(req, res, id) {
    try {
        const product = await Product.getById(id)
        if (!product) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({
                message: 'Product Not Found'
            }))
        } else {
            await Product.remove(id)
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({
                message: `Product ${id} removed`
            }))
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}