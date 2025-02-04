import httpStatus from 'http-status'
import App__error from '../../Error/App__Error'
import { User } from '../user/userModel'
import { Tauth } from './authInterface'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../config'
import sendMail from '../../utils/mailer'

const generateCode = (length: number): string => {
  const characters = '0123456789'
  let code = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    code += characters.charAt(randomIndex)
  }
  return code
}

const loginService = async (payload: Tauth) => {
  const user = await User.findOne({ email: payload.email })

  // Check if the user exists
  if (!user) {
    throw new App__error(httpStatus.NOT_FOUND, 'user not found.')
  }

  // Check if the user account is blocked
  if (user.isBlocked === true) {
    throw new App__error(
      httpStatus.FORBIDDEN,
      'This user account is currently blocked!',
    )
  }

  const plainPassword = payload.password
  const userHashPassword = user.password
  console.log('userHashPassword', userHashPassword)
  const isPasswordValid = await bcrypt.compare(plainPassword, userHashPassword)

  if (!isPasswordValid) {
    throw new App__error(httpStatus.UNAUTHORIZED, 'Invalid credentials.')
  }

  const code = generateCode(6) // Example: 6-digit code

  await User.findOneAndUpdate(
    { email: payload.email },
    { loginCode: code, loginCodeExpiry: new Date(Date.now() + 5 * 60 * 1000) },
  )

  try {
    await sendMail({
      to: user.email,
      subject: 'Login Verification Code',
      body: `<p>Your login verification code is: <strong>${code}</strong></p><p>This code will expire in 5 minutes.</p>`,
    })
  } catch (emailError) {
    console.error('Error sending email:', emailError)
    throw new App__error(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error sending verification email.',
    )
  }
}

const verifyCodeService = async (email: string, code: string) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new App__error(httpStatus.NOT_FOUND, 'User not found.')
  }

  if (!user.loginCode || user.loginCode !== code) {
    throw new App__error(httpStatus.UNAUTHORIZED, 'Invalid verification code.')
  }

  if (user.loginCodeExpiry && user.loginCodeExpiry < new Date()) {
    await User.findOneAndUpdate(
      { email },
      { loginCode: null, loginCodeExpiry: null },
    )

    throw new App__error(httpStatus.UNAUTHORIZED, 'Verification code expired.')
  }

  await User.findOneAndUpdate(
    { email },
    { loginCode: null, loginCodeExpiry: null },
  )

  const jwtPayload = {
    id: user._id,
    name: user.name,
    role: user.role,
    email: user.email,
  }

  const accessToken = jwt.sign(
    jwtPayload,
    config.jwt__access__token__secret as string,
    { expiresIn: '10d' },
  )
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt__refresh__token__secret as string,
    { expiresIn: '20d' },
  )

  return { accessToken, refreshToken }
}

export const authService = {
  loginService,
  verifyCodeService,
}
