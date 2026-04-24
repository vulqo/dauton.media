'use client';

import { useState, FormEvent } from 'react';

type Mode = 'login' | 'signup';

export default function AuthPage() {
  const [m, setM] = useState<Mode>('login');
  const isSignup = m === 'signup';

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Stub. Auth wiring is future work.
  };

  return (
    <main className="dm-auth">
      <div className="dm-auth-split">
        <aside className="dm-auth-aside">
          <div className="dm-auth-brand">
            <div className="dm-auth-mono">D</div>
            <div>
              <div className="dm-auth-logo">DAUTON MEDIA</div>
              <div className="dm-auth-tag">Archivo · Discovery · Editorial</div>
            </div>
          </div>
          <div className="dm-auth-hero-copy">
            <h1>{isSignup ? 'Únete a la escena.' : 'Bienvenido de vuelta.'}</h1>
            <p>
              {isSignup
                ? 'Crea tu perfil profesional, reclama créditos, publica tu merch y conecta con la escena en toda Latinoamérica y España.'
                : 'Accede a tu perfil, tu tienda, tus contribuciones y tus conversaciones.'}
            </p>
          </div>
          <div className="dm-auth-badges">
            <div className="dm-auth-badge"><b>14</b>ciudades activas</div>
            <div className="dm-auth-badge"><b>2.1K</b>artistas</div>
            <div className="dm-auth-badge"><b>18K</b>miembros</div>
          </div>
        </aside>

        <section className="dm-auth-form-wrap">
          <div className="dm-auth-tabs">
            <button
              type="button"
              className={`dm-auth-tab${!isSignup ? ' active' : ''}`}
              onClick={() => setM('login')}
            >
              INICIAR SESIÓN
            </button>
            <button
              type="button"
              className={`dm-auth-tab${isSignup ? ' active' : ''}`}
              onClick={() => setM('signup')}
            >
              CREAR CUENTA
            </button>
          </div>

          <form className="dm-auth-form" onSubmit={onSubmit}>
            {isSignup && (
              <label className="dm-auth-field">
                <span>Nombre o alias</span>
                <input type="text" placeholder="Ej: Canserbero, Apache, Trueno…" required />
              </label>
            )}
            <label className="dm-auth-field">
              <span>Email</span>
              <input type="email" placeholder="tu@email.com" required />
            </label>
            <label className="dm-auth-field">
              <span>Contraseña</span>
              <input type="password" placeholder={isSignup ? 'mínimo 8 caracteres' : '••••••••'} required />
            </label>

            {!isSignup && (
              <div className="dm-auth-row">
                <label className="dm-auth-check">
                  <input type="checkbox" defaultChecked /> Recordarme
                </label>
                <a className="dm-auth-link" onClick={() => {}}>¿Olvidaste la contraseña?</a>
              </div>
            )}

            {isSignup && (
              <label className="dm-auth-check dm-auth-tos">
                <input type="checkbox" required /> Acepto los <a onClick={() => {}}>Términos</a> y la <a onClick={() => {}}>Política de Privacidad</a>
              </label>
            )}

            <button type="submit" className="dm-btn dm-btn-primary dm-auth-submit">
              {isSignup ? 'CREAR CUENTA' : 'ENTRAR'}
            </button>

            <div className="dm-auth-sep"><span>O CONTINUAR CON</span></div>

            <div className="dm-auth-social">
              <button type="button" className="dm-btn dm-btn-ghost" onClick={() => {}}>Google</button>
              <button type="button" className="dm-btn dm-btn-ghost" onClick={() => {}}>Apple</button>
              <button type="button" className="dm-btn dm-btn-ghost" onClick={() => {}}>Spotify</button>
            </div>

            <p className="dm-auth-switch">
              {isSignup ? '¿Ya tienes cuenta?' : '¿Aún no tienes cuenta?'}{' '}
              <a onClick={() => setM(isSignup ? 'login' : 'signup')}>
                {isSignup ? 'Inicia sesión' : 'Regístrate'}
              </a>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
