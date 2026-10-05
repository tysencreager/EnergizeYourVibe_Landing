// Registerable events (guest expert workshops, calls, gatherings).
//
// Each entry powers:
//   - the landing page at /events/<slug> and its thank-you page
//   - the upcoming-events list on /events, the homepage section, and the
//     site popup (until the event starts)
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
//   included        [{ icon, title, desc }] ("Your ticket includes"), same
//                   shape as bring
//   bonus           { title, desc } freebie card
//   welcome         copy for the "All women are welcome" card
//   friendNote      closing line of the "Bring a friend" card (thank-you page)
//   location        { name, detail, address?, directions?, mapsUrl } for
//                   in-person events ("name · detail" is the short label)
//   pricing         { member: { price, stripeUrl? }, nonMember: { price,
//                   stripeUrl? }, venmoUrl, venmoNote } - when set, the form
//                   asks whether the registrant is a member, and anyone
//                   whose ticket isn't 'Free' is sent to pay after
//                   registering (by card when the tier has a Stripe Payment
//                   Link, and by Venmo)
//   membershipPitch paragraphs for a "Not a member yet?" card that points
//                   to /membership (for events where members pay less)
//   capacity        max registrations; the API turns people away once the
//                   MailerLite group holds this many, and the page shows
//                   "Space is limited" and, once full, a waitlist note
//   announceAt      early access: until this time the page works at its
//                   link but stays off /events, the homepage and the popup
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
      member: { price: 'Free' },
      nonMember: {
        price: '$20',
        // Stripe Payment Link for the $20 non-member spot (one-time payment).
        stripeUrl: 'https://buy.stripe.com/fZu28safa00aaPnaix4wM03',
      },
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

  {
    slug: 'halloween-party',
    series: 'An Energize Your Vibe Gathering',
    kindLabel: 'party',
    format: 'in-person',
    title: 'Halloween Party',
    subtitle:
      'Grab a costume and join us for a fun night of connection, creativity, cake pops, and a little Halloween fun!',
    taglines: ['Connection', 'Cake pops', 'Games'],

    startsAt: '2026-10-21T18:30:00-06:00',
    durationMinutes: 120,
    dateLabel: 'Wednesday, October 21',
    timeLabel: '6:30 to 8:30 PM Mountain Time',
    formatLabel: 'In Person',
    lengthLabel: '2 Hours',
    priceLabel: '$20 for Members · $40 for Non-Members',
    audienceLabel: 'All Women Welcome',

    // Members and last week's attendees (The Fall Reset + Sisterhood,
    // S'mores) get first dibs: they get the link by email, and the party
    // goes on the public calendar, homepage and popup at this time.
    announceAt: '2026-10-09T09:00:00-06:00',
    // Katherine's number to start. Raise it here if more spots open up.
    capacity: 30,

    location: {
      name: 'Lark x Co Connection Studio',
      detail: 'Sugar House, Salt Lake City',
      address: '1603 Stratford Ave S, Salt Lake City, UT 84106',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=Lark+x+Co+Connection+Studio+1603+Stratford+Ave+S+Salt+Lake+City+UT+84106',
    },

    summary:
      'An Energize Your Vibe Halloween Party at Lark x Co Connection Studio in Salt Lake City: make Halloween cake pops with guest expert Katherine O’Donnell of A Piece of Cake Utah, plus games, snacks, a photo op and a best costume prize. $20 for members, $40 for non-members.',
    heading: ['Costumes, cake pops', '& great company.'],
    description: [
      'We’re getting together at the beautiful Lark x Co Connection Studio for an evening designed to give you a chance to get out, laugh, create something fun, meet and connect with other women, and enjoy a night together.',
      'And we’re not stopping with cake pops. We’ll have games, light snacks and drinks, a Halloween photo opportunity, and of course, costumes are encouraged. Come dressed up if you’d like because we’ll also have a prize for the best costume!',
    ],
    included: [
      {
        icon: 'cakePop',
        title: 'Hands-on cake pop class',
        desc: 'The cake pop experience and all the supplies.',
      },
      { icon: 'games', title: 'Fun games', desc: 'Games and activities all evening.' },
      { icon: 'camera', title: 'Photo op in your costume', desc: 'A Halloween photo opportunity.' },
      { icon: 'crown', title: 'Best costume wins a prize', desc: 'Come dressed up if you’d like!' },
      { icon: 'drink', title: 'Light snacks & drinks', desc: 'Served all evening.' },
      {
        icon: 'you',
        title: 'An evening of connection',
        desc: 'With the Energize Your Vibe community.',
      },
    ],
    experts: [
      {
        name: 'Katherine O’Donnell',
        role: 'Owner, A Piece of Cake Utah',
        photo: '/assets/katherine-odonnell.jpg',
        bio: [
          'Katherine will walk us through making our own Halloween cake pops, and your ticket includes all the supplies.',
          'No cake-pop skills required. Just show up ready to create and have fun!',
        ],
      },
    ],
    welcome:
      'You don’t need to be a member to join us. Grab a friend, put on your favorite costume, and come ready to have fun.',
    friendNote: 'Send this to a friend who’d love a night of costumes and cake pops too.',

    pricing: {
      // Add the Stripe Payment Links (one-time $20 and $40 payments) as
      // stripeUrl on each tier. Until then the site offers Venmo only.
      member: { price: '$20' },
      nonMember: { price: '$40' },
      venmoUrl: 'https://venmo.com/code?user_id=2114734279098368911&created=1790276161',
      venmoNote: 'Put your name and “Halloween party” in the comments.',
    },
    membershipPitch: [
      'Before you grab the $40 ticket, you may want to check out the Energize Your Vibe membership. Members get $20 off this event, plus all the other benefits, gatherings, tools, and support that come with being part of the Energize Your Vibe community.',
      'If you’ve been thinking about joining us, this might be the perfect time. Join the community first, then come back and register at the $20 member rate.',
    ],
    phoneRequired: true,
    flyer: '/assets/halloween-party-flyer.webp',
    ogImage: {
      src: '/assets/og/halloween-party.jpg',
      alt: 'Energize Your Vibe Halloween Party: make cake pops with guest expert Katherine O’Donnell at Lark x Co Connection Studio in Salt Lake City, Wednesday, October 21',
    },

    mailerliteGroup: 'Event: Halloween Party (Oct 21, 2026)',
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

export function hasStarted(event, now = new Date()) {
  return now >= new Date(event.startsAt);
}

// Early-access events stay off the public listings until announceAt.
export function isAnnounced(event, now = new Date()) {
  return !event.announceAt || now >= new Date(event.announceAt);
}

// Events still worth promoting. An event goes on the calendar, homepage
// and popup once it's announced and comes off as soon as it starts; its own
// page keeps taking registrations until it ends, so latecomers with the link
// can still get the join details.
export function upcomingEvents(now = new Date()) {
  return EVENTS.filter((event) => isAnnounced(event, now) && !hasStarted(event, now)).sort(
    (a, b) => new Date(a.startsAt) - new Date(b.startsAt)
  );
}

export function isInPerson(event) {
  return event.format === 'in-person';
}

// Events with pricing ask whether the registrant is a member; anyone whose
// ticket isn't free is sent to pay after registering.
export function hasNonMemberPrice(event) {
  return Boolean(event.pricing);
}

export const MEMBERSHIP_OPTIONS = ['member', 'non-member'];

// The pricing tier ({ price, stripeUrl? }) for a membership answer.
export function ticketTier(event, membership) {
  if (!event.pricing) return null;
  return membership === 'member' ? event.pricing.member : event.pricing.nonMember;
}

export function isFreeTier(tier) {
  return tier.price === 'Free';
}

// How a tier can be paid, for copy: "card or Venmo", "Venmo" or "card".
export function payByLabel(event, tier) {
  return [tier.stripeUrl && 'card', event.pricing.venmoUrl && 'Venmo'].filter(Boolean).join(' or ');
}

// Value stored in the MailerLite `event_ticket` field so Jenn can tell
// paid spots from member spots in the registrant list.
export function ticketLabel(event, membership) {
  const tier = ticketTier(event, membership);
  if (!tier) return '';
  return `${membership === 'member' ? 'Member' : 'Non-member'} (${tier.price.toLowerCase()})`;
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
