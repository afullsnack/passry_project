CREATE TABLE `two_factor` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`secret` text,
	`backup_codes` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `user` ADD `two_factor_enabled` integer;--> statement-breakpoint
ALTER TABLE `user` ADD `two_factor_method` text DEFAULT 'authenticator';