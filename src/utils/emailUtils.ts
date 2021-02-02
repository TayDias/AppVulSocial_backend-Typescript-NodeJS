import * as nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export default function sendAccessKey(destinatario: string, chaveAcesso: string) {
    const corpo = `<h1>Olá, aqui é a VIC!</h1>
                    <p>Para concluir o seu cadastro na nossa rede, estou enviando a você sua chave de acesso.</p><br />
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
    const corpo = `<h1>Olá, aqui é a VIC!</h1>
                    <p>Os atendentes devem estar disponíveis em breve.</p><br />
                    <p><ul><b>Horários:</b>
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

export function createTransporter() {
    const remetente = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        secure: false,
        port:587,
        auth:{
            user: process.env.EMAILADDRESS,
            pass: process.env.EMAILPASSWORD,
        },
        tls: {
            rejectUnauthorized: false
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