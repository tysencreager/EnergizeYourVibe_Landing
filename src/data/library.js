// Member resource library, per pillar.
//
// Files live in the PRIVATE Supabase Storage bucket `library`, under a folder
// named for each pillar key (e.g. library/align/...). The portal generates a
// short-lived signed URL per file at view time, so only logged-in members can
// open them.
//
// `file` is the EXACT filename as uploaded to the bucket — match it precisely
// when uploading (see supabase/README.md). `kind` drives the card layout:
// 'image' shows a preview thumbnail; 'pdf' shows a document card.
//
// To add a resource later: upload the file to library/<pillar>/ in Supabase,
// then add an entry here. No other code changes needed.

export const libraryByPillar = {
  align: [
    { title: 'Welcome Guide', file: 'Align Welcome Guide.png', kind: 'image' },
    { title: 'How to Tune Into Yourself', file: 'Align - How to tune into yourself.pdf', kind: 'pdf' },
    { title: '5-Minute Morning Vibes', file: '5 Minute Morning Vibes.png', kind: 'image' },
    { title: 'Nervous System Grounding Toolkit', file: 'Nervous System Grounding Toolkit - Align.png', kind: 'image' },
    { title: 'Evening Reconnection Ritual', file: 'Evening Reconnection Ritual.png', kind: 'image' },
  ],
  feel: [
    { title: 'Welcome Guide', file: 'Welcome Guide - Feel.png', kind: 'image' },
    { title: 'Understanding Your Emotions (Page 1)', file: 'Feel - Understanding Your Emotions Page 1 of 2.png', kind: 'image' },
    { title: 'Understanding Your Emotions (Page 2)', file: 'Feel - Understand Your Emotions Page 2 of 2.png', kind: 'image' },
    { title: 'Daily Emotional Check-In', file: 'Feel - Daily Emotional check-in_day_night.png', kind: 'image' },
  ],
  think: [
    { title: 'Welcome Guide', file: 'Think - Welcome Guide.png', kind: 'image' },
    { title: 'Daily Gratitude', file: 'Think - Daily Gratitude.png', kind: 'image' },
    { title: 'Confidence Mindset Prompts', file: 'Think - Confidence Mindset Prompts.png', kind: 'image' },
    { title: 'Mental Clutter Clean-Out (Page 1)', file: 'Think - Mental Clutter Clean-out page 1 of 2.png', kind: 'image' },
    { title: 'Mental Clutter Clean-Out (Page 2)', file: 'Think - Mental Clutter Clean-out page 2 of 2.png', kind: 'image' },
  ],
  fuel: [
    { title: 'Welcome Guide', file: 'Fuel - Welcome Guide.png', kind: 'image' },
    { title: 'Energy-Boosting Habits Guide', file: 'Fuel - Energy Boosting Habits Guide.png', kind: 'image' },
  ],
  // connect, flow, shine — no resources uploaded yet.
};

export function pillarResources(pillarKey) {
  return libraryByPillar[pillarKey] ?? [];
}
