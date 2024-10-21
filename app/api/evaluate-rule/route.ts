import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Zod schema to validate evaluation input
const evaluateSchema = z.object({
  ast: z.object({
    type: z.string(),
    children: z.array(z.any()).optional(),
  }),
  data: z.record(z.string(), z.any()),
});

// Function to evaluate the rule against provided data
function evaluateRule(ast: any, data: Record<string, any>): boolean {
  if (!ast) return false;

  switch (ast.type) {
    case 'Rule':
      // Extracting the rule string (e.g., "age > 30") for evaluation
      const { value } = ast;
      const [field, operator, thresholdStr] = value.split(' ');
      const threshold = parseFloat(thresholdStr);

      // Evaluate based on the operator
      switch (operator) {
        case '>':
          return data[field] > threshold;
        case '<':
          return data[field] < threshold;
        case '>=':
          return data[field] >= threshold;
        case '<=':
          return data[field] <= threshold;
        case '==':
          return data[field] == threshold;
        case '===':
          return data[field] === threshold;
        case '!=':
          return data[field] != threshold;
        case '!==':
          return data[field] !== threshold;
        default:
          throw new Error(`Unsupported operator: ${operator}`);
      }

    case 'CombinedRules':
      // Evaluate combined rules logic
      return ast.children.every((child: any) => evaluateRule(child, data));

    default:
      throw new Error(`Unknown AST node type: ${ast.type}`);
  }
}

// Handler for the POST request
export async function POST(req: NextRequest) {
  try {
    const parsedData = evaluateSchema.parse(await req.json());
    const result = evaluateRule(parsedData.ast, parsedData.data);

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    } else if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
