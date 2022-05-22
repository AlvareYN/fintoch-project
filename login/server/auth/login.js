import { Router } from 'express';
import { AUTH_API_DEV, AUTH_API_PROD } from '../lib/config.js';
import { postMethod } from '../lib/rest.service.js';

const router = Router();


router.post('/', async (req, res) => {
    const url = process.env.NODE_ENV === "prod" ? AUTH_API_PROD : AUTH_API_DEV;
    const body = req.body;
    const response = await postMethod(`${url}/auth`, body);
    const responseBody = await response.json();
    if (response.status === 200) {
        res.cookie('token', responseBody.access_token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            domain: "fintoch.com"
        });
        res.status(200).json({ message: "Ok" })
    } else {
        res.status(response.status).json(responseBody);
    }
});

export default router;