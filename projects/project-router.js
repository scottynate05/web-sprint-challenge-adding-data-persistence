const express = require('express');

const Projects = require('./project-model.js');

const router = express.Router();

router.get('/projects', (req, res) => {
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

router.get('/projects/:id', (req, res) => {
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

router.get('/resources', (req, res) => {
    const { id } = req.params;

    Projects.getResources(id)
        .then((resource) => {
            res.status(200).json(resource);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
            message: 'Error retrieving the resource',
            });
        });
    })

router.get('/tasks', (req, res) => {
    // const { id } = req.params;

    Projects.getTasks()
        .then((tasks) => {
            res.status(200).json(tasks);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
            message: 'Error retrieving the tasks',
            });
        });
})

router.post('/projects', (req, res) => {
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

router.post('/resources', (req, res) => {
    const resourceData = req.body;
    // const { id } = req.params;

    Projects.addResource(resourceData)
        .then((resource) => {
            res.status(201).json(resource);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
            message: 'Error adding the resource',
            });
        });
});

router.post('/tasks', (req, res) => {
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

router.delete('/projects/:id', (req, res) => {
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