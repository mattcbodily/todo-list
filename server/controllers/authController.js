const bcrypt = require('bcryptjs')
nodemailer = require('nodemailer'),
    { EMAIL, PASSWORD } = process.env;

module.exports = {
    register: async (req, res) => {
        const { firstName, lastName, email, password } = req.body,
            db = req.app.get('db');

        let foundUser = await db.auth.check_user({ email });
        if (foundUser[0]) {
            return res.status(400).send('Email already in use');
        }

        let salt = bcrypt.genSaltSync(10),
            hash = bcrypt.hashSync(password, salt);

        let newUser = await db.auth.register_user({ firstName, lastName, email, hash });

        let transporter = nodemailer.createTransport({
            host: 'smtp.mail.yahoo.com',
            port: 465,
            service: 'yahoo',
            secure: false,
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        }, (err) => {
            if(err){
                console.log(err);
            }
        })

        let info = await transporter.sendMail({
            from: `Todoit <${EMAIL}>`,
            to: newUser[0].email,
            subject: 'Welcome to Todoit!',
            text: 'Welcome to Todoit! Get Started Now',
            html: `<div>Welcome to Todoit! Get Started Now</div>`
        })

        req.session.user = newUser[0];
        res.status(201).send(req.session.user);
    },
    login: async (req, res) => {
        const { email, password } = req.body,
            db = req.app.get('db');

        let foundUser = await db.auth.check_user({ email });
        if (!foundUser[0]) {
            return res.status(400).send('Email not in use')
        }

        const authenticated = bcrypt.compareSync(password, foundUser[0].password);
        if (!authenticated) {
            return res.status(401).send('Incorrect Password')
        }

        delete foundUser[0].password;
        req.session.user = foundUser[0];
        res.status(202).send(req.session.user);
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}