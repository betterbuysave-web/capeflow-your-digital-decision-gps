import { useRef, useState } from 'react';
import {
  AccessibilityInfo,
  findNodeHandle,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { ArrowRight, Lock, X } from 'lucide-react-native';

import { Body, Display, Eyebrow, Mono, Rail } from '@/components/cape/Type';
import { Chip, GradientAction, MetallicButton } from '@/components/cape/Buttons';
import { CompassRose } from '@/components/cape/CompassRose';
import { C, alpha, wash } from '@/lib/colors';
import { COMPASS_NODES, type CompassNode, nodeBullets } from '@/lib/data/compass';
import { TRACKS, type GradeBand, trackFor } from '@/lib/data/content';
import { moduleProgress, useCapeStore } from '@/lib/store/useCapeStore';

/**
 * The M.A.T.C.H. Compass: supplied compass artwork with tappable node markers.
 * Briefing content follows the reader's track.
 */
export function MatchCompass({
  band,
  preview = false,
}: {
  band?: GradeBand | null;
  preview?: boolean;
}) {
  const storedBand = useCapeStore((s) => s.gradeBand);
  const completedLessons = useCapeStore((s) => s.completedLessons);
  const activeBand = band === undefined ? storedBand : band;
  const track = trackFor(activeBand);
  const trackInfo = TRACKS[track];

  const [openId, setOpenId] = useState<string | null>(null);
  const [titleWidth, setTitleWidth] = useState(0);
  const active = COMPASS_NODES.find((n) => n.id === openId) ?? null;
  const briefingHint = preview
    ? 'Opens the module briefing. Choose your track to start learning.'
    : `Opens the ${track === 'green' ? 'Green' : 'Blue'} track module briefing.`;
  const selectNode = (id: CompassNode['id']) => {
    if (id !== openId) void Haptics.selectionAsync();
    setOpenId(id);
  };

  return (
    <View onLayout={({ nativeEvent }) => setTitleWidth(nativeEvent.layout.width)}>
      <Image
        source={require('@/assets/images/match-compass-title.png')}
        accessible
        accessibilityRole="image"
        accessibilityLabel="M.A.T.C.H. Compass title logo, with five colored letter badges and a gold compass on a red cape"
        resizeMode="contain"
        style={{ width: '100%', height: (titleWidth * 9) / 16, marginBottom: 12 }}
      />
      {preview ? (
        <View className="flex-row flex-wrap items-center gap-2">
          <Chip label="TWO TRACKS · GRADES 6–12" tint={C.teal} />
        </View>
      ) : (
        <View>
          <View className="flex-row flex-wrap items-center gap-2">
            <Chip label={trackInfo.label} tint={trackInfo.tint} />
            {activeBand ? <Chip label={`GRADES ${activeBand}`} tint={C.gold} /> : null}
          </View>
          <Mono className="mt-2 text-[9px]">{trackInfo.scope}</Mono>
        </View>
      )}

      {/* Figure plate: the rose sits on its own sheet of card stock. */}
      <View
        className="mt-3 overflow-hidden rounded-2xl"
        style={{
          backgroundColor: C.card,
          borderWidth: 1,
          borderColor: alpha(C.tealBright, 0.4),
          shadowColor: C.ink,
          shadowOpacity: 0.06,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 3 },
        }}
      >
        <View
          className="px-4 py-2"
          style={{ borderBottomWidth: 1, borderBottomColor: alpha(C.tealBright, 0.22) }}
        >
          <Mono bold className="text-[8px]" color={C.inkFaint} tracking={2}>
            FIG. 01 — 5 DECISION GPS SUPERPOWERS
          </Mono>
        </View>
        <View className="px-1 py-1">
          <CompassRose
            nodes={COMPASS_NODES}
            onSelect={selectNode}
            selectedId={openId}
            briefingHint={briefingHint}
          />
        </View>
      </View>

      <Mono className="mt-2.5 text-[9px]" tracking={2}>
        TAP A PILLAR OR A LETTER FOR THE BRIEFING
      </Mono>

      <View className="mt-3 flex-row gap-2">
        {COMPASS_NODES.map((node) => {
          const progress = moduleProgress(node.id, completedLessons, track);
          return (
            <Pressable
              key={node.id}
              accessibilityRole="button"
              accessibilityLabel={`${node.letter}, ${node.callsign}. ${node.title}${preview ? '' : `. ${progress} percent complete`}`}
              accessibilityHint={briefingHint}
              accessibilityState={{ selected: openId === node.id }}
              onPress={() => selectNode(node.id)}
              className="flex-1 items-center rounded-xl py-2.5 active:opacity-70"
              style={{
                minWidth: 44,
                minHeight: 48,
                backgroundColor: wash(node.color, 0.13),
                borderWidth: 1,
                borderColor: node.color,
              }}
            >
              <Display color={C.ink} className="text-xl">
                {node.letter}
              </Display>
              {preview ? null : (
                <View className="mt-1.5 w-8">
                  <Rail value={progress} color={node.color} height={3} />
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      <NodeBriefing
        node={active}
        track={track}
        preview={preview}
        completedLessons={completedLessons}
        onClose={() => setOpenId(null)}
      />
    </View>
  );
}

function NodeBriefing({
  node,
  track,
  preview,
  completedLessons,
  onClose,
}: {
  node: CompassNode | null;
  track: 'green' | 'blue';
  preview: boolean;
  completedLessons: string[];
  onClose: () => void;
}) {
  const { height } = useWindowDimensions();
  const headingRef = useRef<View>(null);

  return (
    <Modal
      visible={node !== null}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      onShow={() => {
        if (Platform.OS !== 'web' && headingRef.current) {
          const heading = findNodeHandle(headingRef.current);
          if (heading !== null) AccessibilityInfo.setAccessibilityFocus(heading);
        }
      }}
      statusBarTranslucent
    >
      <View className="flex-1 justify-end">
        <Pressable
          accessible={false}
          focusable={false}
          importantForAccessibility="no"
          onPress={onClose}
          className="absolute inset-0"
          style={{ backgroundColor: alpha(C.ink, 0.45) }}
        />
        {node ? (
          <View
            accessibilityViewIsModal
            className="bg-paper-2 overflow-hidden rounded-t-3xl"
            style={{
              maxHeight: height * 0.9,
              borderTopWidth: 2,
              borderTopColor: alpha(node.color, 0.7),
            }}
          >
            <View
              className="flex-row items-start gap-3 px-5 pt-5 pb-4"
              style={{
                backgroundColor: wash(node.color, 0.12, C.paper2),
                borderBottomWidth: 1,
                borderBottomColor: alpha(node.color, 0.35),
              }}
            >
              <View
                className="h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: wash(node.color, 0.18),
                  borderWidth: 1,
                  borderColor: alpha(node.color, 0.5),
                }}
              >
                <Display color={C.ink} className="text-2xl">
                  {node.letter}
                </Display>
              </View>
              <View
                ref={headingRef}
                accessible
                accessibilityRole="header"
                accessibilityLabel={`${node.callsign}. ${node.title}`}
                className="flex-1"
              >
                <Eyebrow color={C.inkSoft}>{node.callsign.toUpperCase()}</Eyebrow>
                <Display className="mt-1 text-2xl">{node.title}</Display>
              </View>
              <GradientAction
                accessibilityLabel="Close briefing"
                onPress={onClose}
                className="h-12 w-12 shrink-0 items-center justify-center rounded-full"
              >
                <X size={18} color={C.paper2} />
              </GradientAction>
            </View>

            <ScrollView
              style={{ maxHeight: height * 0.45, flexShrink: 1 }}
              contentContainerClassName="px-5 pt-4 pb-5"
              showsVerticalScrollIndicator={false}
            >
              <Mono className="text-[10px]">{node.hint}</Mono>

              <View className="mt-4 gap-2.5">
                {nodeBullets(node, track).map((point) => (
                  <View key={point} className="flex-row items-start gap-2.5">
                    <View
                      className="mt-1.5 h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: node.color }}
                    />
                    <Body className="flex-1 text-[13px]">{point}</Body>
                  </View>
                ))}
              </View>

              {track === 'green' && node.lockNote ? (
                <View
                  className="mt-5 flex-row items-start gap-2.5 rounded-2xl p-3.5"
                  style={{
                    backgroundColor: wash(C.lemon, 0.12),
                    borderWidth: 1,
                    borderColor: alpha(C.lemon, 0.45),
                  }}
                >
                  <Lock size={14} color={C.lemon} />
                  <Mono className="flex-1 text-[10px]">{node.lockNote}</Mono>
                </View>
              ) : null}

              {preview ? null : (
                <View className="mt-6">
                  <View className="mb-2 flex-row items-center justify-between">
                    <Mono bold color={C.inkSoft} className="text-[10px]" tracking={1.5}>
                      MODULE PROGRESS
                    </Mono>
                    <Mono className="text-[9px]">
                      {moduleProgress(node.id, completedLessons, track)}%
                    </Mono>
                  </View>
                  <Rail
                    value={moduleProgress(node.id, completedLessons, track)}
                    color={node.color}
                  />
                </View>
              )}
            </ScrollView>

            <View className="pb-safe-or-5 px-5 pt-3">
              <MetallicButton
                label={preview ? 'PICK YOUR TRACK' : 'OPEN THIS MODULE'}
                onPress={() => {
                  onClose();
                  if (preview) {
                    router.push('/onboarding');
                    return;
                  }
                  router.push({ pathname: '/module/[id]', params: { id: node.id } });
                }}
              />

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Back to the compass"
                onPress={onClose}
                className="mt-3 min-h-12 flex-row items-center justify-center gap-2 py-3 active:opacity-60"
              >
                <Mono bold color={C.inkSoft} tracking={2} className="text-[11px]">
                  BACK TO THE COMPASS
                </Mono>
                <ArrowRight size={14} color={C.inkSoft} />
              </Pressable>
            </View>
          </View>
        ) : null}
      </View>
    </Modal>
  );
}
