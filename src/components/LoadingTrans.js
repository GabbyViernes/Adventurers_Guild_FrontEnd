import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingTrans = () => {
  const navigate = useNavigate();
  const [currentNumber, setCurrentNumber] = useState(6);
  const [offset, setOffset] = useState(0);
  const numbers = [6, 23, 57, 72, 100];

  useEffect(() => {
    let timeout1, timeout2;
    
    // 6 → 23 (1s)
    timeout1 = setTimeout(() => {
      setCurrentNumber(23);
      setOffset(-200);
    }, 1000);

    // 23 → 57 (1s + 1s)
    timeout2 = setTimeout(() => {
      setCurrentNumber(57);
      setOffset(-400);
    }, 2000);

    // 57 → 72 (2s + 5s)
    const timeout3 = setTimeout(() => {
      setCurrentNumber(72);
      setOffset(-600);
    }, 7000);

    // 72 → 100 (7s + 1s)
    const timeout4 = setTimeout(() => {
      setCurrentNumber(100);
      setOffset(-800);
    }, 8000);

    // Final transition (8s + 5s)
    const timeout5 = setTimeout(() => {
      navigate("/mainSI");
    }, 13000);

    return () => {
      [timeout1, timeout2, timeout3, timeout4, timeout5].forEach(clearTimeout);
    };
  }, [navigate]);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      background: "#FFFFFF",
      height: "100vh",
      overflow: "hidden"
    }}>
      <div style={{
        height: "776px",
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        background: "#F6F6F6",
        overflow: "hidden",
        position: "relative"
      }}>
        <div style={{
          position: "absolute",
          transform: `translateY(${offset}px)`,
          transition: "transform 1s ease-in-out",
          left: 44
        }}>
          {numbers.map((num) => (
            <div key={num} style={{
              height: "776px",
              display: "flex",
              alignItems: "flex-start"
            }}>
              <span style={{
                color: "#1A120B",
                fontSize: "160px",
                margin: "639px 142px 33px 0",
                opacity: num === currentNumber ? 1 : 0,
                transition: "opacity 0.5s ease-in-out"
              }}>
                {num}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingTrans;