import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import {
  ArrowRight,
  BookOpen,
  CircleAlert,
  CircleCheck,
  Heart,
  Shield,
  Stethoscope,
  Users,
  X,
} from '@/lib/icons';

import { MatchDial } from '@/components/cape/MatchDial';
import { NotebookBackdrop } from '@/components/cape/NotebookBackdrop';
import { Body, Display, Eyebrow, Mono, Panel, Rail } from '@/components/cape/Type';
import { GradientAction, GhostButton, MetallicButton, TintedRow } from '@/components/cape/Buttons';
import { BrandBanner } from '@/components/cape/BrandBanner';
import { BrandFooter } from '@/components/cape/BrandFooter';
import { MatchCompass } from '@/components/cape/MatchCompass';
import { C, alpha, wash } from '@/lib/colors';
import { MATCH_MODULES, moduleTagline } from '@/lib/data/match';
import { DISCLAIMER, PARENT_CARDS, PRIVACY_NOTE, SOURCES } from '@/lib/data/content';
import { PIPELINE_COPY, CAPE_CARD_COPY } from '@/lib/data/canon';
import { SAMPLE_SCENARIO } from '@/lib/data/scenarios';
import { useCapeStore } from '@/lib/store/useCapeStore';

export default function Landing() {
  const onboarded = useCapeStore((s) => s.onboarded);
  const privacyAcknowledged = useCapeStore((s) => s.privacyAcknowledged);
  const acknowledgePrivacy = useCapeStore((s) => s.acknowledgePrivacy);
  const registerVisit = useCapeStore((s) => s.registerVisit);
  const [showPrivacy, setShowPrivacy] = useState(true);
  const { gate } = useLocalSearchParams<{ gate?: string }>();
  const returning = onboarded && gate === '1';

  useEffect(() => {
    if (onboarded) registerVisit();
  }, [onboarded, registerVisit]);

  // Home's back button opens this gate on purpose (?gate=1); otherwise returning students skip it.
  if (onboarded && gate !== '1') return <Redirect href="/(tabs)" />;

  return (
    <View className="bg-paper flex-1">
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-24"
        showsVerticalScrollIndicator={false}
      >
        {/* HERO */}
        <View className="items-center justify-center overflow-hidden py-8">
          <NotebookBackdrop />
          <View className="w-full max-w-3xl items-center px-5">
            <View
              className="mb-6 flex-row items-center gap-2 rounded-full px-4 py-1.5"
              style={{
                backgroundColor: wash(C.tealBright, 0.12),
                borderWidth: 1,
                borderColor: alpha(C.tealBright, 0.5),
              }}
            >
              <Shield size={13} color={C.teal} />
              <Eyebrow color={C.teal}>THE HARNESS PROJECT</Eyebrow>
            </View>

            <BrandBanner className="w-full" />

            <Body className="mt-6 text-center" color={C.inkSoft}>
              A decision compass for youth. Five MATCH letters, two tracks, no account.
            </Body>

            <View className="mt-8 w-full gap-3">
              {returning ? (
                <MetallicButton
                  brand
                  label="BACK TO MY COMPASS"
                  onPress={() => router.replace('/(tabs)')}
                />
              ) : null}
              <MetallicButton
                brand={!returning}
                label={returning ? 'CHANGE MY TRACK' : 'GET STARTED'}
                onPress={() => router.push('/onboarding')}
              />
              <GhostButton label="TRY A SAMPLE" onPress={() => router.push('/sample')} />
            </View>

            <Mono className="mt-6 text-center text-[12px]" color={C.inkFaint}>
              GRADES 6–12 · GREEN 6–8 · BLUE 9–12
            </Mono>
          </View>
        </View>

        <View className="gap-4 px-5 pt-14">
          <Display className="text-4xl">Five letters. One compass.</Display>
          <Body>{PIPELINE_COPY}</Body>
          <Panel tint={C.teal}>
            <Eyebrow color={C.teal}>CAPE Youth Edition</Eyebrow>
            <Mono className="mt-3 text-[13px]">{CAPE_CARD_COPY}</Mono>
          </Panel>
        </View>

        {/* FRAMEWORK */}
        <View className="px-5 pt-16">
          <View className="items-center">
            <Eyebrow color={C.teal} className="mb-3">
              THE FRAMEWORK
            </Eyebrow>
            <Display className="text-center text-4xl">What does M.A.T.C.H. stand for?</Display>
            <Body className="mt-4 text-center">
              Five MATCH letters. One compass. Health choices, awareness, trusted support, consent,
              and choosing your pace.
            </Body>
          </View>

          <View className="mt-8">
            <MatchCompass band={null} preview />
          </View>

          <View className="mt-8 gap-3">
            {MATCH_MODULES.map((mod) => (
              <Panel key={mod.id} tint={mod.color} fill={0.04} stroke={0.15}>
                <View className="flex-row items-start gap-4">
                  <MatchDial letter={mod.letter} size={52} />
                  <View className="flex-1">
                    <View className="mb-1 flex-row items-center gap-2">
                      <Mono className="text-base">{mod.emoji}</Mono>
                      <Mono bold color={mod.color} className="flex-1 text-[14px]">
                        {mod.name}
                      </Mono>
                    </View>
                    <Mono className="text-[13px]">{moduleTagline(mod, 'green')}</Mono>
                  </View>
                </View>
              </Panel>
            ))}
          </View>
        </View>

        {/* SEE IT IN ACTION */}
        <View className="px-5 pt-16">
          <View className="items-center">
            <Eyebrow color={C.azure} className="mb-3">
              SEE IT IN ACTION
            </Eyebrow>
            <Display className="text-center text-4xl">Built for how youth actually learn.</Display>
            <Body className="mt-4 text-center">
              Gamified, judgment-free, and designed for mobile. No lectures — just interactive tools
              that build muscle memory for real decisions.
            </Body>
          </View>

          <View className="mt-8 gap-4">
            <PreviewCard title="THE CONSENT CAFÉ" tint={C.amber}>
              <View className="gap-1.5">
                <MenuLine label="🙌 High-Fives" verdict="YES" tint={C.amber} chip={C.yes} />
                <MenuLine label="🤗 Hugs" verdict="MAYBE" tint={C.amber} chip={C.maybe} />
                <MenuLine label="📍 Share Location" verdict="NO" tint={C.amber} chip={C.no} />
              </View>
              <Mono className="mt-3 text-[12px]" color={alpha(C.inkSoft, 0.55)}>
                Order from a menu of boundaries. YES, MAYBE, or NO — your choice, always reversible.
              </Mono>
            </PreviewCard>

            <PreviewCard title="CRISIS PROTOCOL" tint={C.flame}>
              <View className="gap-1.5">
                <View
                  className="rounded-lg px-2.5 py-2"
                  style={{
                    backgroundColor: alpha(C.flame, 0.1),
                    borderWidth: 1,
                    borderColor: alpha(C.flame, 0.3),
                  }}
                >
                  <Mono bold color={C.flame} className="text-[12px]">
                    🆘 988 — CRISIS LIFELINE
                  </Mono>
                  <Mono className="mt-0.5 text-[11px]" color={alpha('#ff9682', 0.7)}>
                    Call or text · 24/7 · Free
                  </Mono>
                </View>
                <View
                  className="rounded-lg px-2.5 py-2"
                  style={{
                    backgroundColor: alpha(C.flame, 0.1),
                    borderWidth: 1,
                    borderColor: alpha(C.flame, 0.3),
                  }}
                >
                  <Mono bold color={C.flame} className="text-[12px]">
                    Trusted support
                  </Mono>
                  <Mono className="mt-0.5 text-[11px]" color={alpha('#ff9682', 0.7)}>
                    Safety Circle · A trusted adult
                  </Mono>
                </View>
              </View>
              <Mono className="mt-3 text-[12px]" color={alpha(C.inkSoft, 0.55)}>
                Urgent help stays available on both tracks. No pause is required to reach help.
              </Mono>
            </PreviewCard>

            <PreviewCard title="MATCH COMPASS" tint={C.teal}>
              <View className="flex-row gap-1.5">
                {MATCH_MODULES.map((mod) => (
                  <View
                    key={mod.id}
                    className="aspect-square flex-1 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: alpha(C.teal, 0.08),
                      borderWidth: 1,
                      borderColor: alpha(C.teal, 0.2),
                    }}
                  >
                    <Mono className="text-sm">{mod.emoji}</Mono>
                  </View>
                ))}
              </View>
              <View
                className="mt-2 rounded-lg px-2.5 py-2"
                style={{
                  backgroundColor: alpha(C.teal, 0.06),
                  borderWidth: 1,
                  borderColor: alpha(C.teal, 0.15),
                }}
              >
                <View className="flex-row items-center justify-between">
                  <Mono color={C.teal} className="text-[12px]">
                    SafER SCORE
                  </Mono>
                  <Display color={C.teal} className="text-base">
                    67
                  </Display>
                </View>
                <View className="mt-1">
                  <Rail value={67} color={C.teal} />
                </View>
              </View>
              <Mono className="mt-3 text-[12px]" color={alpha(C.inkSoft, 0.55)}>
                Five MATCH letters. XP, badges, and progress saved on this device.
              </Mono>
            </PreviewCard>
          </View>
        </View>

        {/* SAMPLE */}
        <View className="px-5 pt-16">
          <View className="items-center">
            <Eyebrow color={C.teal} className="mb-3">
              TRY IT NOW
            </Eyebrow>
            <Display className="text-center text-4xl">What would you do at 1:47 AM?</Display>
            <Body className="mt-4 text-center">
              A taste of the Midnight Simulator. Pick a response and see how the M.A.T.C.H.
              framework turns panic into a plan.
            </Body>
          </View>

          <TintedRow
            tint={C.teal}
            fill={0.05}
            stroke={0.25}
            className="mt-8 p-0"
            onPress={() => router.push('/sample')}
          >
            <View
              className="px-5 py-4"
              style={{
                backgroundColor: alpha(C.teal, 0.06),
                borderBottomWidth: 1,
                borderBottomColor: alpha(C.teal, 0.15),
              }}
            >
              <View className="mb-1 flex-row items-center gap-2">
                <Mono className="text-base">{SAMPLE_SCENARIO.emoji}</Mono>
                <Eyebrow color={C.teal}>SAMPLE SCENARIO · MIDNIGHT SIM</Eyebrow>
              </View>
              <Mono className="text-[13px]" color={alpha(C.inkFaint, 0.7)}>
                {SAMPLE_SCENARIO.setup}
              </Mono>
            </View>
            <View className="px-5 py-4">
              <View
                className="ml-auto max-w-[85%] rounded-2xl px-4 py-3"
                style={{
                  backgroundColor: alpha(C.azure, 0.12),
                  borderWidth: 1,
                  borderColor: alpha(C.azure, 0.25),
                  borderBottomLeftRadius: 4,
                }}
              >
                <Mono className="text-[14px]" color={alpha(C.inkSoft, 0.9)}>
                  {SAMPLE_SCENARIO.message}
                </Mono>
                <Mono className="mt-1.5 text-right text-[11px]" color={alpha(C.inkFaint, 0.5)}>
                  {SAMPLE_SCENARIO.bubbleTime}
                </Mono>
              </View>
            </View>
            <View className="flex-row items-center justify-between px-5 pb-5">
              <Mono className="text-[12px]" color={alpha(C.inkFaint, 0.6)} tracking={2}>
                {SAMPLE_SCENARIO.prompt}
              </Mono>
              <ArrowRight size={14} color={C.teal} />
            </View>
          </TintedRow>

          <View className="mt-8 items-center">
            <MetallicButton
              label="UNLOCK THE FULL COMPASS"
              onPress={() => router.push('/onboarding')}
            />
          </View>
        </View>

        {/* PARENTS */}
        <View className="px-5 pt-16">
          <Panel tint={C.teal} fill={0.03} stroke={0.18} className="p-0">
            <View
              className="flex-row items-center gap-3 px-5 py-5"
              style={{
                backgroundColor: alpha(C.teal, 0.06),
                borderBottomWidth: 1,
                borderBottomColor: alpha(C.teal, 0.12),
              }}
            >
              <Users size={20} color={C.teal} />
              <View className="flex-1">
                <Eyebrow color={C.teal}>FOR PARENTS, GUARDIANS &amp; EDUCATORS</Eyebrow>
                <Mono className="mt-0.5 text-[12px]" color={alpha(C.inkFaint, 0.6)}>
                  Full curriculum transparency — no surprises
                </Mono>
              </View>
            </View>
            <View className="px-5 py-5">
              <Mono className="mb-5 text-[13px]">
                CAPE FLOW is built on trust. Parents and educators have full visibility into every
                piece of content students see. The Parent &amp; School Dashboard includes curriculum
                overviews, facilitation approach, parent rights, and family activities. Supplemental
                and TEKS-aligned, not a district-adopted human sexuality curriculum. Follow local
                board policy.
              </Mono>
              <View className="mb-5 gap-2.5">
                {PARENT_CARDS.slice(0, 3).map((card) => (
                  <Panel
                    key={card.title}
                    tint={card.tint}
                    fill={0.03}
                    stroke={0.14}
                    className="p-3"
                  >
                    <Mono className="mb-1.5 text-xl">{card.emoji}</Mono>
                    <Mono bold color={card.tint} className="text-[13px]">
                      {card.title}
                    </Mono>
                    <Mono className="mt-0.5 text-[11px]" color={alpha(C.inkFaint, 0.6)}>
                      {card.detail}
                    </Mono>
                  </Panel>
                ))}
              </View>
              <GradientAction
                onPress={() => router.push('/parents')}
                className="flex-row items-center justify-center gap-2 rounded-xl px-5 py-3"
              >
                <Mono bold color={C.paper2} className="shrink text-center text-[13px]" tracking={1}>
                  VIEW PARENT &amp; SCHOOL DASHBOARD
                </Mono>
                <ArrowRight size={14} color={C.paper2} />
              </GradientAction>
            </View>
          </Panel>
        </View>

        {/* DISCLAIMER */}
        <View className="px-5 pt-12">
          <Panel tint={C.lemon} fill={0.05} stroke={0.2}>
            <View className="flex-row items-start gap-3">
              <CircleAlert size={20} color={C.lemon} />
              <View className="flex-1">
                <Eyebrow color={C.lemon} className="mb-2">
                  IMPORTANT DISCLAIMER
                </Eyebrow>
                <Mono className="text-[13px]">{DISCLAIMER}</Mono>
              </View>
            </View>
          </Panel>
        </View>

        {/* SOURCES */}
        <View className="px-5 pt-12">
          <View className="items-center">
            <View className="mb-3 flex-row items-center gap-2">
              <BookOpen size={16} color={alpha(C.inkFaint, 0.7)} />
              <Eyebrow color={alpha(C.inkFaint, 0.7)}>SOURCES &amp; REFERENCES</Eyebrow>
            </View>
            <Mono className="text-center text-[13px]" color={alpha(C.inkFaint, 0.6)}>
              Confirm clinical details with a licensed provider or current CDC guidance.
            </Mono>
          </View>
          <View className="mt-6 gap-2.5">
            {SOURCES.map((src) => (
              <View
                key={src.name}
                className="flex-row items-start gap-2.5 rounded-xl p-3"
                style={{
                  backgroundColor: C.card,
                  borderWidth: 1,
                  borderColor: alpha(C.ink, 0.1),
                }}
              >
                <CircleCheck size={14} color={alpha(C.teal, 0.6)} />
                <View className="flex-1">
                  <Mono bold className="text-[13px]" color={alpha(C.inkSoft, 0.85)}>
                    {src.name}
                  </Mono>
                  <Mono className="mt-0.5 text-[12px]" color={alpha(C.inkFaint, 0.6)}>
                    {src.detail}
                  </Mono>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* CLOSER */}
        <View className="items-center px-5 pt-20">
          <View className="mb-5 flex-row items-center gap-2">
            <Heart size={20} color={C.teal} />
            <Stethoscope size={20} color={C.amber} />
          </View>
          <Display className="mb-4 text-center text-4xl">
            Your health. Your pace. Your power.
          </Display>
          <Body className="mb-8 text-center">
            Join youth building real-world readiness — one module, one badge, one decision at a
            time.
          </Body>
          <MetallicButton
            label="BEGIN YOUR JOURNEY"
            onPress={() => router.push('/onboarding')}
            className="w-full"
          />

          <BrandFooter className="mt-12 w-full" />
        </View>
      </ScrollView>

      {(!privacyAcknowledged || returning) && showPrivacy ? (
        <View className="pb-safe-offset-4 absolute right-0 bottom-0 left-0 px-4">
          <Panel tint={C.teal} fill={0.08} stroke={0.25} className="bg-paper-2">
            <View className="flex-row items-start justify-between gap-3">
              <View className="flex-1">
                <Eyebrow color={C.teal} className="mb-1.5">
                  ZERO STIGMA TAX — NO TRACKING
                </Eyebrow>
                <Mono className="text-[12px]">{PRIVACY_NOTE}</Mono>
              </View>
              <GradientAction
                accessibilityLabel="Dismiss privacy notice"
                onPress={() => setShowPrivacy(false)}
                className="h-11 w-11 items-center justify-center rounded-full"
              >
                <X size={16} color={C.paper2} />
              </GradientAction>
            </View>
            <GradientAction
              onPress={() => {
                acknowledgePrivacy();
                setShowPrivacy(false);
              }}
              className="mt-3 self-start rounded-full px-4 py-2"
            >
              <Mono bold color={C.paper2} className="text-[13px]" tracking={1}>
                GOT IT
              </Mono>
            </GradientAction>
          </Panel>
        </View>
      ) : null}
    </View>
  );
}

/** CAPE FLOW wordmark lives in components/cape/Wordmark. */
function PreviewCard({
  title,
  tint,
  children,
}: {
  title: string;
  tint: string;
  children: React.ReactNode;
}) {
  return (
    <View
      className="bg-card overflow-hidden rounded-2xl"
      style={{ borderWidth: 1, borderColor: alpha(tint, 0.15) }}
    >
      <View
        className="px-4 py-3"
        style={{
          backgroundColor: alpha(tint, 0.05),
          borderBottomWidth: 1,
          borderBottomColor: alpha(tint, 0.13),
        }}
      >
        <Eyebrow color={tint}>{title}</Eyebrow>
      </View>
      <View className="p-4">{children}</View>
    </View>
  );
}

function MenuLine({
  label,
  verdict,
  tint,
  chip,
}: {
  label: string;
  verdict: string;
  tint: string;
  chip: string;
}) {
  return (
    <View
      className="flex-row items-center justify-between rounded-lg px-2.5 py-2"
      style={{
        backgroundColor: alpha(tint, 0.08),
        borderWidth: 1,
        borderColor: alpha(tint, 0.2),
      }}
    >
      <Mono color={tint} className="text-[13px]">
        {label}
      </Mono>
      <View
        className="rounded-full px-2 py-0.5"
        style={{
          backgroundColor: alpha(chip, 0.14),
          borderWidth: 1,
          borderColor: alpha(chip, 0.25),
        }}
      >
        <Mono bold color={chip} className="text-[11px]">
          {verdict}
        </Mono>
      </View>
    </View>
  );
}
