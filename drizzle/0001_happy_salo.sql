CREATE TABLE IF NOT EXISTS "booking" (
	"hotelId" text NOT NULL,
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
DO $$ BEGIN
 ALTER TABLE "booking" ADD CONSTRAINT "booking_hotelId_hotel_id_fk" FOREIGN KEY ("hotelId") REFERENCES "public"."hotel"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking" ADD CONSTRAINT "booking_roomId_room_id_fk" FOREIGN KEY ("roomId") REFERENCES "public"."room"("id") ON DELETE cascade ON UPDATE no action;
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
