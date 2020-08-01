
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {
          project_name: 'Star Wars API',
          project_description: 'Create a Star Wars api to generate random character names, and locations.',
          completed: 0
        },
        {
          project_name: 'Create a React app',
          project_description: 'Create a message of the day app.',
          completed: 0
        },
        {
          project_name: 'Overthrow a government?',
          project_description: 'Write a novel about someone overthrowing their government.',
          completed: 0
        }
      ]);
    });
};
