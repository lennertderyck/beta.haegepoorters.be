const express = require('express');
const cors = require('cors');

const api = express();

const corsOpts = {
    origin: '*',

    methods: [
        'GET',
        'POST',
        'DELETE',
        'PUT',
        'PATCH'
    ],

    allowedHeaders: [
        'Content-Type',
    ],
};

api.use(express.json());
api.use(cors(corsOpts));
api.use(express.urlencoded({
    extended: true
}));

export default api;