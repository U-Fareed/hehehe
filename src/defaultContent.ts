import type {BirthdayContent} from './types';

export const DEFAULT_BIRTHDAY_CONTENT: BirthdayContent = {
  meta: {
    callHim: 'Dada',
    turningAge: '54',
    birthdayDate: '',
    fromNames: 'Mama, Z, Abu, Umar & Whiskey',
  },
  backgroundMusic: 'assets/audio/music.mp3',
  intro: {
    dateBadge: 'For Dada · Turning 54',
    headline: 'SUPRISEEEE!!!!',
    subtitle: 'From Mama, Z, Abu, Umar & Whiskey. We made this just for you.',
    buttonLabel: 'Next',
  },
  cards: [
    {
      id: 'toast',
      animationType: 'balloons',
      eyebrow: '54 Today',
      title: 'Happy Birthday, Dada!',
      body: 'You spend every day looking out for us and making sure we have whatever we need. Today is all about celebrating you, relaxing, and feeling how loved you are by all of us.',
      highlight: 'Today is yours, Dada—just sit back and enjoy it.',
      confettiOnOpen: true,
      nextLabel: 'Next',
    },
    {
      id: 'visits',
      animationType: 'visits',
      eyebrow: 'Whenever You Came Home',
      title: 'You always knew how to spoil us',
      body: 'Every single time you visited us, you turned it into a treat. Taking us out to watch movies, paying for big dinners, spoiling us with whatever sweets and chocolates we pointed at, and somehow always showing up with some weird new tool to help clean the house easier.',
      highlight: 'We loved every bit of it (even the random cleaning gadgets).',
      confettiOnOpen: false,
      nextLabel: 'Next',
    },
    {
      id: 'miles',
      animationType: 'flight',
      eyebrow: 'From Abroad to Home',
      title: 'Thank you for every year you worked away for us',
      body: "Spending years working abroad meant missing out on time at home, and we know that wasn't easy on you. You gave up your own comfort and likes so we could have a great life, taught us right from wrong, pushed us to do our best, and always loved every one of us equally.",
      highlight: "We wouldn't be who we are and where we are, without everything you did for us.",
      confettiOnOpen: false,
      nextLabel: 'Next',
    },
    {
      id: 'favorites',
      animationType: 'hobbies',
      eyebrow: 'The Dada We Love',
      title: 'Just you being you around the house',
      body: "Whether you're belting out karaoke, watching movies with us, trying to beat everyone at bowling, making a weird new food in the kitchen, or helping around the house, home just feels better with you around.",
      highlight: 'Whiskey says happy birthday too.',
      confettiOnOpen: false,
      nextLabel: 'Next',
    },
  ],
  notes: {
    eyebrow: 'Just For You',
    title: 'Our birthday wishes for you, Dada',
    hint: 'Tap each card to read our personal notes.',
    whiskeyNote: "Whiskey couldn't write a note (he's a cat).",
    allOpenedText: 'All notes opened! Ready for your cake?',
    nextLabel: 'Next',
    people: [
      {
        id: 'mama',
        name: 'Mama',
        role: 'With all my love',
        handClass: 'hand-mama',
        accent: '#FF595E',
        message:
          'Happy 54th Birthday! Thank you for being our strength through all the years apart and always putting our family first. I pray this year brings you good health, peace, and plenty of happy moments together.',
        wish: 'Here is to celebrating many more birthdays side by side.',
        audio: 'assets/audio/voice-mama.mp3',
      },
      {
        id: 'z',
        name: 'Z',
        role: 'Your daughter',
        handClass: 'hand-z',
        accent: '#E04F82',
        message:
          "Happy birthday, Dada! Thank you for always believing in me, pushing me to do better, and spoiling me with chocolates whenever you visited. Even when you don't say much, I always feel how much you care.",
        wish: 'Love you so much, Dada. Bowling rematch soon!',
        audio: 'assets/audio/voice-z.mp3',
      },
      {
        id: 'abu',
        name: 'Abu',
        role: 'Your son',
        handClass: 'hand-abu',
        accent: '#06B48A',
        message:
          'Happy 54th, Dada! Thank you for all the years you worked hard abroad so we could have everything we wanted. I admire your patience, fairness, and how you always take care of all of us equally.',
        wish: 'Hope you have an awesome day full of good food and karaoke.',
        audio: 'assets/audio/voice-abu.mp3',
      },
      {
        id: 'umar',
        name: 'Umar',
        role: 'Your son',
        handClass: 'hand-umar',
        accent: '#1982C4',
        message:
          'Happy birthday, Dada! Thank you for every movie trip, every dinner treat, and for teaching us what really matters in life. Even your weirdest meals and random cleaning tools turn into the best memories.',
        wish: 'Wishing you the happiest 54th birthday ever, Dada.',
        audio: 'assets/audio/voice-umar.mp3',
      },
    ],
  },
  cake: {
    eyebrow: 'Make a Wish',
    promptBefore: 'Time to light the candles, Dada!',
    subpromptBefore: 'Tap each candle (or hit Light All) while Whiskey watches.',
    promptAllLit: 'Make a big wish and blow them out!',
    subpromptAllLit: 'Tap or hold the button below.',
    promptAfter: 'Happy 54th Birthday, Dada!',
    subpromptAfter: 'We hope every single wish comes true. We love you!',
    lightAllLabel: 'Light All Candles',
    blowButtonLabel: 'Blow Out Candles',
    nextLabel: 'Next',
    candles: [
      {name: 'Mama', handClass: 'hand-mama', colour: '#FF595E'},
      {name: 'Z', handClass: 'hand-z', colour: '#E04F82'},
      {name: 'Abu', handClass: 'hand-abu', colour: '#06B48A'},
      {name: 'Umar', handClass: 'hand-umar', colour: '#1982C4'},
    ],
  },
  finale: {
    eyebrow: '54 Years of Dada',
    headline: 'We love you so much, Dada ❤️',
    message:
      'Thank you for every sacrifice, every trip home, every movie and dinner, and every laugh. Have the happiest 54th birthday—you deserve the absolute best.',
    signatures: [
      {name: 'Mama', handClass: 'hand-mama'},
      {name: 'Z', handClass: 'hand-z'},
      {name: 'Abu', handClass: 'hand-abu'},
      {name: 'Umar', handClass: 'hand-umar'},
    ],
    whiskeySign: 'Whiskey',
    replayLabel: 'Open Surprise Again',
  },
};

export function getBirthdayContent(): BirthdayContent {
  if (typeof window !== 'undefined' && window.BIRTHDAY_CONTENT) {
    return window.BIRTHDAY_CONTENT;
  }
  return DEFAULT_BIRTHDAY_CONTENT;
}
