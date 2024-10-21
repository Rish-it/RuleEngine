// app/api/create-rule/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Zod schema to validate rule inputs
const ruleSchema = z.object({
  rule_string: z.string(),
});

// AST Node Types
interface ASTNode {
  type: string;
  value?: string;
  children?: ASTNode[];
}

// Function to create AST from the rule string
function createASTFromRule(ruleString: string): ASTNode {
  const trimmedRule = ruleString.trim();

  if (!trimmedRule) {
    throw new Error("Rule string cannot be empty");
  }

  // A mock AST representation based on a simple rule format
  return {
    type: 'Rule',
    value: trimmedRule,
    children: [],
  };
}

// Handler for the POST request
export async function POST(req: NextRequest) {
  try {
    const parsedData = ruleSchema.parse(await req.json());
    const ast = createASTFromRule(parsedData.rule_string);

    const rule = await prisma.rule.create({
      data: {
        rule_name: parsedData.rule_string,
        rule_ast: JSON.stringify(ast),
      },
    });

    return NextResponse.json({ rule }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    } else if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
