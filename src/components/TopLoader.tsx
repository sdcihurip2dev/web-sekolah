"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function TopLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const finishRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // start loader on route/query change
    setVisible(true);
    setProgress(10);

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (finishRef.current) clearTimeout(finishRef.current);

    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) return p;
        const inc = Math.random() * 10 + 5; // 5-15%
        return Math.min(90, p + inc);
      });
    }, 200);

    // complete after short delay
    finishRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 200);
    }, 900);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (finishRef.current) clearTimeout(finishRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams?.toString()]);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: visible ? 3 : 0,
        zIndex: 9999,
        transition: "height 0.15s ease",
      }}
    >
      <div
        style={{
          height: 3,
          width: `${progress}%`,
          background: "linear-gradient(90deg, #dc2626, #ea580c)",
          boxShadow: "0 0 6px rgba(220,38,38,0.4)",
          transition: "width 0.2s ease-out",
        }}
      />
    </div>
  );
}
