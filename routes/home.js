const express = require('express');
const router = express.Router();
const HomeService = require('../services/home');
const Services = new HomeService();

// create blog
router.get('/', async(req, res) => {
    const posts = await Services.findAll();
    res.send(posts)
});

module.exports = router;