
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          task_description: 'Write code for Star Wars api.',
          task_notes: 'Follow the 20 minute rule.',
          completed: 0,
          project_id: 1
        },
        {
          task_description: 'Write a user friendly, and intuitive app for users to get a randomly generated message of the day.',
          task_notes: 'Use create-react-app, and make legible and concise notes within your code. Commit often!',
          completed: 0,
          project_id: 2
        },
        {
          task_description: 'Write a compelling novel allowing the reader to dive into a fictional world of political turmoil, and follow a group of rebel heroes.',
          task_notes: '',
          completed: 0,
          project_id: 3
        }
      ]);
    });
};
