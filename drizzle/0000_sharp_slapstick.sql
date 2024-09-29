CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authenticator" (
	"credentialID" text NOT NULL,
	"userId" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"credentialPublicKey" text NOT NULL,
	"counter" integer NOT NULL,
	"credentialDeviceType" text NOT NULL,
	"credentialBackedUp" boolean NOT NULL,
	"transports" text,
	CONSTRAINT "authenticator_userId_credentialID_pk" PRIMARY KEY("userId","credentialID"),
	CONSTRAINT "authenticator_credentialID_unique" UNIQUE("credentialID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "booking" (
	"hotelId" text NOT NULL,
	"hotelOwnerId" text,
	"roomId" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"userName" text,
	"userId" text,
	"startDate" timestamp,
	"endDate" timestamp,
	"breakFastIncluded" boolean,
	"currency" text,
	"totalPrice" integer,
	"paymentStatus" boolean,
	"paymentIntentId" text,
	"bookedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hotel" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"title" text,
	"titleSearch" "tsvector" GENERATED ALWAYS AS (to_tsvector('english', "hotel"."title")) STORED,
	"description" text,
	"image" text,
	"country" text,
	"state" text,
	"city" text,
	"locationDescription" text,
	"gym" boolean,
	"spa" boolean,
	"bar" boolean,
	"laundry" boolean,
	"restaurant" boolean,
	"shopping" boolean,
	"freeParking" boolean,
	"bikeRental" boolean,
	"freeWifi" boolean,
	"movieNights" boolean,
	"swimmingPool" boolean,
	"coffeeShop" boolean,
	"addedAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "room" (
	"hotelId" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"title" text,
	"description" text,
	"bedCount" integer,
	"guestCount" integer,
	"bathroomCount" integer,
	"kingBed" integer,
	"queenBen" integer,
	"image" text,
	"breakFastPrice" integer,
	"roomPrice" integer,
	"roomService" boolean,
	"tv" boolean,
	"balcony" boolean,
	"freeWifi" boolean,
	"cityView" boolean,
	"oceanView" boolean,
	"mountainView" boolean,
	"airCondition" boolean,
	"soundProofed" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"emailVerified" timestamp,
	"image" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking" ADD CONSTRAINT "booking_hotelId_hotel_id_fk" FOREIGN KEY ("hotelId") REFERENCES "public"."hotel"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking" ADD CONSTRAINT "booking_roomId_room_id_fk" FOREIGN KEY ("roomId") REFERENCES "public"."room"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hotel" ADD CONSTRAINT "hotel_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "room" ADD CONSTRAINT "room_hotelId_hotel_id_fk" FOREIGN KEY ("hotelId") REFERENCES "public"."hotel"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "bookings_hotel_index" ON "booking" USING btree ("hotelId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "bookings_room_index" ON "booking" USING btree ("roomId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "hotels_title_search_index" ON "hotel" USING gin ("titleSearch");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "rooms_hotel_index" ON "room" USING btree ("hotelId");