const template = document.createElement('template');

template.innerHTML = `
  <link rel="stylesheet" href="${new URL('./header.css', import.meta.url).href}">

  <header>
    <div class="header-inner">
      <a href="?page=home" data-link="home" class="logo">
        <span class="icone-logo">✦</span>
        NextStop
      </a>

      <nav class="nav-desktop">
        <a href="?page=perfil" data-link="perfil" class="nav-link-pill">👤 Meu Perfil</a>
      </nav>

      <button class="menu-toggle" id="menuToggle">
        ☰ <span>MENU</span>
      </button>
    </div>

    <nav class="dropdown-menu" id="dropdownMenu">
      <div class="menu-usuario">
        <span class="nome-usuario">Kayque Lopes</span>
        <span class="email-usuario">kayque@example.com</span>
      </div>
      <ul class="menu-lista">
        <li><a href="?page=home" data-link="home">🔍 Explorar</a></li>
        <li><a href="?page=perfil" data-link="perfil">👤 Meu Perfil</a></li>
        <li><a href="?page=minhas-reservas" data-link="minhas-reservas">📅 Minhas Reservas</a></li>
        <li><a href="?page=inicial" data-link="inicial">🚪 Sair</a></li>
      </ul>
    </nav>
  </header>
`;

class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  connectedCallback() {
    const root = this.shadowRoot;
    this.menuToggle = root.getElementById('menuToggle');
    this.dropdownMenu = root.getElementById('dropdownMenu');

    this.menuToggle.addEventListener('click', this.handleMenuClick);
    root.querySelectorAll('.menu-lista a').forEach((item) => {
      item.addEventListener('click', this.handleItemClick);
    });
    document.addEventListener('click', this.handleOutsideClick);
  }

  disconnectedCallback() {
    this.menuToggle.removeEventListener('click', this.handleMenuClick);
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleMenuClick(e) {
    e.stopPropagation();
    this.dropdownMenu.classList.toggle('ativo');
  }

  handleItemClick() {
    this.dropdownMenu.classList.remove('ativo');
  }

  // Fecha o dropdown ao clicar fora do header (mesmo fora do Shadow DOM)
  handleOutsideClick(e) {
    const dentroDoHeader = e.composedPath().includes(this);
    if (!dentroDoHeader) {
      this.dropdownMenu.classList.remove('ativo');
    }
  }
}

export { HeaderComponent };
