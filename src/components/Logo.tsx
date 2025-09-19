import React from 'react';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        {/* Interconnected circles forming encrypted bond */}
        <svg 
          width="48" 
          height="48" 
          viewBox="0 0 48 48" 
          className="text-primary"
        >
          {/* Background glow effect */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Main circles */}
          <circle 
            cx="18" 
            cy="18" 
            r="8" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            className="animate-pulse-glow"
            filter="url(#glow)"
          />
          <circle 
            cx="30" 
            cy="18" 
            r="8" 
            fill="none" 
            stroke="hsl(var(--secondary))" 
            strokeWidth="2"
            className="animate-pulse-glow"
            filter="url(#glow)"
          />
          <circle 
            cx="24" 
            cy="30" 
            r="8" 
            fill="none" 
            stroke="hsl(var(--accent))" 
            strokeWidth="2"
            className="animate-pulse-glow"
            filter="url(#glow)"
          />
          
          {/* Connecting bonds */}
          <line 
            x1="22" y1="22" x2="26" y2="22" 
            stroke="currentColor" 
            strokeWidth="3"
            className="opacity-80"
          />
          <line 
            x1="20" y1="24" x2="22" y2="26" 
            stroke="hsl(var(--secondary))" 
            strokeWidth="3"
            className="opacity-80"
          />
          <line 
            x1="28" y1="24" x2="26" y2="26" 
            stroke="hsl(var(--accent))" 
            strokeWidth="3"
            className="opacity-80"
          />
          
          {/* Lock symbols for encryption */}
          <rect 
            x="16" y="16" width="4" height="3" 
            rx="1" 
            fill="currentColor"
            className="opacity-60"
          />
          <rect 
            x="28" y="16" width="4" height="3" 
            rx="1" 
            fill="hsl(var(--secondary))"
            className="opacity-60"
          />
          <rect 
            x="22" y="28" width="4" height="3" 
            rx="1" 
            fill="hsl(var(--accent))"
            className="opacity-60"
          />
        </svg>
      </div>
      
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-corporate bg-clip-text text-transparent">
          SyndiLoan
        </span>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          Confidential Finance
        </span>
      </div>
    </div>
  );
};

export default Logo;