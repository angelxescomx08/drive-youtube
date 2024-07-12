import * as env from 'env-var';
import "dotenv/config"

export const envs = {
  SECRET_PASSWORD_KEY: env.get('SECRET_PASSWORD_KEY').required().asString(),
  DATABASE_URL: env.get('DATABASE_URL').required().asString(),
  MAIL: env.get('MAIL').required().asEmailString(),
  PORT: env.get('PORT').required().asIntPositive()
}