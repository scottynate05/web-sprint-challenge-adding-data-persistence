const express = require('express');

const Projects = require('./project-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.getProjects()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to get projects.'
            });
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Projects.getProjectById(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            res.status(404).json({
                message: 'Could not find project with given id.'
            });
        });
});

router.get('/:id/resources', (req, res) => {
    const { id } = req.params;

    Projects.getResources(id)
        .then(resource => {
            if (resource.length) {
                res.json(resource)
            } else {
                res.status(404).json({
                    message: 'Coult not find resources for that given project.'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to get resources.',
                err
            })
        })
})

router.get('/:id/tasks', (req, res) => {
    const { id } = req.params;

    Projects.getTasks(id)
        .then(task => {
            if (task.length) {
                res.json(task)
            } else {
                res.status(404).json({
                    message: 'Coult not find tasks for that given project.'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to get tasks.',
                err
            })
        })
})

router.post('/', (req, res) => {
    const projectData = req.body;

    Projects.addProject(projectData)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to create new project.'
            });
        });
});

router.post('/:id/resources', (req, res) => {
    const resourceData = req.body;
    const { id } = req.params;

    Projects.getProjectById(id)
        .then(project => {
            if (project) {
                Projects.addResource(resourceData, id)
                    .then(resource => {
                        res.status(201).json(resource)
                    });
            } else {
                res.status(404).json({
                    message: 'Could not find project with given id.'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to create new resource.'
            });
        });
});

router.post('/:id/tasks', (req, res) => {
    const taskData = req.body;
    const { id } = req.params;

    Projects.getProjectById(id)
        .then(task => {
            if (task) {
                Projects.addTask(taskData, id)
                    .then(task => {
                        res.status(201).json(task)
                    });
            } else {
                res.status(404).json({
                    message: 'Could not find project with given id.'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to create new task.'
            });
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Projects.remove(id)
        .then(deleted => {
            if (deleted) {
                res.json({
                    removed: deleted
                });
            } else {
                res.status(404).json({
                    message: 'Could not find project with given id.'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to delete project.'
            });
        });
});

module.exports = router;