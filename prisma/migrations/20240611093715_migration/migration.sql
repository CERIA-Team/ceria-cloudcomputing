-- AlterTable
ALTER TABLE `Session` ADD COLUMN `createAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- CreateTable
CREATE TABLE `LikedSong` (
    `user_id` VARCHAR(255) NOT NULL,
    `song_id` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`user_id`, `song_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LikedSong` ADD CONSTRAINT `LikedSong_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikedSong` ADD CONSTRAINT `LikedSong_song_id_fkey` FOREIGN KEY (`song_id`) REFERENCES `Song`(`song_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
