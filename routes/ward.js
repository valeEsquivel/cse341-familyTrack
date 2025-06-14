const express = require('express');

const router = express.Router();

const wardController = require('../controllers/ward');
const { authCheck } = require('../authentication/authenticate.js');
const wardValidator = require('../utilities/ward-validator');

// GET /Wards
router.get('/', wardController.getAll);

// GET /Wards/:id
router.get('/:id', wardController.getById);

// CREATE /Ward
router.post('/', authCheck, wardValidator.wardRules(), wardValidator.validateWard, wardController.createWard);

// UPDATE /Ward/:id
router.put('/:id', authCheck, wardValidator.wardRules(), wardValidator.validateWard, wardController.updateWard);

// DELETE /Ward/:id
router.delete('/:id', authCheck, wardController.deleteWard);

module.exports = router;