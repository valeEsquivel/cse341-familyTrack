const express = require('express');

const router = express.Router();

const ancestorController = require('../controllers/ancestor');
const ancestorValidator = require('../utilities/ancestor-validator');

// GET /Ancestors
router.get('/', ancestorController.getAll);

// GET /Ancestors/:id
router.get('/:id', ancestorController.getById);

// CREATE /Ancestor
router.post('/', ancestorValidator.ancestorRules(), ancestorValidator.validateAncestor, ancestorController.createAncestor);

// UPDATE /Ancestor/:id
router.put('/:id', ancestorValidator.ancestorRules(), ancestorValidator.validateAncestor, ancestorController.updateAncestor);

// DELETE /Ancestor/:id
router.delete('/:id', ancestorController.deleteAncestor);

module.exports = router;