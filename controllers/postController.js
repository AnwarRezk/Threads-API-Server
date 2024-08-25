const axios = require('axios');
const logger = require('../config/logger');

// Endpoint to create a post container
const createPost = async (req, res) => {
    if (!req.headers.authorization) {
        logger.error('Authorization header missing');
        return res.status(400).json({ message: 'Authorization header missing' });
    }

    const accessToken = req.headers.authorization

    if (!accessToken) {
        logger.error('Access token missing');
        return res.status(400).json({ message: 'Access token missing' });
    }

    const { text } = req.query;

    try {
        const response = await axios.post('https://graph.threads.net/v1.0/me/threads', null, {
            params: {
                media_type: 'TEXT',
                text: text || 'Default Text',
                access_token: accessToken
            }
        });

        logger.info('Created thread media container successfully');
        res.json(response.data);
    } catch (error) {
        logger.error(`Error in /post/create: ${error.message}`);
        res.status(500).json({ message: 'Failed to create post container', error: error.message });
    }
};

// Endpoint to publish a post container
const publishPost = async (req, res) => {
    if (!req.headers.authorization) {
        logger.error('Authorization header missing');
        return res.status(400).json({ message: 'Authorization header missing' });
    }

    const accessToken = req.headers.authorization

    if (!accessToken) {
        logger.error('Access token missing');
        return res.status(400).json({ message: 'Access token missing' });
    }

    const { creation_id } = req.query;

    if (!creation_id) {
        logger.error('Creation id missing');
        return res.status(400).json({ message: 'Creation id missing' });
    }

    try {
        const response = await axios.post('https://graph.threads.net/v1.0/me/threads_publish', null, {
            params: {
                creation_id,
                access_token: accessToken
            }
        });

        logger.info('Published thread media container successfully');
        res.json(response.data);
    } catch (error) {
        logger.error(`Error in /post/publish: ${error.message}`);
        res.status(500).json({ message: 'Failed to publish post container', error: error.response ? error.response.data : error.message });
    }
};

module.exports = {
    createPost,
    publishPost
}