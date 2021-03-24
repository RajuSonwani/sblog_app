
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1,name:"Raju Sonwani",email:"raju@gmail.com",password:"0000"},
        {id: 2,name:"Seema Sonwani",email:"seema@gmail.com",password:"1234"},
        {id: 3,name:"Suman Sonwani",email:"suman@gmail.com",password:"9876"}
      ]);
    });
};
