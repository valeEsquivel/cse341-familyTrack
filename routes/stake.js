const express = require('express');

const router = express.Router();

const stakeController = require('../controllers/stake');
const { authCheck } = require('../authentication/authenticate.js');
const stakeValidator = require('../utilities/stake-validator');

// GET /Stakes
router.get('/', stakeController.getAll);

// GET /Stakes/:id
router.get('/:id', stakeController.getById);

// CREATE /Stake
router.post('/', authCheck, stakeValidator.stakeRules(), stakeValidator.validateStake, stakeController.createStake);

// UPDATE /Stake/:id
router.put('/:id', authCheck, stakeValidator.stakeRules(), stakeValidator.validateStake, stakeController.updateStake);

// DELETE /Stake/:id
router.delete('/:id', authCheck, stakeController.deleteStake);

module.exports = router;