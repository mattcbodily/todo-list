module.exports = {
    getUserProjects: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');

        db.project.get_user_project({id})
        .then(projects => res.status(200).send(projects))
        .catch(err => res.status(500).send(err))
    },
    createProject: async(req, res) => {
        const {projectName, id} = req.body,
              db = req.app.get('db');

        let projectId = await db.project.create_project({projectName});

        console.log(projectId)

        db.project.user_project_join({id, projectId})
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    }
}