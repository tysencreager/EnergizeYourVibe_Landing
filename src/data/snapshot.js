// The Sister Snapshot — Jenn's get-to-know-you survey (EYV_Sister_Snapshot.docx).
// Every question is optional by design: "you don't have to complete anything
// you don't want to." Answers are stored as jsonb keyed by each field's id.
//
// Field types: text | textarea | select | chips (multi-select)

export const snapshotIntro = {
  title: 'Welcome to Your Sister Snapshot!',
  body: [
    "We believe every woman deserves to be seen, known, and celebrated. This isn't just a form. It's a chance for us to get to know the real you, from your favorite treats and birthday to what fills your heart and how we can best support you. Everything you share helps us create a more meaningful community and personalize your Energize Your Vibe experience. This information is kept private and is just between us — nothing you share will be given to any third parties or made visible to other members.",
    "For those who don't love filling out forms... of course you don't have to complete anything you don't want to. However, I encourage you to use this as a little time with yourself to reconnect, remember what you enjoy, and get present to the incredible woman you are.",
  ],
};

export const snapshotSections = [
  {
    title: 'About You',
    fields: [
      { id: 'full_name', label: 'Full Name', type: 'text' },
      { id: 'preferred_name', label: 'Preferred Name or Nickname', type: 'text' },
      { id: 'birthday', label: 'Birthday (Month & Day)', type: 'text', placeholder: 'e.g. June 14' },
      { id: 'anniversary', label: 'Wedding Anniversary (Optional)', type: 'text' },
      { id: 'address', label: 'Home Address', type: 'textarea', rows: 2 },
      { id: 'phone', label: 'Best Cell Number (for Community Texts)', type: 'text' },
      { id: 'email', label: 'Best Email Address', type: 'text' },
    ],
  },
  {
    title: 'Life Season',
    fields: [
      { id: 'relationship', label: 'Which best describes you?', type: 'select', options: ['Single', 'Dating', 'Engaged', 'Married', 'Divorced', 'Widowed', 'Prefer not to say'] },
      { id: 'children', label: 'Do you have children?', type: 'select', options: ['No', 'Yes (living at home)', 'Yes (grown children)', 'Both'] },
      { id: 'children_ages', label: 'Ages of Children (Optional)', type: 'text' },
      { id: 'occupation', label: 'Occupation', type: 'text' },
      { id: 'retired', label: 'Are you retired?', type: 'select', options: ['No', 'Yes', 'Semi-retired'] },
    ],
  },
  {
    title: 'Getting to Know You',
    fields: [
      { id: 'three_words', label: 'Describe yourself in three words.', type: 'text' },
      { id: 'joy', label: 'What brings you joy?', type: 'textarea' },
      { id: 'lights_up', label: 'What lights you up?', type: 'textarea' },
      { id: 'hobbies', label: 'What are your favorite hobbies?', type: 'textarea' },
      { id: 'recharge', label: 'How do you usually recharge?', type: 'chips', options: ['Alone', 'With people', 'Outdoors', 'Creativity', 'Movement', 'Reading', 'Faith', 'Other'] },
      { id: 'social_type', label: "Would you say you're an…", type: 'select', options: ['Introvert', 'Extrovert', 'Ambivert'] },
      { id: 'morning_night', label: 'Morning person or night owl?', type: 'select', options: ['Morning person', 'Night owl', 'Depends on the day'] },
      { id: 'beverage', label: 'Coffee, tea, or something else?', type: 'text' },
    ],
  },
  {
    title: 'Favorites',
    twoColumn: true,
    fields: [
      { id: 'fav_color', label: 'Favorite color', type: 'text' },
      { id: 'fav_flower', label: 'Favorite flower', type: 'text' },
      { id: 'fav_scent', label: 'Favorite scent', type: 'text' },
      { id: 'fav_snack', label: 'Favorite snack', type: 'text' },
      { id: 'fav_treat', label: 'Favorite treat', type: 'text' },
      { id: 'fav_drink', label: 'Favorite drink', type: 'text' },
      { id: 'fav_store', label: 'Favorite store to shop', type: 'text' },
      { id: 'fav_holiday', label: 'Favorite holiday', type: 'text' },
      { id: 'fav_season', label: 'Favorite season', type: 'text' },
      { id: 'fav_music', label: 'Favorite music genre', type: 'text' },
      { id: 'fav_song', label: 'Favorite song and artist', type: 'text' },
      { id: 'fav_book', label: 'Favorite book', type: 'text' },
      { id: 'fav_movie', label: 'Favorite movie', type: 'text' },
      { id: 'fav_podcast', label: 'Favorite podcast', type: 'text' },
      { id: 'fav_quote', label: 'Favorite quote', type: 'text' },
      { id: 'fav_travel', label: "Favorite place you've traveled", type: 'text' },
      { id: 'dream_vacation', label: 'Dream vacation', type: 'text' },
      { id: 'fav_local', label: 'Favorite local place to relax', type: 'text' },
    ],
  },
  {
    title: 'Community',
    fields: [
      { id: 'why_joined', label: 'What made you join Energize Your Vibe?', type: 'textarea' },
      { id: 'hoping_gain', label: 'What are you hoping to gain?', type: 'textarea' },
      { id: 'feel_home', label: 'What would make this community feel like home?', type: 'textarea' },
      { id: 'event_interests', label: 'What types of events or activities interest you most?', type: 'chips', options: ['Coffee meetups', 'Walks', 'Hiking', 'Book Club', 'Retreats', "Girls' Nights", 'Workshops', 'Service Projects', 'Fitness', 'Yoga', 'Sound Baths', 'Creative Nights', 'Lunches', 'Date Nights', 'Family Events', 'Other'] },
      { id: 'topic_interests', label: 'What topics are you most interested in learning about?', type: 'chips', options: ['Confidence', 'Friendships', 'Purpose', 'Health', 'Mindset', 'Relationships', 'Boundaries', 'Faith', 'Emotional Healing', 'Personal Growth', 'Finances', 'Parenting', 'Career', 'Other'] },
      { id: 'matching', label: 'Would you enjoy being matched with women who have similar interests?', type: 'select', options: ['Yes', 'No', 'Maybe'] },
      { id: 'accountability', label: 'Would you like an accountability partner?', type: 'select', options: ['Yes', 'No', 'Maybe'] },
      { id: 'hosting', label: 'Would you be interested in leading or hosting something someday?', type: 'select', options: ['Yes', 'No', 'Maybe'] },
    ],
  },
  {
    title: 'Your Heart',
    fields: [
      { id: 'matters_most', label: 'What matters most to you right now?', type: 'textarea' },
      { id: 'working_on', label: "What is one thing you're working on this year?", type: 'textarea' },
      { id: 'navigating', label: 'What challenge are you currently navigating?', type: 'textarea' },
      { id: 'overcome', label: "What is something you've overcome that you're proud of?", type: 'textarea' },
      { id: 'celebrated_for', label: "What is something you'd love to be acknowledged or celebrated for?", type: 'textarea' },
      { id: 'encouraged_by', label: 'What makes you feel most encouraged?', type: 'textarea' },
      { id: 'hard_day', label: "When you're having a hard day, what helps you most?", type: 'textarea' },
    ],
  },
  {
    title: 'Support',
    fields: [
      {
        id: 'support_needs',
        label: "Is there anything you'd like us to know so we can better support and include you? (Optional)",
        type: 'textarea',
        helper: 'Examples: ADHD, Autism, Anxiety, Depression, Chronic Illness, Autoimmune Condition, Mobility Limitations, Hearing Impairment, Vision Impairment, Sensory Sensitivities, Food Allergies, Other, Prefer not to say.',
      },
      { id: 'support_how', label: "Anything you'd like to share about how we can best support you?", type: 'textarea' },
    ],
  },
  {
    title: 'Connection',
    fields: [
      { id: 'encouragement_via', label: 'How do you best receive encouragement?', type: 'chips', options: ['Text', 'Phone Call', 'Card in the Mail', 'Small Gift', 'Prayer', 'Coffee Date', 'Hug', 'Words of Encouragement'] },
      { id: 'love_language', label: 'Love Language', type: 'select', options: ['Words of Affirmation', 'Acts of Service', 'Quality Time', 'Physical Touch', 'Gifts'] },
    ],
  },
  {
    title: 'Fun Stuff',
    fields: [
      { id: 'hidden_talent', label: 'Hidden talent', type: 'text' },
      { id: 'spontaneous', label: "Most spontaneous thing you've ever done", type: 'textarea', rows: 2 },
      { id: 'bucket_list', label: 'Bucket list item', type: 'text' },
      { id: 'purse', label: "What's always in your purse?", type: 'text' },
      { id: 'sweet_salty', label: 'Sweet or salty?', type: 'select', options: ['Sweet', 'Salty', 'Both!'] },
      { id: 'beach_mountains', label: 'Beach or mountains?', type: 'select', options: ['Beach', 'Mountains', 'Both!'] },
      { id: 'sunrise_sunset', label: 'Sunrise or sunset?', type: 'select', options: ['Sunrise', 'Sunset'] },
      { id: 'dogs_cats', label: 'Dogs or cats?', type: 'select', options: ['Dogs', 'Cats', 'Both', 'Neither'] },
      { id: 'celebrate', label: 'Favorite way to celebrate', type: 'text' },
    ],
  },
  {
    title: 'Two Final Questions',
    fields: [
      { id: 'heart_to_know', label: 'If every woman in this community knew one thing about your heart, what would you want them to know?', type: 'textarea' },
      { id: 'healthiest_self', label: 'When you imagine the healthiest, happiest version of yourself, what does she look and feel like?', type: 'textarea' },
    ],
  },
];
