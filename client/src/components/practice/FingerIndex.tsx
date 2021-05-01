import React from "react";
// import { ColorScheme } from "../../static/contents_keyboard/";

interface FingerIndexPorps {
  className?: string;
  width: number;
}

export const FingerIndex: React.FC<FingerIndexPorps> = ({
  width,
  className = "",
}) => {
  return (
    <div
      className={`fingerIndex-container ${className}`}
      style={{ width: width }}
    >
      {/* <div className="fingerIndex-hand left">
        <div className="finger" style={{ background: ColorScheme["L1"] }}>
          Pinky
        </div>
        <div className="finger" style={{ background: ColorScheme["L2"] }}>
          Ring
        </div>
        <div className="finger" style={{ background: ColorScheme["L3"] }}>
          Middle
        </div>
        <div className="finger" style={{ background: ColorScheme["L4"] }}>
          Index
        </div>
      </div>
      <div className="fingerIndex-hand right">
        <div className="finger" style={{ background: ColorScheme["R1"] }}>
          Pinky
        </div>
        <div className="finger" style={{ background: ColorScheme["R2"] }}>
          Ring
        </div>
        <div className="finger" style={{ background: ColorScheme["R3"] }}>
          Middle
        </div>
        <div className="finger" style={{ background: ColorScheme["R4"] }}>
          Index
        </div>
      </div> */}
    </div>
  );
};

export default FingerIndex;
