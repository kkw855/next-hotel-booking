import {
  pgTable,
  primaryKey,
  text,
  timestamp,
  integer,
  boolean,
} from 'drizzle-orm/pg-core'
import type { AdapterAccountType } from 'next-auth/adapters'
import { createId } from '@paralleldrive/cuid2'

export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
})

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
)

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
)

export const authenticators = pgTable(
  'authenticator',
  {
    credentialID: text('credentialID').notNull().unique(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    providerAccountId: text('providerAccountId').notNull(),
    credentialPublicKey: text('credentialPublicKey').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: text('credentialDeviceType').notNull(),
    credentialBackedUp: boolean('credentialBackedUp').notNull(),
    transports: text('transports'),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  }),
)

// TODO: https://orm.drizzle.team/learn/guides/postgresql-full-text-search 추가
// TODO: 인덱스 설정 추가
export const hotel = pgTable('hotel', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text('title'),
  description: text('description'),
  image: text('image'),
  country: text('country'),
  state: text('state'),
  city: text('city'),
  locationDescription: text('locationDescription'),
  gym: boolean('gym'),
  spa: boolean('spa'),
  bar: boolean('bar'),
  laundry: boolean('laundry'),
  restaurant: boolean('restaurant'),
  shopping: boolean('shopping'),
  freeParking: boolean('freeParking'),
  bikeRental: boolean('bikeRental'),
  freeWifi: boolean('freeWifi'),
  movieNights: boolean('movieNights'),
  swimmingPool: boolean('swimmingPool'),
  coffeeShop: boolean('coffeeShop'),
  addedAt: timestamp('addedAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').$onUpdate(() => new Date()),
})

export const room = pgTable('room', {
  hotelId: text('hotelId')
    .notNull()
    .references(() => hotel.id, { onDelete: 'cascade' }),
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  title: text('title'),
  description: text('description'),
  bedCount: integer('bedCount'),
  guestCount: integer('guestCount'),
  bathroomCount: integer('bathroomCount'),
  kingBed: integer('kingBed'),
  queenBen: integer('queenBen'),
  image: text('image'),
  breakFastPrice: integer('breakFastPrice'),
  roomPrice: integer('roomPrice'),
  roomService: boolean('roomService'),
  TV: boolean('tv'),
  balcony: boolean('balcony'),
  freeWifi: boolean('freeWifi'),
  cityView: boolean('cityView'),
  oceanView: boolean('oceanView'),
  mountainView: boolean('mountainView'),
  airCondition: boolean('airCondition'),
  soundProofed: boolean('soundProofed'),
})

export const booking = pgTable('booking', {
  hotelId: text('hotelId')
    .notNull()
    .references(() => hotel.id, { onDelete: 'cascade' }),
  // hotelOwnerId
  roomId: text('roomId')
    .notNull()
    .references(() => room.id, { onDelete: 'cascade' }),
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  userName: text('userName'),
  userId: text('userId'),
  startDate: timestamp('startDate'),
  endDate: timestamp('endDate'),
  breakFastIncluded: boolean('breakFastIncluded'),
  currency: text('currency'),
  totalPrice: integer('totalPrice'),
  paymentStatus: boolean('paymentStatus'),
  paymentIntentId: text('paymentIntentId'),
  bookedAt: timestamp('bookedAt').$default(() => new Date()),
})
