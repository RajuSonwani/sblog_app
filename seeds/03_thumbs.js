
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('thumbs').del()
    .then(function () {
      // Inserts seed entries
      return knex('thumbs').insert([
        {
          "id": 1,
          "like":1,
          "user_id":1,
          "blog_id":2
        },
        {
          "id": 2,
          "like":1,
          "user_id":2,
          "blog_id":2
        },
        {
          "id": 3,
          "like":1,
          "user_id":3,
          "blog_id":1
        }
      ]);
    });
};

