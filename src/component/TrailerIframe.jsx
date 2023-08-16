import React from "react";

export default function TrailerIframe({ keyId }) {
  return (
    <div style={{ position: "relative" }}>
      <iframe
        src={`https://youtube.com/embed/${keyId}`}
        style={{ width: "100%", height: "100%" }}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
