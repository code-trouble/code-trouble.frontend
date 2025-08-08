import { useEffect } from "react";

export function useDisableTabInside(ref: React.RefObject<HTMLElement>, active = true) {
  useEffect(() => {
    const container = ref.current;
    if (!container || !active) return;

    const focusableElements = container.querySelectorAll<HTMLElement>(
      "a, button, input, textarea, select, [tabindex]",
    );

    focusableElements.forEach((el) => {
      el.setAttribute("tabindex", "-1");
    });
  }, [ref, active]);
}
