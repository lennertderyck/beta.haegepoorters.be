

import express from 'express';
import cors, { CorsOptions } from 'cors';

const api = express();

const corsOpts: CorsOptions = {
    origin: '*',

    methods: [
        'GET',
        'POST',
        // 'DELETE',
        // 'PUT',
        // 'PATCH'
    ],

    allowedHeaders: [
        'Content-Type',
    ],
};

const allowedContentTypes = ['application/json', 'image/png', 'image/jpg', 'image/jpeg', 'multipart/form-data']

api.use((req, res, next) => {
    console.log(req)
    next();
})

// api.use(express.json()); // Gives error in body-parser package
// api.use((req, res, next) => {
//     const contentType = req.headers['content-type'] || 'text/plain';
//     const contentTypeIsAllowed = allowedContentTypes.includes(contentType);
    
//     console.log('contentType', contentType)
//     if (contentTypeIsAllowed) next();
//     else res.status(400).send(`Content type ${contentType} not allowed. Allowed types: ${allowedContentTypes.join(', ')}`)
// })
api.use(cors(corsOpts));
api.use(express.urlencoded({
    extended: true
}));

export default api;