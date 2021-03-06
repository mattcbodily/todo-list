module.exports = {
    getGeneralTasks: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');

        db.task.get_general_tasks({id})
        .then(tasks => res.status(200).send(tasks))
        .catch(err => res.status(500).send(err))
    },
    getTodayTasks: (req, res) => {
        const {id, date} = req.params,
              db = req.app.get('db');

        db.task.get_today_tasks({id, completeBy: date})
        .then(tasks => res.status(200).send(tasks))
        .catch(err => res.status(500).send(err))
    },
    getUpcomingTasks: (req, res) => {
        const {id, date} = req.params,
              db = req.app.get('db');

        db.task.get_upcoming_tasks({id, completeBy: date})
        .then(tasks => res.status(200).send(tasks))
        .catch(err => res.status(500).send(err))

    },
    getProjectTasks: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');

        db.task.get_project_tasks({id})
        .then(tasks => res.status(200).send(tasks))
        .catch(err => res.status(500).send(err))
    },
    createTask: (req, res) => {
        const {taskName, userId, projectId, completeBy} = req.body,
              db = req.app.get('db');

        db.task.create_task({taskName, userId, projectId, completeBy})
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },
    completeTask: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');

        db.task.complete_task({id})
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },
    editTaskDate: (req, res) => {
        const {id, completeBy} = req.body,
              db = req.app.get('db');

        db.task.edit_task_date({id, completeBy})
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },
    editTaskName: (req, res) => {
        const {id, taskName} = req.body,
              db = req.app.get('db');

        db.task.edit_task_name({id, taskName})
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
    }
}