const http = require('http')
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('./controllers/products_controller')

const {
    getClients,
    getClient,
    createClient,
    updateClient,
    deleteClient
} = require('./controllers/clients_controller')

const server = http.createServer((req, res) => {
    if (req.url == '/api/products' && req.method === 'GET') {
        getProducts(req, res)
    } else if (req.url.match(/\/api\/products\/\w+/) &&
        req.method === 'GET') {
        const id = req.url.split('/')[3]
        getProduct(req, res, id)
    } else if (req.url == '/api/products' && req.method === 'POST') {
        createProduct(req, res)
    } else if (req.url.match(/\/api\/products\/\w+/) &&
        req.method === 'PUT') {
        const id = req.url.split('/')[3]
        updateProduct(req, res, id)
    } else if (req.url.match(/\/api\/products\/\w+/) &&
        req.method === 'DELETE') {
        const id = req.url.split('/')[3]
        deleteProduct(req, res, id)
    } 
    
    else if (req.url == '/api/clients' && req.method === 'GET') {
        getClients(req, res)
    } else if (req.url.match(/\/api\/clients\/\w+/) &&
        req.method === 'GET') {
        const id = req.url.split('/')[3]
        getClient(req, res, id)
    } else if (req.url == '/api/clients' && req.method === 'POST') {
        createClient(req, res)
    } else if (req.url.match(/\/api\/clients\/\w+/) &&
        req.method === 'PUT') {
        const id = req.url.split('/')[3]
        updateClient(req, res, id)
    } else if (req.url.match(/\/api\/clients\/\w+/) &&
        req.method === 'DELETE') {
        const id = req.url.split('/')[3]
        deleteClient(req, res, id)
    }
    
    else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify({
            message: 'Not Found'
        }))
    }
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))