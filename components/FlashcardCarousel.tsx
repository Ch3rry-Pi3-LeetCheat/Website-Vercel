"use client";

import { useEffect, useState, type ReactNode } from "react";

type Flashcard = {
  question: ReactNode;
  answer: ReactNode;
};

type FlashcardCarouselProps = {
  cards: Flashcard[];
};

export default function FlashcardCarousel({ cards }: FlashcardCarouselProps) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const total = cards.length;
  const card = cards[index];
  const showPrev = index > 0;
  const showNext = index < total - 1;

  const goTo = (nextIndex: number) => {
    setIndex(nextIndex);
    setFlipped(false);
  };

  const prev = () => {
    if (showPrev) goTo(index - 1);
  };

  const next = () => {
    if (showNext) goTo(index + 1);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.MathJax?.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  }, [index, flipped]);

  return (
    <div className="grid gap-4">
      <div className="grid items-center gap-3 md:grid-cols-[48px_minmax(0,1fr)_48px]">
        {showPrev ? (
          <button
            type="button"
            onClick={prev}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition hover:border-white/50"
            aria-label="Previous question"
          >
            <span aria-hidden="true">&lsaquo;</span>
          </button>
        ) : (
          <div className="h-10 w-10" aria-hidden="true" />
        )}

        <div className="flashcard">
          <button
            type="button"
            onClick={() => setFlipped((prevState) => !prevState)}
            className="flashcard-button"
            aria-pressed={flipped}
          >
            <div className={`flashcard-inner ${flipped ? "is-flipped" : ""}`}>
              <div className="flashcard-face flashcard-front text-base leading-7 text-white">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent-2)]">
                  Question {index + 1}
                </span>
                <span>{card.question}</span>
              </div>
              <div className="flashcard-face flashcard-back text-base leading-7 text-[color:var(--color-muted)]">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent-2)]">
                  Answer
                </span>
                <span>{card.answer}</span>
              </div>
            </div>
          </button>
        </div>

        {showNext ? (
          <button
            type="button"
            onClick={next}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition hover:border-white/50"
            aria-label="Next question"
          >
            <span aria-hidden="true">&rsaquo;</span>
          </button>
        ) : (
          <div className="h-10 w-10" aria-hidden="true" />
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {cards.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.3em] transition ${
              i === index
                ? "bg-white/20 text-white"
                : "bg-white/5 text-[color:var(--color-muted)] hover:bg-white/10 hover:text-white"
            }`}
            aria-label={`Go to question ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
