# Deepgram Setup Guide

## Step 1: Get Your Deepgram API Key

1. Go to [Deepgram Console](https://console.deepgram.com/)
2. Sign up for a free account (12,000 minutes/month free)
3. Navigate to API Keys section
4. Create a new API key
5. Copy your API key

## Step 2: Add API Key to Environment Variables

Create a `.env.local` file in the root of your project (if it doesn't exist):

```bash
# .env.local
DEEPGRAM_API_KEY=your_deepgram_api_key_here
```

## Step 3: Restart Your Development Server

After adding the API key, restart your Next.js development server:

```bash
npm run dev
```

## Step 4: Test Voice Transcription

1. Navigate to `/dashboard/seeker/ai-interview`
2. Click the microphone button
3. Allow microphone permissions
4. Speak your answer
5. Click stop recording
6. The transcribed text should appear in the input field automatically

## Troubleshooting

### "Deepgram API key not configured" error
- Make sure `.env.local` file exists in the root directory
- Verify the API key is correct (no extra spaces)
- Restart the dev server after adding the key

### Microphone permission denied
- Check browser settings
- Make sure you clicked "Allow" when prompted
- Try refreshing the page

### Transcription not working
- Check browser console for errors
- Verify your Deepgram API key is valid
- Check your Deepgram account has available minutes

## API Usage

The transcription API is located at `/api/transcribe` and accepts:
- Method: POST
- Body: FormData with `audio` file (webm format)

Returns:
```json
{
  "transcript": "Your transcribed text here",
  "confidence": 0.95
}
```


