import Cors from 'cors'

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
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
}

async function processRequest(req, res) {
    // Rest of the API logic
    res.json({ message: 'Hello Everyone!' })
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