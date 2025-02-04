import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join((process.cwd(), '.env')) })

export default {
  node__env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoose__connection: process.env.MONGOOSE_CONNECTION_URL,
  jwt__access__token__secret: process.env.JWT__ACCESS__SECRET__TOKEN,
  jwt__refresh__token__secret: process.env.JWT__REFRESH__SECRET__TOKEN,
  emailSender: {
    email: process.env.EMAIL,
    app_pass: process.env.APP_PASS,
  },
}
