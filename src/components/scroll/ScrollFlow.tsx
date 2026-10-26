"use client";

import { useEffect } from "react";
import { startFlow } from "@/lib/flow";

/** Mounts the page's motion system (see lib/flow.ts). Renders nothing. */
export default function ScrollFlow() {
  useEffect(() => startFlow(), []);
  return null;
}
