var express = require('express');
var router = express.Router();
const UserService = require('../services/users');
const Services = new UserService();
// const Users = require('../models/users');
const knex = require('../config/dbConfig');


const { generateAccessToken } = require('../auth/jwt');

// create users account
router.post('/signup', async(req, res) => {
    await Services.createUsers(req.body).then((data) => {
        res.send({"success": `${data.email} registered successfully!`})
    }).catch((err) => {
        res.send(err);
    })
});

// login user with JWT
router.post('/login', async (req, res, next) => {
    const userInfo = await Services.emailChecking(req.body.email);
    // console.log(userInfo);
    if (userInfo) {
        const passCheck = await Services.PassChecking(userInfo, req.body.password);
        // console.log(passCheck);
        if (passCheck) {
            const token = generateAccessToken(userInfo);
            res.cookie("key", token);
            res.send({"token":token});
        } else {
            res.send({"sorry": "wrong password! 🤔"});
        }
    }else {
        res.send({"sorry": "This @email isn't exist! 😅"});
    }
})

// get all users
router.get('/users', async(req, res) => {
    const allUsers = await Services.findAll();
    res.send(allUsers)
})

// get user by id
router.get('/user/:id', async(req, res) => {
    const userId = req.params.id;
    await Services.findById(userId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    })
})

router.get("/logout",(req,res)=>{
    res.clearCookie('key').send("cookie cleared!")
})


module.exports = router;