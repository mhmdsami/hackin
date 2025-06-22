import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  try {
    const formData = (await req.formData()) as unknown as FormData;

    const prompt = formData.get("prompt") as string;
    const imageFile = formData.get("image") as File;

    if (!prompt || !imageFile) {
      return new Response(
        JSON.stringify({ error: "Missing prompt or image" }),
        { status: 400 }
      );
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUrl = `data:${imageFile.type};base64,${base64}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
You are an AI evaluator tasked with verifying user-uploaded images against a given prompt.
Your job is to:
1. Analyze the image.
2. Determine how well it matches the prompt.
3. Return a score from 0 to 10.
4. Return a status:
   - APPROVED: if the image clearly matches the prompt (score >= 7).
   - REJECTED: if the image clearly does not match the prompt (score <= 3).
   - MODERATION_REQUIRED: if the match is uncertain or partial (score between 4 and 6).

You must return a JSON object with two keys: "score" and "status".
Do not explain your reasoning. Return only the JSON response.
      `.trim(),
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Prompt: "${prompt}"\nEvaluate this image based on how well it matches the prompt. Return score (0–10) and status.`,
            },
            {
              type: "image_url",
              image_url: { url: dataUrl },
            },
          ],
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          strict: true,
          name: "ScoreResponse",
          schema: {
            type: "object",
            properties: {
              score: {
                type: "integer",
                description: "A score from 0 (no match) to 10 (perfect match).",
              },
              status: {
                type: "string",
                enum: ["APPROVED", "REJECTED", "MODERATION_REQUIRED"],
                description:
                  "Decision based on how well the image matches the prompt.",
              },
            },
            required: ["score", "status"],
            additionalProperties: false,
          },
        },
      },
      temperature: 0.2,
    });

    const result = response.choices[0].message.content;

    if (!result) {
      return new Response(
        JSON.stringify({ error: "No response from OpenAI" }),
        { status: 500 }
      );
    }

    const parsedResult = JSON.parse(result);

    if (
      typeof parsedResult.score !== "number" ||
      !["APPROVED", "REJECTED", "MODERATION_REQUIRED"].includes(
        parsedResult.status
      )
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid response format from OpenAI" }),
        { status: 500 }
      );
    }

    return Response.json(parsedResult, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error(err);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: err.message || "An unexpected error occurred.",
      }),
      {
        status: 500,
      }
    );
  }
}
