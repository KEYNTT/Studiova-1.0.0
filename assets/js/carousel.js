(() => {
  const data = [
    {
      kicker: "Ventaja 01",
      title: "Atención 24/7 sin perder leads",
      text: "Tu agente responde en segundos, sin fugas.",
      tags: ["WhatsApp", "WebChat"],
      image: "../assets/images/ar-interface.jpg",
    },
    {
      kicker: "Ventaja 02",
      title: "Calificación automática de prospectos",
      text: "Detecta intención y prioriza oportunidades.",
      tags: ["Lead scoring", "Etiquetas"],
      image: "../assets/images/data-nexus.jpg",
    },
    {
      kicker: "Ventaja 03",
      title: "Objeciones listas para cerrar",
      text: "Respuestas entrenadas para vender con tu tono.",
      tags: ["Guiones", "Cierre"],
      image: "../assets/images/cyber-defense.jpg",
    },
    {
      kicker: "Ventaja 04",
      title: "Seguimiento que recupera ventas",
      text: "Secuencias automáticas según etapa del lead.",
      tags: ["Nurturing", "Reactivación"],
      image: "../assets/images/blockchain-vault.jpg",
    },
    {
      kicker: "Ventaja 05",
      title: "Interacción con CRM y Sheets",
      text: "Centraliza datos y elimina el caos operativo.",
      tags: ["CRM", "Sheets"],
      image: "../assets/images/quantum-cloud.jpg",
    },
    {
      kicker: "Ventaja 06",
      title: "Agendado y confirmaciones",
      text: "Agenda, confirma y reprograma sin perseguir.",
      tags: ["Calendario", "Recordatorios"],
      image: "../assets/images/iot-matrix.jpg",
    },
    {
      kicker: "Ventaja 07",
      title: "Métricas para mejorar cada semana",
      text: "Mide conversión, pérdidas y optimiza.",
      tags: ["Analytics", "A/B"],
      image: "../assets/images/hero7.jpg",
    },
  ];

  const clampIndex = (i, n) => (i + n) % n;

  function buildSlide(item) {
    return `
      <article class="cf-card" role="group" aria-label="${item.title}">
        <div class="cf-media">
          <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="cf-body">
          <p class="cf-kicker">${item.kicker}</p>
          <h3 class="cf-title">${item.title}</h3>
          <p class="cf-text">${item.text}</p>
          <div class="cf-tags">
            ${item.tags.map(t => `<span class="cf-tag">${t}</span>`).join("")}
          </div>
          <button class="cf-btn" type="button">Explorar</button>
        </div>
      </article>
    `;
  }

  function ensureStylesOnce() {
    if (document.getElementById("coverflow-inline-css")) return;

    const css = `
      /* ===== Coverflow premium (sin flechas, swipe manda) ===== */
      .carousel-controls{ display:none !important; }

      .carousel{
        position:relative;
        height: 560px;
        perspective: 1400px;
        transform-style: preserve-3d;
        overflow: visible;
      }
      @media (max-width: 992px){
        .carousel{ height: 470px; }
      }

      .carousel-item{
        position:absolute;
        top:50%; left:50%;
        width: min(420px, 86vw);
        height: 560px;
        transform-style: preserve-3d;
        transform: translate(-50%,-50%);
        transition: transform .70s cubic-bezier(.2,.8,.2,1), opacity .55s ease, filter .55s ease;
        opacity: .15;
        filter: blur(1px);
        pointer-events:none;
        will-change: transform, opacity, filter;
      }
      @media (max-width: 992px){
        .carousel-item{ height: 470px; }
      }

      /* Móvil: foco, menos “ruido” */
      @media (max-width: 768px){
        .carousel-item{
          width: min(360px, 88vw);
          height: 460px;
        }
      }

      /* Tarjeta */
      .cf-card{
        height:100%;
        border-radius:22px;
        overflow:hidden;
        border: 1px solid rgba(255,255,255,.10);
        background: rgba(0,0,0,.35);
        backdrop-filter: blur(10px);
        box-shadow: 0 22px 70px rgba(0,0,0,.45);
        display:flex;
        flex-direction:column;
      }
      .cf-media{ flex:1; overflow:hidden; border-bottom:1px solid rgba(255,255,255,.08); }
      .cf-media img{ width:100%; height:100%; object-fit:cover; display:block; }
      .cf-body{ padding:18px 18px 16px; }
      .cf-kicker{ margin:0 0 6px; font-weight:900; color: orange; }
      .cf-title{ margin:0 0 8px; font-weight:900; color:#fff; font-size:1.3rem; }
      .cf-text{ margin:0 0 12px; color: rgba(255,255,255,.78); line-height:1.55; }
      .cf-tags{ display:flex; gap:8px; flex-wrap:wrap; margin:0 0 12px; }
      .cf-tag{
        padding:6px 10px;
        border-radius:999px;
        font-size:.78rem;
        color: rgba(255,255,255,.85);
        background: rgba(124,58,237,.18);
        border: 1px solid rgba(124,58,237,.25);
      }
      .cf-btn{
        width:100%;
        border:0;
        border-radius:999px;
        padding:12px 14px;
        cursor:pointer;
        font-weight:900;
        color:#fff;
        background: linear-gradient(90deg, rgba(124,58,237,1), rgba(59,130,246,1));
      }

      /* Dots */
      .carousel-indicators{
        display:flex;
        justify-content:center;
        gap:10px;
        margin-top: 10px;
        user-select:none;
      }
      .carousel-dot{
        width:10px; height:10px;
        border-radius:999px;
        background: rgba(255,255,255,.22);
        border: 1px solid rgba(255,255,255,.12);
        cursor:pointer;
      }
      .carousel-dot.active{ background: #7c3aed; }
    `;

    const style = document.createElement("style");
    style.id = "coverflow-inline-css";
    style.textContent = css;
    document.head.appendChild(style);
  }

  function initCarousel() {
    const carousel = document.getElementById("carousel");
    const indicators = document.getElementById("indicators");
    if (!carousel || !indicators) return;

    // evita doble init si recargas por fetch
    if (carousel.dataset.inited === "1") return;
    carousel.dataset.inited = "1";

    ensureStylesOnce();

    // contenedor correcto para capturar swipe (IMPORTANTE)
    const container = carousel.closest(".carousel-container") || carousel;
    container.style.touchAction = "pan-y"; // permite scroll vertical + swipe horizontal
    container.style.userSelect = "none";

    carousel.innerHTML = data.map(() => `<div class="carousel-item"></div>`).join("");
    const items = Array.from(carousel.querySelectorAll(".carousel-item"));
    items.forEach((el, i) => (el.innerHTML = buildSlide(data[i])));

    indicators.innerHTML = data
      .map(
        (_, i) =>
          `<button class="carousel-dot ${i === 0 ? "active" : ""}" data-i="${i}" aria-label="Ir a ${i + 1}"></button>`
      )
      .join("");
    const dots = Array.from(indicators.querySelectorAll(".carousel-dot"));

    let index = 0;
    let autoTimer = null;

    function layout() {
      const n = items.length;

      items.forEach((el, i) => {
        const d = ((i - index) % n + n) % n;
        const dist = d <= n / 2 ? d : d - n;
        const abs = Math.abs(dist);

        // ===== Ajustes coverflow (centro MÁS grande + laterales MÁS pequeñas) =====
        const stepX = 290;   // separación horizontal
        const zBase = 180;   // centro más al frente
        const zDrop = 95;    // cae más rápido
        const rotY = 26;     // giro lateral

        const scale =
          abs === 0 ? 1.08 :
          abs === 1 ? 0.90 :
          abs === 2 ? 0.78 :
          0.68;

        const opacity =
          abs === 0 ? 1 :
          abs === 1 ? 0.55 :
          abs === 2 ? 0.25 :
          0.12;

        const blur =
          abs <= 1 ? 0 :
          abs === 2 ? 1 :
          1;

        const tx = dist * stepX;
        const tz = zBase - abs * zDrop;
        const baseRot = dist * -rotY;

        el.style.zIndex = String(100 - abs);
        el.style.opacity = String(opacity);
        el.style.filter = blur ? `blur(${blur}px)` : "none";
        el.style.pointerEvents = abs === 0 ? "auto" : "none";

        el.style.transform =
          `translate(-50%,-50%) ` +
          `translateX(${tx}px) translateZ(${tz}px) ` +
          `rotateY(${baseRot}deg) ` +
          `scale(${scale})`;
      });

      dots.forEach((d, i) => d.classList.toggle("active", i === index));
    }

    function goTo(i) {
      index = clampIndex(i, items.length);
      layout();
    }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(() => goTo(index + 1), 2600);
    }

    function stopAuto() {
      if (autoTimer) clearInterval(autoTimer);
      autoTimer = null;
    }

    startAuto();

    indicators.addEventListener("click", (e) => {
      const b = e.target.closest(".carousel-dot");
      if (!b) return;
      stopAuto();
      goTo(Number(b.dataset.i));
      startAuto();
    });

    // ===== Swipe premium (mouse + dedo) =====
    let dragging = false;
    let startX = 0;
    let lastX = 0;
    let dx = 0;
    let lastT = 0;
    let vx = 0;

    container.addEventListener("pointerdown", (e) => {
      dragging = true;
      startX = lastX = e.clientX;
      dx = 0;
      lastT = performance.now();
      vx = 0;

      stopAuto();
      container.setPointerCapture?.(e.pointerId);
    });

    container.addEventListener("pointermove", (e) => {
      if (!dragging) return;

      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      const x = e.clientX;

      const dd = x - lastX;
      vx = dd / dt; // px/ms
      dx = x - startX;

      lastX = x;
      lastT = now;
    });

    container.addEventListener("pointerup", () => {
      if (!dragging) return;
      dragging = false;

      const threshold = 55;
      const fling = vx;

      if (dx > threshold || fling > 0.45) goTo(index - 1);
      else if (dx < -threshold || fling < -0.45) goTo(index + 1);

      startAuto();
    });

    container.addEventListener("pointercancel", () => {
      dragging = false;
      startAuto();
    });

    // primera render
    layout();
  }

  // expuesto para tu loader fetch
  window.initCarousel = initCarousel;

  // por si entra sin fetch
  window.addEventListener("DOMContentLoaded", () => {
    initCarousel();
  });
})();
