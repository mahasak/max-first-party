import Cors from 'cors'
import prisma from '../../../../lib/prisma'

// Initializing the cors middleware
const cors = Cors({
    methods: ['GET', 'HEAD'],
})

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
}

async function verifyToken(req, res) {
    let VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN

    // Parse the query params
    let mode = req.query['hub.mode']
    let token = req.query['hub.verify_token']
    let challenge = req.query['hub.challenge']

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            res.status(200).send(challenge)

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403)
        }
    }
}

async function processRequest(req, res) {
    if (req.body.object === 'page') {
        req.body.entry.forEach(async (entry) => {
            await processEntry(entry);
        })
        res.status(200).send({ message: 'Webhook payload proceesed.' })
    } else {
        res.status(200).send({ message: 'Not support object type.' })
    }
}

const SUPPORT_FIELD = ['invoice_access_invoice_change']

async function processEntry(entry) {
    const serverTime = entry.time
    entry.changes.forEach(async change => {
        if (SUPPORT_FIELD.includes(change.field) && serverTime !== null) {
            await prisma.logInvoiceChange.create({
                data: {
                    pageId: change.value.page_id,
                    invoiceId: change.value.invoice_id,
                    fieldId: change.field,
                    serverTime: serverTime,
                    rawData: JSON.stringify(entry)
                }
            })
        }
    })
}

async function handler(req, res) {    
    if (req.method === 'GET') {
        cors(req, res, async () => {
            verifyToken(req, res)
        })
    }

    if (req.method === 'POST') {
        cors(req, res, async () => {
            
            processRequest(req, res)
        })
    }
}

export default handler