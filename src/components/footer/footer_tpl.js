const imgLogo = new URL('./logo.png', import.meta.url).href;

const template = document.createElement('template');

template.innerHTML = `
  <link rel="stylesheet" href="${new URL('./footer.css', import.meta.url).href}">

  <footer>
    <div class="footer-inner">
      <a href="?page=home" data-link="home" class="footer-logo">
        <img src="${imgLogo}" alt="">
        NextStop
      </a>
      <p class="footer-tagline">
        Descubra lugares incríveis e viva experiências únicas ao redor do mundo.
      </p>

      <div class="footer-colunas">
        <div>
          <p class="footer-coluna-titulo">Explorar</p>
          <ul class="footer-coluna-lista">
            <li><a href="?page=home" data-link="home">Casas</a></li>
            <li><a href="?page=home" data-link="home">Apartamentos</a></li>
            <li><a href="?page=home" data-link="home">Chalés</a></li>
            <li><a href="?page=home" data-link="home">Pousadas</a></li>
          </ul>
        </div>

        <div>
          <p class="footer-coluna-titulo">Anfitrião</p>
          <ul class="footer-coluna-lista">
            <li><a href="#">Cadastrar Hospedagem</a></li>
            <li><a href="#">Recursos</a></li>
            <li><a href="#">Comunidade</a></li>
          </ul>
        </div>

        <div>
          <p class="footer-coluna-titulo">Anfitrião</p>
          <ul class="footer-coluna-lista">
            <li><a href="#">Central de Ajuda</a></li>
            <li><a href="#">Cancelamento</a></li>
            <li><a href="#">Segurança</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-base">
        <span>© 2026 NextStop. Todos os direitos reservados.</span>
        <div class="footer-base-links">
          <a href="#">Privacidade</a>
          <a href="#">Termos</a>
          <a href="#">Mapa do site</a>
        </div>
      </div>
    </div>
  </footer>
`;

class FooterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export { FooterComponent };
