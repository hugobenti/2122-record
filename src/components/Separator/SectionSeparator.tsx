import React from 'react';

interface SectionSeparatorProps {
  topColor: string;  // Tailwind color class, e.g., 'bg-blue-500'
  bottomColor: string;  // Tailwind color class, e.g., 'bg-green-500'
}

const SectionSeparator: React.FC<SectionSeparatorProps> = ({ topColor, bottomColor }) => {
  return (
    <div className={`relative w-full h-[100px] overflow-hidden ${topColor}`}>
      {/* Curved SVG separator */}
      <svg
        className="block relative w-full h-[100px]"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          className={bottomColor}
          d="M0,128 C288,256 576,0 864,128 C1152,256 1440,128 1440,128 L1440,320 L0,320 Z"
        />
      </svg>

    </div>
  );
};

export default SectionSeparator;
