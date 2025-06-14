const express = require('express');

const router = express.Router();

const memberController = require('../controllers/member');
const { authCheck } = require('../authentication/authenticate.js');
const memberValidator = require('../utilities/member-validator');

// GET /Members
router.get('/', memberController.getAll);

// GET /Members/:id
router.get('/:id', memberController.getById);

// CREATE /Member
router.post('/', authCheck, memberValidator.memberRules(), memberValidator.validateMember, memberController.createMember);

// UPDATE /Member/:id
router.put('/:id', authCheck, memberValidator.memberRules(), memberValidator.validateMember, memberController.updateMember);

// DELETE /Member/:id
router.delete('/:id', authCheck, memberController.deleteMember);

module.exports = router;