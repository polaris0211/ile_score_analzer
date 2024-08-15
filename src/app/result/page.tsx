"use client";
import { useStore } from "@/lib/store";
export default function Result() {
  const store = useStore();
  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Result
      </h1>
      <section>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 opacity-30">
          Score and average
        </h2>
        <li>Your score : {store.score}</li>
      </section>
    </>
  );
}
