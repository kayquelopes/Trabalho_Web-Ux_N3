const template = document.createElement('template');

template.innerHTML = `
  <link rel="stylesheet" href="${new URL('./minhas-reservas.css', import.meta.url).href}">

  <a href="?page=perfil" data-link="perfil" class="back-link">← Voltar ao perfil</a>

  <div class="section-card">
    <h2 class="section-card-title">Minhas Reservas</h2>
    <div class="reservation-list">
      <div class="reservation-item">
        <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=140&h=140&fit=crop" alt="Casa Itália" class="reservation-img">
        <div class="reservation-info">
          <p class="reservation-title">Casa com Vista para o Campo</p>
          <p class="reservation-dates">📍 Veneza, Itália · 15/08 – 20/08/2026 · 5 noites</p>
        </div>
        <span class="reservation-status">Confirmada</span>
      </div>
      <div class="reservation-item">
        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=140&h=140&fit=crop" alt="Pousada Brasil" class="reservation-img">
        <div class="reservation-info">
          <p class="reservation-title">Pousada Aconchegante na Praia</p>
          <p class="reservation-dates">📍 Praia, Brasil · 10/09 – 14/09/2026 · 4 noites</p>
        </div>
        <span class="reservation-status">Confirmada</span>
      </div>
    </div>
  </div>
`;

class MinhasReservasComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export { MinhasReservasComponent };
