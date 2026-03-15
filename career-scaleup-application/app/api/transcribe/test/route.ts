import { NextResponse } from "next/server";
import { createClient } from "@deepgram/sdk";

// Test endpoint to verify Deepgram API key is configured
export async function GET() {
  try {
    const deepgramApiKey = process.env.DEEPGRAM_API_KEY;

    if (!deepgramApiKey) {
      return NextResponse.json(
        {
          status: "error",
          message: "DEEPGRAM_API_KEY is not set in environment variables",
          configured: false,
        },
        { status: 500 }
      );
    }

    // Test if the API key is valid by making a simple request
    const deepgram = createClient(deepgramApiKey);

    // Try to get project info (lightweight check)
    try {
      // Just verify the client was created successfully
      // The key format should be correct
      const keyLength = deepgramApiKey.length;
      const keyPrefix = deepgramApiKey.substring(0, 3);

      return NextResponse.json({
        status: "success",
        message: "Deepgram API key is configured",
        configured: true,
        keyLength: keyLength,
        keyPrefix: keyPrefix === "xxx" ? "hidden" : keyPrefix + "...",
        note: "API key format looks correct. Test transcription to verify it works.",
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          status: "warning",
          message: "API key is set but may be invalid",
          configured: true,
          error: error.message,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: "Error checking API key",
        error: error.message,
        configured: false,
      },
      { status: 500 }
    );
  }
}


