import {AnimatePresence} from 'motion/react';
import {useCallback, useEffect, useState} from 'react';
import {CakePopup} from './components/CakePopup';
import {CelebrationCanvas} from './components/CelebrationCanvas';
import {FinalePopup} from './components/FinalePopup';
import {GiftIntroPopup} from './components/GiftIntroPopup';
import {MusicToggle} from './components/MusicToggle';
import {NotesPopup} from './components/NotesPopup';
import {StoryPopup} from './components/StoryPopup';
import {getBirthdayContent} from './defaultContent';

const BUNTING_FLAGS = [
  {x: 20, fill: '#E63946'},
  {x: 84, fill: '#FFB703'},
  {x: 148, fill: '#06B48A'},
  {x: 212, fill: '#1982C4'},
  {x: 276, fill: '#E04F82'},
  {x: 340, fill: '#FFB703'},
  {x: 404, fill: '#E63946'},
  {x: 468, fill: '#06B48A'},
  {x: 532, fill: '#1982C4'},
  {x: 596, fill: '#E04F82'},
];

export default function App() {
  const content = getBirthdayContent();
  const totalSteps = 1 + content.cards.length + 3;

  const [step, setStep] = useState(0);
  const [sessionKey, setSessionKey] = useState(0);
  const [confettiTrigger, setConfettiTrigger] = useState(1);

  useEffect(() => {
    const handleVisibility = () => {
      document.documentElement.classList.toggle('is-tab-hidden', document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const triggerConfetti = useCallback(() => {
    setConfettiTrigger((n) => n + 1);
  }, []);

  const goToStep = (nextStep: number) => {
    setStep(Math.max(0, Math.min(totalSteps - 1, nextStep)));
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const handleReplay = () => {
    setSessionKey((k) => k + 1);
    setConfettiTrigger((n) => n + 1);
    setStep(0);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const storyCount = content.cards.length;
  const notesStep = 1 + storyCount;
  const cakeStep = notesStep + 1;
  const finaleStep = cakeStep + 1;

  return (
    <div className={`celebration-shell ${step > 0 ? 'is-popup-mode' : ''}`}>
      <div className="bunting-bar" aria-hidden="true">
        <svg className="bunting-svg" viewBox="0 0 640 58" preserveAspectRatio="none">
          <path d="M0 9 Q160 24 320 9 T640 9" fill="none" stroke="rgba(100, 83, 89, 0.35)" strokeWidth="1.8" />
          {BUNTING_FLAGS.map((flag, idx) => (
            <polygon
              key={idx}
              className="bunting-flag"
              points={`${flag.x},11 ${flag.x + 28},11 ${flag.x + 14},42`}
              fill={flag.fill}
              opacity="0.92"
            />
          ))}
        </svg>
      </div>

      {/* 60fps Canvas Engine: Continuous Falling Confetti, Rising Hearts & Burst Cannons */}
      <CelebrationCanvas burstTrigger={confettiTrigger} />

      <MusicToggle src={content.backgroundMusic} />

      <main className={step === 0 ? 'landing-main' : 'popup-stage'}>
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <GiftIntroPopup
              key={`intro-${sessionKey}`}
              dateBadge={content.intro.dateBadge}
              headline={content.intro.headline}
              subtitle={content.intro.subtitle}
              prefersReducedMotion={false}
              onTriggerConfetti={triggerConfetti}
              onOpen={() => goToStep(1)}
            />
          ) : (
            <div key="popup-card-frame" className="popup-card-wrap">
              <AnimatePresence mode="wait">
                {step >= 1 && step <= storyCount ? (
                  <StoryPopup
                    key={`story-${sessionKey}-${step}`}
                    card={content.cards[step - 1]}
                    prefersReducedMotion={false}
                    onTriggerConfetti={triggerConfetti}
                    onBack={() => goToStep(step - 1)}
                    onNext={() => goToStep(step + 1)}
                  />
                ) : null}

                {step === notesStep ? (
                  <NotesPopup
                    key={`notes-${sessionKey}`}
                    eyebrow={content.notes.eyebrow}
                    title={content.notes.title}
                    hint={content.notes.hint}
                    whiskeyNote={content.notes.whiskeyNote}
                    allOpenedText={content.notes.allOpenedText}
                    nextLabel={content.notes.nextLabel}
                    people={content.notes.people}
                    prefersReducedMotion={false}
                    onTriggerConfetti={triggerConfetti}
                    onBack={() => goToStep(step - 1)}
                    onNext={() => goToStep(step + 1)}
                  />
                ) : null}

                {step === cakeStep ? (
                  <CakePopup
                    key={`cake-${sessionKey}`}
                    eyebrow={content.cake.eyebrow}
                    promptBefore={content.cake.promptBefore}
                    subpromptBefore={content.cake.subpromptBefore}
                    promptAllLit={content.cake.promptAllLit}
                    subpromptAllLit={content.cake.subpromptAllLit}
                    promptAfter={content.cake.promptAfter}
                    subpromptAfter={content.cake.subpromptAfter}
                    lightAllLabel={content.cake.lightAllLabel}
                    blowButtonLabel={content.cake.blowButtonLabel}
                    nextLabel={content.cake.nextLabel}
                    candles={content.cake.candles}
                    prefersReducedMotion={false}
                    onTriggerConfetti={triggerConfetti}
                    onBack={() => goToStep(step - 1)}
                    onNext={() => goToStep(step + 1)}
                  />
                ) : null}

                {step === finaleStep ? (
                  <FinalePopup
                    key={`finale-${sessionKey}`}
                    eyebrow={content.finale.eyebrow}
                    headline={content.finale.headline}
                    message={content.finale.message}
                    signatures={content.finale.signatures}
                    whiskeySign={content.finale.whiskeySign}
                    replayLabel={content.finale.replayLabel}
                    prefersReducedMotion={false}
                    onTriggerConfetti={triggerConfetti}
                    onReplay={handleReplay}
                  />
                ) : null}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>
      </main>

      <div className="step-progress-row">
        <div className="step-dots" aria-hidden="true">
          {Array.from({length: totalSteps}).map((_, idx) => (
            <span
              key={idx}
              className={`step-dot ${idx === step ? 'is-active' : idx < step ? 'is-done' : ''}`}
            />
          ))}
        </div>
        <span className="step-caption">
          {step + 1} of {totalSteps}
        </span>
      </div>
    </div>
  );
}
