import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@deepgram/sdk";

// Initialize Deepgram client
// Get API key from environment variable
const deepgramApiKey = process.env.DEEPGRAM_API_KEY;

if (!deepgramApiKey) {
  console.warn("DEEPGRAM_API_KEY is not set. Voice transcription will not work.");
}

export async function POST(request: NextRequest) {
  try {
    if (!deepgramApiKey) {
      return NextResponse.json(
        { error: "Deepgram API key not configured" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const audioFile = formData.get("audio") as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Initialize Deepgram client
    const deepgram = createClient(deepgramApiKey);

    // Transcribe audio using Deepgram SDK v4
    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
      buffer,
      {
        model: "nova-2",
        language: "en-US",
        smart_format: true,
        punctuate: true,
      }
    );

    if (error) {
      console.error("Deepgram error:", error);
      return NextResponse.json(
        { error: "Transcription failed", details: error.message },
        { status: 500 }
      );
    }

    // Extract transcript text from Deepgram response
    const transcript =
      result?.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";

    const confidence =
      result?.results?.channels?.[0]?.alternatives?.[0]?.confidence || 0;

    if (!transcript) {
      return NextResponse.json(
        { error: "No transcript generated" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      transcript,
      confidence,
    });
  } catch (error: any) {
    console.error("Transcription error:", error);
    return NextResponse.json(
      { error: "Failed to transcribe audio", details: error.message },
      { status: 500 }
    );
  }
}

