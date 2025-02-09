import React from 'react';

const LoadingDots = () => {
  return (
    <div className="relative w-32 flex justify-center">
      <div className="inline-block w-1 h-1 rounded-full bg-blue-500 m-1 animate-dot delay-0"></div>
      <div className="inline-block w-1 h-1 rounded-full bg-blue-500 m-1 animate-dot delay-100"></div>
      <div className="inline-block w-1 h-1 rounded-full bg-blue-500 m-1 animate-dot delay-200"></div>

      <style jsx>{`
        @keyframes anim-dot {
          0% {
            transform: scale(1.0);
          }
          30% {
            transform: scale(1.0);
          }
          65% {
            transform: scale(2.0);
          }
          100% {
            transform: scale(1.0);
          }
        }
        
        .animate-dot {
          animation: anim-dot 1s ease-in-out infinite;
        }

        .delay-0 {
          animation-delay: 0s;
        }

        .delay-100 {
          animation-delay: 0.33s;
        }

        .delay-200 {
          animation-delay: 0.66s;
        }
      `}</style>
    </div>
  );
};

export default LoadingDots;
