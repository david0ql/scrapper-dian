const express = require("express");
const router = express.Router();
const documentoController = require("./controllers/documentoController");

router.get("/", documentoController.index);
router.get("/validate/document/:name", documentoController.validateDocument);

module.exports = router;
