const template = document.createElement('template');

template.innerHTML = `
  <link rel="stylesheet" href="${new URL('./cadastro-cartao.css', import.meta.url).href}">

  <div class="payment-card">
    <a href="?page=escolha-pagamento" data-link="escolha-pagamento" class="back-link">← Voltar</a>
    <h1 class="payment-title">Dados do cartão</h1>

    <div class="form-group">
      <label class="form-label">Número do cartão</label>
      <input type="text" class="form-input" placeholder="0000 0000 0000 0000" maxlength="19">
    </div>
    <div class="form-group">
      <label class="form-label">Nome no cartão</label>
      <input type="text" class="form-input" placeholder="Como aparece no cartão">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Validade</label>
        <input type="text" class="form-input" placeholder="MM/AA" maxlength="5">
      </div>
      <div class="form-group">
        <label class="form-label">CVV</label>
        <input type="text" class="form-input" placeholder="000" maxlength="3">
      </div>
    </div>

    <button class="confirm-btn" id="btnConfirmar">🔒 Confirmar e Pagar</button>
    <p class="secure-note">🛡️ Pagamento seguro e criptografado</p>
  </div>
`;

class CadastroCartaoComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.getElementById('btnConfirmar').addEventListener('click', () => {
      const url = new URL(window.location);
      url.searchParams.set('page', 'reserva-confirmada');
      window.history.pushState({}, '', url);
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
  }
}

export { CadastroCartaoComponent };
