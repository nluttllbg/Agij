/* ============================================================
   AGIJ FERT — Consultoria Agrícola · Sorriso, MT
   main.js — JavaScript puro (sem dependências)
   ============================================================ */

/* ---------- Configuração do WhatsApp ----------
   Para alterar o número ou a mensagem, edite as constantes abaixo.
   O número deve estar no formato internacional, sem sinais:
   DDD + número, com o código do país (55) à frente.
   -------------------------------------------------------- */
var WHATSAPP_BASE = "https://wa.me/5566996512455";
var WHATSAPP_MESSAGE =
  "Olá! Vim pelo site da AGIJ FERT e gostaria de saber mais sobre a consultoria para minha fazenda. Minha propriedade fica em [cidade/região] e gostaria de conversar sobre solo e produtividade.";

/* Preferência de movimento reduzido do usuário */
var prefersReducedMotion =
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- 1. Links do WhatsApp ---------- */
function whatsAppUrl() {
  return WHATSAPP_BASE + "?text=" + encodeURIComponent(WHATSAPP_MESSAGE);
}

function initWhatsApp() {
  var url = whatsAppUrl();
  document.querySelectorAll("a[data-wa]").forEach(function (link) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener";
  });
}

/* ---------- 2. Espaços reservados para as fotos ----------
   Cada elemento com [data-slot-image] aponta para um arquivo
   em assets/images/. Se o arquivo existir, a foto substitui o
   espaço reservado automaticamente. Se não existir, o espaço
   reservado continua visível (nunca aparece imagem quebrada).
   -------------------------------------------------------- */
/* Extensões aceitas para cada foto — basta o nome base estar correto */
var IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

function initImageSlots() {
  document.querySelectorAll("[data-slot-image]").forEach(function (slot) {
    var file = slot.getAttribute("data-file");
    var alt = slot.getAttribute("data-alt") || "";
    var media = slot.querySelector(".slot__media");
    if (!file || !media || media.querySelector(".slot__img")) return;

    /* Monta a lista de nomes possíveis: nome base + cada extensão */
    var name = file.replace(/\.[^.]+$/, "");
    var candidates = [];
    IMAGE_EXTENSIONS.forEach(function (ext) {
      var candidate = name + ext;
      if (candidates.indexOf(candidate) === -1) candidates.push(candidate);
    });
    if (candidates.indexOf(file) === -1) candidates.push(file);

    function tryCandidate(index) {
      /* Se nenhum nome existir, o espaço reservado simplesmente permanece */
      if (index >= candidates.length) return;

      var src = "assets/images/" + candidates[index];
      var probe = new Image();

      probe.onload = function () {
        var img = new Image();
        img.src = src;
        img.alt = alt;
        img.className = "slot__img";
        img.decoding = "async";
        img.loading = slot.hasAttribute("data-eager") ? "eager" : "lazy";

        media.insertBefore(img, media.firstChild);
        slot.classList.add("has-image");

        if (!prefersReducedMotion && slot.hasAttribute("data-kenburns")) {
          slot.classList.add("kenburns");
        }
      };

      probe.onerror = function () {
        tryCandidate(index + 1);
      };

      probe.src = src;
    }

    tryCandidate(0);
  });
}

/* ---------- 3. Título do hero — revelação palavra a palavra ---------- */
function wordify(el) {
  var out = [];

  function addWord(part, isEm) {
    var w = document.createElement("span");
    w.className = "w";
    var inner = document.createElement("span");
    inner.className = isEm ? "w__i w__i--em" : "w__i";
    inner.textContent = part;
    w.appendChild(inner);
    out.push(w);
  }

  function processText(text, isEm) {
    text.split(/(\s+)/).forEach(function (part) {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        out.push(document.createTextNode(" "));
      } else {
        addWord(part, isEm);
      }
    });
  }

  Array.prototype.slice.call(el.childNodes).forEach(function (node) {
    if (node.nodeType === 3) {
      processText(node.nodeValue, false);
    } else if (node.nodeType === 1 && node.tagName === "EM") {
      processText(node.textContent, true);
    }
  });

  el.textContent = "";
  out.forEach(function (node) {
    el.appendChild(node);
  });

  el.querySelectorAll(".w__i").forEach(function (inner, i) {
    inner.style.transitionDelay = i * 55 + "ms";
  });
}

function initHeroTitle() {
  var target = document.querySelector(".js-wordify");
  if (!target || prefersReducedMotion) return;

  wordify(target);

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var heading = target.closest("h1") || target;
      heading.classList.add("is-loaded");
    });
  });
}

/* ---------- 4. Menu do celular ---------- */
function initMenu() {
  var burger = document.querySelector(".js-burger");
  if (!burger) return;

  function setOpen(open) {
    document.body.classList.toggle("nav-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }

  burger.addEventListener("click", function () {
    setOpen(!document.body.classList.contains("nav-open"));
  });

  document.querySelectorAll(".menu-mobile a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setOpen(false);
  });

  var mq = window.matchMedia("(min-width: 900px)");
  var onBreakpoint = function (event) {
    if (event.matches) setOpen(false);
  };
  if (typeof mq.addEventListener === "function") {
    mq.addEventListener("change", onBreakpoint);
  } else if (typeof mq.addListener === "function") {
    mq.addListener(onBreakpoint);
  }
}

/* ---------- 5. Cabeçalho — estado ao rolar ---------- */
function initHeader() {
  var header = document.querySelector(".site-header");
  if (!header) return;

  var onScroll = function () {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- 6. Navegação — destaca a seção visível ---------- */
function initScrollSpy() {
  var links = Array.prototype.slice.call(
    document.querySelectorAll("a[data-spy]")
  );
  if (!links.length) return;

  var seen = {};
  var sections = [];
  links.forEach(function (link) {
    var id = (link.getAttribute("href") || "").slice(1);
    var el = id ? document.getElementById(id) : null;
    if (el && !seen[id]) {
      seen[id] = true;
      sections.push(el);
    }
  });
  if (!sections.length) return;

  var onScroll = function () {
    var pos = window.scrollY + window.innerHeight * 0.35;
    var current = sections[0].id;

    sections.forEach(function (section) {
      if (section.offsetTop <= pos) current = section.id;
    });

    /* No fim da página, destaca sempre a última seção */
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 4
    ) {
      current = sections[sections.length - 1].id;
    }

    links.forEach(function (link) {
      link.classList.toggle(
        "is-active",
        link.getAttribute("href") === "#" + current
      );
    });
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
}

/* ---------- 7. Revelação suave ao rolar ---------- */
function initReveal() {
  var elements = Array.prototype.slice.call(
    document.querySelectorAll(".reveal")
  );
  if (!elements.length) return;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach(function (el) {
      el.classList.add("is-in");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  elements.forEach(function (el) {
    var delay = el.getAttribute("data-delay");
    if (delay) el.style.setProperty("--rd", delay + "ms");
    observer.observe(el);
  });
}

/* ---------- 8. Ano no rodapé ---------- */
function initYear() {
  var year = document.getElementById("ano");
  if (year) year.textContent = String(new Date().getFullYear());
}

/* ---------- Inicialização ---------- */
function init() {
  initWhatsApp();
  initImageSlots();
  initHeroTitle();
  initMenu();
  initHeader();
  initScrollSpy();
  initReveal();
  initYear();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
