/*
  Warnings:

  - You are about to drop the column `song_album` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `song_artist` on the `Song` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Song` DROP COLUMN `song_album`,
    DROP COLUMN `song_artist`;
