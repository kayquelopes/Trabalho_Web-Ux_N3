const template = document.createElement('template');

template.innerHTML = `
  <link rel="stylesheet" href="${new URL('./detalhe.css', import.meta.url).href}">

  <button class="back-btn" id="btnVoltar">← Voltar</button>

  <div class="property-hero">
    <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=600&fit=crop" alt="Casa com Vista para o Campo - Itália">
  </div>

  <div class="detail-layout">
    <div class="detail-info">
      <div>
        <p class="location-label">📍 Interior, Itália</p>
        <h1 class="property-title">Casa com Vista para o Campo na Itália</h1>
        <div class="rating-row">
          ⭐ <span>4.9</span>
          <span style="font-weight:400;color:var(--text-3);">(38 avaliações)</span>
        </div>
      </div>

      <div class="specs-grid">
        <div class="spec-item"><span class="spec-value">3</span><span class="spec-label">Quartos</span></div>
        <div class="spec-item"><span class="spec-value">2</span><span class="spec-label">Banheiros</span></div>
        <div class="spec-item"><span class="spec-value">8</span><span class="spec-label">Hóspedes</span></div>
        <div class="spec-item"><span class="spec-value">Casa</span><span class="spec-label">Tipo</span></div>
      </div>

      <div class="detail-block">
        <h2 class="block-title">Sobre essa hospedagem</h2>
        <p class="description-text">
          Uma casa de pedra encravada entre lindas flores e plantas, perfeita para relaxar ao ar livre e completamente equipada.
          O ambiente é ideal para famílias e grupos pequenos. Quartos espaçosos, cozinha completa e uma vista que premia cada
          momento — perfeito para experiências inesquecíveis.
        </p>
      </div>

      <div class="detail-block">
        <h2 class="block-title">Comodidades</h2>
        <div class="amenities-grid">
          <div class="amenity-item">🅿️ Estacionamento</div>
          <div class="amenity-item">📺 TV</div>
          <div class="amenity-item">📶 Wi-Fi</div>
          <div class="amenity-item">❄️ Ar Condicionado</div>
          <div class="amenity-item">🍳 Cozinha</div>
          <div class="amenity-item">🔥 Churrasqueira</div>
        </div>
      </div>

      <div class="detail-block">
        <h2 class="block-title">Anfitrião</h2>
        <div class="host-card">
          <div class="host-avatar">J</div>
          <div>
            <p class="host-name">Joana Vitória</p>
            <p class="host-badge">✓ Anfitrião Verificado</p>
          </div>
        </div>
      </div>
    </div>

    <aside>
      <div class="booking-card">
        <p class="booking-price">R$ 450,00 <span>/ noite</span></p>

        <div class="booking-form">
          <div class="dates-row">
            <div class="form-group">
              <label class="form-label">Check-in</label>
              <input type="date" id="checkIn" class="form-input">
            </div>
            <div class="form-group">
              <label class="form-label">Check-out</label>
              <input type="date" id="checkOut" class="form-input">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Hóspedes</label>
            <select id="guests" class="form-input">
              <option value="1">1 hóspede</option>
              <option value="2">2 hóspedes</option>
              <option value="3">3 hóspedes</option>
              <option value="4">4 hóspedes</option>
            </select>
          </div>
          <button class="reserve-btn" id="reserveBtn">Reservar Agora</button>
        </div>

        <div class="price-breakdown">
          <div class="breakdown-row" id="rowSubtotal"><span>R$ 450,00 × — noites</span><span>—</span></div>
          <div class="breakdown-row" id="rowTaxa"><span>Taxa de serviço (10%)</span><span>—</span></div>
          <div class="breakdown-row total" id="rowTotal"><span>Total</span><span>—</span></div>
        </div>
      </div>
    </aside>
  </div>
`;

class DetalheComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.PRECO_NOITE = 450;
    this.TAXA = 0.1;
  }

  connectedCallback() {
    const root = this.shadowRoot;
    this.checkInEl = root.getElementById('checkIn');
    this.checkOutEl = root.getElementById('checkOut');
    this.guestsEl = root.getElementById('guests');

    const hoje = new Date();
    const amanha = new Date(hoje);
    amanha.setDate(amanha.getDate() + 1);
    const fmt = (d) => d.toISOString().split('T')[0];

    this.checkInEl.value = fmt(hoje);
    this.checkOutEl.value = fmt(amanha);
    this.checkInEl.min = fmt(hoje);
    this.checkOutEl.min = fmt(hoje);

    this.checkInEl.addEventListener('change', () => {
      if (this.checkOutEl.value && this.checkInEl.value >= this.checkOutEl.value) {
        const d = new Date(this.checkInEl.value);
        d.setDate(d.getDate() + 1);
        this.checkOutEl.value = fmt(d);
      }
      this.checkOutEl.min = this.checkInEl.value;
      this.atualizarPreco();
    });

    this.checkOutEl.addEventListener('change', () => this.atualizarPreco());
    this.guestsEl.addEventListener('change', () => this.atualizarPreco());

    root.getElementById('btnVoltar').addEventListener('click', () => history.back());
    root.getElementById('reserveBtn').addEventListener('click', () => this.reservar());

    this.atualizarPreco();
  }

  calcularNoites() {
    if (!this.checkInEl.value || !this.checkOutEl.value) return 0;
    const diff = new Date(this.checkOutEl.value) - new Date(this.checkInEl.value);
    return Math.max(0, Math.floor(diff / 86400000));
  }

  formatarBRL(v) {
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  atualizarPreco() {
    const root = this.shadowRoot;
    const noites = this.calcularNoites();
    const subtotal = this.PRECO_NOITE * noites;
    const taxa = subtotal * this.TAXA;
    const total = subtotal + taxa;

    const rowSub = root.getElementById('rowSubtotal');
    const rowTaxa = root.getElementById('rowTaxa');
    const rowTotal = root.getElementById('rowTotal');

    if (noites > 0) {
      rowSub.innerHTML = `<span>R$ 450,00 × ${noites} noite${noites > 1 ? 's' : ''}</span><span>${this.formatarBRL(subtotal)}</span>`;
      rowTaxa.innerHTML = `<span>Taxa de serviço (10%)</span><span>${this.formatarBRL(taxa)}</span>`;
      rowTotal.innerHTML = `<span>Total</span><span>${this.formatarBRL(total)}</span>`;
    } else {
      rowSub.innerHTML = '<span>R$ 450,00 × — noites</span><span>—</span>';
      rowTaxa.innerHTML = '<span>Taxa de serviço (10%)</span><span>—</span>';
      rowTotal.innerHTML = '<span>Total</span><span>—</span>';
    }
  }

  reservar() {
    const noites = this.calcularNoites();
    if (!this.checkInEl.value || !this.checkOutEl.value || noites <= 0) {
      alert('Por favor, selecione datas válidas de check-in e check-out.');
      return;
    }
    const url = new URL(window.location);
    url.searchParams.set('page', 'escolha-pagamento');
    window.history.pushState({}, '', url);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
}

export { DetalheComponent };
