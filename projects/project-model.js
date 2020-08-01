const db = require('../data/db-config.js');

function getProjects() {
    return db('projects');
};

function getProjectById(id) {
    return db('projects')
        .where({ id });
};

function getResources(id) {
    return db('projects as p')
        .join('resources as r', 'r.project_id', 'p.id')
        .select('r.id', 'r.resource_name', 'r.description')
        .where({ project_id: id })
};

function getTasks(id) {
    return db('projects as p')
    .leftJoin('tasks as t', 'p.id', 't.project_id')
    .select('t.id, t.task_name', 'p.project_name')
    .where({ project_id: id })
};

function addProject() {
    return db('projects')
        .insert(projectData)
}

function addResource() {
    return db('resources')
        .insert(resourceData)
}

function addTask() {
    return db('tasks')
        .insert(taskData)
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