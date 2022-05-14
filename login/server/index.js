import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import login from './auth/login.js';
import logger from './lib/logger.js';
import cookieParser from 'cookie-parser';
import fetch from 'node-fetch';
import { postMethod } from './lib/rest.service.js';
import { AUTH_API_DEV, AUTH_API_PROD } from './lib/config.js';


const app = express();

app.use(cookieParser())
app.use(express.json());

app.get("/", async (req, res, next) => {
    const { token } = req.cookies;
    const { callback } = req.query;

    const url = process.env.NODE_ENV === "prod" ? AUTH_API_PROD : AUTH_API_DEV;
    if (token) {
        const response = await postMethod(`${url}/auth/validate`, {}, {
            'x-access-token': token
        })

        console.log(response)
        if (callback) {
            if (response.status === 200) {
                //white listing posible urls o encrypt it to avoid SSRF
                const decodedURL = Buffer.from(callback, 'base64').toString('ascii');
                const body = await response.json();
                res.cookie('uid', body.userId, {
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    httpOnly: true,
                    domain: "fintoch.com",
                })
                res.redirect(decodedURL);
            } else {
                next();
            }

        } else {
            if (response.status === 200) {
                res.redirect("/error")
            } else {
                next();
            }
        }
    } else {
        next();
    }

})

app.use(express.static('public'));
app.use('/auth', login);

app.get("/error", (req, res) => {
    res.status(200).send("can't redirect")
})
app.get('*', (req,res) => {
    res.status(404).send({ message: "NOT FOUND" });
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT || 3000}`);
})