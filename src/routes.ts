import express from 'express'

import SpecialtyController from './controllers/SpecialtyController'
import RescuerController from './controllers/RescuerController'
import VulnerableController from './controllers/VulnerableController'
import ScheduleController from './controllers/ScheduleController'
import AssistanceController from './controllers/AssistanceController'
import AuthController from './controllers/AuthController'

const routes = express.Router()
const specialtyController = new SpecialtyController
const rescuerController = new RescuerController()
const vulnerableController = new VulnerableController()
const scheduleController = new ScheduleController()
const assistanceController = new AssistanceController()
const authController = new AuthController()

//Listar Areas
routes.get('/specialties', specialtyController.index)

//Listar Atentendes
routes.get('/rescuers', rescuerController.index)

//Mostrar Atentende
routes.get('/rescuers/:id', rescuerController.show)

//Cadastrar Atendente
routes.post('/rescuers', rescuerController.create)

//Atualizar Atendente
routes.put('/rescuers', rescuerController.update)

//Cadastrar Horario
routes.post('/schedules', scheduleController.create)

//Mostrar Horarios
routes.get('/schedules', scheduleController.show)

//Atualizar Horarios
routes.put('/schedules', scheduleController.update)

//Listar Vulneráveis
routes.get('/vulnerable', vulnerableController.index)

//Cadastrar Vulneráveis
routes.post('/vulnerable', vulnerableController.create)

//Listar Atendimentos
routes.get('/assistance', assistanceController.index)

//Mostrar Atendimento
routes.get('/assistance:id', assistanceController.show)

//Cadastrar Atendimento
routes.post('/assistance', assistanceController.create)

//Atualizar Horarios
routes.put('/assistance', assistanceController.update)

//Login
routes.post('/login', authController.login)


export default routes