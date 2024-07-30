const express = require('express');
const router = express.Router();
const retreatController = require('../controllers/retreatController');

router.get('/retreats', retreatController.getAllRetreats);
router.get('/retreats/:id', retreatController.getRetreatById);

module.exports = router;