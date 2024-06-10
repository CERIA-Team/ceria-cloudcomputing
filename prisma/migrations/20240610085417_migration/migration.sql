-- CreateTable
CREATE TABLE `Session` (
    `listen_id` VARCHAR(191) NOT NULL,
    `song_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`listen_id`, `song_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ListenSession` (
    `listen_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`listen_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_listen_id_fkey` FOREIGN KEY (`listen_id`) REFERENCES `ListenSession`(`listen_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_song_id_fkey` FOREIGN KEY (`song_id`) REFERENCES `Song`(`song_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ListenSession` ADD CONSTRAINT `ListenSession_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
