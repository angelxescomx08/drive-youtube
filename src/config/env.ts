import * as env from 'env-var';
import "dotenv/config"

export const envs = {
  SECRET_PASSWORD_KEY: env.get('SECRET_PASSWORD_KEY').required().asString(),
  DATABASE_URL: env.get('DATABASE_URL').required().asString(),
  TURSO_AUTH_TOKEN: env.get('TURSO_AUTH_TOKEN').required().asString(),
  //MAIL: env.get('MAIL').required().asEmailString(),
  PORT: env.get('PORT').required().asIntPositive(),

  AWS_ACCESS_KEY_ID: env.get("AWS_ACCESS_KEY_ID").required().asString(),
  AWS_SECRET_ACCESS_KEY: env.get("AWS_SECRET_ACCESS_KEY").required().asString(),
  AWS_REGION: env.get("AWS_REGION").required().asString(),
  AWS_BUCKET_NAME: env.get("AWS_BUCKET_NAME").required().asString(),
}