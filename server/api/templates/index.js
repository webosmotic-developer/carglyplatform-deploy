'use strict';

var express = require('express');
var controller = require('./templates.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/email/:email', controller.showByEmail);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/email/:email', controller.updateByEmail);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
