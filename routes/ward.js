const express = require('express');

const router = express.Router();

const wardController = require('../controllers/ward');
const wardValidator = require('../utilities/ward-validator');

// GET /Wards
router.get('/', wardController.getAll);

// GET /Wards/:id
router.get('/:id', wardController.getById);

// CREATE /Ward
router.post('/', wardValidator.wardRules(), wardValidator.validateWard, wardController.createWard);

// UPDATE /Ward/:id
router.put('/:id', wardValidator.wardRules(), wardValidator.validateWard, wardController.updateWard);

// DELETE /Ward/:id
router.delete('/:id', wardController.deleteWard);

module.exports = router;