"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: () => Promise<void>;
    };
  }
}

const mathJaxConfig = `
  window.MathJax = {
    loader: {
      load: ["[tex]/color"]
    },
    tex: {
      inlineMath: [["\\\\(", "\\\\)"], ["$", "$"]],
      displayMath: [["\\\\[", "\\\\]"], ["$$", "$$"]],
      packages: { "[+]": ["color"] }
    },
    svg: { fontCache: "global" }
  };
`;

export default function MathJaxProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.MathJax?.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  }, [pathname]);

  return (
    <>
      <Script id="mathjax-config" strategy="afterInteractive">
        {mathJaxConfig}
      </Script>
      <Script
        id="mathjax-script"
        strategy="afterInteractive"
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"
        onLoad={() => window.MathJax?.typesetPromise?.()}
      />
    </>
  );
}
