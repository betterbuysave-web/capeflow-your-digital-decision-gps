import { ScrollView, View } from 'react-native';
import { Redirect, useLocalSearchParams } from 'expo-router';

import { BrandFooter } from '@/components/cape/BrandFooter';
import { NotebookBackdrop } from '@/components/cape/NotebookBackdrop';
import { StackHeader } from '@/components/cape/Screen';
import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { C } from '@/lib/colors';
import { LEGAL_LAST_UPDATED, LEGAL_VERSION, getLegalDocument } from '@/lib/legal';

export default function LegalDocumentScreen() {
  const { doc: docId } = useLocalSearchParams<{ doc?: string }>();
  const doc = getLegalDocument(docId);

  if (!doc) return <Redirect href="/legal" />;

  return (
    <View className="bg-paper flex-1">
      <NotebookBackdrop tint={doc.accent} />
      <StackHeader title={doc.title} tint={doc.accent} fallback="/legal" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-6 pb-16"
        showsVerticalScrollIndicator={false}
      >
        <Eyebrow color={doc.accent}>CAPE FLOW</Eyebrow>
        <Display className="mt-2 text-4xl">{doc.title}</Display>
        <Mono className="mt-2 text-[12px]" color={C.inkFaint}>
          Version {LEGAL_VERSION} · Last updated {LEGAL_LAST_UPDATED}
        </Mono>
        <Body className="mt-4">{doc.intro}</Body>

        <View className="mt-6 gap-3">
          {doc.sections.map((section) => (
            <Panel key={section.heading} tint={doc.accent} fill={0.04} stroke={0.15}>
              <Mono bold color={doc.accent} className="text-[14px]">
                {section.heading}
              </Mono>
              {section.body ? <Body className="mt-2">{section.body}</Body> : null}
              {section.bullets ? (
                <View className="mt-2 gap-1.5">
                  {section.bullets.map((bullet) => (
                    <View key={bullet} className="flex-row gap-2">
                      <Body color={doc.accent}>•</Body>
                      <Body className="flex-1">{bullet}</Body>
                    </View>
                  ))}
                </View>
              ) : null}
            </Panel>
          ))}
        </View>

        <BrandFooter className="mt-10" />
      </ScrollView>
    </View>
  );
}
