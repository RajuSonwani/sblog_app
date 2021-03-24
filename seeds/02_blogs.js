
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('blogs').del()
    .then(function () {
      // Inserts seed entries
      return knex('blogs').insert([
        {
          "id": 1,
          "title":"Post1",
          "description":"Hello friends",
          "user_id":1
        },
        {
          "id": 2,
          "title":"Post1",
          "description":"Hello friends",
          "user_id":2
        },
        {
          "id": 3,
          "title":"Post1",
          "description":"Hello friends",
          "user_id":3
        }
      ]);
    });
};
