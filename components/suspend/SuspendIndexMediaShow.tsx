import dynamic from "next/dynamic";

export const SuspenseIndexMediaShow = dynamic(
  () => import("../IndexMediaShow"),
  { suspense: true }
);
