import express from 'express'

import SpecialtyController from './controllers/SpecialtyController'
import RescuerController from './controllers/Rescuer/RescuerController'
import VulnerableController from './controllers/VulnerableController'
import ScheduleController from './controllers/Schedule/ScheduleController'
import AssistanceController from './controllers/AssistanceController'
import AuthController from './controllers/AuthController'
import HelpController from './controllers/HelpController'
import AdminController from './controllers/AdminController'

const routes = express.Router()
const specialtyController = new SpecialtyController
const rescuerController = new RescuerController()
const vulnerableController = new VulnerableController()
const scheduleController = new ScheduleController()
const assistanceController = new AssistanceController()
const helpController = new HelpController()
const adminController = new AdminController()
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

//Deletar horário
routes.delete('/schedules', scheduleController.delete)

//Mostrar próximos três horarios
routes.get('/nextschedules', scheduleController.showNextDates)

//Checar Horário atual
routes.get('/availability', scheduleController.checkAvailability)

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

//Listar Help
routes.get('/help', helpController.index)

//Listar Usuários
routes.get('/adminuser/:id', adminController.index) //??

//Listar Usuário Específico
routes.get('/getRescuerForUpdate/:id', adminController.getRescuerForUpdate) //??

//Atualizar Usuário Específico Com Senha
routes.post('/updateRescuer', adminController.updateWithPass) //?

//Atualizar Usuário Específico Sem Senha
routes.post('/updateRescuerWithoutPass', adminController.updateWithoutPass) //??

//Deletar Usuário Específico
routes.delete('/rescuer', adminController.delete)

//Listar FAQ
routes.get('/faq', adminController.AllFAQ)

//Listar FAQ Específico
routes.get('/faq/:id', adminController.searchFAQ)

//Deletar FAQ Específico
routes.delete('/faq', adminController.deleteFAQ)

//Atualizar FAQ Específico
routes.put('/faq', adminController.updateFAQ)

//Inserir Novo FAQ
routes.post('/faq', adminController.insertFAQ)

//Login
routes.post('/login', authController.login)

//Enviar e-mail horários
routes.post('/sendSchedules', scheduleController.sendNextSchedules)

//Enviar e-mail feedback
routes.post('/sendFeedback', vulnerableController.sendFeedback)

export default routes