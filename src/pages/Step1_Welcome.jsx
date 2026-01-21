// frontend/src/pages/Step1_Welcome.jsx
import React from "react";
import PrimaryButton from "../components/PrimaryButton.jsx";

const Step1_Welcome = ({ nextStep }) => {
  return (
    <div className="kiosk-card standby-card">
      <h2>Settle in, nothing else matters right now.</h2>

      {/* Centered content to fill the card space */}
      <div
        style={{
          marginTop: "30px",
          fontSize: "1.7rem",
          fontStyle: "italic",
        }}
      >
        <p>
          Take a deep breath and prepare to <br /> find your rhythm.
        </p>
      </div>

      {/* Circular Arrow Button anchored to bottom right */}
      <div
        className="bottom-right-anchor"
        style={{ bottom: "30px", right: "30px" }}
      >
        <PrimaryButton
          className="result-arrow-btn"
          text="➞"
          onClick={nextStep}
        />
      </div>
    </div>
  );
};

export default Step1_Welcome;
