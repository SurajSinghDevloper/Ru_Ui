"use client";
import React, { useState, useEffect, useRef } from "react";

const TextToImage = ({ text }) => {
  const [imageUrl, setImageUrl] = useState("");
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set the canvas size to fit within the specified box
    const boxWidth = 121.867;
    const boxHeight = 38;

    canvas.width = boxWidth;
    canvas.height = boxHeight;

    // Clear the canvas before drawing the new text
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate the font size based on the box size
    const fontSize = Math.min(boxWidth / text.length, boxHeight);

    // Increase the font size
    context.font = `${fontSize}px Arial`;

    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    const dataUrl = canvas.toDataURL("image/png");
    setImageUrl(dataUrl);
  }, [text]);

  return (
    <div className="pb-2">
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <img src={imageUrl} alt="" />
    </div>
  );
};

export default TextToImage;
