const axios = require('axios');
const logger = require('../config/logger');

// Endpoint to retrieve a list of all a user's threads
const getThreads = async (req, res) => {
    if (!req.headers.authorization) {
        logger.error('Authorization header missing');
        return res.status(400).json({ message: 'Authorization header missing' });
    }

    const accessToken = req.headers.authorization

    console.log(`Access token: ${accessToken}`);

    if (!accessToken) {
        logger.error('Access token missing');
        return res.status(400).json({ message: 'Access token missing' });
    }

    try {
        const response = await axios.get('https://graph.threads.net/v1.0/me/threads', {
            params: {
                fields: 'id,media_product_type,media_type,media_url,permalink,owner,username,text,timestamp,shortcode,thumbnail_url,children,is_quote_post',
                limit: 1,
                access_token: accessToken
            }
        });

        logger.info('User threads retrieved successfully');
        res.json(response.data);
    } catch (error) {
        logger.error(`Error in /user/threads: ${error.message}`);
        res.status(500).json({ message: 'Failed to retrieve user threads', error: error.response ? error.response.data : error.message });
    }
};

module.exports = { getThreads };