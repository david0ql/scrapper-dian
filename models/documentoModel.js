const puppeteer = require("puppeteer");

async function consultarDatos(documentNum) {
  const fields = [
    "dv",
    "primerApellido",
    "segundoApellido",
    "otrosNombres",
    "primerNombre",
    "razonSocial",
    "estado",
  ];
  const request_data = {};
  const result = {};

  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  try {
    const page = await browser.newPage();
    await page.goto(
      "https://muisca.dian.gov.co/WebRutMuisca/DefConsultaEstadoRUT.faces"
    );
    await page.type(
      'input[name="vistaConsultaEstadoRUT:formConsultaEstadoRUT:numNit"]',
      documentNum
    );
    await page.keyboard.press("Enter");

    await page.waitForSelector(
      "span#vistaConsultaEstadoRUT\\:formConsultaEstadoRUT\\:dv"
    );

    for (const field of fields) {
      try {
        request_data[field] = await page.$eval(
          `span#vistaConsultaEstadoRUT\\:formConsultaEstadoRUT\\:${field}`,
          (el) => el.textContent.trim()
        );
      } catch (e) {
        request_data[field] = "";
      }
    }

    result["status"] = 200;
    result["mensaje"] = request_data["estado"].trim();
    result["documento"] = documentNum;

    if (request_data["razonSocial"] !== "") {
      result["tipoPersona"] = 1;
      result["razonSocial"] = request_data["razonSocial"];
      result["digitoVerificacion"] = request_data["dv"];
    } else {
      result["tipoPersona"] = 2;
      result["primerNombre"] = request_data["primerNombre"].trim();
      result["segundoNombre"] = request_data["otrosNombres"].trim();
      result["primerApellido"] = request_data["primerApellido"].trim();
      result["segundoApellido"] = request_data["segundoApellido"].trim();
    }

    return result;
  } catch (e) {
    console.log(e);
    result["status"] = 404;
    result["documento"] = documentNum;
    result["mensaje"] = "REGISTRO NO ENCONTRADO";
    return result;
  } finally {
    browser.close();
  }
}

module.exports = {
  consultarDatos,
};
