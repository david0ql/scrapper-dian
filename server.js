const express = require("express");
const routes = require("./routes");
const app = express();

require("dotenv").config();

app.use("/", routes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
