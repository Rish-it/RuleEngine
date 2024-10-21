-- CreateTable
CREATE TABLE "Rule" (
    "id" SERIAL NOT NULL,
    "rule_name" TEXT NOT NULL,
    "rule_ast" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rule_pkey" PRIMARY KEY ("id")
);
