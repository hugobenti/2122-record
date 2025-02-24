import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const MenuIcon: React.FC<IconProps> = (props) => {
  return (
    <div className="w-8 h-8 py-1 flex flex-col justify-between">
      <div className="w-full h-1 bg-white rounded-md" />
      <div className="w-full h-1 bg-white rounded-md" />
      <div className="w-full h-1 bg-white rounded-md" />
    </div>
  );
};

export default MenuIcon;
