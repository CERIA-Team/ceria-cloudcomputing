/*
  Warnings:

  - You are about to drop the column `user_diplay_name` on the `User` table. All the data in the column will be lost.
  - Added the required column `user_display_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `user_diplay_name`,
    ADD COLUMN `user_display_name` VARCHAR(255) NOT NULL;
