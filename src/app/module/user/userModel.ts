import { model, Schema } from 'mongoose'
import { Tuser } from './userInterface'
import isEmail from 'validator/lib/isEmail'
import bcrypt from 'bcrypt'
const userModelSchema = new Schema<Tuser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      validate: {
        validator: (value: string) => isEmail(value),
        message: '{VALUE} is not a valid email!',
      },
    },
    password: {
      type: String,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    loginCode: {
      type: String,
      default: null,
    },
    loginCodeExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

userModelSchema.pre('save', async function () {
  const slatRound = 12
  const hashPassword = await bcrypt.hash(this.password, slatRound)
  this.password = hashPassword
})

export const User = model<Tuser>('User', userModelSchema)
