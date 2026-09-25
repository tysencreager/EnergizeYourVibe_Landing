// Registerable events (guest expert workshops, calls, gatherings).
//
// Each entry powers:
//   - the landing page at /events/<slug> and its thank-you page
//   - the upcoming-events list on /events, the homepage section, and the
//     site popup
//   - server-side validation in functions/api/event-register.js, which
//     imports this file (keep it plain JS: no JSX, no import.meta.env)
//
// Adding an event = add an entry here + create its MailerLite group and
// confirmation-email automation. Full checklist: emails/event-registrations.md.
//
// Never put Zoom links or passcodes here: this file ships in the public JS
// bundle. Join details live only in the MailerLite confirmation email.
//
// Field guide (optional fields are only rendered when present):
//   format          'online' | 'in-person'
//   kindLabel       noun used in copy ("workshop", "gathering")
//   description     a string or an array of paragraphs
//   learn           bullet list ("You'll learn how to")
//   bring           [{ icon, title, desc }] ("What to bring"); icon is a key
//                   mapped to an icon in EventRegister.jsx
//   bringNote       small print under the bring list
//   bonus           { title, desc } freebie card
//   welcome         copy for the "All women are welcome" card
//   friendNote      closing line of the "Bring a friend" card (thank-you page)
//   location        { name, detail, directions, mapsUrl } for in-person events
//   pricing         { memberLabel, nonMemberPrice, stripeUrl, venmoUrl,
//                   venmoNote } - when set, the form asks whether the
//                   registrant is a member and non-members are sent to pay
//                   after registering
//   phoneRequired   make the phone field mandatory (text updates)
//   flyer           path to a shareable flyer image in public/assets
//   image           { src, alt, caption? } wide photo shown under the hero
//   ogImage         { src, alt } share image for link previews (Facebook,
//                   iMessage, LinkedIn...), served by functions/events/[slug].js.
//                   Generate it with `node scripts/og-images.mjs <slug>` into
//                   public/assets/og/ (size below)
//   experts         [{ name, role, photo, quote?, bio? }] - one or more guest
//                   experts. A quote renders as a pull-quote section; bios
//                   (arrays of paragraphs) render as "Meet our guest experts"

export const EVENT_TIME_ZONE = 'America/Denver';

// Pixel size of the generated share images (2x of the 1200x630 that
// Facebook, LinkedIn and iMessage lay out for).
export const OG_IMAGE_SIZE = { width: 2400, height: 1260 };

export const EVENTS = [
  {
    slug: 'fall-reset',
    series: 'Guest Expert Series',
    kindLabel: 'workshop',
    format: 'online',
    title: 'The Fall Reset',
    subtitle: 'Simplify Your Home Before the Busiest Season of the Year',
    taglines: ['Practical tools', 'Real solutions', 'A calmer you'],

    // Start time with its UTC offset (Mountain Daylight Time is -06:00,
    // Mountain Standard Time is -07:00). Registration closes when the event
    // ends. The labels below are display copy - keep them in sync.
    startsAt: '2026-09-30T11:00:00-06:00',
    durationMinutes: 60,
    dateLabel: 'Wednesday, September 30',
    timeLabel: '11:00 AM Mountain Time',
    formatLabel: 'Live on Zoom',
    lengthLabel: '1 Hour',
    priceLabel: 'Free Online Workshop',
    audienceLabel: 'All Women Welcome',

    summary:
      'A free, practical online workshop with organizing expert Sandy Rodriguez to simplify your home, reduce mental load, and create systems that actually work for your real life.',
    // Section heading above the description; the second part is italicized.
    heading: ['Make home', 'require less from you.'],
    description:
      'Before the holidays hit, let’s make home require less from you. Join us for a practical and encouraging workshop to simplify your home, reduce mental load, and create systems that actually work for your real life.',
    learn: [
      'Spot the “friction points” costing you time and energy',
      'Understand why you end up organizing the same spaces over and over',
      'Organize around how your family actually lives (instead of how you think you should live)',
      'Recognize when a space is simply over capacity',
      'Create simple systems that don’t depend on Mom constantly maintaining them',
      'Simplify your home before the busiest season begins',
    ],
    experts: [
      {
        name: 'Sandy Rodriguez',
        role: 'Owner, Mindful Organizing & Co.',
        photo: '/assets/sandy-rodriguez.jpg',
        quote:
          'The goal isn’t a perfectly organized home. It’s a home that requires less from you when everything else requires more.',
      },
    ],
    bonus: {
      title: 'Fall Friction Audit',
      desc: 'Use it during the workshop to discover where to start and create more ease at home.',
    },
    welcome:
      'You don’t need to be a member to join us. Bring a friend, your questions, and maybe a space in your home that has been driving you a little crazy.',
    friendNote: 'Send this to a friend who could use a calmer season too.',
    ogImage: {
      src: '/assets/og/fall-reset.jpg',
      alt: 'The Fall Reset: a free online workshop with organizing expert Sandy Rodriguez, Wednesday, September 30 at 11 AM Mountain Time',
    },

    // MailerLite group registrants are added to. Its "joins group"
    // automation sends the confirmation email with the Zoom link. The API
    // finds the group by this exact name (creating it if missing), so don't
    // rename the group in MailerLite.
    mailerliteGroup: 'Event: The Fall Reset (Sep 30, 2026)',
  },

  {
    slug: 'sisterhood-smores',
    series: 'An Energize Your Vibe Gathering',
    kindLabel: 'gathering',
    format: 'in-person',
    title: 'Sisterhood, S’mores & Soulful Stories',
    subtitle:
      'A cozy afternoon up the canyon with women, nature, meaningful conversation, a little reflection, plenty of laughter and, of course, s’mores.',
    taglines: ['Nature', 'Guided journaling', 'S’mores by the fire'],

    startsAt: '2026-10-02T11:30:00-06:00',
    durationMinutes: 180,
    dateLabel: 'Friday, October 2',
    timeLabel: '11:30 AM to 2:30 PM Mountain Time',
    formatLabel: 'In Person',
    lengthLabel: '3 Hours',
    priceLabel: 'Free for Members · $20 for Non-Members',
    audienceLabel: 'All Women Welcome',

    location: {
      name: 'American Fork Canyon',
      detail: 'Roadhouse Camp Area',
      directions:
        'The Roadhouse Campground is located up the canyon. Take a left at the sign for Tibble Fork Reservoir, and the campground labeled “Roadhouse” will be on your right. Jenn will have a sign out with a few balloons so it’s easy to spot. It’s about 25 minutes from the Timp Hwy / SR 92 exit. Carpool with a buddy!',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=Roadhouse+Campground+American+Fork+Canyon+Utah',
    },

    summary:
      'An in-person Energize Your Vibe gathering in American Fork Canyon with guest experts Susan Hart and Tysen Creager: nature, guided journaling, meaningful conversation, and s’mores by the fire. Free for members, $20 for non-members.',
    heading: ['This isn’t a class.', 'It’s a gathering.'],
    description: [
      'A chance to get outside, slow down for a few hours, connect with other women and get a little more present to YOU.',
      'Sometimes we get so busy living our lives that we don’t stop long enough to notice who we are right now, what we’ve walked through, what matters to us, or the story we’re continuing to write. That’s what this afternoon is about.',
      'Bring your own lunch, pull up your camping chair and spend the afternoon with us. We’ll have time for conversation, connection, reflection and simply enjoying being together in nature. And yes, there will be s’mores! We’ll have a fire going and provide the s’mores and drinks.',
    ],
    experts: [
      {
        name: 'Susan Hart',
        role: 'Owner, Voice to Page · Writing Coach',
        photo: '/assets/susan-hart.jpg',
        bio: [
          'Susan will spend some time with us talking about story, identity and the power of putting our thoughts into words, along with some guided journaling to help us reflect on who we are in this season of life.',
          'No writing experience needed. Just bring your journal and come open.',
        ],
      },
      {
        name: 'Tysen Creager',
        role: 'Personal & Business Growth Strategist',
        photo: '/assets/tysen-creager.jpg',
        bio: [
          'Tysen Creager is a Business & Personal Growth Strategist who believes your beginning doesn’t have to define your future. As the founder of Elevate Growth Solutions, she helps business owners grow their digital presence through strategic websites and marketing.',
          'Drawing on her own journey of overcoming adversity and building a life on her terms, she inspires others to challenge limiting beliefs, embrace their potential, and take meaningful steps toward the lives they want. She brings entrepreneurial insight, lived experience, and a cheerleader’s heart to every room.',
        ],
      },
    ],
    bring: [
      { icon: 'lunch', title: 'Your lunch', desc: 'We’ll provide the s’mores and drinks.' },
      { icon: 'journal', title: 'Journal + pen', desc: 'Come ready to reflect, explore and write.' },
      { icon: 'chair', title: 'Camping chair', desc: 'Pull up a seat around the fire.' },
      {
        icon: 'layers',
        title: 'Layers or a blanket',
        desc: 'Dress comfy and bundle up as needed for your body temp.',
      },
      { icon: 'you', title: 'Yourself, exactly as you are', desc: 'That’s all we need.' },
    ],
    bringNote: 'Sorry, no kids. This one is just for the Sisters.',
    welcome:
      'You don’t need to be a member to join us. Bring a friend, your journal, and come exactly as you are.',
    friendNote: 'Send this to a friend who could use an afternoon in the canyon too.',

    pricing: {
      memberLabel: 'Free',
      nonMemberPrice: '$20',
      // Stripe Payment Link for the $20 non-member spot (one-time payment).
      stripeUrl: 'https://buy.stripe.com/fZu28safa00aaPnaix4wM03',
      venmoUrl: 'https://venmo.com/code?user_id=2114734279098368911&created=1790276161',
      venmoNote: 'Put your name and “Sisterhood s’mores” in the comments.',
    },
    phoneRequired: true,
    flyer: '/assets/sisterhood-smores-flyer.webp',
    image: {
      src: '/assets/sisterhood-smores-campfire.webp',
      alt: 'Women laughing around a campfire in the canyon, roasting marshmallows and journaling',
      caption: 'S’mores, stories & sisterhood by the fire',
    },
    ogImage: {
      src: '/assets/og/sisterhood-smores.jpg',
      alt: 'Sisterhood, S’mores & Soulful Stories: an in-person Energize Your Vibe gathering in American Fork Canyon with Susan Hart and Tysen Creager, Friday, October 2',
    },

    mailerliteGroup: "Event: Sisterhood, S'mores & Soulful Stories (Oct 2, 2026)",
  },
];

export function getEvent(slug) {
  return EVENTS.find((event) => event.slug === slug) ?? null;
}

export function eventEndsAt(event) {
  return new Date(new Date(event.startsAt).getTime() + event.durationMinutes * 60_000);
}

export function isRegistrationOpen(event, now = new Date()) {
  return now < eventEndsAt(event);
}

export function upcomingEvents(now = new Date()) {
  return EVENTS.filter((event) => isRegistrationOpen(event, now)).sort(
    (a, b) => new Date(a.startsAt) - new Date(b.startsAt)
  );
}

export function isInPerson(event) {
  return event.format === 'in-person';
}

// Events with pricing ask whether the registrant is a member; non-members
// are sent to pay after registering.
export function hasNonMemberPrice(event) {
  return Boolean(event.pricing);
}

export const MEMBERSHIP_OPTIONS = ['member', 'non-member'];

// Value stored in the MailerLite `event_ticket` field so Jenn can tell
// paid spots from member spots in the registrant list.
export function ticketLabel(event, membership) {
  if (!event.pricing) return '';
  return membership === 'member'
    ? `Member (${event.pricing.memberLabel.toLowerCase()})`
    : `Non-member (${event.pricing.nonMemberPrice})`;
}

// "Sandy Rodriguez" / "Susan Hart & Tysen Creager" for copy.
export function expertNames(event) {
  const names = event.experts.map((expert) => expert.name);
  if (names.length <= 1) return names[0] ?? '';
  return `${names.slice(0, -1).join(', ')} & ${names[names.length - 1]}`;
}

// Short location or format line for cards and chips.
export function whereLabel(event) {
  if (isInPerson(event) && event.location) {
    return `${event.location.name} · ${event.location.detail}`;
  }
  return event.formatLabel;
}

// Pieces for a calendar-style date badge, in the event's local time zone.
export function eventDateParts(event) {
  const date = new Date(event.startsAt);
  const part = (options) =>
    new Intl.DateTimeFormat('en-US', { timeZone: EVENT_TIME_ZONE, ...options }).format(date);
  return {
    weekday: part({ weekday: 'short' }),
    month: part({ month: 'short' }),
    day: part({ day: 'numeric' }),
  };
}
