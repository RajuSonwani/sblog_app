const Blogs = require('../models/blogs');

module.exports = class HomeService {
    async findAll(txn) {
        const blogs = Blogs.query(txn);
        return blogs;
    }
}