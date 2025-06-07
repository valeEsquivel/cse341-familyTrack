const express = require('express');

const router = express.Router();

const stakeController = require('../controllers/stake');
const stakeValidator = require('../utilities/stake-validator');

// GET /Stakes
router.get('/', stakeController.getAll);

// GET /Stakes/:id
router.get('/:id', stakeController.getById);

// CREATE /Stake
router.post('/', stakeValidator.stakeRules(), stakeValidator.validateStake, stakeController.createStake);

// UPDATE /Stake/:id
router.put('/:id', stakeValidator.stakeRules(), stakeValidator.validateStake, stakeController.updateStake);

// DELETE /Stake/:id
router.delete('/:id', stakeController.deleteStake);

module.exports = router;