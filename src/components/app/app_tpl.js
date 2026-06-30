const template = document.createElement('template');

template.innerHTML = `
  <div id="cabecalho-slot"></div>
  <div id="pagina-slot"></div>
  <div id="rodape-slot"></div>
`;

// Mapa central de rotas: cada chave é o valor usado em "?page=chave".
// "tag": nome da custom element já registrada em src/index.js.
// "header"/"footer": se a página deve vir envolvida por <app-header>/<app-footer>.
const rotas = {
  inicial: { tag: 'page-inicial', header: false, footer: false },
  home: { tag: 'page-home', header: true, footer: true },
  detalhe: { tag: 'page-detalhe', header: true, footer: true },
  perfil: { tag: 'page-perfil', header: true, footer: true },
  'minhas-reservas': { tag: 'page-minhas-reservas', header: true, footer: true },
  'escolha-pagamento': { tag: 'page-escolha-pagamento', header: true, footer: false },
  'cadastro-cartao': { tag: 'page-cadastro-cartao', header: true, footer: false },
  'reserva-confirmada': { tag: 'page-reserva-confirmada', header: true, footer: true },
  'reserva-confirmada': { tag: 'page-reserva-confirmada', header: true, footer: true },
  revisao: { tag: 'page-revisao', header: true, footer: true },
};

const ROTA_PADRAO = 'inicial';

class AppComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.handleClick = this.handleClick.bind(this);
    this.handlePopState = this.handlePopState.bind(this);
  }

  connectedCallback() {
    document.addEventListener('click', this.handleClick);
    window.addEventListener('popstate', this.handlePopState);
    this.renderizarRota(this.obterPaginaAtual());
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleClick);
    window.removeEventListener('popstate', this.handlePopState);
  }

  obterPaginaAtual() {
    const params = new URLSearchParams(window.location.search);
    return params.get('page') || ROTA_PADRAO;
  }

  // Intercepta cliques em qualquer link "?page=..." ou com [data-link],
  // em qualquer lugar do documento (inclusive vindo de dentro de outros
  // Web Components, via e.composedPath()).
  handleClick(e) {
    const caminho = e.composedPath();
    const link = caminho.find(
      (el) => el.tagName === 'A' && (el.hasAttribute('data-link') || el.getAttribute('href')?.startsWith('?page='))
    );

    if (!link) return;

    e.preventDefault();
    const href = link.getAttribute('href') || `?page=${link.dataset.link}`;
    const params = new URLSearchParams(href.replace('?', ''));
    this.navegarPara(params.get('page'));
  }

  handlePopState() {
    this.renderizarRota(this.obterPaginaAtual());
  }

  navegarPara(nomePagina) {
    const url = new URL(window.location);
    url.searchParams.set('page', nomePagina);
    window.history.pushState({}, '', url);
    this.renderizarRota(nomePagina);
  }

  renderizarRota(nomePagina) {
    const rota = rotas[nomePagina] || rotas[ROTA_PADRAO];
    const root = this.shadowRoot;

    const cabecalhoSlot = root.getElementById('cabecalho-slot');
    const paginaSlot = root.getElementById('pagina-slot');
    const rodapeSlot = root.getElementById('rodape-slot');

    cabecalhoSlot.innerHTML = rota.header ? '<app-header></app-header>' : '';
    paginaSlot.innerHTML = `<${rota.tag}></${rota.tag}>`;
    rodapeSlot.innerHTML = rota.footer ? '<app-footer></app-footer>' : '';
  }
}

export { AppComponent };
