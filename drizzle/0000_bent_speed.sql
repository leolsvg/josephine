CREATE TYPE "public"."menu-category" AS ENUM('fromage', 'entree', 'plat', 'dessert', 'partager');--> statement-breakpoint
CREATE TYPE "public"."menu-service" AS ENUM('soir', 'midi');--> statement-breakpoint
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
CREATE POLICY "Enable for unauthenticated pages" ON "menus" AS PERMISSIVE FOR SELECT TO "anon";