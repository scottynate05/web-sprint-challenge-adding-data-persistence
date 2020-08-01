
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {
          resource_name: 'Node.js',
          resource_description: 'Backend framework'
        },
        {
          resource_name: 'Express',
          resource_description: 'Used to create backend apps, and api\'s.'
        },
        {
          resource_name: 'React',
          resource_description: 'JS framework for front-end development.'
        },
        {
          resource_name: 'Microsoft Word',
          resource_description: 'Software used for writing.'
        }
      ]);
    });
};
