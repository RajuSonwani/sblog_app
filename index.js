const express = require('express');
const app = express();
const morgan = require('morgan');
const cors =require("cors");

const homeRouter = require('./routes/home');
const userRouter = require('./routes/users');
const blogRouter = require('./routes/blogs');
const likeDislikeRouter = require('./routes/thumbs');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors);
app.use(userRouter);
app.use(blogRouter);
app.use(likeDislikeRouter);
app.use(homeRouter);


const PORT = process.env.PORT || 2050;

// the PORT listener
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} PORT`);
})