import jwt, { Secret } from 'jsonwebtoken'

export const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireDuration: string,
): string => {
  return jwt.sign(payload, secret, { expiresIn: expireDuration })
}
