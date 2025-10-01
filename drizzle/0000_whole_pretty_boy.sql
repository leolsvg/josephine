CREATE TYPE "public"."menu-category" AS ENUM('fromage', 'entree', 'plat', 'dessert', 'partager');--> statement-breakpoint
CREATE TYPE "public"."menu-service" AS ENUM('soir', 'midi');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'present', 'absent', 'canceled');--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bookings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"date" date NOT NULL,
	"time" time NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"phone" text,
	"guests" integer NOT NULL,
	"notes" text,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"table" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bookings" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "exceptions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "exceptions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"from" date NOT NULL,
	"to" date,
	"periods" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"note" text
);
--> statement-breakpoint
ALTER TABLE "exceptions" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "menus" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "menus_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"description" text NOT NULL,
	"category" "menu-category" NOT NULL,
	"price" integer NOT NULL,
	"service" "menu-service" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "menus" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "settings" (
	"id" integer PRIMARY KEY NOT NULL,
	"max_capacity_per_slot" integer NOT NULL,
	"max_capacity_per_service" integer NOT NULL,
	"max_guests_per_booking" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "settings" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "weekly" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "weekly_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"day" smallint NOT NULL,
	"start" time NOT NULL,
	"end" time NOT NULL
);
--> statement-breakpoint
ALTER TABLE "weekly" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "For realtime enable all operations to authenticated users" ON "bookings" AS PERMISSIVE FOR ALL TO "authenticated" USING (true) WITH CHECK (true);--> statement-breakpoint
CREATE POLICY "Enable read access for all users" ON "menus" AS PERMISSIVE FOR SELECT TO "anon" USING (true);--> statement-breakpoint
CREATE POLICY "Enable all operations to authenticated users" ON "menus" AS PERMISSIVE FOR ALL TO "authenticated" USING (true) WITH CHECK (true);