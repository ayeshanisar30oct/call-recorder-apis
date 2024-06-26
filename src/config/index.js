const Joi = require("joi");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().required(),
    PORT: Joi.number().default(8000),
    MYSQL_HOST: Joi.string().required().description("localhost"),
    MYSQL_USER: Joi.string().required().description("root"),
    MYSQL_PASSWORD: Joi.string().allow("").required().description("Database password, can be empty"), 
    MYSQL_DATABASE: Joi.string().required().description("callrecorder"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);
  
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mysql: {
    host: envVars.MYSQL_HOST,
    user: envVars.MYSQL_USER,
    password: envVars.MYSQL_PASSWORD,
    database: envVars.MYSQL_DATABASE,
  },
};
