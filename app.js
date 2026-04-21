/* ═══════════════════════════════════════════════════════════════
   EMAILJS CONFIGURATION  ← NEW
   ─────────────────────────────────────────────────────────────
   1. Go to https://emailjs.com → your account
   2. Paste your keys below:
   ═══════════════════════════════════════════════════════════════ */
const EMAILJS_PUBLIC_KEY  = 'SESVPWMa2NEcNrPlS';     // ← paste here
const EMAILJS_SERVICE_ID  = 'service_ka3ranh';     // ← paste here
const EMAILJS_TEMPLATE_ID = 'template_tks6ge8';   // ← already set

/* ═══════════════════════════════════════════════════════════════
   SUPABASE CONFIGURATION
   ─────────────────────────────────────────────────────────────
   1. Go to https://supabase.com → your project
   2. Settings → API → copy Project URL and anon public key
   3. Paste them below
   4. In Supabase SQL Editor, run this EXACT SQL:

      -- Drop old table if it exists with wrong schema
      drop table if exists maryam_replies;

      create table maryam_replies (
        id         uuid default gen_random_uuid() primary key,
        message    text not null,
        created_at timestamp with time zone default now()
      );

      -- Enable RLS
      alter table maryam_replies enable row level security;

      -- Allow anyone to INSERT
      create policy "allow_insert"
        on maryam_replies
        for insert
        to anon
        with check (true);

      -- Allow anyone to SELECT their own inserts (needed for .select() after insert)
      create policy "allow_select"
        on maryam_replies
        for select
        to anon
        using (true);

   5. To READ her replies: go to Supabase → Table Editor → maryam_replies
   ═══════════════════════════════════════════════════════════════ */
const SUPABASE_URL  = 'https://mcqxusfbqoqthzztqrur.supabase.co';   // ← Replace this
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jcXh1c2ZicW9xdGh6enRxcnVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3NTgwMDYsImV4cCI6MjA5MjMzNDAwNn0.CWc1AdzvwdjHSjiwemF5RdghvIl4qboOBj4SmEb_0WE';       // ← Replace this

/* ═══════════════════════════════════════════════════════════════
   PARTICLE SYSTEM
   ═══════════════════════════════════════════════════════════════ */
(function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx    = canvas.getContext('2d');
  let W, H, particles;

  const COLORS = ['#c4796a','#b8945a','#d4a98a','#c4b09a','#a88070'];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function mkParticle() {
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -Math.random() * 0.25 - 0.05,
      a:  Math.random() * 0.5 + 0.1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: 55 }, mkParticle);
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) { Object.assign(p, mkParticle(), { y: H + 5 }); }
      if (p.x < -10 || p.x > W + 10) p.vx *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.a;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', resize);
  init();
  tick();
})();

/* ═══════════════════════════════════════════════════════════════
   PETAL RING (cover decoration)
   ═══════════════════════════════════════════════════════════════ */
(function drawPetals() {
  const ring = document.getElementById('petal-ring');
  const count = 12;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 380 380');
  svg.setAttribute('width',  '380');
  svg.setAttribute('height', '380');
  svg.style.cssText = 'position:absolute;inset:0;opacity:0;animation:fadeUp 1.4s ease 0.1s both';

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * 360;
    const r     = 160;
    const cx    = 190 + r * Math.cos((angle - 90) * Math.PI / 180);
    const cy    = 190 + r * Math.sin((angle - 90) * Math.PI / 180);
    const el    = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    el.setAttribute('cx', cx);
    el.setAttribute('cy', cy);
    el.setAttribute('rx', '14');
    el.setAttribute('ry', '28');
    el.setAttribute('fill', i % 3 === 0 ? '#e8c4b8' : i % 3 === 1 ? '#f5ead8' : '#f0e6d8');
    el.setAttribute('opacity', '0.6');
    el.setAttribute('transform', `rotate(${angle}, ${cx}, ${cy})`);
    svg.appendChild(el);
  }

  // Inner ring — smaller petals
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * 360 + 22.5;
    const r     = 90;
    const cx    = 190 + r * Math.cos((angle - 90) * Math.PI / 180);
    const cy    = 190 + r * Math.sin((angle - 90) * Math.PI / 180);
    const el    = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    el.setAttribute('cx', cx);
    el.setAttribute('cy', cy);
    el.setAttribute('rx', '8');
    el.setAttribute('ry', '18');
    el.setAttribute('fill', '#c4796a');
    el.setAttribute('opacity', '0.3');
    el.setAttribute('transform', `rotate(${angle}, ${cx}, ${cy})`);
    svg.appendChild(el);
  }

  ring.appendChild(svg);

  // Gentle rotation
  let deg = 0;
  (function rotate() {
    deg += 0.04;
    svg.style.transform = `rotate(${deg}deg)`;
    svg.style.transformOrigin = 'center';
    requestAnimationFrame(rotate);
  })();
})();

/* ═══════════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════════ */
const App = (() => {
  let current = 1;
  const TOTAL = 6;

  /* ── Navigation ── */
  function goTo(n) {
    if (n < 1 || n > TOTAL) return;

    const prev = document.getElementById(`step-${current}`);
    const next = document.getElementById(`step-${n}`);
    const dots  = document.querySelectorAll('.dot');

    // Determine direction
    const goingForward = n > current;

    prev.classList.add('exit');
    prev.classList.remove('active');

    // Reset exit class after transition
    setTimeout(() => {
      prev.classList.remove('exit');
      if (goingForward) {
        prev.style.transform = '';
      }
    }, 900);

    next.classList.add('active');

    // Update dots
    dots.forEach((d, i) => d.classList.toggle('active', i === n - 1));

    current = n;

    // Step-specific hooks
    if (n === 5) onEnvelopeStep();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  /* ── Envelope ── */
  let envelopeOpened = false;

  function onEnvelopeStep() {
    envelopeOpened = false;
    const wrap     = document.getElementById('envelope-wrap');
    const hint     = document.getElementById('env-hint');
    const replyBtn = document.getElementById('reply-btn');
    wrap.classList.remove('opened');
    hint.classList.remove('hidden');
    replyBtn.style.display = 'none';
  }

  function openEnvelope() {
    if (envelopeOpened) return;
    envelopeOpened = true;

    const wrap     = document.getElementById('envelope-wrap');
    const envelope = document.getElementById('envelope');
    const hint     = document.getElementById('env-hint');
    const replyBtn = document.getElementById('reply-btn');

    // Remove click from envelope itself so it can't be re-triggered
    envelope.onclick = null;

    wrap.classList.add('opened');
    hint.classList.add('hidden');

    // Show "Write back" button after card is fully visible
    setTimeout(() => {
      replyBtn.style.display = 'inline-flex';
    }, 1000);
  }

  /* ── Supabase ── */
  let supabase = null;

  function initSupabase() {
    if (supabase) return supabase;
    if (SUPABASE_URL === 'YOUR_SUPABASE_PROJECT_URL') return null;
    try {
      supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
    } catch(e) {
      console.warn('Supabase init failed:', e);
    }
    return supabase;
  }

  /* ── EmailJS init  ← NEW ── */
  function initEmailJS() {
    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') return false;
    try {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
      return true;
    } catch(e) {
      console.warn('EmailJS init failed:', e);
      return false;
    }
  }

  /* ── Send reply — saves to Supabase AND emails you  ← MODIFIED ── */
  async function sendReply() {
    const msgEl   = document.getElementById('reply-text');
    const btn     = document.getElementById('send-btn');
    const form    = document.getElementById('reply-form');
    const success = document.getElementById('reply-success');

    const message = msgEl.value.trim();

    if (!message) {
      msgEl.style.borderColor = '#c4796a';
      msgEl.focus();
      setTimeout(() => { msgEl.style.borderColor = ''; }, 1500);
      return;
    }

    btn.disabled    = true;
    btn.textContent = 'Bheja ja raha hai...';

    const db         = initSupabase();
    const ejsReady   = initEmailJS();

    const now     = new Date();
    const dateStr = now.toLocaleDateString('ur-PK', { day: 'numeric', month: 'long', year: 'numeric' });

    let supabaseOk = false;
    let emailOk    = false;

    /* 1 — Save to Supabase */
    if (db) {
      try {
        const { data, error } = await db
          .from('maryam_replies')
          .insert([{ message }])
          .select();

        if (error) {
          console.error('Supabase error:', error);
        } else {
          console.log('Supabase: reply saved', data);
          supabaseOk = true;
        }
      } catch(err) {
        console.error('Supabase exception:', err);
      }
    } else {
      console.warn('Supabase not configured — skipping DB save.');
    }

    /* 2 — Send via EmailJS */
    if (ejsReady) {
      try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name : 'Maryam',
          to_name   : 'Tahir',
          message   : message,
          date      : dateStr,
        });
        console.log('EmailJS: message sent to inbox');
        emailOk = true;
      } catch(err) {
        console.error('EmailJS error:', err);
      }
    } else {
      console.warn('EmailJS not configured — skipping email.');
    }

    /* 3 — Result */
    if (supabaseOk || emailOk) {
      // At least one channel worked — show success
      showSuccess(form, success);
    } else if (!db && !ejsReady) {
      // Neither configured — dev mode, show success anyway
      console.warn('Neither Supabase nor EmailJS configured. Showing success in dev mode.');
      showSuccess(form, success);
    } else {
      // Both were configured but both failed
      btn.disabled    = false;
      btn.textContent = 'Seal & Send to Tahir';
      alert('Kuch masla hua. Dobara try karein.');
    }
  }

  function showSuccess(form, success) {
    form.style.opacity    = '0';
    form.style.transition = 'opacity 0.4s';
    setTimeout(() => {
      form.style.display    = 'none';
      success.style.display = 'flex';
    }, 400);
  }

  /* ── Char counter ── */
  document.getElementById('reply-text').addEventListener('input', function () {
    document.getElementById('char-num').textContent = this.value.length;
  });

  /* ── Keyboard navigation ── */
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   prev();
  });

  return { next, prev, goTo, openEnvelope, sendReply };
})();