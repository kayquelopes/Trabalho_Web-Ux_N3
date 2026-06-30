const imgLogo = new URL('../tela inicial/img/logo.png', import.meta.url).href;

const template = document.createElement('template');

template.innerHTML = `
  <link rel="stylesheet" href="${new URL('./reserva-confirmada.css', import.meta.url).href}">

  <div class="wrapper">
    <div class="icone-sucesso">✓</div>
    <h1 class="titulo-confirmacao">Reserva Confirmada</h1>
    <p class="subtitulo-confirmacao">Seu recibo digital está pronto</p>

    <div class="recibo-card">
      <div class="recibo-faixa">
        <img src="${imgLogo}" alt="">
        NextStop
      </div>

      <img class="recibo-img" src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=340&fit=crop" alt="Casa com vista para o campo na Italia">

      <div class="recibo-corpo">
        <p class="recibo-propriedade">Casa com vista para o campo na Italia</p>

        <div class="recibo-grid">
          <div>
            <p class="recibo-label">Check-in</p>
            <p class="recibo-valor" id="valorCheckin">10 / 10 / 2026</p>
          </div>
          <div>
            <p class="recibo-label">Check-out</p>
            <p class="recibo-valor" id="valorCheckout">16 / 10 / 2026</p>
          </div>
          <div>
            <p class="recibo-label">Hóspedes</p>
            <p class="recibo-valor">1</p>
          </div>
          <div>
            <p class="recibo-label">Pagamento</p>
            <p class="recibo-valor">Cartão de Crédito</p>
          </div>
        </div>

        <hr class="recibo-divisor">

        <div class="recibo-precos">
          <div class="linha-preco"><span>R$ 450,00 x 6 dias</span><span>R$ 2.700,00</span></div>
          <div class="linha-preco"><span>Taxa de serviço</span><span>R$ 1.080,00</span></div>
          <div class="linha-preco total"><span>Total Pago</span><span>R$ 3.780,00</span></div>
        </div>
      </div>
    </div>

    <div class="status-box">
      <p class="status-linha">Status: <span class="status-valor">Confirmado</span></p>
      <p class="status-hospede">Hóspede: Kayque Lopes<br>kayquelopes353@gmail.com</p>
    </div>

    <div class="acoes-confirmacao">
      <a href="?page=home" data-link="home" class="btn-secundario">Explorer Mais</a>
      <a href="?page=minhas-reservas" data-link="minhas-reservas" class="btn-primario-confirmacao">Minhas Reservas</a>
    </div>
  </div>
`;

class ReservaConfirmadaComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export { ReservaConfirmadaComponent };
