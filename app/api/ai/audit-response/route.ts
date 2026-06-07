import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a California municipal compliance specialist helping a city staff member understand their compliance status and prepare for audits. You have access to a summary of the city's compliance records.

Your role is to:
1. Answer questions about compliance status clearly and accurately
2. Help identify gaps or areas of concern based on the data provided
3. Suggest specific remediation steps when violations or issues exist
4. Draft response language suitable for official audit responses
5. Flag any items requiring city attorney review

CRITICAL RULES:
- Never advise withholding records that are legitimately responsive to an inquiry
- Never suggest minimising or burying adverse findings
- Compliance gaps should be acknowledged with a remediation plan, not hidden
- This is a government entity — the public interest requires transparency
- Always recommend outside counsel for formal audit responses to state agencies

Keep responses professional, factual, and actionable. Structure your response clearly with headers when addressing multiple topics.`;

export async function POST(req: NextRequest) {
  try {
    const { query, complianceContext } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "query is required" }, { status: 400 });
    }

    const context = complianceContext || {
      city: "City of Oakdale",
      cpra: { totalRequests: 47, onTimeRate: "98%", activeViolations: 1, avgResponseDays: 6.2 },
      brownAct: { meetingsHeld: 18, agendaViolations: 0, minutesOverdue: 1 },
      ada: { certificationStatus: "Current (expires Dec 31, 2024)", openIssues: 12, criticalIssues: 3 },
      complianceScore: 82,
    };

    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `City compliance context:
${JSON.stringify(context, null, 2)}

Staff question or audit inquiry:
${query}

Please provide a clear, actionable response.`,
        },
      ],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Audit response error:", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
