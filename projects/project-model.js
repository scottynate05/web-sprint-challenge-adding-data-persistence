const db = require('../data/db-config.js');

function getProjects() {
    return db('projects');
};

function getProjectById(id) {
    return db('projects')
        .where({ id });
};

function getResources(id) {
    return db('resources as r')
        // .join('projects as p', 'r.project_id', 'p.id')
        // .select('r.id', 'r.resource_name', 'r.description')
        // .where({ project_id: id })
};

function getTasks() {
    return db('tasks as t')
        .join('projects as p', 't.project_id', 'p.id')
        .select(
            'p.id as project_id',
            'p.project_name',
            'p.project_description',
            't.task_description',
            't.task_notes',
            't.completed as task_completed'
    )
};

function addProject(project) {
    return db('projects')
    .insert(project)
    .then((ids) => {
      return findById(ids[0]);
    });
}

function addResource(resource) {
    return db('resources')
    .insert(resource)
    .then((ids) => {
      return findById(ids[0]);
    });
}

function addTask(task) {
    return db('tasks')
    .insert(task)
    .then((ids) => {
      return findById(ids[0]);
    });
}

function remove(id) {
    return db('projects')
        .where({ id })
        .delete()
}

module.exports = {
    getProjects,
    getProjectById,
    getResources,
    getTasks,
    addProject,
    addResource,
    addTask,
    remove
}