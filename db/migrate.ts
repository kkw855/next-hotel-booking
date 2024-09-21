import { migrate } from 'drizzle-orm/node-postgres/migrator'

import { db } from './db'

try {
  await migrate(db, { migrationsFolder: './drizzle' })
  console.log('Migration completed🚀')
} catch (error) {
  console.error('Error during migration:', error)
}
