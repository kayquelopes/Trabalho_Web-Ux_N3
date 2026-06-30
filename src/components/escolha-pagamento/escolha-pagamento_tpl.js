const template = document.createElement('template');

template.innerHTML = `
  <link rel="stylesheet" href="${new URL('./escolha-pagamento.css', import.meta.url).href}">

  <div class="payment-layout">
    <div class="payment-card">
      <h1 class="payment-title">Forma de pagamento</h1>

      <div class="payment-option active" data-tipo="card">
        <div class="radio-dot"></div>
        <div class="payment-option-info">
          <strong>Cartão de Crédito</strong>
          <span>Visa, Mastercard, Elo</span>
        </div>
        <span class="payment-icon">💳</span>
      </div>

      <div class="payment-option" data-tipo="pix">
        <div class="radio-dot"></div>
        <div class="payment-option-info">
          <strong>PIX</strong>
          <span>Pagamento instantâneo</span>
        </div>
        <span class="payment-icon">▢</span>
      </div>

      <div class="payment-option" data-tipo="boleto">
        <div class="radio-dot"></div>
        <div class="payment-option-info">
          <strong>Boleto Bancário</strong>
          <span>Vencimento em 3 dias úteis</span>
        </div>
        <span class="payment-icon">≣</span>
      </div>
    </div>

    <aside>
      <div class="summary-card">
        <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=280&fit=crop" alt="Casa Itália" class="summary-img">
        <p class="summary-location">📍 Veneza, Itália</p>
        <p class="summary-title">Casa com Vista para o Campo</p>
        <div class="summary-row"><span>R$ 450,00 × 5 noites</span><span>R$ 2.250,00</span></div>
        <div class="summary-row"><span>Taxa de serviço (10%)</span><span>R$ 225,00</span></div>
        <hr class="summary-divider">
        <div class="summary-total"><span>Total</span><span>R$ 2.475,00</span></div>

        <button class="confirm-btn" id="btnContinuar">🔒 Continuar</button>
        <p class="secure-note">🛡️ Pagamento seguro e criptografado</p>
      </div>
    </aside>
  </div>
`;

const ROTA_POR_TIPO = {
  card: 'cadastro-cartao',
  pix: 'pix',
  boleto: 'boleto',
};

class EscolhaPagamentoComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.tipoSelecionado = 'card';
  }

  connectedCallback() {
    const root = this.shadowRoot;

    root.querySelectorAll('.payment-option').forEach((opt) => {
      opt.addEventListener('click', () => {
        root.querySelectorAll('.payment-option').forEach((o) => o.classList.remove('active'));
        opt.classList.add('active');
        this.tipoSelecionado = opt.dataset.tipo;
      });
    });

    root.getElementById('btnContinuar').addEventListener('click', () => this.continuar());
  }

  continuar() {
    const proximaRota = ROTA_POR_TIPO[this.tipoSelecionado] || 'cadastro-cartao';
    const url = new URL(window.location);
    url.searchParams.set('page', proximaRota);
    window.history.pushState({}, '', url);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
}

export { EscolhaPagamentoComponent };
