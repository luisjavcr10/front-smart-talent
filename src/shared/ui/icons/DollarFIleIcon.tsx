import React from 'react';

interface FileIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export const DollarFileIcon: React.FC<FileIconProps> = ({
  width = 30,
  height = 30,
  className = '',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox=""
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M17.5 3.75V8.75C17.5 9.08152 17.6317 9.39946 17.8661 9.63388C18.1005 9.8683 18.4185 10 18.75 10H23.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.25 26.25H8.75C8.08696 26.25 7.45107 25.9866 6.98223 25.5178C6.51339 25.0489 6.25 24.413 6.25 23.75V6.25C6.25 5.58696 6.51339 4.95107 6.98223 4.48223C7.45107 4.01339 8.08696 3.75 8.75 3.75H17.5L23.75 10V23.75C23.75 24.413 23.4866 25.0489 23.0178 25.5178C22.5489 25.9866 21.913 26.25 21.25 26.25Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 13.75H14.375C13.8777 13.75 13.4008 13.9475 13.0492 14.2992C12.6975 14.6508 12.5 15.1277 12.5 15.625C12.5 16.1223 12.6975 16.5992 13.0492 16.9508C13.4008 17.3025 13.8777 17.5 14.375 17.5H15.625C16.1223 17.5 16.5992 17.6975 16.9508 18.0492C17.3025 18.4008 17.5 18.8777 17.5 19.375C17.5 19.8723 17.3025 20.3492 16.9508 20.7008C16.5992 21.0525 16.1223 21.25 15.625 21.25H12.5M15 21.25V22.5M15 12.5V13.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
