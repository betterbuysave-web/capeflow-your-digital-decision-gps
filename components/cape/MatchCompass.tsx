import { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight, Lock, X } from 'lucide-react-native';

import { Body, Display, Eyebrow, Mono, Rail } from '@/components/cape/Type';
import { Chip, MetallicButton } from '@/components/cape/Buttons';
import { C, alpha } from '@/lib/colors';
import { COMPASS_NODES, type CompassNode, nodeBullets } from '@/lib/data/compass';
import { TRACKS, type GradeBand, trackFor } from '@/lib/data/content';
import { moduleProgress, useCapeStore } from '@/lib/store/useCapeStore';

const COMPASS_ART = require('@/assets/images/match-compass.png');
const ART_ASPECT = 1376 / 784;

/**
 * The M.A.T.C.H. Compass: the calibration artwork with every printed letter
 * box tappable. Briefing content follows the reader's track.
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

  const [artWidth, setArtWidth] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);
  const active = COMPASS_NODES.find((n) => n.id === openId) ?? null;

  const artHeight = artWidth > 0 ? Math.round(artWidth / ART_ASPECT) : 0;

  return (
    <View>
      {preview ? (
        <View className="flex-row flex-wrap items-center gap-2">
          <Chip label="TIERED TRACKS · GRADES 4–12" tint={C.teal} />
        </View>
      ) : (
        <View>
          <View className="flex-row flex-wrap items-center gap-2">
            <Chip label={trackInfo.label} tint={trackInfo.tint} />
            {activeBand ? <Chip label={`GRADES ${activeBand}`} tint={C.gold} /> : null}
          </View>
          <Mono className="mt-2 text-[9px]" color={alpha(C.slateFaint, 0.7)}>
            {trackInfo.scope}
          </Mono>
        </View>
      )}

      <View
        className="mt-3 overflow-hidden rounded-2xl"
        style={{
          borderWidth: 1,
          borderColor: alpha(C.teal, 0.22),
          backgroundColor: alpha(C.teal, 0.04),
          shadowColor: C.teal,
          shadowOpacity: 0.25,
          shadowRadius: 20,
        }}
        onLayout={(e) => setArtWidth(e.nativeEvent.layout.width)}
      >
        {artHeight > 0 ? (
          <View style={{ width: artWidth, height: artHeight }}>
            <Image
              source={COMPASS_ART}
              resizeMode="contain"
              style={{ width: artWidth, height: artHeight }}
            />
            {COMPASS_NODES.map((node) => (
              <Pressable
                key={node.id}
                accessibilityRole="button"
                accessibilityLabel={`${node.letter} — ${node.title}`}
                onPress={() => setOpenId(node.id)}
                className="absolute rounded-lg active:opacity-100"
                style={{
                  left: node.hotspot.left,
                  top: node.hotspot.top,
                  width: node.hotspot.width,
                  height: node.hotspot.height,
                  borderWidth: 1,
                  borderColor: alpha(node.color, 0.45),
                  backgroundColor: alpha(node.color, 0.06),
                }}
              />
            ))}
          </View>
        ) : null}
      </View>

      <Mono className="mt-2.5 text-[9px]" color={alpha(C.slateFaint, 0.7)} tracking={2}>
        TAP ANY NODE FOR THE BRIEFING
      </Mono>

      <View className="mt-3 flex-row gap-2">
        {COMPASS_NODES.map((node) => {
          const progress = moduleProgress(node.id, completedLessons, track);
          return (
            <Pressable
              key={node.id}
              accessibilityRole="button"
              accessibilityLabel={`${node.letter} — ${node.callsign}`}
              onPress={() => setOpenId(node.id)}
              className="flex-1 items-center rounded-xl py-2.5 active:opacity-70"
              style={{
                backgroundColor: alpha(node.color, 0.1),
                borderWidth: 1,
                borderColor: alpha(node.color, 0.3),
              }}
            >
              <Display color={node.color} className="text-xl">
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
  return (
    <Modal
      visible={node !== null}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close briefing"
        onPress={onClose}
        className="flex-1 justify-end"
        style={{ backgroundColor: alpha('#000000', 0.78) }}
      >
        {node ? (
          <Pressable
            accessibilityRole="none"
            onPress={() => undefined}
            className="bg-ink-2 max-h-[86%] overflow-hidden rounded-t-3xl"
            style={{ borderTopWidth: 1, borderTopColor: alpha(node.color, 0.4) }}
          >
            <View
              className="flex-row items-start gap-3 px-5 pt-5 pb-4"
              style={{
                backgroundColor: alpha(node.color, 0.09),
                borderBottomWidth: 1,
                borderBottomColor: alpha(node.color, 0.2),
              }}
            >
              <View
                className="h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: alpha(node.color, 0.14),
                  borderWidth: 1,
                  borderColor: alpha(node.color, 0.35),
                }}
              >
                <Display color={node.color} className="text-2xl">
                  {node.letter}
                </Display>
              </View>
              <View className="flex-1">
                <Eyebrow color={node.color}>{node.callsign.toUpperCase()}</Eyebrow>
                <Display className="mt-1 text-2xl">{node.title}</Display>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close"
                onPress={onClose}
                className="active:opacity-60"
              >
                <X size={18} color={alpha(C.slateFaint, 0.8)} />
              </Pressable>
            </View>

            <ScrollView
              contentContainerClassName="px-5 pt-4 pb-8"
              showsVerticalScrollIndicator={false}
            >
              <Mono className="text-[10px]" color={alpha(C.slateFaint, 0.8)}>
                {node.hint}
              </Mono>

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
                    backgroundColor: alpha(C.lemon, 0.06),
                    borderWidth: 1,
                    borderColor: alpha(C.lemon, 0.22),
                  }}
                >
                  <Lock size={14} color={C.lemon} />
                  <Mono className="flex-1 text-[10px]">{node.lockNote}</Mono>
                </View>
              ) : null}

              {preview ? null : (
                <View className="mt-6">
                  <View className="mb-2 flex-row items-center justify-between">
                    <Mono bold color={node.color} className="text-[10px]" tracking={1.5}>
                      MODULE PROGRESS
                    </Mono>
                    <Mono className="text-[9px]" color={alpha(C.slateFaint, 0.7)}>
                      {moduleProgress(node.id, completedLessons, track)}%
                    </Mono>
                  </View>
                  <Rail
                    value={moduleProgress(node.id, completedLessons, track)}
                    color={node.color}
                  />
                </View>
              )}

              <MetallicButton
                label={preview ? 'PICK YOUR TRACK' : 'OPEN THIS MODULE'}
                className="mt-6"
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
                onPress={onClose}
                className="mt-3 flex-row items-center justify-center gap-2 py-3 active:opacity-60"
              >
                <Mono bold color={alpha(C.slateFaint, 0.8)} tracking={2} className="text-[11px]">
                  BACK TO THE COMPASS
                </Mono>
                <ArrowRight size={14} color={alpha(C.slateFaint, 0.8)} />
              </Pressable>
            </ScrollView>
          </Pressable>
        ) : null}
      </Pressable>
    </Modal>
  );
}
