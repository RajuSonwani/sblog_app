const { Model } = require('objection');
const knex = require('../config/dbConfig');
Model.knex(knex);

class Blogs extends (Model) {
    static get tableName() {
        return 'blogs'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['title'],
            properties: {
                id: { type: 'integer' },
                title: { type: 'string' },
                description: { type: 'string' },
                user_id: { type: 'integer' },
            }
        }
    }
    static get relationMappings() {
        const Users = require('./users');
        return {
          users: {
            relation: Model.BelongsToOneRelation,
            modelClass: Users,
            join: {
              from: 'blogs.user_id',
              to: 'users.id',
            },
          },
        };
      }
}

module.exports = Blogs;