require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      cron = require('node-cron'),
      authCtrl = require('./controllers/authController'),
      taskCtrl = require('./controllers/taskController'),
      projectCtrl = require('./controllers/projectController'),
      emailCtrl = require('./controllers/emailController'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      app = express();

app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 365}
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected')
})

//Authentication Endpoints
app.post('/api/register', authCtrl.register);
app.post('/api/login', authCtrl.login);
app.get('/api/logout', authCtrl.logout);

//Task Endpoints
app.get('/api/tasks/:id', taskCtrl.getGeneralTasks);
app.get('/api/today-tasks/:id/:date', taskCtrl.getTodayTasks);
app.get('/api/upcoming-tasks/:id/:date', taskCtrl.getUpcomingTasks);
app.get('/api/project-tasks/:id', taskCtrl.getProjectTasks);
app.post('/api/task', taskCtrl.createTask);
app.put('/api/task/:id', taskCtrl.completeTask);
app.put('/api/complete-by', taskCtrl.editTaskDate);
app.put('/api/task-name', taskCtrl.editTaskName);

//Project Endpoints
app.get('/api/projects/:id', projectCtrl.getUserProjects);
app.post('/api/project', projectCtrl.createProject);

//Daily Emails
cron.schedule("* * * * Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday", function(){
    emailCtrl.dailyEmails();
})

app.listen(SERVER_PORT, () => console.log(`Just do it on ${SERVER_PORT}`));