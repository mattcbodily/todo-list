const nodemailer = require('nodemailer'),
      {EMAIL, PASSWORD} = process.env,
      transporter = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 465,
        service: 'yahoo',
        secure: false,
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
      });

module.exports = {
    dailyEmails: async(req, res) => {
        const db = req.app.get('db');
        let today = new Date(),
            day = today.getDate(),
            month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1,
            year = today.getFullYear();
        today = `${year}-${month}-${day}`;

        let emailList = await db.email.get_user_emails();

        for(let i = 0; i < emailList.length; i++){
            let userTasks = await db.task.get_today_tasks({id: emailList[i].user_id, completeBy: today});

            await transporter.sendMail({
                from: `Todoit <${EMAIL}>`,
                to: emailList[i].email,
                subject: `You have ${userTasks.length} tasks due today`,
                text: `Hello ${emailList[i].first_name}! You have ${userTasks.length} tasks due today. Visit your profile to get started.`,
                html: `<div>
                        <p>Hello ${emailList[i].first_name}! You have ${userTasks.length} tasks due today. Visit your profile to get started.</p>
                      </div>`
            })
        }
    }
}