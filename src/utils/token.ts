import jwt, { type Secret } from 'jsonwebtoken'

/**
 * Generates a token with the provided user information.
 * @param userId - The ID of the user.
 * @param username - The username of the user.
 * @param role - The role of the user.
 * @param secret - The secret key used for signing the token.
 * @param expiresIn - The expiration time of the token in seconds.
 * @param type - The type of the token.
 * @returns The generated token.
 */
export function generateToken(
  userId: string,
  username: string,
  role: string,
  secret: Secret,
  expiresIn: number,
  type: string
) {
  const options = {
    sub: userId,
    username,
    role,
    type,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + expiresIn,
  }

  return jwt.sign(options, secret)
}
