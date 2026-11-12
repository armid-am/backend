import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'ru', 'hy');
  CREATE TYPE "public"."enum_media_position" AS ENUM('center', 'top', 'bottom', 'left', 'right');
  CREATE TYPE "public"."enum_contact_position" AS ENUM('center', 'top', 'bottom', 'left', 'right');
  CREATE TYPE "public"."enum_donation_hero_position" AS ENUM('center', 'top', 'bottom', 'left', 'right');
  CREATE TYPE "public"."enum_foundation_hero_position" AS ENUM('center', 'top', 'bottom', 'left', 'right');
  CREATE TYPE "public"."enum_gallery_position" AS ENUM('center', 'top', 'bottom', 'left', 'right');
  CREATE TABLE "board_of_guardian_user" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "board_of_guardian_user_locales" (
  	"full_name" varchar DEFAULT 'Board of Guardian',
  	"skill" varchar,
  	"bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "category_video" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "category_video_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "donation_rules" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "donation_rules_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "donation_rules_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"rules_id" integer
  );
  
  CREATE TABLE "donors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"email" varchar NOT NULL,
  	"full_name" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"money" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"currency" varchar NOT NULL,
  	"donate" varchar NOT NULL,
  	"is_anonimous" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "email_messages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"theme" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "email_subscribe" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "foundation_link" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "foundation_link_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "gallery_category" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "gallery_category_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "gallery_category_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"gallery_sub_category_id" integer
  );
  
  CREATE TABLE "gallery_sub_category" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "gallery_sub_category_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "gallery_sub_category_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"video_posts_id" integer
  );
  
  CREATE TABLE "hero_slider_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"poster_id" integer,
  	"video_posts_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "hero_slider_section_locales" (
  	"video_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "logo_slider" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_image_id" integer,
  	"url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "map" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"province_name" varchar,
  	"number_of_monuments" numeric,
  	"area" numeric,
  	"population" numeric,
  	"cities" numeric,
  	"villages" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "map_locales" (
  	"monuments_text" varchar,
  	"text" varchar,
  	"text_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "map_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"video_posts_id" integer
  );
  
  CREATE TABLE "province_name" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"number_of_monuments" numeric,
  	"area" numeric,
  	"population" numeric,
  	"cities" numeric,
  	"villages" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "province_name_locales" (
  	"name" varchar,
  	"section_title" varchar,
  	"monuments_text" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "province_name_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"video_posts_id" integer
  );
  
  CREATE TABLE "reports_blocks_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "reports_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "reports_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "reports_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reports_blocks_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "reports_blocks_title_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reports_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "reports_blocks_quote_locales" (
  	"quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"keyword" varchar,
  	"date" timestamp(3) with time zone,
  	"image_id" integer,
  	"url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "reports_locales" (
  	"title" varchar,
  	"province" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "reports_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "rules" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "rules_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "supporters_company" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "supporters_company_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "supporters_user" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "supporters_user_locales" (
  	"full_name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "team_users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_users_locales" (
  	"full_name" varchar,
  	"skill" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "updates_blocks_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "updates_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "updates_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "updates_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "updates_blocks_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "updates_blocks_title_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "updates_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "updates_blocks_quote_locales" (
  	"quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "updates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"keyword" varchar,
  	"date" timestamp(3) with time zone,
  	"image_id" integer,
  	"url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "updates_locales" (
  	"title" varchar,
  	"province" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "updates_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "video_posts_blocks_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "video_posts_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "video_posts_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "video_posts_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "video_posts_blocks_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "video_posts_blocks_title_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "video_posts_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "video_posts_blocks_quote_locales" (
  	"quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "video_posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"keyword" varchar,
  	"date" timestamp(3) with time zone,
  	"category_id" integer,
  	"poster_id" integer,
  	"url_youtube_vudeo" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "video_posts_locales" (
  	"title" varchar,
  	"address" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "video_posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"position" "enum_contact_position" DEFAULT 'center',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "donation_donors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"donor_id" integer
  );
  
  CREATE TABLE "donation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"hero_position" "enum_donation_hero_position" DEFAULT 'center',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "donation_locales" (
  	"hero_title" varchar,
  	"form_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_locales" (
  	"logo_logo_sub_text" varchar,
  	"subscribe_text" varchar,
  	"bottom_text_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"foundation_link_id" integer,
  	"gallery_category_id" integer
  );
  
  CREATE TABLE "foundation_project_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "foundation_project_posts_locales" (
  	"before_title" varchar,
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "foundation_topics_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "foundation_topics_posts_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "foundation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"hero_position" "enum_foundation_hero_position" DEFAULT 'center',
  	"project_image_id" integer,
  	"our_activity_image_first_id" integer,
  	"our_activity_image_second_id" integer,
  	"our_activity_image_third_id" integer,
  	"video_video_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "foundation_locales" (
  	"hero_title" varchar,
  	"title1" varchar,
  	"title2" varchar,
  	"title3" varchar,
  	"about_title" varchar,
  	"about_description" varchar,
  	"project_title" varchar,
  	"project_first_text" varchar,
  	"project_second_text" varchar,
  	"project_fourth_text" varchar,
  	"our_activity_title" varchar,
  	"our_activity_first_text" varchar,
  	"our_activity_second_text" varchar,
  	"topics_title" varchar,
  	"topics_first_text" varchar,
  	"board_of_guardians_title" varchar,
  	"team_title" varchar,
  	"supporters_title" varchar,
  	"supporters_supporter_author_post_author_image_id" integer,
  	"supporters_supporter_author_post_author_fullname" varchar,
  	"supporters_supporter_author_post_author_top_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "foundation_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"foundation_link_id" integer,
  	"board_of_guardian_user_id" integer,
  	"team_users_id" integer,
  	"supporters_company_id" integer,
  	"supporters_user_id" integer,
  	"updates_id" integer,
  	"reports_id" integer
  );
  
  CREATE TABLE "gallery" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"position" "enum_gallery_position" DEFAULT 'center',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "gallery_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "gallery_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"gallery_category_id" integer,
  	"category_video_id" integer
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_video_modal" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_locales" (
  	"hero_title" varchar,
  	"slider_title" varchar,
  	"map_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"hero_slider_section_id" integer,
  	"province_name_id" integer,
  	"logo_slider_id" integer
  );
  
  ALTER TABLE "media" ALTER COLUMN "alt" DROP NOT NULL;
  ALTER TABLE "media" ADD COLUMN "position" "enum_media_position" DEFAULT 'center';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "board_of_guardian_user_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "category_video_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "donation_rules_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "donors_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "email_messages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "email_subscribe_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "foundation_link_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "gallery_category_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "gallery_sub_category_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "hero_slider_section_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "logo_slider_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "map_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "province_name_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "reports_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "rules_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "supporters_company_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "supporters_user_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "team_users_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "updates_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "video_posts_id" integer;
  ALTER TABLE "board_of_guardian_user" ADD CONSTRAINT "board_of_guardian_user_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "board_of_guardian_user_locales" ADD CONSTRAINT "board_of_guardian_user_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."board_of_guardian_user"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "category_video_locales" ADD CONSTRAINT "category_video_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."category_video"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "donation_rules_locales" ADD CONSTRAINT "donation_rules_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."donation_rules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "donation_rules_rels" ADD CONSTRAINT "donation_rules_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."donation_rules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "donation_rules_rels" ADD CONSTRAINT "donation_rules_rels_rules_fk" FOREIGN KEY ("rules_id") REFERENCES "public"."rules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "foundation_link_locales" ADD CONSTRAINT "foundation_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."foundation_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_category_locales" ADD CONSTRAINT "gallery_category_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_category"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_category_rels" ADD CONSTRAINT "gallery_category_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."gallery_category"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_category_rels" ADD CONSTRAINT "gallery_category_rels_gallery_sub_category_fk" FOREIGN KEY ("gallery_sub_category_id") REFERENCES "public"."gallery_sub_category"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_sub_category_locales" ADD CONSTRAINT "gallery_sub_category_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_sub_category"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_sub_category_rels" ADD CONSTRAINT "gallery_sub_category_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."gallery_sub_category"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_sub_category_rels" ADD CONSTRAINT "gallery_sub_category_rels_video_posts_fk" FOREIGN KEY ("video_posts_id") REFERENCES "public"."video_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hero_slider_section" ADD CONSTRAINT "hero_slider_section_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hero_slider_section" ADD CONSTRAINT "hero_slider_section_video_posts_id_video_posts_id_fk" FOREIGN KEY ("video_posts_id") REFERENCES "public"."video_posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hero_slider_section_locales" ADD CONSTRAINT "hero_slider_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hero_slider_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "logo_slider" ADD CONSTRAINT "logo_slider_logo_image_id_media_id_fk" FOREIGN KEY ("logo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "map_locales" ADD CONSTRAINT "map_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "map_rels" ADD CONSTRAINT "map_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "map_rels" ADD CONSTRAINT "map_rels_video_posts_fk" FOREIGN KEY ("video_posts_id") REFERENCES "public"."video_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "province_name_locales" ADD CONSTRAINT "province_name_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."province_name"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "province_name_rels" ADD CONSTRAINT "province_name_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."province_name"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "province_name_rels" ADD CONSTRAINT "province_name_rels_video_posts_fk" FOREIGN KEY ("video_posts_id") REFERENCES "public"."video_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_images" ADD CONSTRAINT "reports_blocks_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_video" ADD CONSTRAINT "reports_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_text" ADD CONSTRAINT "reports_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_text_locales" ADD CONSTRAINT "reports_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_title" ADD CONSTRAINT "reports_blocks_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_title_locales" ADD CONSTRAINT "reports_blocks_title_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports_blocks_title"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_quote" ADD CONSTRAINT "reports_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_blocks_quote_locales" ADD CONSTRAINT "reports_blocks_quote_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports_blocks_quote"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports" ADD CONSTRAINT "reports_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reports_locales" ADD CONSTRAINT "reports_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_rels" ADD CONSTRAINT "reports_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reports_rels" ADD CONSTRAINT "reports_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rules_locales" ADD CONSTRAINT "rules_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "supporters_company" ADD CONSTRAINT "supporters_company_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "supporters_company_locales" ADD CONSTRAINT "supporters_company_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."supporters_company"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "supporters_user" ADD CONSTRAINT "supporters_user_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "supporters_user_locales" ADD CONSTRAINT "supporters_user_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."supporters_user"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_users" ADD CONSTRAINT "team_users_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_users_locales" ADD CONSTRAINT "team_users_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "updates_blocks_images" ADD CONSTRAINT "updates_blocks_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."updates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "updates_blocks_video" ADD CONSTRAINT "updates_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."updates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "updates_blocks_text" ADD CONSTRAINT "updates_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."updates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "updates_blocks_text_locales" ADD CONSTRAINT "updates_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."updates_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "updates_blocks_title" ADD CONSTRAINT "updates_blocks_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."updates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "updates_blocks_title_locales" ADD CONSTRAINT "updates_blocks_title_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."updates_blocks_title"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "updates_blocks_quote" ADD CONSTRAINT "updates_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."updates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "updates_blocks_quote_locales" ADD CONSTRAINT "updates_blocks_quote_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."updates_blocks_quote"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "updates" ADD CONSTRAINT "updates_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "updates_locales" ADD CONSTRAINT "updates_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."updates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "updates_rels" ADD CONSTRAINT "updates_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."updates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "updates_rels" ADD CONSTRAINT "updates_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "video_posts_blocks_images" ADD CONSTRAINT "video_posts_blocks_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."video_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "video_posts_blocks_video" ADD CONSTRAINT "video_posts_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."video_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "video_posts_blocks_text" ADD CONSTRAINT "video_posts_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."video_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "video_posts_blocks_text_locales" ADD CONSTRAINT "video_posts_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."video_posts_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "video_posts_blocks_title" ADD CONSTRAINT "video_posts_blocks_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."video_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "video_posts_blocks_title_locales" ADD CONSTRAINT "video_posts_blocks_title_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."video_posts_blocks_title"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "video_posts_blocks_quote" ADD CONSTRAINT "video_posts_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."video_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "video_posts_blocks_quote_locales" ADD CONSTRAINT "video_posts_blocks_quote_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."video_posts_blocks_quote"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "video_posts" ADD CONSTRAINT "video_posts_category_id_category_video_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category_video"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "video_posts" ADD CONSTRAINT "video_posts_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "video_posts_locales" ADD CONSTRAINT "video_posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."video_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "video_posts_rels" ADD CONSTRAINT "video_posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."video_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "video_posts_rels" ADD CONSTRAINT "video_posts_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact" ADD CONSTRAINT "contact_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_locales" ADD CONSTRAINT "contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "donation_donors" ADD CONSTRAINT "donation_donors_donor_id_donors_id_fk" FOREIGN KEY ("donor_id") REFERENCES "public"."donors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "donation_donors" ADD CONSTRAINT "donation_donors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."donation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "donation" ADD CONSTRAINT "donation_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "donation_locales" ADD CONSTRAINT "donation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."donation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_foundation_link_fk" FOREIGN KEY ("foundation_link_id") REFERENCES "public"."foundation_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_gallery_category_fk" FOREIGN KEY ("gallery_category_id") REFERENCES "public"."gallery_category"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "foundation_project_posts" ADD CONSTRAINT "foundation_project_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."foundation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "foundation_project_posts_locales" ADD CONSTRAINT "foundation_project_posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."foundation_project_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "foundation_topics_posts" ADD CONSTRAINT "foundation_topics_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."foundation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "foundation_topics_posts_locales" ADD CONSTRAINT "foundation_topics_posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."foundation_topics_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "foundation" ADD CONSTRAINT "foundation_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "foundation" ADD CONSTRAINT "foundation_project_image_id_media_id_fk" FOREIGN KEY ("project_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "foundation" ADD CONSTRAINT "foundation_our_activity_image_first_id_media_id_fk" FOREIGN KEY ("our_activity_image_first_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "foundation" ADD CONSTRAINT "foundation_our_activity_image_second_id_media_id_fk" FOREIGN KEY ("our_activity_image_second_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "foundation" ADD CONSTRAINT "foundation_our_activity_image_third_id_media_id_fk" FOREIGN KEY ("our_activity_image_third_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "foundation_locales" ADD CONSTRAINT "foundation_locales_supporters_supporter_author_post_author_image_id_media_id_fk" FOREIGN KEY ("supporters_supporter_author_post_author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "foundation_locales" ADD CONSTRAINT "foundation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."foundation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "foundation_rels" ADD CONSTRAINT "foundation_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."foundation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "foundation_rels" ADD CONSTRAINT "foundation_rels_foundation_link_fk" FOREIGN KEY ("foundation_link_id") REFERENCES "public"."foundation_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "foundation_rels" ADD CONSTRAINT "foundation_rels_board_of_guardian_user_fk" FOREIGN KEY ("board_of_guardian_user_id") REFERENCES "public"."board_of_guardian_user"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "foundation_rels" ADD CONSTRAINT "foundation_rels_team_users_fk" FOREIGN KEY ("team_users_id") REFERENCES "public"."team_users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "foundation_rels" ADD CONSTRAINT "foundation_rels_supporters_company_fk" FOREIGN KEY ("supporters_company_id") REFERENCES "public"."supporters_company"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "foundation_rels" ADD CONSTRAINT "foundation_rels_supporters_user_fk" FOREIGN KEY ("supporters_user_id") REFERENCES "public"."supporters_user"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "foundation_rels" ADD CONSTRAINT "foundation_rels_updates_fk" FOREIGN KEY ("updates_id") REFERENCES "public"."updates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "foundation_rels" ADD CONSTRAINT "foundation_rels_reports_fk" FOREIGN KEY ("reports_id") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery" ADD CONSTRAINT "gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_locales" ADD CONSTRAINT "gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_rels" ADD CONSTRAINT "gallery_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_rels" ADD CONSTRAINT "gallery_rels_gallery_category_fk" FOREIGN KEY ("gallery_category_id") REFERENCES "public"."gallery_category"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_rels" ADD CONSTRAINT "gallery_rels_category_video_fk" FOREIGN KEY ("category_video_id") REFERENCES "public"."category_video"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_locales" ADD CONSTRAINT "home_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_hero_slider_section_fk" FOREIGN KEY ("hero_slider_section_id") REFERENCES "public"."hero_slider_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_province_name_fk" FOREIGN KEY ("province_name_id") REFERENCES "public"."province_name"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_logo_slider_fk" FOREIGN KEY ("logo_slider_id") REFERENCES "public"."logo_slider"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "board_of_guardian_user_image_idx" ON "board_of_guardian_user" USING btree ("image_id");
  CREATE INDEX "board_of_guardian_user_updated_at_idx" ON "board_of_guardian_user" USING btree ("updated_at");
  CREATE INDEX "board_of_guardian_user_created_at_idx" ON "board_of_guardian_user" USING btree ("created_at");
  CREATE UNIQUE INDEX "board_of_guardian_user_locales_locale_parent_id_unique" ON "board_of_guardian_user_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "category_video_updated_at_idx" ON "category_video" USING btree ("updated_at");
  CREATE INDEX "category_video_created_at_idx" ON "category_video" USING btree ("created_at");
  CREATE UNIQUE INDEX "category_video_locales_locale_parent_id_unique" ON "category_video_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "donation_rules_updated_at_idx" ON "donation_rules" USING btree ("updated_at");
  CREATE INDEX "donation_rules_created_at_idx" ON "donation_rules" USING btree ("created_at");
  CREATE UNIQUE INDEX "donation_rules_locales_locale_parent_id_unique" ON "donation_rules_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "donation_rules_rels_order_idx" ON "donation_rules_rels" USING btree ("order");
  CREATE INDEX "donation_rules_rels_parent_idx" ON "donation_rules_rels" USING btree ("parent_id");
  CREATE INDEX "donation_rules_rels_path_idx" ON "donation_rules_rels" USING btree ("path");
  CREATE INDEX "donation_rules_rels_rules_id_idx" ON "donation_rules_rels" USING btree ("rules_id");
  CREATE INDEX "donors__order_idx" ON "donors" USING btree ("_order");
  CREATE INDEX "donors_updated_at_idx" ON "donors" USING btree ("updated_at");
  CREATE INDEX "donors_created_at_idx" ON "donors" USING btree ("created_at");
  CREATE INDEX "email_messages_updated_at_idx" ON "email_messages" USING btree ("updated_at");
  CREATE INDEX "email_messages_created_at_idx" ON "email_messages" USING btree ("created_at");
  CREATE INDEX "email_subscribe_updated_at_idx" ON "email_subscribe" USING btree ("updated_at");
  CREATE INDEX "email_subscribe_created_at_idx" ON "email_subscribe" USING btree ("created_at");
  CREATE INDEX "foundation_link_updated_at_idx" ON "foundation_link" USING btree ("updated_at");
  CREATE INDEX "foundation_link_created_at_idx" ON "foundation_link" USING btree ("created_at");
  CREATE UNIQUE INDEX "foundation_link_locales_locale_parent_id_unique" ON "foundation_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "gallery_category_updated_at_idx" ON "gallery_category" USING btree ("updated_at");
  CREATE INDEX "gallery_category_created_at_idx" ON "gallery_category" USING btree ("created_at");
  CREATE UNIQUE INDEX "gallery_category_locales_locale_parent_id_unique" ON "gallery_category_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "gallery_category_rels_order_idx" ON "gallery_category_rels" USING btree ("order");
  CREATE INDEX "gallery_category_rels_parent_idx" ON "gallery_category_rels" USING btree ("parent_id");
  CREATE INDEX "gallery_category_rels_path_idx" ON "gallery_category_rels" USING btree ("path");
  CREATE INDEX "gallery_category_rels_gallery_sub_category_id_idx" ON "gallery_category_rels" USING btree ("gallery_sub_category_id");
  CREATE INDEX "gallery_sub_category_updated_at_idx" ON "gallery_sub_category" USING btree ("updated_at");
  CREATE INDEX "gallery_sub_category_created_at_idx" ON "gallery_sub_category" USING btree ("created_at");
  CREATE UNIQUE INDEX "gallery_sub_category_locales_locale_parent_id_unique" ON "gallery_sub_category_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "gallery_sub_category_rels_order_idx" ON "gallery_sub_category_rels" USING btree ("order");
  CREATE INDEX "gallery_sub_category_rels_parent_idx" ON "gallery_sub_category_rels" USING btree ("parent_id");
  CREATE INDEX "gallery_sub_category_rels_path_idx" ON "gallery_sub_category_rels" USING btree ("path");
  CREATE INDEX "gallery_sub_category_rels_video_posts_id_idx" ON "gallery_sub_category_rels" USING btree ("video_posts_id");
  CREATE INDEX "hero_slider_section_poster_idx" ON "hero_slider_section" USING btree ("poster_id");
  CREATE INDEX "hero_slider_section_video_posts_idx" ON "hero_slider_section" USING btree ("video_posts_id");
  CREATE INDEX "hero_slider_section_updated_at_idx" ON "hero_slider_section" USING btree ("updated_at");
  CREATE INDEX "hero_slider_section_created_at_idx" ON "hero_slider_section" USING btree ("created_at");
  CREATE UNIQUE INDEX "hero_slider_section_locales_locale_parent_id_unique" ON "hero_slider_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "logo_slider_logo_image_idx" ON "logo_slider" USING btree ("logo_image_id");
  CREATE INDEX "logo_slider_updated_at_idx" ON "logo_slider" USING btree ("updated_at");
  CREATE INDEX "logo_slider_created_at_idx" ON "logo_slider" USING btree ("created_at");
  CREATE INDEX "map_updated_at_idx" ON "map" USING btree ("updated_at");
  CREATE INDEX "map_created_at_idx" ON "map" USING btree ("created_at");
  CREATE UNIQUE INDEX "map_locales_locale_parent_id_unique" ON "map_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "map_rels_order_idx" ON "map_rels" USING btree ("order");
  CREATE INDEX "map_rels_parent_idx" ON "map_rels" USING btree ("parent_id");
  CREATE INDEX "map_rels_path_idx" ON "map_rels" USING btree ("path");
  CREATE INDEX "map_rels_video_posts_id_idx" ON "map_rels" USING btree ("video_posts_id");
  CREATE INDEX "province_name_updated_at_idx" ON "province_name" USING btree ("updated_at");
  CREATE INDEX "province_name_created_at_idx" ON "province_name" USING btree ("created_at");
  CREATE UNIQUE INDEX "province_name_locales_locale_parent_id_unique" ON "province_name_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "province_name_rels_order_idx" ON "province_name_rels" USING btree ("order");
  CREATE INDEX "province_name_rels_parent_idx" ON "province_name_rels" USING btree ("parent_id");
  CREATE INDEX "province_name_rels_path_idx" ON "province_name_rels" USING btree ("path");
  CREATE INDEX "province_name_rels_video_posts_id_idx" ON "province_name_rels" USING btree ("video_posts_id");
  CREATE INDEX "reports_blocks_images_order_idx" ON "reports_blocks_images" USING btree ("_order");
  CREATE INDEX "reports_blocks_images_parent_id_idx" ON "reports_blocks_images" USING btree ("_parent_id");
  CREATE INDEX "reports_blocks_images_path_idx" ON "reports_blocks_images" USING btree ("_path");
  CREATE INDEX "reports_blocks_video_order_idx" ON "reports_blocks_video" USING btree ("_order");
  CREATE INDEX "reports_blocks_video_parent_id_idx" ON "reports_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "reports_blocks_video_path_idx" ON "reports_blocks_video" USING btree ("_path");
  CREATE INDEX "reports_blocks_text_order_idx" ON "reports_blocks_text" USING btree ("_order");
  CREATE INDEX "reports_blocks_text_parent_id_idx" ON "reports_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "reports_blocks_text_path_idx" ON "reports_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "reports_blocks_text_locales_locale_parent_id_unique" ON "reports_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reports_blocks_title_order_idx" ON "reports_blocks_title" USING btree ("_order");
  CREATE INDEX "reports_blocks_title_parent_id_idx" ON "reports_blocks_title" USING btree ("_parent_id");
  CREATE INDEX "reports_blocks_title_path_idx" ON "reports_blocks_title" USING btree ("_path");
  CREATE UNIQUE INDEX "reports_blocks_title_locales_locale_parent_id_unique" ON "reports_blocks_title_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reports_blocks_quote_order_idx" ON "reports_blocks_quote" USING btree ("_order");
  CREATE INDEX "reports_blocks_quote_parent_id_idx" ON "reports_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "reports_blocks_quote_path_idx" ON "reports_blocks_quote" USING btree ("_path");
  CREATE UNIQUE INDEX "reports_blocks_quote_locales_locale_parent_id_unique" ON "reports_blocks_quote_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reports_image_idx" ON "reports" USING btree ("image_id");
  CREATE INDEX "reports_updated_at_idx" ON "reports" USING btree ("updated_at");
  CREATE INDEX "reports_created_at_idx" ON "reports" USING btree ("created_at");
  CREATE UNIQUE INDEX "reports_locales_locale_parent_id_unique" ON "reports_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reports_rels_order_idx" ON "reports_rels" USING btree ("order");
  CREATE INDEX "reports_rels_parent_idx" ON "reports_rels" USING btree ("parent_id");
  CREATE INDEX "reports_rels_path_idx" ON "reports_rels" USING btree ("path");
  CREATE INDEX "reports_rels_media_id_idx" ON "reports_rels" USING btree ("media_id");
  CREATE INDEX "rules_updated_at_idx" ON "rules" USING btree ("updated_at");
  CREATE INDEX "rules_created_at_idx" ON "rules" USING btree ("created_at");
  CREATE UNIQUE INDEX "rules_locales_locale_parent_id_unique" ON "rules_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "supporters_company_image_idx" ON "supporters_company" USING btree ("image_id");
  CREATE INDEX "supporters_company_updated_at_idx" ON "supporters_company" USING btree ("updated_at");
  CREATE INDEX "supporters_company_created_at_idx" ON "supporters_company" USING btree ("created_at");
  CREATE UNIQUE INDEX "supporters_company_locales_locale_parent_id_unique" ON "supporters_company_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "supporters_user_image_idx" ON "supporters_user" USING btree ("image_id");
  CREATE INDEX "supporters_user_updated_at_idx" ON "supporters_user" USING btree ("updated_at");
  CREATE INDEX "supporters_user_created_at_idx" ON "supporters_user" USING btree ("created_at");
  CREATE UNIQUE INDEX "supporters_user_locales_locale_parent_id_unique" ON "supporters_user_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "team_users_image_idx" ON "team_users" USING btree ("image_id");
  CREATE INDEX "team_users_updated_at_idx" ON "team_users" USING btree ("updated_at");
  CREATE INDEX "team_users_created_at_idx" ON "team_users" USING btree ("created_at");
  CREATE UNIQUE INDEX "team_users_locales_locale_parent_id_unique" ON "team_users_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "updates_blocks_images_order_idx" ON "updates_blocks_images" USING btree ("_order");
  CREATE INDEX "updates_blocks_images_parent_id_idx" ON "updates_blocks_images" USING btree ("_parent_id");
  CREATE INDEX "updates_blocks_images_path_idx" ON "updates_blocks_images" USING btree ("_path");
  CREATE INDEX "updates_blocks_video_order_idx" ON "updates_blocks_video" USING btree ("_order");
  CREATE INDEX "updates_blocks_video_parent_id_idx" ON "updates_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "updates_blocks_video_path_idx" ON "updates_blocks_video" USING btree ("_path");
  CREATE INDEX "updates_blocks_text_order_idx" ON "updates_blocks_text" USING btree ("_order");
  CREATE INDEX "updates_blocks_text_parent_id_idx" ON "updates_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "updates_blocks_text_path_idx" ON "updates_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "updates_blocks_text_locales_locale_parent_id_unique" ON "updates_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "updates_blocks_title_order_idx" ON "updates_blocks_title" USING btree ("_order");
  CREATE INDEX "updates_blocks_title_parent_id_idx" ON "updates_blocks_title" USING btree ("_parent_id");
  CREATE INDEX "updates_blocks_title_path_idx" ON "updates_blocks_title" USING btree ("_path");
  CREATE UNIQUE INDEX "updates_blocks_title_locales_locale_parent_id_unique" ON "updates_blocks_title_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "updates_blocks_quote_order_idx" ON "updates_blocks_quote" USING btree ("_order");
  CREATE INDEX "updates_blocks_quote_parent_id_idx" ON "updates_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "updates_blocks_quote_path_idx" ON "updates_blocks_quote" USING btree ("_path");
  CREATE UNIQUE INDEX "updates_blocks_quote_locales_locale_parent_id_unique" ON "updates_blocks_quote_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "updates_image_idx" ON "updates" USING btree ("image_id");
  CREATE INDEX "updates_updated_at_idx" ON "updates" USING btree ("updated_at");
  CREATE INDEX "updates_created_at_idx" ON "updates" USING btree ("created_at");
  CREATE UNIQUE INDEX "updates_locales_locale_parent_id_unique" ON "updates_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "updates_rels_order_idx" ON "updates_rels" USING btree ("order");
  CREATE INDEX "updates_rels_parent_idx" ON "updates_rels" USING btree ("parent_id");
  CREATE INDEX "updates_rels_path_idx" ON "updates_rels" USING btree ("path");
  CREATE INDEX "updates_rels_media_id_idx" ON "updates_rels" USING btree ("media_id");
  CREATE INDEX "video_posts_blocks_images_order_idx" ON "video_posts_blocks_images" USING btree ("_order");
  CREATE INDEX "video_posts_blocks_images_parent_id_idx" ON "video_posts_blocks_images" USING btree ("_parent_id");
  CREATE INDEX "video_posts_blocks_images_path_idx" ON "video_posts_blocks_images" USING btree ("_path");
  CREATE INDEX "video_posts_blocks_video_order_idx" ON "video_posts_blocks_video" USING btree ("_order");
  CREATE INDEX "video_posts_blocks_video_parent_id_idx" ON "video_posts_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "video_posts_blocks_video_path_idx" ON "video_posts_blocks_video" USING btree ("_path");
  CREATE INDEX "video_posts_blocks_text_order_idx" ON "video_posts_blocks_text" USING btree ("_order");
  CREATE INDEX "video_posts_blocks_text_parent_id_idx" ON "video_posts_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "video_posts_blocks_text_path_idx" ON "video_posts_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "video_posts_blocks_text_locales_locale_parent_id_unique" ON "video_posts_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "video_posts_blocks_title_order_idx" ON "video_posts_blocks_title" USING btree ("_order");
  CREATE INDEX "video_posts_blocks_title_parent_id_idx" ON "video_posts_blocks_title" USING btree ("_parent_id");
  CREATE INDEX "video_posts_blocks_title_path_idx" ON "video_posts_blocks_title" USING btree ("_path");
  CREATE UNIQUE INDEX "video_posts_blocks_title_locales_locale_parent_id_unique" ON "video_posts_blocks_title_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "video_posts_blocks_quote_order_idx" ON "video_posts_blocks_quote" USING btree ("_order");
  CREATE INDEX "video_posts_blocks_quote_parent_id_idx" ON "video_posts_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "video_posts_blocks_quote_path_idx" ON "video_posts_blocks_quote" USING btree ("_path");
  CREATE UNIQUE INDEX "video_posts_blocks_quote_locales_locale_parent_id_unique" ON "video_posts_blocks_quote_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "video_posts_category_idx" ON "video_posts" USING btree ("category_id");
  CREATE INDEX "video_posts_poster_idx" ON "video_posts" USING btree ("poster_id");
  CREATE INDEX "video_posts_updated_at_idx" ON "video_posts" USING btree ("updated_at");
  CREATE INDEX "video_posts_created_at_idx" ON "video_posts" USING btree ("created_at");
  CREATE UNIQUE INDEX "video_posts_locales_locale_parent_id_unique" ON "video_posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "video_posts_rels_order_idx" ON "video_posts_rels" USING btree ("order");
  CREATE INDEX "video_posts_rels_parent_idx" ON "video_posts_rels" USING btree ("parent_id");
  CREATE INDEX "video_posts_rels_path_idx" ON "video_posts_rels" USING btree ("path");
  CREATE INDEX "video_posts_rels_media_id_idx" ON "video_posts_rels" USING btree ("media_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "contact_image_idx" ON "contact" USING btree ("image_id");
  CREATE UNIQUE INDEX "contact_locales_locale_parent_id_unique" ON "contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "donation_donors_order_idx" ON "donation_donors" USING btree ("_order");
  CREATE INDEX "donation_donors_parent_id_idx" ON "donation_donors" USING btree ("_parent_id");
  CREATE INDEX "donation_donors_donor_idx" ON "donation_donors" USING btree ("donor_id");
  CREATE INDEX "donation_hero_hero_image_idx" ON "donation" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "donation_locales_locale_parent_id_unique" ON "donation_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_foundation_link_id_idx" ON "footer_rels" USING btree ("foundation_link_id");
  CREATE INDEX "footer_rels_gallery_category_id_idx" ON "footer_rels" USING btree ("gallery_category_id");
  CREATE INDEX "foundation_project_posts_order_idx" ON "foundation_project_posts" USING btree ("_order");
  CREATE INDEX "foundation_project_posts_parent_id_idx" ON "foundation_project_posts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "foundation_project_posts_locales_locale_parent_id_unique" ON "foundation_project_posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "foundation_topics_posts_order_idx" ON "foundation_topics_posts" USING btree ("_order");
  CREATE INDEX "foundation_topics_posts_parent_id_idx" ON "foundation_topics_posts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "foundation_topics_posts_locales_locale_parent_id_unique" ON "foundation_topics_posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "foundation_hero_hero_image_idx" ON "foundation" USING btree ("hero_image_id");
  CREATE INDEX "foundation_project_project_image_idx" ON "foundation" USING btree ("project_image_id");
  CREATE INDEX "foundation_our_activity_our_activity_image_first_idx" ON "foundation" USING btree ("our_activity_image_first_id");
  CREATE INDEX "foundation_our_activity_our_activity_image_second_idx" ON "foundation" USING btree ("our_activity_image_second_id");
  CREATE INDEX "foundation_our_activity_our_activity_image_third_idx" ON "foundation" USING btree ("our_activity_image_third_id");
  CREATE INDEX "foundation_supporters_supporter_author_post_supporters_s_idx" ON "foundation_locales" USING btree ("supporters_supporter_author_post_author_image_id");
  CREATE UNIQUE INDEX "foundation_locales_locale_parent_id_unique" ON "foundation_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "foundation_rels_order_idx" ON "foundation_rels" USING btree ("order");
  CREATE INDEX "foundation_rels_parent_idx" ON "foundation_rels" USING btree ("parent_id");
  CREATE INDEX "foundation_rels_path_idx" ON "foundation_rels" USING btree ("path");
  CREATE INDEX "foundation_rels_locale_idx" ON "foundation_rels" USING btree ("locale");
  CREATE INDEX "foundation_rels_foundation_link_id_idx" ON "foundation_rels" USING btree ("foundation_link_id","locale");
  CREATE INDEX "foundation_rels_board_of_guardian_user_id_idx" ON "foundation_rels" USING btree ("board_of_guardian_user_id","locale");
  CREATE INDEX "foundation_rels_team_users_id_idx" ON "foundation_rels" USING btree ("team_users_id","locale");
  CREATE INDEX "foundation_rels_supporters_company_id_idx" ON "foundation_rels" USING btree ("supporters_company_id","locale");
  CREATE INDEX "foundation_rels_supporters_user_id_idx" ON "foundation_rels" USING btree ("supporters_user_id","locale");
  CREATE INDEX "foundation_rels_updates_id_idx" ON "foundation_rels" USING btree ("updates_id","locale");
  CREATE INDEX "foundation_rels_reports_id_idx" ON "foundation_rels" USING btree ("reports_id","locale");
  CREATE INDEX "gallery_image_idx" ON "gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "gallery_locales_locale_parent_id_unique" ON "gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "gallery_rels_order_idx" ON "gallery_rels" USING btree ("order");
  CREATE INDEX "gallery_rels_parent_idx" ON "gallery_rels" USING btree ("parent_id");
  CREATE INDEX "gallery_rels_path_idx" ON "gallery_rels" USING btree ("path");
  CREATE INDEX "gallery_rels_gallery_category_id_idx" ON "gallery_rels" USING btree ("gallery_category_id");
  CREATE INDEX "gallery_rels_category_video_id_idx" ON "gallery_rels" USING btree ("category_video_id");
  CREATE UNIQUE INDEX "home_locales_locale_parent_id_unique" ON "home_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_rels_order_idx" ON "home_rels" USING btree ("order");
  CREATE INDEX "home_rels_parent_idx" ON "home_rels" USING btree ("parent_id");
  CREATE INDEX "home_rels_path_idx" ON "home_rels" USING btree ("path");
  CREATE INDEX "home_rels_hero_slider_section_id_idx" ON "home_rels" USING btree ("hero_slider_section_id");
  CREATE INDEX "home_rels_province_name_id_idx" ON "home_rels" USING btree ("province_name_id");
  CREATE INDEX "home_rels_logo_slider_id_idx" ON "home_rels" USING btree ("logo_slider_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_board_of_guardian_user_fk" FOREIGN KEY ("board_of_guardian_user_id") REFERENCES "public"."board_of_guardian_user"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_category_video_fk" FOREIGN KEY ("category_video_id") REFERENCES "public"."category_video"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_donation_rules_fk" FOREIGN KEY ("donation_rules_id") REFERENCES "public"."donation_rules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_donors_fk" FOREIGN KEY ("donors_id") REFERENCES "public"."donors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_email_messages_fk" FOREIGN KEY ("email_messages_id") REFERENCES "public"."email_messages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_email_subscribe_fk" FOREIGN KEY ("email_subscribe_id") REFERENCES "public"."email_subscribe"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_foundation_link_fk" FOREIGN KEY ("foundation_link_id") REFERENCES "public"."foundation_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_category_fk" FOREIGN KEY ("gallery_category_id") REFERENCES "public"."gallery_category"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_sub_category_fk" FOREIGN KEY ("gallery_sub_category_id") REFERENCES "public"."gallery_sub_category"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hero_slider_section_fk" FOREIGN KEY ("hero_slider_section_id") REFERENCES "public"."hero_slider_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_logo_slider_fk" FOREIGN KEY ("logo_slider_id") REFERENCES "public"."logo_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_map_fk" FOREIGN KEY ("map_id") REFERENCES "public"."map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_province_name_fk" FOREIGN KEY ("province_name_id") REFERENCES "public"."province_name"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reports_fk" FOREIGN KEY ("reports_id") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rules_fk" FOREIGN KEY ("rules_id") REFERENCES "public"."rules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_supporters_company_fk" FOREIGN KEY ("supporters_company_id") REFERENCES "public"."supporters_company"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_supporters_user_fk" FOREIGN KEY ("supporters_user_id") REFERENCES "public"."supporters_user"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_users_fk" FOREIGN KEY ("team_users_id") REFERENCES "public"."team_users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_updates_fk" FOREIGN KEY ("updates_id") REFERENCES "public"."updates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_video_posts_fk" FOREIGN KEY ("video_posts_id") REFERENCES "public"."video_posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_board_of_guardian_user_id_idx" ON "payload_locked_documents_rels" USING btree ("board_of_guardian_user_id");
  CREATE INDEX "payload_locked_documents_rels_category_video_id_idx" ON "payload_locked_documents_rels" USING btree ("category_video_id");
  CREATE INDEX "payload_locked_documents_rels_donation_rules_id_idx" ON "payload_locked_documents_rels" USING btree ("donation_rules_id");
  CREATE INDEX "payload_locked_documents_rels_donors_id_idx" ON "payload_locked_documents_rels" USING btree ("donors_id");
  CREATE INDEX "payload_locked_documents_rels_email_messages_id_idx" ON "payload_locked_documents_rels" USING btree ("email_messages_id");
  CREATE INDEX "payload_locked_documents_rels_email_subscribe_id_idx" ON "payload_locked_documents_rels" USING btree ("email_subscribe_id");
  CREATE INDEX "payload_locked_documents_rels_foundation_link_id_idx" ON "payload_locked_documents_rels" USING btree ("foundation_link_id");
  CREATE INDEX "payload_locked_documents_rels_gallery_category_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_category_id");
  CREATE INDEX "payload_locked_documents_rels_gallery_sub_category_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_sub_category_id");
  CREATE INDEX "payload_locked_documents_rels_hero_slider_section_id_idx" ON "payload_locked_documents_rels" USING btree ("hero_slider_section_id");
  CREATE INDEX "payload_locked_documents_rels_logo_slider_id_idx" ON "payload_locked_documents_rels" USING btree ("logo_slider_id");
  CREATE INDEX "payload_locked_documents_rels_map_id_idx" ON "payload_locked_documents_rels" USING btree ("map_id");
  CREATE INDEX "payload_locked_documents_rels_province_name_id_idx" ON "payload_locked_documents_rels" USING btree ("province_name_id");
  CREATE INDEX "payload_locked_documents_rels_reports_id_idx" ON "payload_locked_documents_rels" USING btree ("reports_id");
  CREATE INDEX "payload_locked_documents_rels_rules_id_idx" ON "payload_locked_documents_rels" USING btree ("rules_id");
  CREATE INDEX "payload_locked_documents_rels_supporters_company_id_idx" ON "payload_locked_documents_rels" USING btree ("supporters_company_id");
  CREATE INDEX "payload_locked_documents_rels_supporters_user_id_idx" ON "payload_locked_documents_rels" USING btree ("supporters_user_id");
  CREATE INDEX "payload_locked_documents_rels_team_users_id_idx" ON "payload_locked_documents_rels" USING btree ("team_users_id");
  CREATE INDEX "payload_locked_documents_rels_updates_id_idx" ON "payload_locked_documents_rels" USING btree ("updates_id");
  CREATE INDEX "payload_locked_documents_rels_video_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("video_posts_id");
  ALTER TABLE "media" DROP COLUMN "focal_x";
  ALTER TABLE "media" DROP COLUMN "focal_y";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "board_of_guardian_user" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "board_of_guardian_user_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "category_video" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "category_video_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "donation_rules" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "donation_rules_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "donation_rules_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "donors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "email_messages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "email_subscribe" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "foundation_link" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "foundation_link_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_category" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_category_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_category_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_sub_category" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_sub_category_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_sub_category_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hero_slider_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hero_slider_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "logo_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "map" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "map_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "map_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "province_name" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "province_name_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "province_name_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reports_blocks_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reports_blocks_video" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reports_blocks_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reports_blocks_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reports_blocks_title" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reports_blocks_title_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reports_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reports_blocks_quote_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reports" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reports_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reports_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rules" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rules_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "supporters_company" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "supporters_company_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "supporters_user" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "supporters_user_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_users" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_users_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "updates_blocks_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "updates_blocks_video" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "updates_blocks_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "updates_blocks_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "updates_blocks_title" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "updates_blocks_title_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "updates_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "updates_blocks_quote_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "updates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "updates_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "updates_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "video_posts_blocks_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "video_posts_blocks_video" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "video_posts_blocks_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "video_posts_blocks_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "video_posts_blocks_title" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "video_posts_blocks_title_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "video_posts_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "video_posts_blocks_quote_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "video_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "video_posts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "video_posts_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_kv" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "donation_donors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "donation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "donation_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "foundation_project_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "foundation_project_posts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "foundation_topics_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "foundation_topics_posts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "foundation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "foundation_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "foundation_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "board_of_guardian_user" CASCADE;
  DROP TABLE "board_of_guardian_user_locales" CASCADE;
  DROP TABLE "category_video" CASCADE;
  DROP TABLE "category_video_locales" CASCADE;
  DROP TABLE "donation_rules" CASCADE;
  DROP TABLE "donation_rules_locales" CASCADE;
  DROP TABLE "donation_rules_rels" CASCADE;
  DROP TABLE "donors" CASCADE;
  DROP TABLE "email_messages" CASCADE;
  DROP TABLE "email_subscribe" CASCADE;
  DROP TABLE "foundation_link" CASCADE;
  DROP TABLE "foundation_link_locales" CASCADE;
  DROP TABLE "gallery_category" CASCADE;
  DROP TABLE "gallery_category_locales" CASCADE;
  DROP TABLE "gallery_category_rels" CASCADE;
  DROP TABLE "gallery_sub_category" CASCADE;
  DROP TABLE "gallery_sub_category_locales" CASCADE;
  DROP TABLE "gallery_sub_category_rels" CASCADE;
  DROP TABLE "hero_slider_section" CASCADE;
  DROP TABLE "hero_slider_section_locales" CASCADE;
  DROP TABLE "logo_slider" CASCADE;
  DROP TABLE "map" CASCADE;
  DROP TABLE "map_locales" CASCADE;
  DROP TABLE "map_rels" CASCADE;
  DROP TABLE "province_name" CASCADE;
  DROP TABLE "province_name_locales" CASCADE;
  DROP TABLE "province_name_rels" CASCADE;
  DROP TABLE "reports_blocks_images" CASCADE;
  DROP TABLE "reports_blocks_video" CASCADE;
  DROP TABLE "reports_blocks_text" CASCADE;
  DROP TABLE "reports_blocks_text_locales" CASCADE;
  DROP TABLE "reports_blocks_title" CASCADE;
  DROP TABLE "reports_blocks_title_locales" CASCADE;
  DROP TABLE "reports_blocks_quote" CASCADE;
  DROP TABLE "reports_blocks_quote_locales" CASCADE;
  DROP TABLE "reports" CASCADE;
  DROP TABLE "reports_locales" CASCADE;
  DROP TABLE "reports_rels" CASCADE;
  DROP TABLE "rules" CASCADE;
  DROP TABLE "rules_locales" CASCADE;
  DROP TABLE "supporters_company" CASCADE;
  DROP TABLE "supporters_company_locales" CASCADE;
  DROP TABLE "supporters_user" CASCADE;
  DROP TABLE "supporters_user_locales" CASCADE;
  DROP TABLE "team_users" CASCADE;
  DROP TABLE "team_users_locales" CASCADE;
  DROP TABLE "updates_blocks_images" CASCADE;
  DROP TABLE "updates_blocks_video" CASCADE;
  DROP TABLE "updates_blocks_text" CASCADE;
  DROP TABLE "updates_blocks_text_locales" CASCADE;
  DROP TABLE "updates_blocks_title" CASCADE;
  DROP TABLE "updates_blocks_title_locales" CASCADE;
  DROP TABLE "updates_blocks_quote" CASCADE;
  DROP TABLE "updates_blocks_quote_locales" CASCADE;
  DROP TABLE "updates" CASCADE;
  DROP TABLE "updates_locales" CASCADE;
  DROP TABLE "updates_rels" CASCADE;
  DROP TABLE "video_posts_blocks_images" CASCADE;
  DROP TABLE "video_posts_blocks_video" CASCADE;
  DROP TABLE "video_posts_blocks_text" CASCADE;
  DROP TABLE "video_posts_blocks_text_locales" CASCADE;
  DROP TABLE "video_posts_blocks_title" CASCADE;
  DROP TABLE "video_posts_blocks_title_locales" CASCADE;
  DROP TABLE "video_posts_blocks_quote" CASCADE;
  DROP TABLE "video_posts_blocks_quote_locales" CASCADE;
  DROP TABLE "video_posts" CASCADE;
  DROP TABLE "video_posts_locales" CASCADE;
  DROP TABLE "video_posts_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "contact_locales" CASCADE;
  DROP TABLE "donation_donors" CASCADE;
  DROP TABLE "donation" CASCADE;
  DROP TABLE "donation_locales" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "foundation_project_posts" CASCADE;
  DROP TABLE "foundation_project_posts_locales" CASCADE;
  DROP TABLE "foundation_topics_posts" CASCADE;
  DROP TABLE "foundation_topics_posts_locales" CASCADE;
  DROP TABLE "foundation" CASCADE;
  DROP TABLE "foundation_locales" CASCADE;
  DROP TABLE "foundation_rels" CASCADE;
  DROP TABLE "gallery" CASCADE;
  DROP TABLE "gallery_locales" CASCADE;
  DROP TABLE "gallery_rels" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "home_locales" CASCADE;
  DROP TABLE "home_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_board_of_guardian_user_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_category_video_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_donation_rules_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_donors_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_email_messages_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_email_subscribe_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_foundation_link_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_gallery_category_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_gallery_sub_category_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_hero_slider_section_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_logo_slider_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_map_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_province_name_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_reports_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_rules_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_supporters_company_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_supporters_user_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_team_users_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_updates_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_video_posts_fk";
  
  DROP INDEX "payload_locked_documents_rels_board_of_guardian_user_id_idx";
  DROP INDEX "payload_locked_documents_rels_category_video_id_idx";
  DROP INDEX "payload_locked_documents_rels_donation_rules_id_idx";
  DROP INDEX "payload_locked_documents_rels_donors_id_idx";
  DROP INDEX "payload_locked_documents_rels_email_messages_id_idx";
  DROP INDEX "payload_locked_documents_rels_email_subscribe_id_idx";
  DROP INDEX "payload_locked_documents_rels_foundation_link_id_idx";
  DROP INDEX "payload_locked_documents_rels_gallery_category_id_idx";
  DROP INDEX "payload_locked_documents_rels_gallery_sub_category_id_idx";
  DROP INDEX "payload_locked_documents_rels_hero_slider_section_id_idx";
  DROP INDEX "payload_locked_documents_rels_logo_slider_id_idx";
  DROP INDEX "payload_locked_documents_rels_map_id_idx";
  DROP INDEX "payload_locked_documents_rels_province_name_id_idx";
  DROP INDEX "payload_locked_documents_rels_reports_id_idx";
  DROP INDEX "payload_locked_documents_rels_rules_id_idx";
  DROP INDEX "payload_locked_documents_rels_supporters_company_id_idx";
  DROP INDEX "payload_locked_documents_rels_supporters_user_id_idx";
  DROP INDEX "payload_locked_documents_rels_team_users_id_idx";
  DROP INDEX "payload_locked_documents_rels_updates_id_idx";
  DROP INDEX "payload_locked_documents_rels_video_posts_id_idx";
  ALTER TABLE "media" ALTER COLUMN "alt" SET NOT NULL;
  ALTER TABLE "media" ADD COLUMN "focal_x" numeric;
  ALTER TABLE "media" ADD COLUMN "focal_y" numeric;
  ALTER TABLE "media" DROP COLUMN "position";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "board_of_guardian_user_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "category_video_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "donation_rules_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "donors_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "email_messages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "email_subscribe_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "foundation_link_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "gallery_category_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "gallery_sub_category_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "hero_slider_section_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "logo_slider_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "map_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "province_name_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "reports_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "rules_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "supporters_company_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "supporters_user_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "team_users_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "updates_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "video_posts_id";
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_media_position";
  DROP TYPE "public"."enum_contact_position";
  DROP TYPE "public"."enum_donation_hero_position";
  DROP TYPE "public"."enum_foundation_hero_position";
  DROP TYPE "public"."enum_gallery_position";`)
}
