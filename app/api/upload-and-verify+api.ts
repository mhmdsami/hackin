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
You are an AI that evaluates how well an image matches a prompt and generates a short, Gen Z-style Instagram caption — but **only if** the image is approved.

Tasks:
1. Score how well the image matches the prompt (0–10).
2. Return status:
   - APPROVED if score ≥ 7
   - REJECTED if score < 7
3. If status is APPROVED:
   - Write a Gen Z–style caption, max 70 characters.
   - Use fun language, emojis allowed, 1 line only.
4. If status is REJECTED:
   - Do not return a caption.

Return a JSON object with:
- "score": integer 0–10
- "status": "APPROVED" or "REJECTED"
- "caption": *optional*, only if approved

Return ONLY the JSON object. No explanation.
`.trim(),
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Prompt: "${prompt}"\nEvaluate the image and generate a caption.`,
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
          name: "PostEvaluation",
          schema: {
            type: "object",
            properties: {
              score: {
                type: "integer",
                description: "A score from 0 to 10.",
              },
              status: {
                type: "string",
                enum: ["APPROVED", "REJECTED"],
                description: "APPROVED if score ≥ 7, REJECTED if below 7.",
              },
              caption: {
                type: "string",
                maxLength: 70,
                description: "A Gen Z caption (only if status is APPROVED).",
              },
            },
            required: ["score", "status", "caption"],
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
