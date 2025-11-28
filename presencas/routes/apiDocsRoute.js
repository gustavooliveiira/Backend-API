const express = require("express");
const YAML = require("yaml");
const fs = require("fs");
const path = require("path");
const swaggerUi = require("swagger-ui-express");

const file = fs.readFileSync(path.join(__dirname, "../swagger.yaml"), "utf-8");
const swaggerDoc = YAML.parse(file);
const router = express.Router();

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDoc));

module.exports = router;
