const express = require('express');

const routes = express.Router();

const Admin = require('../model/Admin');

const AdminController = require('../controllers/Admincontroller');

routes.get('/', AdminController.home);

routes.post('/insertrecoed',Admin.imageuploadData ,AdminController.insertrecoed);

routes.get('/show_view', AdminController.show_view);

routes.get('/read_more/:id', AdminController.read_more);

routes.get('/adminView', AdminController.adminView);

routes.get('/deleteRecord/:id', AdminController.deleteRecord);

routes.get('/updateRecord',AdminController.updateRecord);

routes.post('/MovieEdit',Admin.imageuploadData,AdminController.MovieEdit)

module.exports = routes;
