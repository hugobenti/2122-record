import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const ArrowIcon: React.FC<IconProps> = (props) => {
  return (
<svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg"
	 viewBox="0 0 32 32" xmlSpace="preserve">
<path className='fill-white'  d="M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14S23.7,2,16,2z M23.7,22.7C23.5,22.9,23.3,23,23,23c-0.1,0-0.2,0-0.4-0.1
	L16,20.4l-6.6,2.6c-0.4,0.1-0.8,0-1.1-0.3c-0.3-0.3-0.3-0.8-0.2-1.1l7-14c0.3-0.7,1.5-0.7,1.8,0l7,14C24.1,21.9,24,22.4,23.7,22.7z"
	/>
</svg>
  );
};

export default ArrowIcon;
