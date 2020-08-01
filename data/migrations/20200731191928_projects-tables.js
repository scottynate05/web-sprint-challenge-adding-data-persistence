
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
                .notNullable()
        })
        .createTable('resources', tbl => {
            tbl.increments();
            tbl.string('resource_name', 128)
                .notNullable()
            tbl.text('resource_description')
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('project.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            tbl.integer('task_id')
                .unsigned()
                .notNullable()
                .references('task.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
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
                .references('project.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
        })
    )
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects');
};
