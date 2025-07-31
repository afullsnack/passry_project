PRAGMA foreign_keys=OFF;
CREATE TABLE `__new_event` (
	`id` text PRIMARY KEY NOT NULL,
	`org_id` text NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`country` text NOT NULL,
	`city` text NOT NULL,
	`date_time` integer NOT NULL,
	`venue_name` text NOT NULL,
	`full_address` text NOT NULL,
	`cover_key` text,
	`cover_url` text,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`org_id`) REFERENCES `organization`(`id`) ON UPDATE no action ON DELETE cascade
);

INSERT INTO `__new_event`("id", "org_id", "title", "category", "description", "country", "city", "date_time", "venue_name", "full_address", "cover_key", "cover_url", "created_at", "updated_at") SELECT "id", "org_id", "title", "category", "description", "country", "city", "date_time", "venue_name", "full_address", "cover_key", "cover_url", "created_at", "updated_at" FROM `event`;
DROP TABLE `event`;
ALTER TABLE `__new_event` RENAME TO `event`;
PRAGMA foreign_keys=ON;
ALTER TABLE `organization` ADD `cover_image` text;
ALTER TABLE `organization` ADD `cover_image_key` text;