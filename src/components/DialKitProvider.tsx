"use client";

import { useEffect } from "react";
import { useDialKit } from "dialkit";
import { DialRoot } from "dialkit";
import "dialkit/styles.css";

export default function DialKitProvider() {
  const d = useDialKit("Title Highlight", {
    inset: [0, -12, 12],
    paddingBottom: [0.07, 0, 0.5],
    fill: {
      alpha: [0.37, 0, 0.7],
      height: [80, 40, 100],
      y: [57, 20, 90],
    },
    underline: {
      height: [4, 1, 14],
      y: [95, 80, 110],
    },
  });

  useEffect(() => {
    const root = document.documentElement;
    const inset = d.inset;
    const trim = Math.max(inset, 0);
    const stretch = Math.max(-inset, 0);

    root.style.setProperty("--highlight-inset", `${d.inset}px`);
    root.style.setProperty("--highlight-trim", `${trim}px`);
    root.style.setProperty("--highlight-stretch", `${stretch}px`);
    root.style.setProperty("--highlight-padding-bottom", `${d.paddingBottom}em`);
    root.style.setProperty("--highlight-fill-alpha", `${d.fill.alpha}`);
    root.style.setProperty("--highlight-fill-height", `${d.fill.height}%`);
    root.style.setProperty("--highlight-fill-y", `${d.fill.y}%`);
    root.style.setProperty("--highlight-underline-height", `${d.underline.height}px`);
    root.style.setProperty("--highlight-underline-y", `${d.underline.y}%`);
  }, [d]);

  return <DialRoot position="bottom-right" />;
}
