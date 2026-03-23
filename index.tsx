import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

/* ─────────────────────────────────────────────
   Rigby ($RIGBY) Landing Page — narrated by the cat himself
   ───────────────────────────────────────────── */

const CONTRACT_ADDRESS = 'BF5ZHcVKUnHNLLtjTYdUnbUsvWLfUa9f11nE9iqSbonk';
const DEX_URL = `https://dexscreener.com/solana/${CONTRACT_ADDRESS}`;
const BONK_URL = `https://www.bonk.fun/token/${CONTRACT_ADDRESS}`;

const ORANGE = '#FF6600';
const ORANGE_LIGHT = '#FF8C42';
const ORANGE_DIM = 'rgba(255, 102, 0, 0.15)';
const ORANGE_BORDER = 'rgba(255, 102, 0, 0.25)';

// ── Animated Aurora Background ──
function AuroraBackground() {
  return (
    <>
      <div className="aurora-wrap">
        <div className="blob blob1" />
        <div className="blob blob2" />
        <div className="blob blob3" />
        <div className="blob blob4" />
        <div className="blob blob5" />
        <div className="noise-overlay" />
      </div>
    </>
  );
}

// ── Nav ──
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkStyle: React.CSSProperties = {
    color: 'rgba(255,255,255,0.7)',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: '0.5px',
    transition: 'color 0.2s',
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 1000,
      height: 70,
      padding: '0 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: scrolled ? 'rgba(6, 3, 16, 0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      borderBottom: scrolled ? `1px solid ${ORANGE_BORDER}` : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="/hero.jpg" alt="Rigby" style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${ORANGE}` }} />
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 22,
          fontWeight: 800,
          background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_LIGHT})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.5px',
        }}>
          RIGBY
        </span>
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          color: ORANGE,
          border: `1px solid ${ORANGE_BORDER}`,
          borderRadius: 4,
          padding: '2px 6px',
        }}>
          $RIGBY
        </span>
      </div>

      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <a href="#about" style={linkStyle}>About</a>
        <a href="#gallery" style={linkStyle}>Gallery</a>
        <a href="#tokenomics" style={linkStyle}>Tokenomics</a>
        <a
          href={DEX_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '10px 24px',
            background: `linear-gradient(135deg, ${ORANGE}, #cc5200)`,
            color: '#fff',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 14,
            textDecoration: 'none',
            boxShadow: `0 0 24px rgba(255,102,0,0.4)`,
            letterSpacing: '0.5px',
          }}>
          Buy $RIGBY
        </a>
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="mobile-menu-btn"
        style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 24, height: 2,
            background: ORANGE,
            marginBottom: i < 2 ? 6 : 0,
            transition: 'all 0.3s',
            opacity: menuOpen && i === 1 ? 0 : 1,
            transform: menuOpen && i === 0 ? 'rotate(45deg) translate(5px, 5px)' : menuOpen && i === 2 ? 'rotate(-45deg) translate(6px, -6px)' : 'none',
          }} />
        ))}
      </button>

      {menuOpen && (
        <div style={{
          position: 'fixed', top: 70, left: 0, right: 0,
          background: 'rgba(6,3,16,0.98)',
          backdropFilter: 'blur(24px)',
          padding: '24px',
          display: 'flex', flexDirection: 'column', gap: 20,
          borderBottom: `1px solid ${ORANGE_BORDER}`,
          zIndex: 999,
        }}>
          {['about', 'gallery', 'tokenomics'].map(id => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 18, textTransform: 'capitalize' }}>
              {id}
            </a>
          ))}
          <a
            href={DEX_URL} target="_blank" rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{
              padding: '14px 24px',
              background: `linear-gradient(135deg, ${ORANGE}, #cc5200)`,
              color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: 16,
              textDecoration: 'none', textAlign: 'center',
            }}>
            Buy $RIGBY
          </a>
        </div>
      )}
    </nav>
  );
}

// ── Copy Button ──
function CopyCA({ style }: { style?: React.CSSProperties }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div
      onClick={copy}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 20px',
        background: ORANGE_DIM,
        border: `1px solid ${ORANGE_BORDER}`,
        borderRadius: 12,
        cursor: 'pointer',
        transition: 'all 0.2s',
        maxWidth: '90vw',
        ...style,
      }}>
      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>CA:</span>
      <span style={{
        fontSize: 'clamp(10px, 1.4vw, 13px)',
        fontFamily: 'monospace',
        color: 'rgba(255,255,255,0.7)',
        wordBreak: 'break-all',
      }}>
        {CONTRACT_ADDRESS}
      </span>
      <span style={{ fontSize: 12, color: copied ? '#4ade80' : ORANGE, fontWeight: 700, whiteSpace: 'nowrap' }}>
        {copied ? '✓ Copied' : 'Copy'}
      </span>
    </div>
  );
}

// ── Hero ──
function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '120px 24px 80px',
      position: 'relative', overflow: 'hidden',
      textAlign: 'center',
    }}>
      {/* Main cat image */}
      <div style={{
        position: 'relative',
        marginBottom: 40,
        animation: 'float 7s ease-in-out infinite',
      }}>
        <div style={{
          position: 'absolute', inset: -24,
          background: `radial-gradient(circle, rgba(255,102,0,0.35) 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(12px)',
        }} />
        <img
          src="/hero.jpg"
          alt="Rigby"
          style={{
            width: 220, height: 220,
            borderRadius: '50%',
            objectFit: 'cover',
            border: `3px solid rgba(255,102,0,0.5)`,
            filter: 'drop-shadow(0 0 40px rgba(255,102,0,0.5))',
            position: 'relative',
          }}
        />
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(72px, 14vw, 148px)',
        fontWeight: 800,
        lineHeight: 0.88,
        marginBottom: 24,
        background: `linear-gradient(135deg, #ffffff 0%, ${ORANGE_LIGHT} 45%, ${ORANGE} 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-4px',
        filter: 'drop-shadow(0 0 40px rgba(255,102,0,0.3))',
      }}>
        RIGBY
      </h1>

      <p style={{
        fontSize: 'clamp(11px, 1.6vw, 14px)',
        color: 'rgba(255,255,255,0.4)',
        fontWeight: 600,
        letterSpacing: '6px',
        textTransform: 'uppercase',
        marginBottom: 20,
      }}>
        The Legendary Cat
      </p>

      {/* Cat-narrated tagline */}
      <div style={{
        background: 'rgba(255,102,0,0.06)',
        border: '1px solid rgba(255,102,0,0.18)',
        borderRadius: 16,
        padding: '20px 32px',
        maxWidth: 600,
        marginBottom: 44,
      }}>
        <p style={{
          fontSize: 'clamp(14px, 1.8vw, 18px)',
          color: 'rgba(255,255,255,0.85)',
          lineHeight: 1.8,
          fontStyle: 'italic',
          margin: 0,
        }}>
          "Yeah, I flew the F-22. Stared down a tiger. Wore the mane.
          Took the UFO past the moon. <span style={{ color: ORANGE, fontStyle: 'normal', fontWeight: 700 }}>Just Tuesday stuff.</span>
          And now I'm on Solana. You're welcome."
        </p>
        <p style={{ margin: '12px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase' }}>— Rigby</p>
      </div>

      {/* CTA Buttons */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }}>
        <a
          href={DEX_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '16px 44px',
            background: `linear-gradient(135deg, ${ORANGE}, #cc5200)`,
            color: '#fff',
            borderRadius: 12,
            fontWeight: 800,
            fontSize: 16,
            textDecoration: 'none',
            boxShadow: `0 0 50px rgba(255,102,0,0.45), inset 0 1px 0 rgba(255,255,255,0.15)`,
            letterSpacing: '0.5px',
          }}>
          Buy on DexScreener
        </a>
        <a
          href={BONK_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '16px 44px',
            background: 'rgba(255,255,255,0.04)',
            color: ORANGE,
            border: `1px solid ${ORANGE_BORDER}`,
            borderRadius: 12,
            fontWeight: 700,
            fontSize: 16,
            textDecoration: 'none',
            letterSpacing: '0.5px',
            backdropFilter: 'blur(8px)',
          }}>
          Buy on Bonk
        </a>
      </div>

      <CopyCA />

      <div style={{
        position: 'absolute', bottom: 36, left: '50%',
        transform: 'translateX(-50%)',
        animation: 'bounce 2s infinite',
        opacity: 0.4,
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}

// ── About ──
function About() {
  return (
    <section id="about" style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 56,
        alignItems: 'center',
      }}>
        <div>
          <p style={{
            fontSize: 12, fontWeight: 700, color: ORANGE,
            letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 16,
          }}>
            From the cat himself
          </p>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: 28,
          }}>
            Not just a cat.
            <br />
            <span style={{ color: ORANGE }}>A whole moment.</span>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, marginBottom: 20, fontStyle: 'italic' }}>
            "I've flown F-22s at Mach 2. I've stared down tigers and made them feel bad about it.
            I wore a full lion mane in the Serengeti — no one said anything.
            I've been to the moon. In a UFO. I was driving."
          </p>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.9 }}>
            Rigby isn't just a meme. He's a lifestyle.{' '}
            <span style={{ color: ORANGE, fontWeight: 600 }}>$RIGBY</span> is for everyone who's ever looked at a challenge and thought:
            <em style={{ color: 'rgba(255,255,255,0.75)' }}> "yeah, I got this."</em>
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: -16,
              background: `radial-gradient(circle, rgba(255,102,0,0.2) 0%, transparent 70%)`,
              borderRadius: 28,
              filter: 'blur(20px)',
            }} />
            <img
              src="/lion.jpg"
              alt="Rigby the Lion"
              style={{
                maxWidth: '100%',
                width: 420,
                borderRadius: 20,
                position: 'relative',
                border: '1px solid rgba(255,102,0,0.15)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Gallery ──
const GALLERY_ITEMS = [
  { src: '/pilot.jpg', label: 'Top Gun Rigby', desc: '"They said I couldn\'t fly it. I flew two."' },
  { src: '/tiger.jpg', label: 'The Tiger Incident', desc: '"He blinked first."' },
  { src: '/lion.jpg', label: 'King of the Savanna', desc: '"The mane? It\'s real. Don\'t ask."' },
  { src: '/rock.jpg', label: 'Rock God Era', desc: '"No notes. Masterpiece."' },
  { src: '/ufo.jpg', label: 'Going to the Moon', desc: '"Already been. Going back."' },
];

function Gallery() {
  return (
    <section id="gallery" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <p style={{
        fontSize: 12, fontWeight: 700, color: ORANGE,
        letterSpacing: '3px', textTransform: 'uppercase',
        textAlign: 'center', marginBottom: 16,
      }}>
        The Saga
      </p>
      <h2 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(32px, 4vw, 52px)',
        fontWeight: 800,
        textAlign: 'center',
        marginBottom: 12,
      }}>
        Rigby's <span style={{ color: ORANGE }}>Greatest Hits</span>
      </h2>
      <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: 15, marginBottom: 60, fontStyle: 'italic' }}>
        "A documentary. Five chapters. All true. Mostly."
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 20,
      }}>
        {GALLERY_ITEMS.map((item, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: `1px solid rgba(255,255,255,0.06)`,
              borderRadius: 16,
              overflow: 'hidden',
              transition: 'transform 0.25s, border-color 0.25s, box-shadow 0.25s',
              cursor: 'default',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = 'translateY(-8px)';
              el.style.borderColor = ORANGE_BORDER;
              el.style.boxShadow = `0 20px 60px rgba(255,102,0,0.15)`;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = 'translateY(0)';
              el.style.borderColor = 'rgba(255,255,255,0.06)';
              el.style.boxShadow = 'none';
            }}
          >
            <div style={{ overflow: 'hidden', height: 280 }}>
              <img
                src={item.src}
                alt={item.label}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s',
                  display: 'block',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </div>
            <div style={{ padding: '20px 22px' }}>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700, fontSize: 17, marginBottom: 6, color: '#fff',
              }}>
                {item.label}
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', fontStyle: 'italic' }}>
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Tokenomics ──
function Tokenomics() {
  const stats = [
    { label: 'Ticker', value: '$RIGBY', sub: 'The one. The only.' },
    { label: 'Chain', value: 'Solana', sub: 'Fast. Like me.' },
    { label: 'Supply', value: '1 Billion', sub: 'One for every life.' },
    { label: 'Tax', value: '0%', sub: 'Cats don\'t pay taxes.' },
  ];

  return (
    <section id="tokenomics" style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <p style={{
        fontSize: 12, fontWeight: 700, color: ORANGE,
        letterSpacing: '3px', textTransform: 'uppercase',
        textAlign: 'center', marginBottom: 16,
      }}>
        Token Info
      </p>
      <h2 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(32px, 4vw, 52px)',
        fontWeight: 800,
        textAlign: 'center',
        marginBottom: 12,
      }}>
        Simple. <span style={{ color: ORANGE }}>Clean.</span> Rigby.
      </h2>
      <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: 15, marginBottom: 56, fontStyle: 'italic' }}>
        "I don't do complicated. That's for dogs."
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 20,
        marginBottom: 40,
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            background: ORANGE_DIM,
            border: `1px solid ${ORANGE_BORDER}`,
            borderRadius: 16,
            padding: '32px 24px',
            textAlign: 'center',
            transition: 'transform 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'}
          >
            <div style={{
              fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)',
              letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 12,
            }}>
              {s.label}
            </div>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(22px, 3vw, 30px)',
              fontWeight: 800, color: ORANGE, marginBottom: 8,
            }}>
              {s.value}
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>
              {s.sub}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CopyCA />
      </div>
    </section>
  );
}

// ── CTA Banner ──
function CTABanner() {
  return (
    <section style={{
      padding: '80px 24px',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: 28,
      position: 'relative', overflow: 'hidden',
      textAlign: 'center',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(255,102,0,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <img
        src="/ufo.jpg"
        alt="Rigby to the moon"
        style={{
          width: 'min(360px, 85vw)',
          borderRadius: 20,
          filter: `drop-shadow(0 0 80px rgba(255,102,0,0.35))`,
          animation: 'float 8s ease-in-out infinite',
          border: '1px solid rgba(255,102,0,0.15)',
        }}
      />

      <h2 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(28px, 5vw, 60px)',
        fontWeight: 800,
        lineHeight: 1.1,
        maxWidth: 700,
      }}>
        I'm going back to the moon.
        <br />
        <span style={{ color: ORANGE }}>Keep up.</span>
      </h2>

      <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.45)', maxWidth: 480, lineHeight: 1.7, fontStyle: 'italic' }}>
        "Third time's the charm. Grab your $RIGBY and strap in."
      </p>

      <a
        href={DEX_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          padding: '18px 60px',
          background: `linear-gradient(135deg, ${ORANGE}, #cc5200)`,
          color: '#fff',
          borderRadius: 14,
          fontWeight: 800,
          fontSize: 18,
          textDecoration: 'none',
          boxShadow: `0 0 70px rgba(255,102,0,0.5)`,
          letterSpacing: '0.5px',
        }}>
        Buy $RIGBY Now
      </a>
    </section>
  );
}

// ── Footer ──
function Footer() {
  return (
    <footer style={{
      padding: '56px 24px',
      borderTop: `1px solid rgba(255,102,0,0.08)`,
      maxWidth: 1100,
      margin: '0 auto',
    }}>
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 20,
        textAlign: 'center',
      }}>
        <img src="/hero.jpg" alt="Rigby" style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${ORANGE}` }} />
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 20, fontWeight: 800, color: ORANGE,
        }}>
          RIGBY ($RIGBY)
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href={DEX_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>DexScreener</a>
          <a href={BONK_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Buy on Bonk</a>
        </div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', fontStyle: 'italic', maxWidth: 400 }}>
          "Not financial advice. I'm a cat." — Rigby
        </p>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.12)', marginTop: -8 }}>
          $RIGBY is a meme coin with no intrinsic value.
        </p>
      </div>
    </footer>
  );
}

// ── Global Styles ──
function GlobalStyles() {
  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        background: #060310;
        color: #fff;
        font-family: 'Inter', system-ui, sans-serif;
        overflow-x: hidden;
      }

      /* ── Aurora background ── */
      .aurora-wrap {
        position: fixed;
        inset: 0;
        z-index: 0;
        overflow: hidden;
        pointer-events: none;
      }

      .blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        opacity: 0.55;
        mix-blend-mode: screen;
      }

      .blob1 {
        width: 700px; height: 700px;
        background: radial-gradient(circle, #ff6600 0%, transparent 70%);
        top: -200px; left: -200px;
        animation: drift1 18s ease-in-out infinite;
      }
      .blob2 {
        width: 600px; height: 600px;
        background: radial-gradient(circle, #7c3aed 0%, transparent 70%);
        top: 20%; right: -150px;
        animation: drift2 22s ease-in-out infinite;
        opacity: 0.45;
      }
      .blob3 {
        width: 500px; height: 500px;
        background: radial-gradient(circle, #db2777 0%, transparent 70%);
        bottom: 10%; left: 20%;
        animation: drift3 16s ease-in-out infinite;
        opacity: 0.35;
      }
      .blob4 {
        width: 400px; height: 400px;
        background: radial-gradient(circle, #0ea5e9 0%, transparent 70%);
        bottom: 30%; right: 10%;
        animation: drift4 20s ease-in-out infinite;
        opacity: 0.25;
      }
      .blob5 {
        width: 800px; height: 800px;
        background: radial-gradient(circle, #ff4500 0%, transparent 60%);
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        animation: drift5 25s ease-in-out infinite;
        opacity: 0.12;
      }

      /* dark overlay so text stays readable */
      .noise-overlay {
        position: absolute;
        inset: 0;
        background: rgba(6, 3, 16, 0.72);
      }

      @keyframes drift1 {
        0%,100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(120px, 80px) scale(1.1); }
        66% { transform: translate(-60px, 140px) scale(0.95); }
      }
      @keyframes drift2 {
        0%,100% { transform: translate(0, 0) scale(1); }
        40% { transform: translate(-140px, 100px) scale(1.15); }
        70% { transform: translate(60px, -80px) scale(0.9); }
      }
      @keyframes drift3 {
        0%,100% { transform: translate(0, 0) scale(1); }
        30% { transform: translate(100px, -60px) scale(1.1); }
        70% { transform: translate(-80px, 80px) scale(1.05); }
      }
      @keyframes drift4 {
        0%,100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-120px, -100px) scale(1.2); }
      }
      @keyframes drift5 {
        0%,100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.3); }
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-18px); }
      }
      @keyframes bounce {
        0%, 100% { transform: translateX(-50%) translateY(0); }
        50% { transform: translateX(-50%) translateY(-8px); }
      }

      a:hover { opacity: 0.82; }

      @media (max-width: 768px) {
        .nav-links { display: none !important; }
        .mobile-menu-btn { display: block !important; }
      }

      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: #060310; }
      ::-webkit-scrollbar-thumb { background: rgba(255,102,0,0.25); border-radius: 3px; }
      ::-webkit-scrollbar-thumb:hover { background: rgba(255,102,0,0.45); }
      ::selection { background: rgba(255,102,0,0.35); color: #fff; }
    `}</style>
  );
}

// ── App ──
function App() {
  return (
    <>
      <GlobalStyles />
      <AuroraBackground />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Nav />
        <Hero />
        <About />
        <Gallery />
        <Tokenomics />
        <CTABanner />
        <Footer />
      </div>
    </>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
