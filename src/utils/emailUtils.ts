import * as nodemailer from 'nodemailer'

require('dotenv').config()

export default function sendAccessKey(destinatario: string, chaveAcesso: string) {
    require('dotenv').config()

    const corpo = `<h2>Olá, aqui é a VIC!</h2>
                    <p>Para concluir o seu cadastro na nossa rede, estou enviando a você sua chave de acesso.</p>
                    <p><b>Chave: ${chaveAcesso}</b></p><br />
                    <p>Até mais!</p>`

    const mailOptions = {
        from: process.env.EMAILADDRESS,
        to: destinatario,
        subject: 'Conclusão de Cadastro - Rede de vulneráveis',
        html: corpo,
    }

    sendEmail(mailOptions)
}

export function sendNextSchedules(destinatario: string, schedule: any) {
    require('dotenv').config()
    
    const corpo = `<h2>Olá, aqui é a VIC!</h2>
                    <p>Os atendentes devem estar disponíveis em breve.</p>
                    <p><ul><b>Horários: </b>
                    ${schedule}
                    </ul></p><br />
                    <p>Até logo!</p>`

    const mailOptions = {
        from: process.env.EMAILADDRESS,
        to: destinatario,
        subject: 'Próximos horários de atendimento - Rede de vulneráveis',
        html: corpo,
    }

    sendEmail(mailOptions)
}

export function sendFeedback(autor: string, motivo: string, feedback: string) {
    require('dotenv').config()
    
    const corpo = `<h2>Olá, aqui é a VIC!</h2>
                    <p>Esta pessoa não teve uma experiencia boa no chatbot e decidiu relatar:</p>
                    <p>
                        <ul>
                            <li><b>Autor: </b>${autor},</li>
                            <li><b>Motivo: </b>${motivo}</li>
                            <li><b>Feedback: </b>${feedback}</li>
                        </ul>
                    </p>
                    <br />
                    <p>Espero que ajude!</p>`

    const mailOptions = {
        from: process.env.EMAILADDRESS,
        to: process.env.EMAILADDRESS,
        cc: process.env.CONTOLEMAILADDRESS,
        subject: `Feedback de atendimento - ${autor}`,
        html: corpo,
    }

    sendEmail(mailOptions)
}

export function createTransporter() {
    require('dotenv').config()

    const remetente = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        auth:{
            user: process.env.EMAILADDRESS,
            pass: process.env.EMAILPASSWORD,
        }
    });

    return remetente;
}

export function sendEmail(mailOptions: any) {
    const transporter = createTransporter()

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } 
        else {
          console.log('Email sent: ' + info.response);
        }
    });
}