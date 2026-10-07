import { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { ExternalLink, Lock, MapPin, Phone, Search, ShieldCheck, X } from 'lucide-react-native';

import { StackHeader } from '@/components/cape/Screen';
import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { Chip } from '@/components/cape/Buttons';
import { BrandFooter } from '@/components/cape/BrandFooter';
import { NotebookBackdrop } from '@/components/cape/NotebookBackdrop';
import { C, alpha } from '@/lib/colors';
import { trackFor } from '@/lib/data/content';
import {
  CLINIC_CONFIDENTIALITY_NOTE,
  CLINIC_COST_NOTE,
  CLINIC_GREEN_LOCK_NOTE,
  CLINIC_SAFETY_NOTE,
  type CareCategory,
  type CareNetwork,
  categoriesForTrack,
  intakeScriptsForTrack,
  locatorUrl,
  lockedNetworkCount,
  searchNetworks,
} from '@/lib/data/clinics';
import { useCapeStore } from '@/lib/store/useCapeStore';

const INPUT_FONT = 'JetBrainsMono_400Regular';

const open = (url: string) => {
  void Linking.openURL(url);
};

export default function ClinicFinder() {
  const gradeBand = useCapeStore((s) => s.gradeBand);
  const track = trackFor(gradeBand);

  const [query, setQuery] = useState('');
  const [zip, setZip] = useState('');
  const [category, setCategory] = useState<CareCategory | null>(null);

  const categories = categoriesForTrack(track);
  const lockedCount = lockedNetworkCount(track);
  const scripts = intakeScriptsForTrack(track);
  const results = useMemo(() => searchNetworks(track, query, category), [track, query, category]);
  const activeCategory = categories.find((c) => c.id === category) ?? null;

  return (
    <View className="bg-paper flex-1">
      <NotebookBackdrop tint={C.tealBright} />
      <StackHeader title="Clinic Finder" tint={C.teal} fallback="/(tabs)/tools" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5 pt-6 pb-16"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Eyebrow color={C.teal}>CARE LOCATOR</Eyebrow>
          <Display className="mt-2 text-4xl">Find the door, then walk in ready.</Display>
          <Body className="mt-3">
            Every card below is an official national finder run by a government agency or a national
            nonprofit. CAPE Flow ships no invented clinic list — a wrong address at 1 a.m. is worse
            than no address.
          </Body>

          <View className="mt-4 flex-row flex-wrap gap-2">
            <Chip label="NO ZIP STORED" tint={C.teal} />
            <Chip label="SLIDING SCALE OPTIONS" tint={C.gold} />
            <Chip label="OPENS IN YOUR BROWSER" tint={C.violet} />
          </View>

          {/* SEARCH */}
          <Panel tint={C.teal} fill={0.05} stroke={0.18} className="mt-6">
            <Eyebrow color={C.teal}>SEARCH</Eyebrow>
            <View
              className="mt-3 flex-row items-center gap-2 rounded-xl px-3"
              style={{
                backgroundColor: C.card,
                borderWidth: 1,
                borderColor: alpha(C.ink, 0.14),
              }}
            >
              <Search size={14} color={alpha(C.inkFaint, 0.7)} />
              <TextInput
                accessibilityLabel="Search care finders"
                value={query}
                onChangeText={setQuery}
                placeholder="free clinic, vaccine, therapy, testing…"
                placeholderTextColor={C.inkFaint}
                className="flex-1 py-3 text-[11px]"
                style={{ color: C.inkSoft, fontFamily: INPUT_FONT }}
              />
              {query.length > 0 ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Clear search"
                  onPress={() => setQuery('')}
                  className="h-11 w-11 items-center justify-center active:opacity-60"
                >
                  <X size={14} color={alpha(C.inkFaint, 0.7)} />
                </Pressable>
              ) : null}
            </View>

            <View className="mt-3 flex-row items-center gap-2">
              <MapPin size={14} color={alpha(C.gold, 0.8)} />
              <View
                className="flex-1 rounded-xl px-3"
                style={{
                  backgroundColor: C.card,
                  borderWidth: 1,
                  borderColor: alpha(C.ink, 0.14),
                }}
              >
                <TextInput
                  accessibilityLabel="ZIP code (optional)"
                  value={zip}
                  onChangeText={(text) => setZip(text.replace(/\D/g, '').slice(0, 5))}
                  placeholder="ZIP code (optional)"
                  placeholderTextColor={C.inkFaint}
                  keyboardType="number-pad"
                  maxLength={5}
                  className="py-3 text-[11px]"
                  style={{ color: C.inkSoft, fontFamily: INPUT_FONT }}
                />
              </View>
            </View>
            <Mono className="mt-2 text-[10px]" color={C.inkFaint}>
              A ZIP is only passed to finders that accept one in their link. It is never saved.
            </Mono>
          </Panel>

          {/* CATEGORIES */}
          <View className="mt-6">
            <Eyebrow color={C.gold}>WHAT DO YOU NEED?</Eyebrow>
            <View className="mt-3 flex-row flex-wrap gap-2">
              {categories.map((cat) => {
                const active = category === cat.id;
                return (
                  <Pressable
                    key={cat.id}
                    accessibilityRole="button"
                    accessibilityLabel={cat.label}
                    accessibilityState={{ selected: active }}
                    onPress={() => setCategory(active ? null : cat.id)}
                    className="min-h-11 flex-row items-center gap-1.5 rounded-full px-3 py-2 active:opacity-70"
                    style={{
                      backgroundColor: alpha(cat.tint, active ? 0.2 : 0.06),
                      borderWidth: 1,
                      borderColor: alpha(cat.tint, active ? 0.5 : 0.16),
                    }}
                  >
                    <Mono className="text-[10px]">{cat.emoji}</Mono>
                    <Mono
                      bold={active}
                      color={active ? cat.tint : C.inkSoft}
                      className="text-[9px]"
                      tracking={1}
                    >
                      {cat.label}
                    </Mono>
                  </Pressable>
                );
              })}
            </View>
            {activeCategory ? (
              <Mono className="mt-3 text-[10px]" color={alpha(activeCategory.tint, 0.85)}>
                {activeCategory.blurb}
              </Mono>
            ) : null}
          </View>

          {/* RESULTS */}
          <View className="mt-6 flex-row items-center justify-between">
            <Eyebrow color={C.teal}>
              {results.length} {results.length === 1 ? 'FINDER' : 'FINDERS'}
            </Eyebrow>
            {query.length > 0 || category ? (
              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  setQuery('');
                  setCategory(null);
                }}
                className="min-h-11 min-w-11 items-center justify-center active:opacity-60"
              >
                <Mono bold color={alpha(C.inkFaint, 0.8)} className="text-[9px]" tracking={1.5}>
                  RESET
                </Mono>
              </Pressable>
            ) : null}
          </View>

          <View className="mt-3 gap-3">
            {results.length === 0 ? (
              <Panel tint={C.inkFaint} fill={0.03} stroke={0.1}>
                <Mono className="text-[10px]">
                  Nothing matched that. Try a plainer word — &quot;free clinic&quot;,
                  &quot;vaccine&quot;, &quot;therapy&quot; — or clear the filters.
                </Mono>
              </Panel>
            ) : null}
            {results.map((network) => (
              <NetworkCard key={network.id} network={network} zip={zip} />
            ))}
          </View>

          {lockedCount > 0 ? (
            <View
              className="mt-4 rounded-2xl p-4"
              style={{
                backgroundColor: alpha(C.lemon, 0.04),
                borderWidth: 1,
                borderColor: alpha(C.lemon, 0.16),
              }}
            >
              <View className="flex-row items-start gap-3">
                <Lock size={16} color={C.lemon} />
                <View className="flex-1">
                  <Mono bold color={C.lemon} className="text-[10px]" tracking={1.5}>
                    {lockedCount} FINDERS ON THE 9–12 TRACK
                  </Mono>
                  <Mono className="mt-1 text-[10px]">{CLINIC_GREEN_LOCK_NOTE}</Mono>
                </View>
              </View>
            </View>
          ) : null}

          {/* INTAKE SCRIPTS */}
          <View className="mt-10">
            <Eyebrow color={C.modC}>FRONT-DESK SCRIPTS</Eyebrow>
            <Display className="mt-2 text-3xl">Kill the Phone Ghost.</Display>
            <Body className="mt-2">
              Say these flat. Nobody on the other end is grading your delivery — they answer these
              calls all day.
            </Body>
            <View className="mt-4 gap-2.5">
              {scripts.map((script) => (
                <Panel key={script.id} tint={C.modC} fill={0.05} stroke={0.16} className="p-3.5">
                  <Mono bold color={C.modC} className="text-[10px]" tracking={1.5}>
                    {script.label}
                  </Mono>
                  <Mono bold className="mt-2 text-[11px]" color={alpha(C.inkSoft, 0.92)}>
                    {script.line}
                  </Mono>
                  <Mono className="mt-2 text-[9px]" color={alpha(C.inkFaint, 0.7)}>
                    {script.when}
                  </Mono>
                </Panel>
              ))}
            </View>
          </View>

          <Panel tint={C.gold} fill={0.05} stroke={0.18} className="mt-8">
            <Eyebrow color={C.gold} className="mb-1.5">
              COST IS A GATE, NOT A WALL
            </Eyebrow>
            <Mono className="text-[10px]">{CLINIC_COST_NOTE}</Mono>
          </Panel>

          <Panel tint={C.azure} fill={0.05} stroke={0.18} className="mt-3">
            <Eyebrow color={C.azure} className="mb-1.5">
              CONFIDENTIALITY — ASK TWO QUESTIONS
            </Eyebrow>
            <Mono className="text-[10px]">{CLINIC_CONFIDENTIALITY_NOTE}</Mono>
          </Panel>

          <Panel tint={C.teal} fill={0.05} stroke={0.18} className="mt-3">
            <View className="flex-row items-start gap-3">
              <ShieldCheck size={16} color={C.teal} />
              <View className="flex-1">
                <Eyebrow color={C.teal} className="mb-1.5">
                  ZERO STIGMA TAX
                </Eyebrow>
                <Mono className="text-[10px]">{CLINIC_SAFETY_NOTE}</Mono>
              </View>
            </View>
          </Panel>

          <BrandFooter className="mt-8" />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function NetworkCard({ network, zip }: { network: CareNetwork; zip: string }) {
  const tint = network.track === 'blue' ? C.flame : C.teal;
  return (
    <View
      className="rounded-2xl p-4"
      style={{
        backgroundColor: alpha(tint, 0.06),
        borderWidth: 1,
        borderColor: alpha(tint, 0.2),
      }}
    >
      <Mono bold color={tint} className="text-[11px]" tracking={1}>
        {network.name}
      </Mono>
      <Mono className="mt-1 text-[9px]" color={alpha(C.inkFaint, 0.7)}>
        {network.operator}
      </Mono>
      <Mono className="mt-2 text-[10px]">{network.detail}</Mono>
      <View className="mt-3 flex-row items-start gap-2">
        <Mono className="text-[10px]">💰</Mono>
        <Mono className="flex-1 text-[9px]" color={alpha(C.gold, 0.85)}>
          {network.cost}
        </Mono>
      </View>
      <View className="mt-3 flex-row gap-2">
        <Pressable
          accessibilityRole="button"
          onPress={() => open(locatorUrl(network, zip))}
          className="flex-1 flex-row items-center justify-center gap-2 rounded-xl py-2.5 active:opacity-70"
          style={{
            backgroundColor: alpha(tint, 0.14),
            borderWidth: 1,
            borderColor: alpha(tint, 0.35),
          }}
        >
          <ExternalLink size={13} color={tint} />
          <Mono bold color={tint} className="text-[10px]" tracking={1.5}>
            OPEN FINDER
          </Mono>
        </Pressable>
        {network.phone ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => open(`tel:${network.phone}`)}
            className="flex-1 flex-row items-center justify-center gap-2 rounded-xl py-2.5 active:opacity-70"
            style={{
              backgroundColor: alpha(C.azure, 0.12),
              borderWidth: 1,
              borderColor: alpha(C.azure, 0.32),
            }}
          >
            <Phone size={13} color={C.azure} />
            <Mono bold color={C.azure} className="text-[10px]" tracking={1.5}>
              CALL
            </Mono>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
