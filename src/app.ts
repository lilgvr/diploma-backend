import { closeConnection, openConnection } from './db';
import cors from "cors";
import express from "express";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { router as indexRouter, useRoutes } from "./routes";
import cache from "memory-cache";
import cookieParser from 'cookie-parser';
import rateLimit from "express-rate-limit";
import http from 'http';
import { setupWebsocketServer } from "./service/websocket";

const { HOST, PORT } = process.env;
const { CORS_CONFIG, PROJECT_ROOT, LIMITER_CONFIG } = require('../app.config');

dotenv.config();

export const app = express();
export const server = http.createServer(app);

// App configuration

app.set('view engine', 'ejs');

app.use(cors(CORS_CONFIG));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.REFRESH_TOKEN_SECRET));
app.use(rateLimit(LIMITER_CONFIG));

// Routes
app.use('/api', indexRouter);
useRoutes();

// Static
app.use('/static', express.static(path.join(PROJECT_ROOT, 'static')));

app.on('exit', () => {
    closeConnection();
    cache.clear();
})

// WebSocket
setupWebsocketServer(server);

const start = async () => {
    try {

        openConnection();
        app.listen(+(PORT || 8000), HOST || "localhost", () => {
            const url = `http://${ HOST }:${ PORT }/api`;
            console.log(`Server started on ${ url }`);
            // logger.debug(`Listening on ${ url }`);
        });

    } catch (e) {
        console.log(e);
    }
}

start();
