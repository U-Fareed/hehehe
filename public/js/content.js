/* ============================================================================
   BIRTHDAY SURPRISE CONTENT FOR DADA
   Edit any text inside the quotes below. Save the file and refresh the page.
   ============================================================================ */

window.BIRTHDAY_CONTENT = {
  meta: {
    callHim: "Dada",
    turningAge: "53",
    birthdayDate: "",
    fromNames: "Mama, Z, Abu, Umar & Whiskey"
  },

  /* Optional background music (hidden automatically if file does not exist) */
  backgroundMusic: "assets/audio/music.mp3",

  /* Popup 1: Opening Surprise */
  intro: {
    dateBadge: "For Dada · Turning 53",
    headline: "SUPRISEEEE!!!!",
    subtitle: "From Mama, Z, Abu, Umar & Whiskey. We made this just for you.",
    buttonLabel: "Next"
  },

  /* Popups 2 to 5: Heartfelt & Fun Birthday Cards */
  cards: [
    {
      id: "toast",
      animationType: "balloons",
      eyebrow: "53 Today",
      title: "Happy Birthday, Dada!!!",
      body: "You spend every day looking out for us and making sure we have whatever we need. Today is all about celebrating you, relaxing, and feeling how loved you are by all of us.",
      highlight: "Today is yours, Dada—just sit back and enjoy it.",
      confettiOnOpen: true,
      nextLabel: "Next"
    },
    {
      id: "visits",
      animationType: "visits",
      eyebrow: "Whenever You Came Home",
      title: "You always knew how to spoil us",
      body: "Every single time you visited us, you turned it into a treat. Taking us out to watch movies, paying for big dinners, spoiling us with whatever sweets and chocolates we pointed at, and somehow always showing up with some weird new machine to help clean the house easier.",
      highlight: "We loved every bit of it (even the random cleaning gadgets).",
      confettiOnOpen: false,
      nextLabel: "Next"
    },
    {
      id: "miles",
      animationType: "flight",
      eyebrow: "From Abroad to Home",
      title: "Thank you for every year you worked for us",
      body: "Spending years working abroad meant missing out on time at home with us, and we know that wasn't easy on you. You gave up your own comfort and likes so we could have a great life, taught us right from wrong, pushed us to do our best, and always loved every one of us equally.",
      highlight: "We wouldn't be who we are and where we are, without everything you did for us.",
      confettiOnOpen: false,
      nextLabel: "Next"
    },
    {
      id: "favorites",
      animationType: "hobbies",
      eyebrow: "The Dada We Love",
      title: "Just you being you around the house",
      body: "Whether you're belting out karaoke, watching movies with us, trying to beat everyone at bowling, making a weird new food in the kitchen, or helping around the house, home just feels better with you around.",
      highlight: "Whiskey says happy birthday too.",
      confettiOnOpen: false,
      nextLabel: "Next"
    }
  ],

  /* Popup 6: Personal Notes & Wishes From Each Family Member */
  notes: {
    eyebrow: "Just For You",
    title: "Our birthday wishes for you, Dada",
    hint: "Tap each card to read our personal notes.",
    whiskeyNote: "Whiskey couldn't write a note (he's a cat).",
    allOpenedText: "U opened em all! Ready for your cake?",
    nextLabel: "Next",
    people: [
      {
        id: "mama",
        name: "Mama",
        role: "With all my love",
        handClass: "hand-mama",
        accent: "#FF595E",
        message: "Happy 53rd Birthday ❤️! Thank you for being our strength through all the years apart and always putting our family first. I pray this year brings you good health, peace, and plenty of happy moments together.(p.s i know mama's wish might not be long as ours but i hope you know that she loves you very much too, she just not good at writing it down like we did.)",
        wish: "Here is to celebrating many more birthdays side by side.",
        audio: "assets/audio/voice-mama.mp3"
      },
      {
        id: "z",
        name: "Z",
        role: "Your daughter",
        handClass: "hand-z",
        accent: "#E04F82",
        message: "Happy Birthday Dada!! Your guidance, love and support have made me the person I am today. You've pushed me to become the best version of myself, and i will always be grateful for that. You taught me to be independent, brave, and to never give up no matter what. Thank you for always believing in me, even when I didn't believe in myself. I wish you nothing but peace and happiness in the year ahead, and i love you very much ❤️",
        wish: "Love you so much, Dada.",
        audio: "assets/audio/voice-z.mp3"
      },
      {
        id: "abu",
        name: "Abu",
        role: "Your son",
        handClass: "hand-abu",
        accent: "#06B48A",
        message: "Happy Birthday dada!!🎉 Taking this moment to just say how truly grateful I am to have you in my life. Thank you for all the quiet sacrifices you’ve made, the constant guidance you’ve given us and for always having our backs no matter what. Everything I am today is built on the foundation and support you’ve provided. I hope this year brings you the same peace, happiness, and good health that you’ve always worked so hard to give to us. Have a wonderful birthday and the best year ahead!❤️",
        wish: "Hope you have an awesome day.",
        audio: "assets/audio/voice-abu.mp3"
      },
      {
        id: "umar",
        name: "Umar",
        role: "Your son",
        handClass: "hand-umar",
        accent: "#1982C4",
        message: "Happy Birthday Dada!!! Thanks for being the best father anyone could ever ask for, i know we dont say it much or show it, but we appreciate what you have done for us and how much you have sacrificed for us. From taking us out everytime you come to good dinners, to movies and fun day outs to teaching us what really matters in life and guiding us to get the best and do the best (and making wierd ass dishes). And also providing the best for us whether it came to education, clothes or food we eat. We are proud of how far you have come and how much you have done. I hope you find the peace you deserve after all these tireless years of grinding and may you have the best rest of your life. Wishing you nothing but the best! And i love you very much ❤️.",
        wish: "Wishing you the happiest 53rd birthday ever, Dada.",
        audio: "assets/audio/voice-umar.mp3"
      }
    ]
  },

  /* Popup 7: Interactive Birthday Cake */
  cake: {
    eyebrow: "Make a Wish",
    promptBefore: "Time to light the candles, Dada!",
    subpromptBefore: "Tap each candle (or hit Light All) while Whiskey watches.",
    promptAllLit: "Make a big wish and blow them out!",
    subpromptAllLit: "Tap or hold the button below.",
    promptAfter: "Happy 53rd Birthday, Dada!",
    subpromptAfter: "We hope every single wish comes true. We love you!",
    lightAllLabel: "Light All Candles",
    blowButtonLabel: "Blow Out Candles",
    nextLabel: "Next",
    candles: [
      { name: "Mama", handClass: "hand-mama", colour: "#FF595E" },
      { name: "Z", handClass: "hand-z", colour: "#E04F82" },
      { name: "Abu", handClass: "hand-abu", colour: "#06B48A" },
      { name: "Umar", handClass: "hand-umar", colour: "#1982C4" }
    ]
  },

  /* Popup 8: Finale Card */
  finale: {
    eyebrow: "53 Years of Dada",
    headline: "We love you so much, Dada ❤️",
    message: "Thank you for every sacrifice, every trip home, every movie and dinner, and every laugh. Have the happiest 53rd birthday—you deserve the absolute best.",
    signatures: [
      { name: "Mama", handClass: "hand-mama" },
      { name: "Z", handClass: "hand-z" },
      { name: "Abu", handClass: "hand-abu" },
      { name: "Umar", handClass: "hand-umar" }
    ],
    whiskeySign: "Whiskey",
    replayLabel: "Open Surprise Again"
  }
};
