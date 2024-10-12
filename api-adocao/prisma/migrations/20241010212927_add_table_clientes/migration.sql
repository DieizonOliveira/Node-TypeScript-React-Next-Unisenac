-- CreateTable
CREATE TABLE `adotantes` (
    `id` VARCHAR(36) NOT NULL,
    `nome` VARCHAR(60) NOT NULL,
    `fone` VARCHAR(60) NOT NULL,
    `endereco` VARCHAR(180) NOT NULL,
    `email` VARCHAR(60) NOT NULL,
    `senha` VARCHAR(60) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `adotantes_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
