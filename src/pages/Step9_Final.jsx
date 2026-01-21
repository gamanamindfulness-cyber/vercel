// frontend/src/pages/Step9_Final.jsx
import React from "react";
import PrimaryButton from "../components/PrimaryButton.jsx";

const Step9_Final = ({ setStep }) => {
  const handleClose = () => {
    // Hard reset back to the standby screen (Step 0)
    window.location.reload();
  };

  return (
    <div className="kiosk-card standby-card">
      <h2 style={{ fontSize: "2rem", lineHeight: "1.2", marginBottom: "10px" }}>
        Carry this ease with you and step back <br />
        into your day.
      </h2>

      {/* NEW: Container for side-by-side alignment */}
      <div
        className="bottom-right-anchor"
        style={{
          display: "flex",
          flexDirection: "row", // Aligns items horizontally
          alignItems: "center", // Centers them vertically relative to each other
          gap: "20px", // Space between text and button
        }}
      >
        {/* Moved inside the anchor div to sit next to the button */}
        <h2 style={{ fontSize: "1.5rem", margin: 0 }}>You matter.</h2>

        <PrimaryButton
          className="result-arrow-btn"
          text="➞"
          onClick={handleClose}
        />
      </div>
    </div>
  );
};

export default Step9_Final;
