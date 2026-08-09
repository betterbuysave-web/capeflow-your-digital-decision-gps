import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { ChevronDown, Search } from 'lucide-react-native';

import { Body, Display, Eyebrow, Mono } from '@/components/cape/Type';
import { Telemetry } from '@/components/cape/Telemetry';
import { CAFE_QUIZ, CAFE_TAGLINE, FRIES_CARDS } from '@/lib/data/cafe';
import { C, alpha } from '@/lib/colors';
import { useCapeStore } from '@/lib/store/useCapeStore';

/** Station 01 — the F.R.I.E.S. menu, then the detective drill. */
export function FriesSection() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <View>
      <Eyebrow color={C.modC}>STATION 01 · THE MENU</Eyebrow>
      <Display className="mt-2 text-4xl">The F.R.I.E.S. menu.</Display>
      <Body className="mt-3">
        Every great meal starts with knowing the menu. Tap an item for the rule, then run the
        detective drill below to test it under pressure.
      </Body>

      <View className="mt-4">
        <Telemetry tint={C.modC} height={26} />
      </View>

      <View className="mt-5 gap-2.5">
        {FRIES_CARDS.map((card) => {
          const expanded = open === card.letter;
          return (
            <Pressable
              key={card.letter}
              accessibilityRole="button"
              accessibilityState={{ expanded }}
              onPress={() => setOpen(expanded ? null : card.letter)}
              className="rounded-2xl p-4 active:opacity-80"
              style={{
                backgroundColor: alpha(card.tint, expanded ? 0.1 : 0.04),
                borderWidth: 1,
                borderColor: alpha(card.tint, expanded ? 0.45 : 0.15),
              }}
            >
              <View className="flex-row items-center gap-3">
                <View
                  className="h-10 w-10 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: alpha(card.tint, 0.14),
                    borderWidth: 1,
                    borderColor: alpha(card.tint, 0.4),
                  }}
                >
                  <Display color={card.tint} className="text-2xl">
                    {card.letter}
                  </Display>
                </View>
                <View className="flex-1">
                  <Mono bold color={alpha(C.slateSoft, 0.95)} className="text-[12px]">
                    {card.word}
                  </Mono>
                  <Mono color={alpha(card.tint, 0.8)} className="mt-0.5 text-[10px]">
                    {card.nickname}
                  </Mono>
                </View>
                <View style={{ transform: [{ rotate: expanded ? '180deg' : '0deg' }] }}>
                  <ChevronDown size={16} color={alpha(C.slateFaint, 0.7)} />
                </View>
              </View>

              {expanded ? (
                <View
                  className="mt-3.5 pt-3.5"
                  style={{ borderTopWidth: 1, borderTopColor: alpha(card.tint, 0.2) }}
                >
                  <Mono className="text-[11px]">{card.rule}</Mono>
                  <View
                    className="mt-3 rounded-xl p-3"
                    style={{
                      backgroundColor: alpha(C.white, 0.03),
                      borderLeftWidth: 2,
                      borderLeftColor: card.tint,
                    }}
                  >
                    <Eyebrow color={alpha(card.tint, 0.9)}>CAFÉ RULE</Eyebrow>
                    <Mono className="mt-1.5 text-[10px]">{card.cafeRule}</Mono>
                  </View>
                </View>
              ) : null}
            </Pressable>
          );
        })}
      </View>

      <DetectiveQuiz />

      <Mono color={alpha(C.gold, 0.8)} tracking={1} className="mt-6 text-center text-[10px]">
        {CAFE_TAGLINE}
      </Mono>
    </View>
  );
}

/** Eight scenarios: name the principle that just got broken. */
function DetectiveQuiz() {
  const results = useCapeStore((s) => s.cafeQuiz);
  const answerCafeQuiz = useCapeStore((s) => s.answerCafeQuiz);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  const question = CAFE_QUIZ[index];
  const answeredCount = Object.keys(results).length;
  const correctCount = Object.values(results).filter(Boolean).length;
  const isCorrect = picked === question.answer;

  const pick = (option: number) => {
    if (picked !== null) return;
    setPicked(option);
    answerCafeQuiz(question.id, option === question.answer);
  };

  const next = () => {
    setPicked(null);
    setIndex((i) => (i + 1) % CAFE_QUIZ.length);
  };

  return (
    <View
      className="mt-8 rounded-2xl p-4"
      style={{
        backgroundColor: alpha(C.ink2, 0.9),
        borderWidth: 1,
        borderColor: alpha(C.modC, 0.22),
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Search size={15} color={C.modC} />
          <Eyebrow color={C.modC}>F.R.I.E.S. DETECTIVE</Eyebrow>
        </View>
        <Mono bold color={alpha(C.slateFaint, 0.7)} className="text-[9px]">
          {correctCount}/{CAFE_QUIZ.length} CALLED
        </Mono>
      </View>

      <Mono bold color={alpha(C.slateFaint, 0.6)} className="mt-3 text-[9px]" tracking={1.5}>
        SCENARIO {index + 1} OF {CAFE_QUIZ.length} · {answeredCount} LOGGED
      </Mono>

      <View
        className="mt-2 rounded-xl p-3"
        style={{
          backgroundColor: alpha(C.white, 0.04),
          borderLeftWidth: 2,
          borderLeftColor: C.modC,
        }}
      >
        <Mono color={alpha(C.slateSoft, 0.85)} className="text-[11px]">
          {question.scenario}
        </Mono>
      </View>

      <View className="mt-3 gap-2">
        {question.options.map((option, i) => {
          const isAnswer = i === question.answer;
          const revealed = picked !== null;
          const tint = revealed && isAnswer ? C.yes : revealed && i === picked ? C.no : C.white;
          const strength = revealed && (isAnswer || i === picked) ? 0.16 : 0.04;
          return (
            <Pressable
              key={option}
              accessibilityRole="radio"
              accessibilityState={{ selected: picked === i, disabled: revealed }}
              onPress={() => pick(i)}
              className="rounded-xl px-3.5 py-3 active:opacity-70"
              style={{
                backgroundColor: alpha(tint, strength),
                borderWidth: 1,
                borderColor: alpha(tint, revealed && (isAnswer || i === picked) ? 0.5 : 0.12),
              }}
            >
              <Mono
                bold
                color={revealed && (isAnswer || i === picked) ? tint : alpha(C.slateSoft, 0.85)}
                className="text-[11px]"
              >
                {option}
              </Mono>
            </Pressable>
          );
        })}
      </View>

      {picked !== null ? (
        <>
          <View
            className="mt-3 rounded-xl p-3"
            style={{
              backgroundColor: alpha(isCorrect ? C.yes : C.no, 0.1),
              borderLeftWidth: 2,
              borderLeftColor: isCorrect ? C.yes : C.no,
            }}
          >
            <Mono color={alpha(C.slateSoft, 0.9)} className="text-[10px]">
              {isCorrect ? question.correct : question.wrong}
            </Mono>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={next}
            className="mt-3 items-center rounded-xl py-3 active:opacity-70"
            style={{
              backgroundColor: alpha(C.modC, 0.16),
              borderWidth: 1,
              borderColor: alpha(C.modC, 0.4),
            }}
          >
            <Mono bold color={C.modC} tracking={2} className="text-[10px]">
              NEXT SCENARIO
            </Mono>
          </Pressable>
        </>
      ) : null}
    </View>
  );
}
