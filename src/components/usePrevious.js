import { useRef, useEffect } from "react";

// Manage focus for better accessibility and how to get a component’s previous state
export default function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
