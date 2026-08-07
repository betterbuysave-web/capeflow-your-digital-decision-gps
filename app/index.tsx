import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, useWindowDimensions, View } from 'react-native';
import { Redirect, router } from 'expo-router';
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
} from 'lucide-react-native';

import { LinearGradient } from '@/components/ui/primitives/LinearGradient';
import { Body, Display, Eyebrow, Mono, Panel, Rail } from '@/components/cape/Type';
import { GhostButton, MetallicButton, TintedRow } from '@/components/cape/Buttons';
import { BrandBanner } from '@/components/cape/BrandBanner';
import { BrandFooter } from '@/components/cape/BrandFooter';
import { MatchCompass } from '@/components/cape/MatchCompass';
import { C, alpha } from '@/lib/colors';
import { MATCH_MODULES } from '@/lib/data/match';
import { DISCLAIMER, PARENT_CARDS, PRIVACY_NOTE, PROBLEM_STATS, SOURCES } from '@/lib/data/content';
import { SAMPLE_SCENARIO } from '@/lib/data/scenarios';
import { useCapeStore } from '@/lib/store/useCapeStore';

const HERO = require('@/assets/images/hero-bg.png');

export default function Landing() {
  const onboarded = useCapeStore((s) => s.onboarded);
  const privacyAcknowledged = useCapeStore((s) => s.privacyAcknowledged);
  const acknowledgePrivacy = useCapeStore((s) => s.acknowledgePrivacy);
  const registerVisit = useCapeStore((s) => s.registerVisit);
  const { width } = useWindowDimensions();
  const [showPrivacy, setShowPrivacy] = useState(true);

  useEffect(() => {
    if (onboarded) registerVisit();
  }, [onboarded, registerVisit]);

  if (onboarded) return <Redirect href="/(tabs)" />;

  const heroHeight = 620;

  return (
    <View className="bg-ink flex-1">
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-24"
        showsVerticalScrollIndicator={false}
      >
        {/* HERO */}
        <View
          style={{ height: heroHeight }}
          className="items-center justify-center overflow-hidden"
        >
          <Image
            source={HERO}
            resizeMode="cover"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width,
              height: heroHeight,
              opacity: 0.45,
            }}
          />
          <LinearGradient
            colors={[alpha(C.ink, 0.6), alpha(C.ink, 0.9), C.ink]}
            locations={[0, 0.7, 1]}
            style={{ position: 'absolute', top: 0, left: 0, width, height: heroHeight }}
          />

          <View className="w-full items-center px-6">
            <View
              className="mb-6 flex-row items-center gap-2 rounded-full px-4 py-1.5"
              style={{
                backgroundColor: alpha(C.teal, 0.08),
                borderWidth: 1,
                borderColor: alpha(C.teal, 0.25),
              }}
            >
              <Shield size={13} color={C.teal} />
              <Eyebrow color={C.teal}>THE HARNESS PROJECT</Eyebrow>
            </View>

            <BrandBanner className="w-full" />

            <Body className="mt-6 text-center" color={alpha(C.slateSoft, 0.8)}>
              A gamified health &amp; safety compass for youth. Turn anxiety into agency with the{' '}
              <Body color={C.teal}>M.A.T.C.H. framework</Body> — five modules that build real-world
              readiness, one decision at a time.
            </Body>

            <View className="mt-8 w-full gap-3">
              <MetallicButton label="GET STARTED" onPress={() => router.push('/onboarding')} />
              <GhostButton label="TRY A SAMPLE" onPress={() => router.push('/sample')} />
            </View>

            <Mono className="mt-6 text-[9px]" color={alpha(C.slateFaint, 0.5)} tracking={2}>
              FREE · NO SIGN-UP NEEDED · GRADES 4–12
            </Mono>
          </View>
        </View>

        {/* THE PROBLEM */}
        <View className="px-5 pt-14">
          <View className="items-center">
            <Eyebrow color={C.flame} className="mb-3">
              THE PROBLEM
            </Eyebrow>
            <Display className="text-center text-4xl">
              Youth face high-stakes health decisions with no compass.
            </Display>
            <Body className="mt-4 text-center">
              Anxiety, pressure, and misinformation fill the gap where preparation should be. Most
              young people learn about consent, STIs, and crisis response after they needed to. CAPE
              FLOW flips that script.
            </Body>
          </View>

          <View className="mt-8 flex-row flex-wrap gap-3">
            {PROBLEM_STATS.map((stat) => (
              <Panel key={stat.value} tint={C.flame} className="flex-1 basis-[45%]">
                <Display color={C.flame} className="text-3xl">
                  {stat.value}
                </Display>
                <Mono className="mt-1.5 text-[10px]">{stat.detail}</Mono>
                <Mono className="mt-1.5 text-[8px]" color={alpha(C.slateFaint, 0.5)}>
                  {stat.source}
                </Mono>
              </Panel>
            ))}
          </View>
        </View>

        {/* FRAMEWORK */}
        <View className="px-5 pt-16">
          <View className="items-center">
            <Eyebrow color={C.teal} className="mb-3">
              THE FRAMEWORK
            </Eyebrow>
            <Display className="text-center text-4xl">What does M.A.T.C.H. stand for?</Display>
            <Body className="mt-4 text-center">
              Five modules. One compass. Each builds a layer of real-world readiness — from medical
              knowledge to communication skills to daily habits.
            </Body>
          </View>

          <View className="mt-8">
            <MatchCompass band={null} preview />
          </View>

          <View className="mt-8 gap-3">
            {MATCH_MODULES.map((mod) => (
              <Panel key={mod.id} tint={mod.color} fill={0.04} stroke={0.15}>
                <View className="flex-row items-start gap-4">
                  <View
                    className="h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: alpha(mod.color, 0.1),
                      borderWidth: 1,
                      borderColor: alpha(mod.color, 0.25),
                    }}
                  >
                    <Display color={mod.color} className="text-2xl">
                      {mod.letter}
                    </Display>
                  </View>
                  <View className="flex-1">
                    <View className="mb-1 flex-row items-center gap-2">
                      <Mono className="text-base">{mod.emoji}</Mono>
                      <Mono bold color={mod.color} className="text-[12px]">
                        {mod.name}
                      </Mono>
                    </View>
                    <Mono className="text-[10px]">{mod.tagline}</Mono>
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
              <Mono className="mt-3 text-[9px]" color={alpha(C.slateSoft, 0.55)}>
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
                  <Mono bold color={C.flame} className="text-[9px]">
                    🆘 988 — CRISIS LIFELINE
                  </Mono>
                  <Mono className="mt-0.5 text-[8px]" color={alpha('#ff9682', 0.7)}>
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
                  <Mono bold color={C.flame} className="text-[9px]">
                    💊 PEP CLOCK · 71:23:45
                  </Mono>
                  <Mono className="mt-0.5 text-[8px]" color={alpha('#ff9682', 0.7)}>
                    Within 72-hour window
                  </Mono>
                </View>
              </View>
              <Mono className="mt-3 text-[9px]" color={alpha(C.slateSoft, 0.55)}>
                24/7 direct-dial and text lines for the moments that can&apos;t wait. PEP clock
                included.
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
                  <Mono color={C.teal} className="text-[9px]">
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
              <Mono className="mt-3 text-[9px]" color={alpha(C.slateSoft, 0.55)}>
                Five modules. XP, badges, and a SafER score that grows with every visit.
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
              <Mono className="text-[10px]" color={alpha(C.slateFaint, 0.7)}>
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
                <Mono className="text-[12px]" color={alpha(C.slateSoft, 0.9)}>
                  {SAMPLE_SCENARIO.message}
                </Mono>
                <Mono className="mt-1.5 text-right text-[8px]" color={alpha(C.slateFaint, 0.5)}>
                  {SAMPLE_SCENARIO.bubbleTime}
                </Mono>
              </View>
            </View>
            <View className="flex-row items-center justify-between px-5 pb-5">
              <Mono className="text-[9px]" color={alpha(C.slateFaint, 0.6)} tracking={2}>
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
                <Mono className="mt-0.5 text-[9px]" color={alpha(C.slateFaint, 0.6)}>
                  Full curriculum transparency — no surprises
                </Mono>
              </View>
            </View>
            <View className="px-5 py-5">
              <Mono className="mb-5 text-[10px]">
                CAPE FLOW is built on trust. Parents and educators have full visibility into every
                piece of content students see. The Parent &amp; School Dashboard includes curriculum
                overviews, facilitation approach, parent rights, COPPA/FERPA compliance details, and
                printable family activities.
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
                    <Mono bold color={card.tint} className="text-[10px]">
                      {card.title}
                    </Mono>
                    <Mono className="mt-0.5 text-[8px]" color={alpha(C.slateFaint, 0.6)}>
                      {card.detail}
                    </Mono>
                  </Panel>
                ))}
              </View>
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push('/parents')}
                className="flex-row items-center justify-center gap-2 rounded-xl px-5 py-3 active:opacity-70"
                style={{
                  backgroundColor: alpha(C.gold, 0.1),
                  borderWidth: 1,
                  borderColor: alpha(C.gold, 0.4),
                }}
              >
                <Mono bold color={C.goldLight} className="text-[10px]" tracking={1.5}>
                  VIEW PARENT &amp; SCHOOL DASHBOARD
                </Mono>
                <ArrowRight size={14} color={C.goldLight} />
              </Pressable>
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
                <Mono className="text-[10px]">{DISCLAIMER}</Mono>
              </View>
            </View>
          </Panel>
        </View>

        {/* SOURCES */}
        <View className="px-5 pt-12">
          <View className="items-center">
            <View className="mb-3 flex-row items-center gap-2">
              <BookOpen size={16} color={alpha(C.slateFaint, 0.7)} />
              <Eyebrow color={alpha(C.slateFaint, 0.7)}>SOURCES &amp; REFERENCES</Eyebrow>
            </View>
            <Mono className="text-center text-[10px]" color={alpha(C.slateFaint, 0.6)}>
              All recommendations are grounded in peer-reviewed research and public health
              guidelines.
            </Mono>
          </View>
          <View className="mt-6 gap-2.5">
            {SOURCES.map((src) => (
              <View
                key={src.name}
                className="flex-row items-start gap-2.5 rounded-xl p-3"
                style={{
                  backgroundColor: alpha('#ffffff', 0.02),
                  borderWidth: 1,
                  borderColor: alpha('#ffffff', 0.06),
                }}
              >
                <CircleCheck size={14} color={alpha(C.teal, 0.6)} />
                <View className="flex-1">
                  <Mono bold className="text-[10px]" color={alpha(C.slateSoft, 0.85)}>
                    {src.name}
                  </Mono>
                  <Mono className="mt-0.5 text-[9px]" color={alpha(C.slateFaint, 0.6)}>
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

      {!privacyAcknowledged && showPrivacy ? (
        <View className="pb-safe-offset-4 absolute right-0 bottom-0 left-0 px-4">
          <Panel tint={C.teal} fill={0.08} stroke={0.25} className="bg-ink-2">
            <View className="flex-row items-start justify-between gap-3">
              <View className="flex-1">
                <Eyebrow color={C.teal} className="mb-1.5">
                  ZERO STIGMA TAX — NO TRACKING
                </Eyebrow>
                <Mono className="text-[9px]">{PRIVACY_NOTE}</Mono>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Dismiss privacy notice"
                onPress={() => setShowPrivacy(false)}
                className="active:opacity-60"
              >
                <X size={16} color={alpha(C.slateFaint, 0.7)} />
              </Pressable>
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                acknowledgePrivacy();
                setShowPrivacy(false);
              }}
              className="mt-3 self-start rounded-full px-4 py-2 active:opacity-70"
              style={{
                backgroundColor: alpha(C.teal, 0.14),
                borderWidth: 1,
                borderColor: alpha(C.teal, 0.3),
              }}
            >
              <Mono bold color={C.teal} className="text-[10px]" tracking={2}>
                GOT IT
              </Mono>
            </Pressable>
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
      <Mono color={tint} className="text-[10px]">
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
        <Mono bold color={chip} className="text-[8px]">
          {verdict}
        </Mono>
      </View>
    </View>
  );
}
