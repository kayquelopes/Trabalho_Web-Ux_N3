const propriedades = [
  { tipo: 'casa', local: 'Veneza, Itália', titulo: 'Casa com Vista para o Campo', preco: 450,
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=350&fit=crop' },
  { tipo: 'casa', local: 'Sintra, Portugal', titulo: 'Casa em Água Park Rent Planet', preco: 750,
    img: 'https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=500&h=350&fit=crop' },
  { tipo: 'chale', local: 'Schattenlum, Suíça', titulo: 'Casa com Vista nas Montanhas', preco: 600,
    img: 'https://images.unsplash.com/photo-1551632786-de41ec16a41d?w=500&h=350&fit=crop' },
  { tipo: 'casa', local: 'Málaga, Espanha', titulo: 'Casa com Vista para os Campos', preco: 570,
    img: 'https://images.unsplash.com/photo-1512207736139-6c3ee1ef342c?w=500&h=350&fit=crop' },
  { tipo: 'apartamento', local: 'Algarve, Portugal', titulo: 'Apartamento com Vista para o Mar', preco: 860,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=350&fit=crop' },
  { tipo: 'pousada', local: 'Praia, Brasil', titulo: 'Pousada Aconchegante na Praia', preco: 420,
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=350&fit=crop' },
];

const rotuloTipo = { casa: 'Casa', apartamento: 'Apartamento', chale: 'Chalé', pousada: 'Pousada' };

function cartaoHtml(p, index) {
  return `
    <article class="card-property" data-type="${p.tipo}" data-index="${index}">
      <div class="card-img-wrap">
        <img src="${p.img}" alt="${p.titulo}" class="card-img">
        <span class="card-badge">${rotuloTipo[p.tipo]}</span>
      </div>
      <div class="card-body">
        <span class="card-location">📍 ${p.local}</span>
        <h3 class="card-title">${p.titulo}</h3>
        <div class="card-footer">
          <p class="card-price">R$ ${p.preco.toLocaleString('pt-BR')},00 <span>/noite</span></p>
          <a href="?page=detalhe" data-link="detalhe" class="card-reserve">Reservar</a>
        </div>
      </div>
    </article>
  `;
}

const template = document.createElement('template');

template.innerHTML = `
  <link rel="stylesheet" href="${new URL('./home.css', import.meta.url).href}">

  <section class="hero">
    <h1 class="hero-title">Encontre sua próxima parada</h1>
    <div class="search-bar">
      🔍
      <input type="text" id="searchLocation" class="search-input" placeholder="Para onde você quer ir?">
      <div class="search-divider"></div>
      <div class="search-dates">
        <div class="search-date-group">
          <span class="search-date-label">Entrada</span>
          <input type="date" id="dataEntrada" class="search-date-input">
        </div>
        <div class="search-divider"></div>
        <div class="search-date-group">
          <span class="search-date-label">Saída</span>
          <input type="date" id="dataSaida" class="search-date-input">
        </div>
      </div>
      <button class="btn-primary" id="searchBtn">Buscar</button>
    </div>
  </section>

  <section class="filters-section">
    <div class="filters-scroll" id="filtros">
      <button class="filter-btn active" data-filter="todos">Todos</button>
      <button class="filter-btn" data-filter="casa">🏠 Casa</button>
      <button class="filter-btn" data-filter="apartamento">🏢 Apartamento</button>
      <button class="filter-btn" data-filter="chale">🏕️ Chalé</button>
      <button class="filter-btn" data-filter="pousada">🏡 Pousada</button>
    </div>
  </section>

  <section class="properties-section">
    <div class="section-header">
      <h2 class="section-title">Hospedagens disponíveis</h2>
      <span class="section-count" id="resultCount">${propriedades.length} resultados</span>
    </div>
    <div class="properties-grid" id="propertiesGrid">
      ${propriedades.map(cartaoHtml).join('')}
    </div>
  </section>
`;

class HomeComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const root = this.shadowRoot;
    const dataEntrada = root.getElementById('dataEntrada');
    const dataSaida = root.getElementById('dataSaida');
    const searchBtn = root.getElementById('searchBtn');
    const searchLoc = root.getElementById('searchLocation');
    const grid = root.getElementById('propertiesGrid');
    const countEl = root.getElementById('resultCount');

    const hoje = new Date();
    const amanha = new Date(hoje);
    amanha.setDate(amanha.getDate() + 1);
    const fmt = (d) => d.toISOString().split('T')[0];

    dataEntrada.value = fmt(hoje);
    dataSaida.value = fmt(amanha);
    dataEntrada.min = fmt(hoje);
    dataSaida.min = fmt(hoje);

    dataEntrada.addEventListener('change', () => {
      if (dataEntrada.value >= dataSaida.value) {
        const d = new Date(dataEntrada.value);
        d.setDate(d.getDate() + 1);
        dataSaida.value = fmt(d);
      }
      dataSaida.min = dataEntrada.value;
    });

    searchBtn.addEventListener('click', () => {
      const loc = searchLoc.value.trim();
      const msg = loc ? `Buscando em "${loc}"...` : 'Mostrando todas as hospedagens disponíveis.';
      alert(msg);
    });

    root.querySelectorAll('.filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        root.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filtro = btn.dataset.filter;
        const cards = grid.querySelectorAll('.card-property');
        let visiveis = 0;

        cards.forEach((card) => {
          const combina = filtro === 'todos' || card.dataset.type === filtro;
          card.classList.toggle('card-hidden', !combina);
          if (combina) visiveis++;
        });

        countEl.textContent = `${visiveis} resultado${visiveis !== 1 ? 's' : ''}`;
      });
    });
  }
}

export { HomeComponent };
