// Registerable events (guest expert workshops, calls, gatherings).
//
// Each entry powers:
//   - the landing page at /events/<slug> and its thank-you page
//   - the upcoming-events list on /events
//   - server-side validation in functions/api/event-register.js, which
//     imports this file (keep it plain JS: no JSX, no import.meta.env)
//
// Adding an event = add an entry here + create its MailerLite group and
// confirmation-email automation. Full checklist: emails/event-registrations.md.
//
// Never put Zoom links or passcodes here: this file ships in the public JS
// bundle. Join details live only in the MailerLite confirmation email.

export const EVENTS = [
  {
    slug: 'fall-reset',
    series: 'Guest Expert Series',
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
    expert: {
      name: 'Sandy Rodriguez',
      role: 'Owner, Mindful Organizing & Co.',
      photo: '/assets/sandy-rodriguez.jpg',
      quote:
        'The goal isn’t a perfectly organized home. It’s a home that requires less from you when everything else requires more.',
    },
    bonus: {
      title: 'Fall Friction Audit',
      desc: 'Use it during the workshop to discover where to start and create more ease at home.',
    },

    // MailerLite group registrants are added to. Its "joins group"
    // automation sends the confirmation email with the Zoom link. The API
    // finds the group by this exact name (creating it if missing), so don't
    // rename the group in MailerLite.
    mailerliteGroup: 'Event: The Fall Reset (Sep 30, 2026)',
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
