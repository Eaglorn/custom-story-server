const { PrismaClient } = require('@prisma/postgresql/client')
const prisma = new PrismaClient()
module.exports = prisma