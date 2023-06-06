const documentoModel = require("../models/documentoModel");

async function index(req, res) {
  res.json({ message: "Hello World" });
}

async function validateDocument(req, res) {
  const name = req.params.name;
  const result = await documentoModel.consultarDatos(name);
  res.json(result);
}

module.exports = {
  index,
  validateDocument,
};
