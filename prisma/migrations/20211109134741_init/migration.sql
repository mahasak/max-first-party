-- CreateTable
CREATE TABLE "LogInvoiceChange" (
    "id" SERIAL NOT NULL,
    "pageId" INTEGER,
    "invoiceId" INTEGER,
    "fieldId" TEXT,
    "rawData" TEXT,
    "serverTime" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogInvoiceChange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogWebhookPayload" (
    "id" SERIAL NOT NULL,
    "provider" TEXT,
    "method" TEXT,
    "rawData" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogWebhookPayload_pkey" PRIMARY KEY ("id")
);
