import React from "react";

/**
 * Makes non-interactive elements like <span> or <div> accessible
 * via keyboard and screen readers.
*/
export function makeElementAccessible(
  onClick: () => void,
  role: 'link' | 'button' = 'link'
) {
  return {
    role,
    tabIndex: 0,
    onClick,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || (role === 'button' && e.key === ' ')) {
        e.preventDefault();
        onClick();
      }
    },
  };
}
