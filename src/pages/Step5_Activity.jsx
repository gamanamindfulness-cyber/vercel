import React, { useState, useEffect, useRef } from "react";
import PrimaryButton from "../components/PrimaryButton.jsx";

const audioFilesRegistry = {
  feeling: ["audio1.mp3", "audio2.mp3", "audio3.mp3", "audio4.mp3"],
  hard: ["audio1.mp3", "audio2.mp3", "audio3.mp3", "audio4.mp3"],
  low: ["audio1.mp3", "audio2.mp3", "audio3.mp3", "audio4.mp3"],
  too: ["audio1.mp3", "audio2.mp3", "audio3.mp3", "audio4.mp3"],
  just: ["audio1.mp3", "audio2.mp3", "audio3.mp3", "audio4.mp3"],
  things: ["audio1.mp3", "audio2.mp3", "audio3.mp3", "audio4.mp3"],
  im: ["audio1.mp3", "audio2.mp3", "audio3.mp3", "audio4.mp3"],
  need: ["audio1.mp3", "audio2.mp3", "audio3.mp3", "audio4.mp3"],
  nothing: ["audio1.mp3", "audio2.mp3", "audio3.mp3", "audio4.mp3"],
};

const Step5_Activity = ({ sessionData, nextStep }) => {
  const [showActivity, setShowActivity] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [randomAudioPath, setRandomAudioPath] = useState("");
  const [audioFinished, setAudioFinished] = useState(false);
  const audioRef = useRef(null);
  const backgroundVideoRef = useRef(null);

  const hasSelected = useRef(false);

  useEffect(() => {
    if (!hasSelected.current) {
      const folder = sessionData.targetAudioFolder || "feeling";
      const files = audioFilesRegistry[folder];
      const randomFile = files[Math.floor(Math.random() * files.length)];

      setRandomAudioPath(`/goal/${folder}/${randomFile}`);
      hasSelected.current = true;
    }

    // Step 1: Transition to activity card after 5 seconds
    const preparationTimer = setTimeout(() => {
      setShowActivity(true);

      // Step 2: Enable next button after 7 seconds of the activity being visible
      const lockoutTimer = setTimeout(() => {
        setBtnDisabled(false);
      }, 7000);

      // Step 3: Delayed Media Playback
      setTimeout(() => {
        if (backgroundVideoRef.current) {
          backgroundVideoRef.current.volume = 0.1;
          backgroundVideoRef.current
            .play()
            .catch((error) => console.log("Video playback error:", error));
        }
      }, 200);

      // Audio starts after a 10-second delay
      const audioDelayTimer = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current
            .play()
            .catch((error) => console.log("Audio playback error:", error));
        }
      }, 10000);

      return () => {
        clearTimeout(lockoutTimer); // Fixed typo from 'clearout' to 'clearTimeout'
        clearTimeout(audioDelayTimer);
      };
    }, 5000);

    return () => clearTimeout(preparationTimer);
  }, [sessionData.targetAudioFolder]);

  const handleSkip = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (backgroundVideoRef.current) {
      backgroundVideoRef.current.pause();
    }
    nextStep();
  };

  if (!showActivity) {
    return (
      <div className="kiosk-card standby-card">
        <div
          style={{
            height: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>
            Gently move in that direction
          </h2>
          <p style={{ fontSize: "1.5rem", fontStyle: "italic" }}>
            This moment is just for you...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="kiosk-card activity-media-card standby-card">
      <div
        className="activity-media-container"
        style={{ margin: "20px auto", textAlign: "center", width: "100%" }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            borderRadius: "15px",
            overflow: "hidden",
            backgroundColor: "#000",
          }}
        >
          {/* Video is set to loop and will continue until the user clicks next */}
          <video
            ref={backgroundVideoRef}
            src="/video_background.mp4"
            loop
            playsInline
            style={{ width: "100%", display: "block" }}
          />
        </div>

        <audio
          ref={audioRef}
          src={randomAudioPath}
          controls
          controlsList="nodownload noplaybackrate"
          onEnded={() => setAudioFinished(true)} // Only shows text, doesn't change page
          onPlay={() => setAudioFinished(false)}
          style={{ width: "80%", marginTop: "20px" }}
        />

        {audioFinished && (
          <p
            className="animate-fade-in"
            style={{
              marginTop: "15px",
              fontWeight: "800",
              color: "var(--color-text-charcoal)",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Session complete. Please click to continue.
          </p>
        )}
      </div>

      <div
        className="bottom-right-anchor"
        style={{ bottom: "25px", right: "30px" }}
      >
        {/* Manual navigation only via this button */}
        <PrimaryButton
          className="result-arrow-btn"
          text="➞"
          onClick={handleSkip}
          disabled={btnDisabled}
        />
      </div>
    </div>
  );
};

export default Step5_Activity;
