// The 7 Pillar Assessment — taken by new members after they join.
// Members rate each statement 1–5, then total each pillar to see where
// their energy is most supported and where it needs attention.

export const assessmentScale = [
  { value: 1, label: 'Not at all true for me' },
  { value: 2, label: 'Rarely' },
  { value: 3, label: 'Sometimes' },
  { value: 4, label: 'Often' },
  { value: 5, label: 'Very true for me' },
];

// One block per pillar. `key` matches src/data/pillars.js so we can reuse
// names, subtitles, and colors.
export const assessmentPillars = [
  {
    key: 'align',
    focus: 'Inner connection, truth, direction',
    statements: [
      'I feel connected to myself and what feels right for me',
      'I trust my intuition when making decisions',
      'I feel grounded in my values',
      'I take time to reflect, pray, meditate, or be still',
      'I feel guided in my life, not just reacting',
      'I feel at peace with where I am in life',
      'I listen to myself before outside opinions',
      'I feel connected to something greater than myself',
    ],
  },
  {
    key: 'feel',
    focus: 'Emotions, awareness, expression',
    statements: [
      'I allow myself to feel my emotions without judging them',
      'I can identify what I’m feeling in the moment',
      'I express my emotions in a healthy way',
      'I don’t suppress or avoid how I feel',
      'I feel safe being honest with myself emotionally',
      'I take time to check in with how I’m doing',
      'I can move through hard emotions without staying stuck',
      'I feel emotionally supported (by myself or others)',
    ],
  },
  {
    key: 'think',
    focus: 'Thoughts, patterns, awareness',
    statements: [
      'I am aware of my thought patterns',
      'I catch negative thinking and shift it when needed',
      'I speak to myself in a supportive way',
      'I believe in my ability to handle challenges',
      'I feel mentally clear and focused most days',
      'I don’t spiral in overthinking often',
      'I feel in control of my mindset',
      'My thoughts support my growth, not hold me back',
    ],
  },
  {
    key: 'fuel',
    focus: 'Body, energy, care',
    statements: [
      'I nourish my body with foods that support my energy',
      'I move my body regularly',
      'I get enough rest and sleep',
      'I stay hydrated',
      'I listen to what my body needs',
      'I feel physically energized most days',
      'I take care of my body consistently',
      'I don’t ignore signs of burnout or exhaustion',
    ],
  },
  {
    key: 'connect',
    focus: 'Support, belonging, boundaries',
    statements: [
      'I feel supported in my relationships',
      'I have people I can be real with',
      'I set healthy boundaries when needed',
      'I feel connected, not isolated',
      'I invest time in meaningful relationships',
      'I feel seen and understood',
      'I communicate honestly with others',
      'I allow myself to receive support',
    ],
  },
  {
    key: 'flow',
    focus: 'Ease, stability, receiving',
    statements: [
      'I feel at ease with my finances',
      'I feel in control of my spending and income',
      'I don’t constantly stress about money',
      'I feel supported in my lifestyle',
      'I allow myself to receive (help, money, opportunities)',
      'I feel confident managing my resources',
      'I trust things will work out financially',
      'I feel aligned with how I live my life',
    ],
  },
  {
    key: 'shine',
    focus: 'Being seen, living fully',
    statements: [
      'I feel confident being myself',
      'I express who I am without holding back',
      'I am doing things that light me up',
      'I feel connected to my purpose',
      'I allow myself to be seen',
      'I use my gifts in my life',
      'I feel proud of who I am becoming',
      'I take steps toward what I want',
    ],
  },
];

// Score bands for each pillar total (8 statements × 1–5 = 8–40).
export const scoreBands = [
  { min: 32, max: 40, label: 'Strong / Supported', tone: 'strong' },
  { min: 24, max: 31, label: 'Growing / Some support needed', tone: 'growing' },
  { min: 8, max: 23, label: 'Needs attention', tone: 'attention' },
];

export function bandForScore(total) {
  return scoreBands.find((b) => total >= b.min && total <= b.max) ?? scoreBands[scoreBands.length - 1];
}
