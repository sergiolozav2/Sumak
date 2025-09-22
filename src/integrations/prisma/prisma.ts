import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'

export const prisma = new PrismaClient()

if (process.env.MIGRATIONS === 'true') {
  try {
    console.log('Running migrations...')

    const result = execSync(`pnpx prisma migrate deploy`, {
      stdio: 'inherit',
    })
    console.log(result)
  } catch (error) {
    console.error('Error running migrations:', error)
  }
}
