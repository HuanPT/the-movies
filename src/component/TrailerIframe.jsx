import React from "react";

export default function TrailerIframe({ keyId }) {
  return (
    <div className="wrap__iframe">
      <iframe
        src={`https://youtube.com/embed/${keyId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
