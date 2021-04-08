const express = require('express');
const router = express.Router();
const ThumbsService = require('../services/thumbs');
const Services = new ThumbsService();

const { authenticateToken } = require('../auth/jwt');

// for like
router.post('/like', authenticateToken, async(req, res) => {
    req.body.user_id = req.decode.id;
    await Services.createLike(req.body).then((data) => {
        res.send({"success": "Thanks for like","data":data});
    }).catch ((err) => {
        console.log(err);
        res.send(err);
    })
})

// for dislike
router.post('/dislike', authenticateToken, async(req, res) => {
    req.body.user_id = req.decode.id;
    await Services.createDislike(req.body).then((data) => {
        res.send({"success": "blog is dislike, hope you will like it soon.", "data":data});
    }).catch ((err) => {
        // console.log(err)
        res.send(err);
    })
})

// get likes
router.get('/likes', authenticateToken, async(req, res) => {
    await Services.findAllLikes().then((data) => {
        // console.log(data, "route data");
        res.send(data);
    });
})

// get dislikes
router.get('/dislikes', authenticateToken, async(req, res) => {
    await Services.findAllDislikes().then((data) => {
        // console.log(data, "route data");
        res.send(data);
    });
})

module.exports = router;