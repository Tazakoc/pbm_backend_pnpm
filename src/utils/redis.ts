import logger from '../logger'
import connectToRedis from '../config/redis'

const redisClient = connectToRedis()

/**
 * Stores the refresh token in Redis for a given username.
 *
 * @param {string} username - The username associated with the refresh token.
 * @param {string} redisKey - The key to store the refresh token in Redis.
 * @param {string} refreshToken - The refresh token to be stored.
 * @param {number} expirationTimeInSeconds - The expiration time of the refresh token in seconds.
 * @returns {Promise<string>} - The stored refresh token.
 * @throws {Error} - If there is an error setting the refresh token in Redis.
 */
const storeRefreshTokenInRedis = async (
  username: string,
  redisKey: string,
  refreshToken: string,
  expirationTimeInSeconds: number
) => {
  try {
    await redisClient.client.set(redisKey, refreshToken, 'PX', expirationTimeInSeconds)
    logger.info('Refresh token successfully stored in Redis for username: ' + username)
    return refreshToken
  } catch (err) {
    logger.error('Error setting refresh token in Redis for username: ' + username + ' - ' + err)
    throw err
  }
}

/**
 * Deletes the refresh token associated with the given user ID from Redis.
 *
 * @param userId - The ID of the user whose refresh token needs to be deleted.
 * @throws {Error} If there is an error deleting the refresh token from Redis.
 */
const deleteRefreshToken = async (userId: string) => {
  try {
    const redisKey = `refreshToken:${userId}`
    await redisClient.client.del(redisKey)
    logger.info('Refresh token successfully deleted from Redis')
  } catch (err) {
    logger.error('Error deleting refresh token from Redis - ' + err)
    throw err
  }
}

export { storeRefreshTokenInRedis, deleteRefreshToken }
