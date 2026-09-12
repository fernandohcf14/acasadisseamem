const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

$('#year').textContent = new Date().getFullYear();

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
$$('.reveal').forEach((element) => observer.observe(element));

$$('.encounter').forEach((card) => {
  card.style.setProperty('--accent', card.dataset.accent);
  const activate = () => {
    $$('.encounter').forEach((item) => item.classList.remove('active'));
    card.classList.add('active');
  };
  card.addEventListener('click', activate);
  card.addEventListener('focus', activate);
});

const stage = $('[data-tilt]');
if (stage && !reducedMotion && window.matchMedia('(pointer:fine)').matches) {
  stage.parentElement.addEventListener('mousemove', (event) => {
    const rect = stage.parentElement.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    stage.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 7}deg)`;
  });
  stage.parentElement.addEventListener('mouseleave', () => { stage.style.transform = ''; });
}

const upgradeModal = $('#upgradeModal');
$('#standardButton').addEventListener('click', () => upgradeModal.showModal());
$('.modal-close', upgradeModal).addEventListener('click', () => upgradeModal.close());
upgradeModal.addEventListener('click', (event) => { if (event.target === upgradeModal) upgradeModal.close(); });

const gallery = [
  { src: 'assets/jornada-capa.png', alt: 'Capa da jornada A Casa Disse Amém', caption: 'Jornada principal — capa' },
  { src: 'assets/jornada-ritmo.png', alt: 'Página com o passo a passo do encontro', caption: 'O ritmo de cada encontro' },
  { src: 'assets/encontro-presenca.png', alt: 'Página do encontro Estamos Aqui', caption: 'Encontro 1 — presença' },
  { src: 'assets/cartas-pagina.png', alt: 'Folha com cartas recortáveis de conversa', caption: 'Puxa a Cadeira — 36 cartas' },
  { src: 'assets/diario-pagina.png', alt: 'Página do Diário da Nossa Casa', caption: 'Diário da Nossa Casa' },
  { src: 'assets/pote-pagina.png', alt: 'Etiquetas do Pote do Amém', caption: 'O Pote do Amém' },
  { src: 'assets/encontro-recomeco.png', alt: 'Página do encontro sobre recomeço', caption: 'Encontro 4 — recomeço' },
  { src: 'assets/continuidade-pagina.png', alt: 'Página do plano de continuidade', caption: 'Depois do Sétimo Amém — 21 dias' },
  { src: 'assets/jornada-capa.png', alt: 'Nova capa de A Casa Disse Amém', caption: 'Nova identidade — Jornada principal' },
  { src: 'assets/capa-diario.png', alt: 'Nova capa do Diário da Nossa Casa', caption: 'Nova identidade — Diário da Nossa Casa' },
  { src: 'assets/capa-cartas.png', alt: 'Nova capa de Puxa a Cadeira', caption: 'Nova identidade — Puxa a Cadeira' },
  { src: 'assets/capa-pote.png', alt: 'Nova capa de O Pote do Amém', caption: 'Nova identidade — O Pote do Amém' },
  { src: 'assets/capa-um-comeca.png', alt: 'Nova capa de Quando Só Um Quer Começar', caption: 'Nova identidade — Guia prático' },
  { src: 'assets/capa-continuidade.png', alt: 'Nova capa de Depois do Sétimo Amém', caption: 'Nova identidade — 21 dias de continuidade' }
];
const galleryModal = $('#galleryModal');
const galleryImage = $('#galleryImage');
const galleryCaption = $('#galleryCaption');
let galleryIndex = 0;
function renderGallery() {
  const item = gallery[galleryIndex];
  galleryImage.src = item.src;
  galleryImage.alt = item.alt;
  galleryCaption.textContent = item.caption;
}
function openGallery(index) {
  galleryIndex = Number(index) || 0;
  renderGallery();
  galleryModal.showModal();
}
$$('[data-open-gallery]').forEach((button) => button.addEventListener('click', () => openGallery(button.dataset.openGallery)));
$('.gallery-nav.prev').addEventListener('click', () => { galleryIndex = (galleryIndex - 1 + gallery.length) % gallery.length; renderGallery(); });
$('.gallery-nav.next').addEventListener('click', () => { galleryIndex = (galleryIndex + 1) % gallery.length; renderGallery(); });
$('.modal-close', galleryModal).addEventListener('click', () => galleryModal.close());
galleryModal.addEventListener('click', (event) => { if (event.target === galleryModal) galleryModal.close(); });
document.addEventListener('keydown', (event) => {
  if (!galleryModal.open) return;
  if (event.key === 'ArrowLeft') $('.gallery-nav.prev').click();
  if (event.key === 'ArrowRight') $('.gallery-nav.next').click();
});

const toast = $('#toast');
let toastTimer;
$$('.checkout-placeholder').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (link.getAttribute('href') !== '#') return;
    event.preventDefault();
    clearTimeout(toastTimer);
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  });
});

const sticky = $('.sticky-buy');
const offer = $('#oferta');
const stickyObserver = new IntersectionObserver(([entry]) => {
  sticky.classList.toggle('show', !entry.isIntersecting && window.scrollY > 700);
  sticky.setAttribute('aria-hidden', entry.isIntersecting ? 'true' : 'false');
}, { threshold: 0.05 });
stickyObserver.observe(offer);
