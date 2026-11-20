export type StoryAnimationType = 'balloons' | 'visits' | 'flight' | 'hobbies';

export interface StoryCardItem {
  id: string;
  animationType: StoryAnimationType;
  eyebrow: string;
  title: string;
  body: string;
  highlight: string;
  confettiOnOpen?: boolean;
  nextLabel: string;
}

export interface PersonWish {
  id: string;
  name: string;
  role: string;
  handClass: string;
  accent: string;
  message: string;
  wish: string;
  audio?: string;
}

export interface CandleItem {
  name: string;
  handClass: string;
  colour: string;
}

export interface SignatureItem {
  name: string;
  handClass: string;
}

export interface BirthdayContent {
  meta: {
    callHim: string;
    turningAge: string;
    birthdayDate: string;
    fromNames: string;
  };
  backgroundMusic?: string;
  intro: {
    dateBadge: string;
    headline: string;
    subtitle: string;
    buttonLabel: string;
  };
  cards: StoryCardItem[];
  notes: {
    eyebrow: string;
    title: string;
    hint: string;
    whiskeyNote: string;
    allOpenedText: string;
    nextLabel: string;
    people: PersonWish[];
  };
  cake: {
    eyebrow: string;
    promptBefore: string;
    subpromptBefore: string;
    promptAllLit: string;
    subpromptAllLit: string;
    promptAfter: string;
    subpromptAfter: string;
    lightAllLabel: string;
    blowButtonLabel: string;
    nextLabel: string;
    candles: CandleItem[];
  };
  finale: {
    eyebrow: string;
    headline: string;
    message: string;
    signatures: SignatureItem[];
    whiskeySign: string;
    replayLabel: string;
  };
}

declare global {
  interface Window {
    BIRTHDAY_CONTENT?: BirthdayContent;
  }
}
