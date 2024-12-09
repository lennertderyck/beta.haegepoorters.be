import cors, { CorsOptions } from 'cors';
import express from 'express';

const api = express();

const corsOpts: CorsOptions = {
    origin: [/haegepoorters\.be$/, /\.haegepoorters\.be$/],

    methods: [
        'GET',
        'POST',
        'PATCH',
        'DELETE',
        // 'PUT',
    ],

    allowedHeaders: [
        'Content-Type',
        'Authorization', 
        'Access-Control-Allow-Origin',
    ],
};

const allowedContentTypes = ['application/json', 'image/png', 'image/jpg', 'image/jpeg', 'multipart/form-data']

api.use(cors(corsOpts));
api.options('*', cors());
api.use((req, res, next) => next())
api.use(express.json()); // Gives error in body-parser package
api.use(express.urlencoded({
    extended: true,
}));



export default api;