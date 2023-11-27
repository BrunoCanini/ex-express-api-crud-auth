/*
  Warnings:

  - You are about to drop the column `postId` on the `category` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `Category_postId_fkey`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `postId`;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `categoryId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
