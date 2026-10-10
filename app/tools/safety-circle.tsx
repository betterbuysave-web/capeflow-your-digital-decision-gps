import { useState } from 'react';
import { KeyboardAvoidingView, Linking, Platform, Pressable, ScrollView, View } from 'react-native';
import { MessageSquare, Phone, Plus, Trash2, UserPlus } from 'lucide-react-native';
import { Input, Label, TextField } from 'heroui-native';

import { BrandFooter } from '@/components/cape/BrandFooter';
import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { StackHeader } from '@/components/cape/Screen';
import { C, alpha } from '@/lib/colors';
import { GradientAction } from '@/components/cape/Buttons';
import { SAFETY_EXCEPTION } from '@/lib/data/ghosts';
import { useCapeStore } from '@/lib/store/useCapeStore';

const ROLES = ['Peer', 'Adult', 'Family', 'Coach', 'Backup'];

export default function SafetyCircle() {
  const circle = useCapeStore((s) => s.circle);
  const addContact = useCapeStore((s) => s.addContact);
  const removeContact = useCapeStore((s) => s.removeContact);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState(ROLES[0]);

  const canAdd = name.trim().length > 0 && phone.trim().length >= 3;

  const submit = () => {
    if (!canAdd) return;
    addContact({ name: name.trim(), phone: phone.trim(), role });
    setName('');
    setPhone('');
    setRole(ROLES[0]);
  };

  return (
    <View className="bg-paper flex-1">
      <StackHeader title="Safety Circle" tint={C.azure} fallback="/(tabs)/tools" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5 pt-6 pb-16"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Eyebrow color={C.azure}>SAFETY CIRCLE</Eyebrow>
          <Display className="mt-2 text-4xl">Three people who answer at 2 AM.</Display>
          <Body className="mt-3">
            Pick a mix: one peer, one adult, one backup. Tell them they are on your list and agree
            on a code word that means &quot;call me and get me out&quot;.
          </Body>

          <View className="mt-6 gap-2.5">
            {circle.length === 0 ? (
              <Panel tint={C.azure} fill={0.05} stroke={0.16}>
                <View className="flex-row items-center gap-3">
                  <UserPlus size={18} color={C.azure} />
                  <Mono className="flex-1 text-[10px]">
                    No contacts yet. Add them now — searching for a number under stress is the
                    problem this solves.
                  </Mono>
                </View>
              </Panel>
            ) : (
              circle.map((contact) => (
                <View
                  key={contact.id}
                  className="rounded-2xl p-4"
                  style={{
                    backgroundColor: alpha(C.azure, 0.06),
                    borderWidth: 1,
                    borderColor: alpha(C.azure, 0.2),
                  }}
                >
                  <View className="flex-row items-start justify-between gap-3">
                    <View className="flex-1">
                      <Mono bold color={alpha(C.inkSoft, 0.95)} className="text-[12px]">
                        {contact.name}
                      </Mono>
                      <Mono className="mt-0.5 text-[9px]" color={alpha(C.inkFaint, 0.8)}>
                        {contact.role} · {contact.phone}
                      </Mono>
                    </View>
                    <GradientAction
                      accessibilityLabel={`Remove ${contact.name}`}
                      onPress={() => removeContact(contact.id)}
                      className="h-11 w-11 items-center justify-center rounded-full"
                    >
                      <Trash2 size={15} color={C.paper2} />
                    </GradientAction>
                  </View>
                  <View className="mt-3 flex-row gap-2">
                    <GradientAction
                      accessibilityLabel={`Call ${contact.name}`}
                      onPress={() => void Linking.openURL(`tel:${contact.phone}`)}
                      className="flex-1 flex-row items-center justify-center gap-2 rounded-xl py-2.5"
                    >
                      <Phone size={13} color={C.paper2} />
                      <Mono bold color={C.paper2} className="text-[11px]" tracking={1.5}>
                        CALL
                      </Mono>
                    </GradientAction>
                    <GradientAction
                      accessibilityLabel={`Text code word to ${contact.name}`}
                      onPress={() =>
                        void Linking.openURL(
                          `sms:${contact.phone}?body=Code word. I need help getting out of here.`,
                        )
                      }
                      className="flex-1 flex-row items-center justify-center gap-2 rounded-xl py-2.5"
                    >
                      <MessageSquare size={13} color={C.paper2} />
                      <Mono bold color={C.paper2} className="text-[11px]" tracking={1}>
                        CODE WORD
                      </Mono>
                    </GradientAction>
                  </View>
                </View>
              ))
            )}
          </View>

          <View className="mt-8">
            <Eyebrow color={C.azure}>ADD A CONTACT</Eyebrow>
            <View className="mt-3 gap-3">
              <TextField>
                <Label className="font-mono text-[10px]">NAME</Label>
                <Input
                  placeholder="Who picks up?"
                  value={name}
                  onChangeText={setName}
                  placeholderColorClassName="accent-slate-faint"
                  className="text-foreground font-mono"
                />
              </TextField>

              <TextField>
                <Label className="font-mono text-[10px]">PHONE</Label>
                <Input
                  placeholder="555 010 1234"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  placeholderColorClassName="accent-slate-faint"
                  className="text-foreground font-mono"
                />
              </TextField>

              <View>
                <Mono bold className="mb-2 text-[10px]" color={alpha(C.inkFaint, 0.8)}>
                  ROLE
                </Mono>
                <View className="flex-row flex-wrap gap-2">
                  {ROLES.map((option) => {
                    const active = role === option;
                    return (
                      <Pressable
                        key={option}
                        accessibilityRole="radio"
                        accessibilityState={{ selected: active }}
                        onPress={() => setRole(option)}
                        className="rounded-full px-3.5 py-2 active:opacity-70"
                        style={{
                          backgroundColor: alpha(C.azure, active ? 0.2 : 0.05),
                          borderWidth: 1,
                          borderColor: alpha(C.azure, active ? 0.5 : 0.15),
                        }}
                      >
                        <Mono
                          bold
                          color={active ? C.azure : alpha(C.inkFaint, 0.8)}
                          className="text-[10px]"
                          tracking={1}
                        >
                          {option.toUpperCase()}
                        </Mono>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <GradientAction
                disabled={!canAdd}
                onPress={submit}
                className="mt-2 flex-row items-center justify-center gap-2 rounded-full py-3.5"
              >
                <Plus size={15} color={C.paper2} />
                <Mono bold color={C.paper2} tracking={2} className="text-[11px]">
                  ADD TO CIRCLE
                </Mono>
              </GradientAction>
            </View>
          </View>

          <Panel tint={C.teal} fill={0.05} stroke={0.18} className="mt-8">
            <Mono className="text-[10px]">
              Contacts live only in this app on this device. CAPE FLOW never reads your phone
              contacts and never uploads anything you type here.
            </Mono>
            <Mono className="mt-2 text-[9px]" color={C.inkFaint}>
              {SAFETY_EXCEPTION}
            </Mono>
          </Panel>

          <BrandFooter className="mt-8" />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
