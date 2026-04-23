'use client';

import { useState } from 'react';

interface OnboardingPageProps {
  go: (view: string) => void;
}

interface RoleOption {
  k: string;
  l: string;
  d: string;
}

const ROLE_OPTIONS: RoleOption[] = [
  { k: 'mc', l: 'MC / Artist', d: 'Lyrics, live shows, features' },
  { k: 'prod', l: 'Producer / Beatmaker', d: 'Beats, mixes, stems' },
  { k: 'dj', l: 'DJ', d: 'Sets, residencies, radio' },
  { k: 'foto', l: 'Photo / Video', d: 'Press, video clip, documentary' },
  { k: 'disenador', l: 'Designer', d: 'Cover art, identity, flyers' },
  { k: 'fan', l: 'Fan / Archivist', d: 'Consumption, collection, research' },
];

const CITIES = ['Caracas', 'Maracay', 'Valencia', 'Merida', 'Barquisimeto', 'Maracaibo'];

const STEPS = ['ACCOUNT', 'PROFILE', 'CITY', 'VERIFY'];

export default function OnboardingPage({ go }: OnboardingPageProps) {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [city, setCity] = useState('');

  return (
    <main className="dm-onb">
      <div className="dm-onb-steps">
        {STEPS.map((s, i) => (
          <div
            key={s}
            className={
              'dm-onb-step ' + (i < step ? 'is-done' : i === step ? 'is-on' : '')
            }
          />
        ))}
      </div>

      {step === 0 && (
        <>
          <div className="dm-onb-label">STEP 1 / 4 · ACCOUNT</div>
          <h1 className="dm-onb-title">Become a member.</h1>
          <p className="dm-onb-sub">Support the archive. Contribute. Connect with the scene.</p>
          <div className="dm-onb-field">
            <label className="dm-modal-label">EMAIL</label>
            <input
              className="dm-input"
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="dm-onb-guard">
            <b>MEMBERSHIP · $5/MONTH</b>
            Access to extended editorial, drop notifications, verified profile, and the ability to
            contribute to the archive with visible credit.
          </div>
          <div className="dm-onb-cta">
            <button className="dm-onb-back" onClick={() => go('home')}>
              ← Back
            </button>
            <button className="dm-btn dm-btn-primary" onClick={() => setStep(1)}>
              CONTINUE →
            </button>
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <div className="dm-onb-label">STEP 2 / 4 · PROFILE</div>
          <h1 className="dm-onb-title">Your role in the scene.</h1>
          <p className="dm-onb-sub">
            Optional but useful. Personalize your experience and unlock features relevant to your
            activity.
          </p>
          <div className="dm-role-grid">
            {ROLE_OPTIONS.map((r) => (
              <div
                key={r.k}
                className={'dm-role-opt ' + (role === r.k ? 'is-on' : '')}
                onClick={() => setRole(r.k)}
              >
                <div className="dm-role-opt-dot" />
                <div>
                  <div className="dm-role-opt-lbl">{r.l}</div>
                  <div className="dm-role-opt-desc">{r.d}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="dm-onb-cta">
            <button className="dm-onb-back" onClick={() => setStep(0)}>
              ← Back
            </button>
            <button className="dm-btn dm-btn-primary" onClick={() => setStep(2)}>
              CONTINUE →
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="dm-onb-label">STEP 3 / 4 · CITY</div>
          <h1 className="dm-onb-title">Your home city.</h1>
          <p className="dm-onb-sub">
            Connect with your local scene. You will receive updates on nearby artists, events, and
            drops.
          </p>
          <div className="dm-onb-field">
            <label className="dm-modal-label">CITY</label>
            <input
              className="dm-input"
              placeholder="Caracas, Maracay, Valencia…"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <div className="dm-onb-hint">You can also follow multiple cities from your profile.</div>
          </div>
          <div className="dm-onb-field-row" style={{ marginTop: 16 }}>
            {CITIES.map((c) => (
              <div
                key={c}
                className={'dm-role-opt ' + (city === c ? 'is-on' : '')}
                onClick={() => setCity(c)}
                style={{ gridColumn: 'unset' }}
              >
                <div className="dm-role-opt-dot" />
                <div className="dm-role-opt-lbl">{c}</div>
              </div>
            ))}
          </div>
          <div className="dm-onb-cta">
            <button className="dm-onb-back" onClick={() => setStep(1)}>
              ← Back
            </button>
            <button className="dm-btn dm-btn-primary" onClick={() => setStep(3)}>
              CONTINUE →
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <div className="dm-onb-label">STEP 4 / 4 · VERIFY</div>
          <h1 className="dm-onb-title">Confirm your email.</h1>
          <p className="dm-onb-sub">
            We sent a 6-digit code to {email || 'your email'}.
          </p>
          <div className="dm-onb-otp">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <input key={i} maxLength={1} inputMode="numeric" pattern="[0-9]*" />
            ))}
          </div>
          <div className="dm-onb-hint">
            Did not receive it? <a>Resend code</a> · Valid for 10 minutes.
          </div>

          <div className="dm-onb-identity">
            <h3>YOUR PROFILE</h3>
            <ul>
              <li>
                <span>Email</span>
                <b>{email || '—'}</b>
              </li>
              <li>
                <span>Role</span>
                <b>{role || '—'}</b>
              </li>
              <li>
                <span>City</span>
                <b>{city || '—'}</b>
              </li>
              <li>
                <span>Plan</span>
                <b style={{ color: '#ffce37' }}>MEMBER · $5/MONTH</b>
              </li>
            </ul>
          </div>

          <div className="dm-onb-cta">
            <button className="dm-onb-back" onClick={() => setStep(2)}>
              ← Back
            </button>
            <button className="dm-btn dm-btn-primary" onClick={() => go('home')}>
              CONFIRM →
            </button>
          </div>
        </>
      )}
    </main>
  );
}
