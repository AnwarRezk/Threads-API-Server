const axios = require('axios');
const logger = require('../config/logger');

// Endpoint to redirect users to Threads OAuth
const handleAuth = (req, res) => {
    try {
        const authUrl = `https://threads.net/oauth/authorize?client_id=${process.env.THREADS_API_KEY}&redirect_uri=${process.env.THREADS_REDIRECT_URI}&response_type=code&scope=${encodeURIComponent(process.env.THREADS_SCOPE)}`;
        logger.info('Redirecting to Threads OAuth URL');
        res.redirect(authUrl);
    } catch (error) {
        logger.error(`Error in /auth: ${error.message}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Callback endpoint for OAuth
const handleOAuthCallback = async (req, res) => {
    const { code } = req.query;

    if (!code) {
        logger.error('Authorization code missing in callback');
        return res.status(400).json({ message: 'Authorization code missing' });
    }

    try {
        const tokenResponse = await axios.post('https://graph.threads.net/oauth/access_token', {
            client_id: process.env.THREADS_API_KEY,
            client_secret: process.env.THREADS_API_SECRET,
            code,
            redirect_uri: process.env.THREADS_REDIRECT_URI,
            grant_type: 'authorization_code',
        });

        const accessToken = tokenResponse.data.access_token;
        logger.info('Authentication successful');
        res.json({ message: 'Authentication successful', accessToken });
    } catch (error) {
        logger.error(`Error in /auth/callback: ${error.message}`);
        res.status(500).json({ message: 'Authentication failed', error: error.response ? error.response.data : error.message });
    }
};

module.exports = {
    handleAuth,
    handleOAuthCallback
}