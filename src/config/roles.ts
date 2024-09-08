import { Role } from '@prisma/client'

/**
 * Represents the roles and their corresponding permissions.
 */
const allRoles = {
  [Role.ADMIN]: ['getUsers', 'manageUsers'],
  [Role.USER]: ['getUsers', 'manageUsers'],
}

export const roles = Object.keys(allRoles)
export const roleRights = new Map(Object.entries(allRoles))
