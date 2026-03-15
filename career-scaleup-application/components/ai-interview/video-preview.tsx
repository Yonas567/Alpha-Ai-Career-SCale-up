"use client";

import { useEffect, useRef, useState } from "react";
import { VideoOff } from "lucide-react";

interface VideoPreviewProps {
  enabled?: boolean;
}

export function VideoPreview({ enabled = true }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (!enabled) {
      // Clean up stream if disabled
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      return;
    }

    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: 320, height: 240 },
          audio: false,
        });
        setStream(mediaStream);
        setHasPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error("Camera access denied:", error);
        setHasPermission(false);
      }
    };

    startCamera();

    // Cleanup on unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [enabled]);

  // Update video element when stream changes
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!enabled || hasPermission === false) {
    return (
      <div className="w-[280px] h-[200px] rounded-xl bg-muted flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <VideoOff className="w-8 h-8 mx-auto mb-2" />
          <p className="text-xs">Camera off</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[280px] h-[200px] rounded-xl overflow-hidden bg-muted shadow-lg">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover mirror"
        style={{ transform: "scaleX(-1)" }}
      />
    </div>
  );
}
