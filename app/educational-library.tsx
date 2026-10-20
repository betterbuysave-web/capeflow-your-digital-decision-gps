import { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { BookOpen, ChevronDown, Search, X } from '@/lib/icons';

import { StackHeader } from '@/components/cape/Screen';
import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { Chip, GradientAction } from '@/components/cape/Buttons';
import { BrandFooter } from '@/components/cape/BrandFooter';
import { NotebookBackdrop } from '@/components/cape/NotebookBackdrop';
import { C, alpha } from '@/lib/colors';
import { trackFor } from '@/lib/data/content';
import {
  LIBRARY_INTRO,
  type LibraryCategory,
  type LibraryEntry,
  categoriesForLibraryTrack,
  libraryCategoryInfo,
  searchLibrary,
} from '@/lib/data/library';
import { useCapeStore } from '@/lib/store/useCapeStore';

const INPUT_FONT = 'JetBrainsMono_400Regular';

export default function EducationalLibrary() {
  const gradeBand = useCapeStore((s) => s.gradeBand);
  const track = trackFor(gradeBand);

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<LibraryCategory | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const categories = categoriesForLibraryTrack(track);
  const results = useMemo(() => searchLibrary(track, query, category), [track, query, category]);

  const grouped = useMemo(() => {
    return categories
      .map((cat) => ({ cat, entries: results.filter((e) => e.category === cat.id) }))
      .filter((group) => group.entries.length > 0);
  }, [categories, results]);

  return (
    <View className="bg-paper flex-1">
      <NotebookBackdrop tint={C.goldBright} />
      <StackHeader title="Educational Library" tint={C.gold} fallback="/(tabs)/learn" />
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
          <Eyebrow color={C.gold}>GLOSSARY &amp; CLINICAL TOPICS</Eyebrow>
          <Display className="mt-2 text-4xl">Look it up before you need it.</Display>
          <Body className="mt-3">{LIBRARY_INTRO}</Body>

          <View className="mt-4 flex-row flex-wrap gap-2">
            <Chip label={`${results.length} ENTRIES`} tint={C.gold} />
            <Chip label="EVIDENCE + REAL TALK" tint={C.teal} />
            <Chip label="NOTHING LOGGED" tint={C.violet} />
          </View>

          <View
            className="mt-6 flex-row items-center gap-2 rounded-xl px-3"
            style={{
              backgroundColor: C.card,
              borderWidth: 1,
              borderColor: alpha(C.ink, 0.14),
            }}
          >
            <Search size={14} color={alpha(C.inkFaint, 0.7)} />
            <TextInput
              accessibilityLabel="Search educational library"
              value={query}
              onChangeText={setQuery}
              placeholder="search a word or a worry…"
              placeholderTextColor={C.inkFaint}
              className="flex-1 py-3 text-[13px]"
              style={{ color: C.inkSoft, fontFamily: INPUT_FONT }}
            />
            {query.length > 0 ? (
              <GradientAction
                accessibilityLabel="Clear search"
                onPress={() => setQuery('')}
                className="h-11 w-11 items-center justify-center rounded-full"
              >
                <X size={14} color={C.paper2} />
              </GradientAction>
            ) : null}
          </View>

          <View className="mt-4 flex-row flex-wrap gap-2">
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
                  <Mono className="text-[13px]">{cat.emoji}</Mono>
                  <Mono
                    bold={active}
                    color={active ? cat.tint : C.inkSoft}
                    className="text-[12px]"
                    tracking={1}
                  >
                    {cat.label}
                  </Mono>
                </Pressable>
              );
            })}
          </View>

          {grouped.length === 0 ? (
            <Panel tint={C.inkFaint} fill={0.03} stroke={0.1} className="mt-6">
              <Mono className="text-[13px]">
                No entry matched that. Try a shorter word, or clear the category filter.
              </Mono>
            </Panel>
          ) : null}

          {grouped.map((group) => (
            <View key={group.cat.id} className="mt-8">
              <View className="flex-row items-center gap-2">
                <Mono className="text-base">{group.cat.emoji}</Mono>
                <Eyebrow color={group.cat.tint}>{group.cat.label}</Eyebrow>
              </View>
              <Mono className="mt-2 text-[13px]" color={alpha(C.inkFaint, 0.75)}>
                {group.cat.blurb}
              </Mono>
              <View className="mt-3 gap-2.5">
                {group.entries.map((entry) => (
                  <EntryCard
                    key={entry.id}
                    entry={entry}
                    open={openId === entry.id}
                    onToggle={() => setOpenId(openId === entry.id ? null : entry.id)}
                  />
                ))}
              </View>
            </View>
          ))}

          <Panel tint={C.teal} fill={0.05} stroke={0.18} className="mt-6">
            <View className="flex-row items-start gap-3">
              <BookOpen size={16} color={C.teal} />
              <View className="flex-1">
                <Eyebrow color={C.teal} className="mb-1.5">
                  HOW TO READ THIS
                </Eyebrow>
                <Mono className="text-[13px]">
                  Every entry names its source so you can check it, and closes with the real-talk
                  line — the version you would actually say out loud. Neither one is a substitute
                  for a clinician who can examine you.
                </Mono>
              </View>
            </View>
          </Panel>

          <BrandFooter className="mt-8" />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function EntryCard({
  entry,
  open,
  onToggle,
}: {
  entry: LibraryEntry;
  open: boolean;
  onToggle: () => void;
}) {
  const tint = libraryCategoryInfo(entry.category).tint;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onToggle}
      className="rounded-2xl p-4 active:opacity-80"
      style={{
        backgroundColor: alpha(tint, open ? 0.09 : 0.045),
        borderWidth: 1,
        borderColor: alpha(tint, open ? 0.3 : 0.14),
      }}
    >
      <View className="flex-row items-start gap-3">
        <View className="flex-1">
          <Mono bold color={tint} className="text-[13px]" tracking={1}>
            {entry.term.toUpperCase()}
          </Mono>
          <Mono className="mt-1 text-[13px]">{entry.short}</Mono>
        </View>
        <View style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}>
          <ChevronDown size={15} color={alpha(tint, 0.8)} />
        </View>
      </View>

      {open ? (
        <View className="mt-3 gap-2">
          {entry.body.map((line) => (
            <View key={line} className="flex-row gap-2">
              <Mono color={alpha(tint, 0.7)} className="text-[13px]">
                ▸
              </Mono>
              <Mono className="flex-1 text-[13px]">{line}</Mono>
            </View>
          ))}

          <View
            className="mt-1 rounded-xl p-3"
            style={{
              backgroundColor: alpha(C.teal, 0.07),
              borderLeftWidth: 2,
              borderLeftColor: alpha(C.teal, 0.5),
            }}
          >
            <Mono bold color={alpha(C.teal, 0.9)} className="text-[12px]" tracking={1.5}>
              REAL TALK
            </Mono>
            <Mono className="mt-1 text-[13px]" color={alpha(C.inkSoft, 0.9)}>
              {entry.realTalk}
            </Mono>
          </View>

          <Mono className="mt-1 text-[12px]" color={alpha(C.inkFaint, 0.6)}>
            SOURCE · {entry.source}
          </Mono>
        </View>
      ) : null}
    </Pressable>
  );
}
