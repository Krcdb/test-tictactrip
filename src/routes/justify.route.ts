const express = require('express');
const router = express.Router();
import JustifyController from '../controllers/justify.controller';

const justifyController = new JustifyController()

router.post('/', justifyController.justifyText);

module.exports = router
