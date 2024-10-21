/*
  Warnings:

  - A unique constraint covering the columns `[rule_name]` on the table `Rule` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Rule_rule_name_key" ON "Rule"("rule_name");
