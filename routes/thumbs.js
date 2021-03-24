const express = require('express');
const router = express.Router();
const LikeDislikeService = require('../services/thumbs');
const Services = new LikeDislikeService();

const { authenticateToken } = require('../auth/strategies/jwt');

// for like
router.put('/like', authenticateToken, async(req, res) => {
    const userId = req.decode.id;
    const like = req.body.like;
    const blog_id = req.body.blog_id
    const userData = {
        "like": like,
        "blog_id":blog_id,
        "user_id":userId
    }
    console.log(userData);
    await Services.createLike(userData).then((data) => {
        res.send({"success": "Thanks for like"});
    }).catch ((err) => {
        res.send(err);
    })
})

// for dislike
router.put('/dislike', authenticateToken, async(req, res) => {
    const dislike = req.body.dislike;
    const userId = req.decode.id;
    const blog_id = req.body.blog_id
    const userData = {
        "dislike": dislike,
        "user_id": userId,
        "blog_id":blog_id
    }
    await Services.createDislike(userData).then((data) => {
        res.send({"success": "blog is dislike, hope you will like it soon."});
    }).catch ((err) => {
        res.send(err);
    })
})

// get likes
router.get('/likes', authenticateToken, async(req, res) => {
    await Services.findAllLikes().then((data) => {
        console.log(data, "route data");
        res.send(data);
    });
})

// get dislikes
router.get('/dislikes', authenticateToken, async(req, res) => {
    await Services.findAllDislikes().then((data) => {
        console.log(data, "route data");
        res.send(data);
    });
})

module.exports = router;