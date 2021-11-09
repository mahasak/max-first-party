-- CreateTable
CREATE TABLE "LogWebhook" (
    "id" INTEGER NOT NULL,
    "pageId" INTEGER NOT NULL,
    "invoiceId" INTEGER NOT NULL,
    "fieldId" TEXT NOT NULL,
    "rawData" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LogWebhook_pkey" PRIMARY KEY ("id")
);
