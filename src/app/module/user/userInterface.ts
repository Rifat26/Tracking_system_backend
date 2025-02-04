export type Tuser = {
  name: string
  email: string
  password: string
  role: 'user' | 'admin'
  isBlocked: boolean
  loginCode: string
  loginCodeExpiry: Date
}
