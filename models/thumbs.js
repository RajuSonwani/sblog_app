const { Model } = require('objection');
const knex = require('../config/dbConfig');
Model.knex(knex);

class LikeDislike extends (Model) {
    static get tableName() {
        return 'thumbs'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['user_id'],
            properties: {
                id: { type: 'integer' },
                like: { type: 'integer' },
                dislike: { type: 'integer' },
                user_id: { type: 'integer' },
                blog_id: { type: 'integer' },
            }
        }
    }

    static get relationMappings() {
        const Blogs = require('./blogs')
        return {
            blogs: {
                relation: Model.BelongsToOneRelation,
                modelClass: Blogs,
                join: {
                    from: 'thumbs.blog_id',
                    to: 'blogs.id'
                }
            }
        }
    }
}

// class LikeDislike extends Model {
//     static get tableName() {
//       return 'likeDislike';
//     }
  
//     static get relationMappings() {
//         const Users = require('./users')
//         return {
//             users: {
//                 relation: Model.BelongsToOneRelation,
//                 modelClass: Users,
//                 join: {
//                     from: 'likeDislike.user_id',
//                     to: 'users.id'
//                 }
//             }
//         }
//     }
//   }
  

module.exports = LikeDislike;