export const USER__ROLE = {
    user:'user',
    admin:'admin'
} as const

export type ROLE__TYPE = keyof typeof USER__ROLE 