import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
  secret: process.env.JWT_SECRET,
  expires_in: process.env.JWT_EXPIRES_IN,
  refresh_secret: process.env.JWT_REFRESH_SECRET,
  refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  store_id: process.env.STORE_ID,
  store_password: process.env.STORE_PASSWORD,
  sslPaymentUrl: process.env.SSL_PAYMENT_URL,
  sslValidateUrl: process.env.SSL_VALIDATE_URL,
}
