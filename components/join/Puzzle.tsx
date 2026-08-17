"use client";

import { useEffect, useState } from "react";
import { images } from "@/lib/content";
import { cn } from "@/lib/cn";
import { CheckIcon } from "@/components/ui/icons";

const GRID = 3;
const PIECE_COUNT = GRID * GRID;
const SOLVED = Array.from({ length: PIECE_COUNT }, (_, i) => i);

function shuffledBoard(): number[] {
  const arr = [...SOLVED];
  do {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  } while (arr.every((v, i) => v === SOLVED[i]));
  return arr;
}

function piecePosition(value: number) {
  const col = value % GRID;
  const row = Math.floor(value / GRID);
  return `${(col / (GRID - 1)) * 100}% ${(row / (GRID - 1)) * 100}%`;
}

export function Puzzle({ onComplete }: { onComplete: () => void }) {
  const [board, setBoard] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    setBoard(shuffledBoard());
  }, []);

  function handlePieceClick(index: number) {
    if (solved) return;

    if (selected === null) {
      setSelected(index);
      return;
    }

    if (selected === index) {
      setSelected(null);
      return;
    }

    const next = [...board];
    [next[selected], next[index]] = [next[index], next[selected]];
    setBoard(next);
    setSelected(null);

    if (next.every((v, i) => v === SOLVED[i])) {
      setSolved(true);
      window.setTimeout(onComplete, 900);
    }
  }

  if (board.length === 0) return null;

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center gap-6">
      <p className="font-pixel text-xs tracking-widest text-lime uppercase text-center">Prove You&apos;re A Mini</p>

      <div className="relative w-full">
        <div
          className={cn(
            "grid aspect-square w-full grid-cols-3 grid-rows-3 gap-1 bg-line pixel-border overflow-hidden transition-opacity duration-500",
            solved && "opacity-100"
          )}
        >
          {board.map((value, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handlePieceClick(index)}
              disabled={solved}
              aria-label={`Puzzle piece ${index + 1}`}
              data-swap-target={selected === index}
              className="puzzle-piece relative bg-ink outline-none"
              style={{
                backgroundImage: `url(${images.heroPng})`,
                backgroundSize: `${GRID * 100}% ${GRID * 100}%`,
                backgroundPosition: piecePosition(value),
                imageRendering: "pixelated",
              }}
            >
              {selected === index && !solved && <span className="absolute inset-0 ring-2 ring-lime ring-inset" />}
            </button>
          ))}
        </div>

        {solved && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink/70">
            <div className="check-pop flex flex-col items-center gap-2 pixel-border bg-ink px-6 py-5">
              <CheckIcon className="h-8 w-8 text-lime" />
              <span className="font-pixel text-[11px] text-lime uppercase">Puzzle Complete</span>
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-white/40">Tap a piece, then tap another to swap them.</p>
    </div>
  );
}
