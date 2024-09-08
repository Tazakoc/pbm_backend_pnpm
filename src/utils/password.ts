import bcrypt from 'bcryptjs'

/**
 * Encrypts a password using bcrypt.
 *
 * @param password - The password to be encrypted.
 * @returns The encrypted password.
 */
export const encryptPassword = async (password: string) => {
  const encryptedPassword = await bcrypt.hash(password, 8)
  return encryptedPassword
}

/**
 * Checks if the provided password matches the user's password.
 * @param password - The password to be checked.
 * @param userPassword - The user's password to compare against.
 * @returns A promise that resolves to a boolean indicating whether the passwords match.
 */
export const isPasswordMatch = async (password: string, userPassword: string) => {
  return bcrypt.compare(password, userPassword)
}
