import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'

export const prisma = new PrismaClient()

try {
  console.log('Running migrations...')
  const result = execSync(`pnpx prisma migrate deploy`, {
    stdio: 'inherit',
    timeout: 60000,
  })
  console.log(result)
} catch (error) {
  console.error('Error running migrations:', error)
}
