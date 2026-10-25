import { ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { ChevronRight, Eye, FileText, Lock, Stethoscope, Users } from '@/lib/icons';

import { BrandFooter } from '@/components/cape/BrandFooter';
import { TintedRow } from '@/components/cape/Buttons';
import { NotebookBackdrop } from '@/components/cape/NotebookBackdrop';
import { StackHeader } from '@/components/cape/Screen';
import { Body, Display, Eyebrow, Mono } from '@/components/cape/Type';
import { C } from '@/lib/colors';
import {
  LEGAL_CONTACT_EMAIL,
  LEGAL_DOCUMENTS,
  LEGAL_LAST_UPDATED,
  LEGAL_VERSION,
  type LegalIconKey,
} from '@/lib/legal';

const LEGAL_ICONS: Record<LegalIconKey, typeof FileText> = {
  document: FileText,
  lock: Lock,
  stethoscope: Stethoscope,
  users: Users,
  eye: Eye,
};

export default function LegalIndex() {
  return (
    <View className="bg-paper flex-1">
      <NotebookBackdrop tint={C.tealBright} />
      <StackHeader title="Legal & Privacy" tint={C.teal} fallback="/(tabs)/me" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-6 pb-16"
        showsVerticalScrollIndicator={false}
      >
        <Eyebrow color={C.teal}>CAPE FLOW · LEGAL &amp; PRIVACY</Eyebrow>
        <Display className="mt-2 text-4xl">The fine print, in plain words.</Display>
        <Body className="mt-3">
          Tap a document to read it. Each one is written for students and for the parents, guardians
          and schools who support them.
        </Body>

        <View className="mt-6 gap-3">
          {LEGAL_DOCUMENTS.map((doc) => {
            const Icon = LEGAL_ICONS[doc.icon];
            return (
              <TintedRow
                key={doc.id}
                tint={doc.accent}
                fill={0.06}
                stroke={0.2}
                accessibilityLabel={`${doc.title}. ${doc.summary}`}
                onPress={() => router.push({ pathname: '/legal/[doc]', params: { doc: doc.id } })}
              >
                <View className="flex-row items-center gap-3">
                  <Icon size={18} color={doc.accent} />
                  <View className="flex-1">
                    <Mono bold color={doc.accent} className="text-[13px]" tracking={1}>
                      {doc.title.toUpperCase()}
                    </Mono>
                    <Mono className="mt-0.5 text-[12px]">{doc.summary}</Mono>
                  </View>
                  <ChevronRight size={16} color={doc.accent} />
                </View>
              </TintedRow>
            );
          })}
        </View>

        <Mono className="mt-6 text-[12px]" color={C.inkFaint}>
          Legal pack v{LEGAL_VERSION}, last updated {LEGAL_LAST_UPDATED}. These documents describe
          how this app stores and handles data. A review by a licensed attorney is in progress. We
          will post the reviewed version here and update the date above. Also published at
          theharnessproject.org/legal. Questions: {LEGAL_CONTACT_EMAIL}.
        </Mono>

        <BrandFooter className="mt-10" />
      </ScrollView>
    </View>
  );
}
