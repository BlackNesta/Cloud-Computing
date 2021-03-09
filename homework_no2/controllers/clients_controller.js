const Client = require('../models/client')

const {
    getPostData
} = require('../utils')

// @desc Gets All Clients
// @route GET /api/clients
async function getClients(req, res) {
    try {
        const clients = await Client.getAll()

        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(clients))
    } catch (error) {
        console.log(error)
    }
}

// @desc Get Client by ID
// @route GET /api/clients/:id
async function getClient(req, res, id) {
    try {
        const client = await Client.getById(id)
        if (!client) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({
                message: 'Client Not Found'
            }))
        } else {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(client))
        }

    } catch (error) {
        console.log(error)
    }
}

// @desc Create New Client
// @route POST /api/clients
async function createClient(req, res) {
    try {
        const body = await getPostData(req)

        const {
            name,
            credit
        } = JSON.parse(body)

        const client = {
            name,
            credit
        }

        const newClient = await Client.create(client)
        res.writeHead(201, {
            'Content-Type': 'application/json'
        })
        return res.end(JSON.stringify(newClient))
    } catch (error) {
        console.log(error)
    }
}

// @desc Update Existring Cleient
// @route PUT /api/clients/:id
async function updateClient(req, res, id) {
    try {

        const client = await Client.getById(id)
        if (!client) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({
                message: 'Client Not Found'
            }))
        } else {
            const body = await getPostData(req)
            const {
                name,
                credit
            } = JSON.parse(body)

            const clientData = {
                name: name || client.name,
                credit: credit || client.credit
            }

            const updatedClient = await Client.update(id, clientData)
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            return res.end(JSON.stringify(updatedClient))
        }

    } catch (error) {
        console.log(error)
    }
}

// @desc Delete Client
// @route DELETE /api/clients/:id
async function deleteClient(req, res, id) {
    try {
        const client = await Client.getById(id)
        if (!client) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({
                message: 'Client Not Found'
            }))
        } else {
            await Client.remove(id)
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({
                message: `Client ${id} removed`
            }))
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getClients,
    getClient,
    createClient,
    updateClient,
    deleteClient
}