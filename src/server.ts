// Necessário instalar a definição de tipos do express. Verificar a sugestão do alerta.
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import routes from './routes'

dotenv.config()
const app = express()
app.use(express.json())

// Dev
app.use(cors())
app.use(routes)

app.listen(3030, () => {
    console.log('Running Server')
})


// Produção
/*
const options : cors.CorsOptions = {
    credentials: false,
    methods: 'GET, POST, PUT, DELETE',
    //origin: ["http://bot.pectem.com", "https://ahimsa-bot.herokuapp.com"],
    preflightContinue: false
}

//use cors middleware
app.use(cors(options));

//Routes
app.set('port' , (process.env.PORT || 3030))
app.use(routes)

app.get('/', function(request, response) {
    response.send('Hello World')
})

app.listen(app.get('port'), () => {
    console.log('Running Server')
})
*/

/*
Configuração Hostgator

const hostname = '192.185.176.134'
const port = 2083

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World! NodeJS \n');
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
*/

//FTP é para stream de arquivos. Somente ele não vai funcionar
//É preciso configurar um SSH
//Assistir o video do Felipe Dechamps para ter uma luz