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
        const Thumbs = require('./thumbs');
        return {
          thumbs: {
            relation: Model.BelongsToOneRelation,
            modelClass: Thumbs,
            join: {
              from: 'blogs.id',
              to: 'thumbs.blog_id',
            },
          },
        };
      }
}

module.exports = Blogs;