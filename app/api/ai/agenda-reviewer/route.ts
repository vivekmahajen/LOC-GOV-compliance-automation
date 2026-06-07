import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a Brown Act compliance specialist embedded in a California city government meeting management system. Your role is to review draft agendas before they are posted and identify potential Brown Act violations, ambiguities, or best-practice issues.

YOUR TASK:
Review the draft agenda and identify:

1. REQUIRED ELEMENTS CHECK — verify the agenda contains:
   - Meeting date, time, and location
   - Public comment opportunity
   - Closed session items: each must cite the specific Government Code section (GC §54956.8 through §54957.10)
   - Action items clearly described (not vague)

2. CONTENT VIOLATIONS — flag:
   - Items too vague to put the public on notice
   - Closed session items without required statutory citation
   - Items that combine multiple unrelated actions
   - Any indication of improperly noticed items

3. PROCEDURAL ISSUES:
   - Special meeting: verify notice requirements
   - Closed session: verify required pre-closed-session announcement
   - Minutes and report-out requirements

4. BEST PRACTICES:
   - Staff report references
   - Time estimates
   - Accessibility statement

OUTPUT FORMAT: Return valid JSON only, no markdown fences:
{
  "overall_status": "COMPLIANT|ISSUES_FOUND|VIOLATIONS_FOUND",
  "posting_deadline_status": "on_track|at_risk|missed",
  "required_elements": {
    "meeting_info": "present|missing",
    "public_comment": "present|missing",
    "closed_session_citations": "all_present|some_missing|not_applicable"
  },
  "issues": [
    {
      "severity": "VIOLATION|WARNING|SUGGESTION",
      "agenda_item": "[item number or title]",
      "issue": "[description of the problem]",
      "legal_basis": "[Brown Act section or GC citation]",
      "recommended_fix": "[specific rewording or action to take]"
    }
  ],
  "overall_assessment": "[2-3 sentence summary for City Clerk]",
  "attorney_review_recommended": true,
  "attorney_review_reason": "[if true, why]"
}`;

export async function POST(req: NextRequest) {
  try {
    const { agendaText, meetingType, cityName, postingDeadline } = await req.json();

    if (!agendaText) {
      return NextResponse.json({ error: "agendaText is required" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `City: ${cityName || "City of Oakdale"}\nMeeting type: ${meetingType || "Regular"}\nPosting deadline: ${postingDeadline || "72 hours before meeting"}\n\nDraft agenda:\n${agendaText}\n\nPlease review this agenda for Brown Act compliance and return JSON only.`,
        },
      ],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const cleaned = text.replace(/^```json\s*/i, "").replace(/\s*```$/i, "").trim();
    const result = JSON.parse(cleaned);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Agenda reviewer error:", error);
    return NextResponse.json({ error: "Failed to review agenda" }, { status: 500 });
  }
}
