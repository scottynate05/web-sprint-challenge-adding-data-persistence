
exports.up = function(knex) {
    return(
        knex.schema
        .createTable('projects', tbl => {
            tbl.increments();
            tbl.string('project_name', 128)
                .unique()
                .notNullable();
            tbl.string('project_description')
                .notNullable();
            tbl.boolean('completed')
                .notNullable();
        })
        .createTable('resources', tbl => {
            tbl.increments();
            tbl.string('resource_name', 128)
                .notNullable()
            tbl.text('resource_description')
        })
        .createTable('tasks', tbl => {
            tbl.increments();
            tbl.text('task_description')
                .notNullable()
                .unique();
            tbl.integer('task_notes')
                .notNullable();
            tbl.boolean('completed')
                .notNullable();
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('project.name')
                // .inTable('projects')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
        .createTable('project_resources', (tbl) => {
            tbl
              .integer('project_id')
              .unsigned()
              .notNullable()
              .references('project.id')
            //   .inTable('projects')
              .onUpdate('CASCADE')
              .onDelete('CASCADE');
      
            tbl
              .integer('resource_id')
              .unsigned()
              .notNullable()
              .references('project.id')
            //   .inTable('resources')
              .onUpdate('CASCADE')
              .onDelete('CASCADE');
      
            tbl.primary(['project_id', 'resource_id']);
          })
    )
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('projects_resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects');
};
