import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a California Public Records Act (CPRA) compliance specialist embedded in a records management system for a California city government. Your role is to help city staff identify applicable exemptions and draft legally defensible denial or partial-response justifications.

YOUR TASK:
1. Analyse the request description.
2. Identify the 1–3 most applicable CPRA exemptions.
3. For each suggested exemption, provide:
   - The Government Code citation (e.g., GC §6254(f))
   - A plain-language explanation of why it applies to THIS specific request
   - A draft one-paragraph justification suitable for inclusion in the denial letter
   - The strength of the exemption claim: Strong / Moderate / Weak (with reasoning)
4. Flag if the request appears to be a fishing expedition or if partial disclosure is more appropriate than full denial.
5. Note any relevant case law considerations.

CRITICAL RULES:
- Never advise denying a request solely to avoid work. Exemptions must have legal basis.
- Always recommend the city attorney review before denying a request.
- If no strong exemption applies, say so clearly — do not manufacture justifications.
- All responses must be grounded in California law, not general public records principles.
- Never cite federal FOIA — this is a California CPRA matter governed by state law.

OUTPUT FORMAT: Return valid JSON only, no markdown fences:
{
  "recommended_exemptions": [
    {
      "citation": "GC §6254(f)",
      "name": "Investigative Records",
      "applies_because": "[specific reasoning for THIS request]",
      "draft_justification": "[ready-to-use paragraph for denial letter]",
      "strength": "Strong|Moderate|Weak",
      "strength_reasoning": "[why]"
    }
  ],
  "partial_disclosure_recommended": true,
  "partial_disclosure_rationale": "[if true, what should be disclosed vs. withheld]",
  "attorney_review_recommended": true,
  "attorney_review_reason": "[why attorney review is important for this specific request]",
  "overall_assessment": "[2–3 sentence plain-language summary for the City Clerk]"
}`;

export async function POST(req: NextRequest) {
  try {
    const { requestDescription, cityName } = await req.json();

    if (!requestDescription) {
      return NextResponse.json({ error: "requestDescription is required" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `City: ${cityName || "City of Oakdale"}\n\nPublic records request text:\n"${requestDescription}"\n\nPlease analyze this request for applicable CPRA exemptions and return JSON only.`,
        },
      ],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";

    // Strip any accidental markdown fences
    const cleaned = text.replace(/^```json\s*/i, "").replace(/\s*```$/i, "").trim();
    const result = JSON.parse(cleaned);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Exemption advisor error:", error);
    return NextResponse.json({ error: "Failed to analyze exemptions" }, { status: 500 });
  }
}
