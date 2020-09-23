import express from 'express'

import SpecialtyController from './controllers/SpecialtyController'
import RescuerController from './controllers/RescuerController'
import VulnerableController from './controllers/VulnerableController'
import ScheduleController from './controllers/ScheduleController'

const routes = express.Router()
const specialtyController = new SpecialtyController
const rescuerController = new RescuerController()
const vulnerableController = new VulnerableController()
const scheduleController = new ScheduleController()

//Listar Areas
routes.get('/specialties', specialtyController.index)

//Listar Atentendes
routes.get('/rescuers', rescuerController.index)

//Cadastrar Atendentes
routes.post('/rescuers', rescuerController.create)

//Listar Vulneráveis
routes.get('/vulnerable', vulnerableController.index)

//Cadastrar Vulneráveis
routes.post('/vulnerable', vulnerableController.create)

//Listar Horarios
routes.get('/schedules', scheduleController.index)


export default routes