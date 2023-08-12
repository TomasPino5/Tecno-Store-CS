const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const sendMailCompraHandler = async (req, res) => {

    

    const accountTransport = {
        "service": "gmail",
        "auth": {
            "type": "OAuth2",
            "user": "tiendatecnostoresc@gmail.com",
            "clientId": "562530633432-8ugbfsi2928o5hcf435idmdjelp3b3p1.apps.googleusercontent.com",
            "clientSecret": "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",
            "refreshToken": "1//04-PsR2tM0rHaCgYIARAAGAQSNwF-L9IrmJzcklaG3tsKV_AnFEjuN5MG4L5DfoDs6ximxIAnkTarOA8BS_t0AuJ3enszVFKAqog"
        }
    };

    const mail_rover = async (callback) => {
        const oauth2Client = new OAuth2(
            accountTransport.auth.clientId,
            accountTransport.auth.clientSecret,
            "https://developers.google.com/oauthplayground"
        );
        oauth2Client.setCredentials({
            refresh_token: accountTransport.auth.refreshToken
        });
        const accessToken = await oauth2Client.getAccessToken();
        accountTransport.auth.accessToken = accessToken;
        callback(nodemailer.createTransport(accountTransport));
    };

    mail_rover(async (emailTransporter) => {

        const { destinatario, asunto, mensaje } = req.body;
        
        const mailOptions = {
            from: 'tiendatecnostoresc@gmail.com',
            to: destinatario,//'tomasbaldi@gmail.com', // Reemplaza esto con el destinatario real
            subject: asunto,//'Envío desde nodemailer',
            text: mensaje // 'Hola mundo!'
        };

        try {
            await emailTransporter.sendMail(mailOptions);
            console.log('Email enviado');
            res.status(200).json({ mensaje: 'Correo electrónico enviado correctamente' });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: 'Error al enviar el correo electrónico' });
        }
    });
};

module.exports = { sendMailCompraHandler };