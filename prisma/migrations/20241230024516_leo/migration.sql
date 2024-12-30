-- CreateTable
CREATE TABLE "ButtonState" (
    "id" TEXT NOT NULL,
    "telegramId" BIGINT NOT NULL,
    "hasClicked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ButtonState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwitterCheck" (
    "id" TEXT NOT NULL,
    "telegramId" BIGINT NOT NULL,
    "hasClicked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TwitterCheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ButtonState_telegramId_key" ON "ButtonState"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "TwitterCheck_telegramId_key" ON "TwitterCheck"("telegramId");
