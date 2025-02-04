import httpStatus from 'http-status'
import CatchAsync from '../../utils/CatchAsync'
import sendResponce from '../../utils/SendResponce'
import { authService } from './authService'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loginController = CatchAsync(async (req, res, next) => {
  await authService.loginService(req.body)

  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A verification code has been sent to your email address.',
    data: null,
  })
})

const verifyCodeController = CatchAsync(async (req, res) => {
  const { email, code } = req.body
  const result = await authService.verifyCodeService(email, code)

  const { accessToken, refreshToken } = result

  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful.',
    data: {
      accessToken,
      refreshToken,
    },
  })
})

export const AuthController = {
  loginController,
  verifyCodeController,
}
