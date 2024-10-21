// app/api/combine-rules/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Zod schema to validate combine rules input
const combineRulesSchema = z.object({
  rules: z.array(z.string()),
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

  return {
    type: 'Rule',
    value: trimmedRule,
    children: [],
  };
}

// Function to combine ASTs from multiple rules
function combineASTs(rules: string[]): ASTNode {
  const asts = rules.map(rule => createASTFromRule(rule));

  return {
    type: 'CombinedRules',
    children: asts,
  };
}

// Handler for the POST request
export async function POST(req: NextRequest) {
  try {
    const parsedData = combineRulesSchema.parse(await req.json());
    const combinedAst = combineASTs(parsedData.rules);

    return NextResponse.json({ combinedAst }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    } else if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
