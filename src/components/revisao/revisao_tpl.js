const imgCasa = new URL('./img/casa-italia.jpg', import.meta.url).href;

const template = document.createElement('template');

template.innerHTML = `
  <link rel="stylesheet" href="${new URL('./revisao.css', import.meta.url).href}">

  <div class="shell">
    <main>
      <h1>Revise e continue</h1>

      <div class="property-card">
        <div class="property-hero">
          <div class="property-img-inner">
            <img src="${imgCasa}" alt="Casa com vista para o campo na Italia" />
          </div>

          <div class="property-info">
            <p class="property-name">Casa com vista para o campo na Italia</p>
            <div class="property-badges">
              <span class="badge-rating">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#F4A629" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                4.9
              </span>
              <span class="badge-host">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2zm0 12c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z"/></svg>
                Preferido dos Hóspedes
              </span>
            </div>
          </div>
        </div>

        <div class="section-block">
          <div class="section-row">
            <div>
              <p class="section-label">Datas:</p>
              <div class="detail-lines">
                <span class="detail-line">CHECK-IN: <span class="detail-value" id="checkinValor">10 / 10 / 2026</span></span>
                <span class="detail-line">CHECK-OUT: <span class="detail-value" id="checkoutValor">16 / 10 / 2026</span></span>
              </div>
            </div>
            <button class="alter-btn" data-modal="dates">Alterar</button>
          </div>
        </div>

        <div class="section-block">
          <div class="section-row">
            <div>
              <p class="section-label">Hóspedes:</p>
              <div class="detail-lines">
                <span class="detail-line">ADULTO: <span class="detail-value" id="adultCount">1</span></span>
                <span class="detail-line">CRIANÇA: <span class="detail-value" id="childCount">0</span></span>
              </div>
            </div>
            <button class="alter-btn" data-modal="guests">Alterar</button>
          </div>
        </div>

        <div class="price-section">
          <p class="price-label">Preço Total:</p>
          <div class="price-meta">
            <span>DIAS: 6</span>
            <span>VALOR: R$ 450,00/NOITE</span>
          </div>
          <hr class="price-divider" />
          <p class="price-total" id="totalPrice">R$ 2.700,00 BRL</p>
          <p class="price-installments" id="installments">ou em 12x de R$ 225,00</p>
        </div>

        <div class="cancellation-strip">✓ Cancelamento gratuito</div>
      </div>

      <div class="cancellation-policy">
        Cancelamento até uma semana antes da data marcada. Receberá um reembolso integral.
        <span class="policy-link">Política completa</span>
      </div>
    </main>

    <div class="cta-footer">
      <button class="cta-btn" id="btnProximo">Próximo</button>
    </div>
  </div>

  <div class="modal-backdrop" id="datesModal">
    <div class="modal">
      <button class="modal-close" data-close="dates">×</button>
      <h2>Alterar datas</h2>
      <div class="date-grid">
        <div class="date-field">
          <label>Check-in</label>
          <input type="date" id="checkin" value="2026-10-10" min="2026-06-22" />
        </div>
        <div class="date-field">
          <label>Check-out</label>
          <input type="date" id="checkout" value="2026-10-16" min="2026-06-23" />
        </div>
      </div>
      <button class="modal-confirm" id="btnSaveDates">Confirmar datas</button>
    </div>
  </div>

  <div class="modal-backdrop" id="guestsModal">
    <div class="modal">
      <button class="modal-close" data-close="guests">×</button>
      <h2>Alterar hóspedes</h2>

      <div class="guest-row">
        <div>
          <p class="guest-type">Adultos</p>
          <p class="guest-sub">13 anos ou mais</p>
        </div>
        <div class="counter">
          <button class="counter-btn" data-adjust="adult" data-delta="-1">−</button>
          <span class="counter-val" id="adultModal">1</span>
          <button class="counter-btn" data-adjust="adult" data-delta="1">+</button>
        </div>
      </div>

      <div class="guest-row">
        <div>
          <p class="guest-type">Crianças</p>
          <p class="guest-sub">2 a 12 anos</p>
        </div>
        <div class="counter">
          <button class="counter-btn" data-adjust="child" data-delta="-1">−</button>
          <span class="counter-val" id="childModal">0</span>
          <button class="counter-btn" data-adjust="child" data-delta="1">+</button>
        </div>
      </div>

      <button class="modal-confirm" id="btnSaveGuests">Confirmar hóspedes</button>
    </div>
  </div>

  <div class="toast" id="toast"></div>
`;

class RevisaoComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.state = {
      checkin: new Date('2026-10-10'),
      checkout: new Date('2026-10-16'),
      adults: 1,
      children: 0,
      pricePerNight: 450,
    };

    this.tempAdult = 1;
    this.tempChild = 0;
  }

  connectedCallback() {
    const root = this.shadowRoot;

    root.querySelectorAll('[data-modal]').forEach((btn) => {
      btn.addEventListener('click', () => this.abrirModal(btn.dataset.modal));
    });

    root.querySelectorAll('[data-close]').forEach((btn) => {
      btn.addEventListener('click', () => this.fecharModal(btn.dataset.close));
    });

    root.querySelectorAll('[data-adjust]').forEach((btn) => {
      btn.addEventListener('click', () =>
        this.ajustarHospede(btn.dataset.adjust, parseInt(btn.dataset.delta, 10))
      );
    });

    root.getElementById('btnSaveDates').addEventListener('click', () => this.salvarDatas());
    root.getElementById('btnSaveGuests').addEventListener('click', () => this.salvarHospedes());
    root.getElementById('btnProximo').addEventListener('click', () => this.proximo());

    root.querySelectorAll('.modal-backdrop').forEach((el) => {
      el.addEventListener('click', (e) => {
        if (e.target === el) el.classList.remove('open');
      });
    });

    this.atualizarUI();
  }

  formatarData(d) {
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  diferencaDias(a, b) {
    return Math.max(0, Math.round((b - a) / 86400000));
  }

  formatarBRL(v) {
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  mostrarToast(msg) {
    const t = this.shadowRoot.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
  }

  atualizarUI() {
    const root = this.shadowRoot;
    const dias = this.diferencaDias(this.state.checkin, this.state.checkout);
    const total = dias * this.state.pricePerNight;
    const parcela = total / 12;

    root.getElementById('adultCount').textContent = this.state.adults;
    root.getElementById('childCount').textContent = this.state.children;
    root.getElementById('totalPrice').textContent = this.formatarBRL(total) + ' BRL';
    root.getElementById('installments').textContent = `ou em 12x de ${this.formatarBRL(parcela)}`;
  }

  abrirModal(tipo) {
    const root = this.shadowRoot;
    if (tipo === 'dates') {
      root.getElementById('checkin').valueAsDate = this.state.checkin;
      root.getElementById('checkout').valueAsDate = this.state.checkout;
      root.getElementById('datesModal').classList.add('open');
    } else {
      root.getElementById('adultModal').textContent = this.state.adults;
      root.getElementById('childModal').textContent = this.state.children;
      root.getElementById('guestsModal').classList.add('open');
    }
  }

  fecharModal(tipo) {
    const id = tipo === 'dates' ? 'datesModal' : 'guestsModal';
    this.shadowRoot.getElementById(id).classList.remove('open');
  }

  salvarDatas() {
    const root = this.shadowRoot;
    const ci = new Date(root.getElementById('checkin').value + 'T12:00:00');
    const co = new Date(root.getElementById('checkout').value + 'T12:00:00');

    if (co <= ci) {
      this.mostrarToast('O check-out deve ser após o check-in.');
      return;
    }

    this.state.checkin = ci;
    this.state.checkout = co;

    root.getElementById('checkinValor').textContent = this.formatarData(ci);
    root.getElementById('checkoutValor').textContent = this.formatarData(co);

    this.atualizarUI();
    this.fecharModal('dates');
    this.mostrarToast('Datas atualizadas ✓');
  }

  ajustarHospede(tipo, delta) {
    const root = this.shadowRoot;
    if (tipo === 'adult') {
      this.tempAdult = Math.max(1, (parseInt(root.getElementById('adultModal').textContent, 10) || 1) + delta);
      root.getElementById('adultModal').textContent = this.tempAdult;
    } else {
      this.tempChild = Math.max(0, (parseInt(root.getElementById('childModal').textContent, 10) || 0) + delta);
      root.getElementById('childModal').textContent = this.tempChild;
    }
  }

  salvarHospedes() {
    const root = this.shadowRoot;
    this.state.adults = parseInt(root.getElementById('adultModal').textContent, 10);
    this.state.children = parseInt(root.getElementById('childModal').textContent, 10);
    this.atualizarUI();
    this.fecharModal('guests');
    this.mostrarToast('Hóspedes atualizados ✓');
  }

  proximo() {
    this.mostrarToast('Reserva confirmada! Redirecionando…');
  }
}

export { RevisaoComponent };
