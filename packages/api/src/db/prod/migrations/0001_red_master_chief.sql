CREATE TABLE `community` (
	`id` text PRIMARY KEY NOT NULL,
	`org_id` text,
	`event_id` text,
	`social_network_id` text NOT NULL,
	`social_network_label` text NOT NULL,
	`url` text,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`org_id`) REFERENCES `organization`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON UPDATE no action ON DELETE cascade
);
