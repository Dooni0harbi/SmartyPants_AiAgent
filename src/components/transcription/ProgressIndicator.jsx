// src/components/transcription/ProgressIndicator.jsx
import React from "react";

const ProgressIndicator = ({ loading }) => {
  return loading ? <div>Transcribing...</div> : null;
};

export default ProgressIndicator;
