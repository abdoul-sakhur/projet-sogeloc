"use client";

import { useLinkStatus } from "next/link";
import Spinner from "@/components/Spinner";

export default function LinkPendingIndicator({ size = 16 }: { size?: number }) {
  const { pending } = useLinkStatus();
  if (!pending) return null;
  return <Spinner size={size} className="ml-2 inline-block align-middle" />;
}
