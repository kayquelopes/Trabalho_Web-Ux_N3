import { telaInicialTpl, telaInicialCss } from "./components/tela inicial/telaInicial_tpl.js";
import { iniciarFluxoAuth } from "./components/tela inicial/telaInicial.js";

// CSS globais, usados em todas as páginas (carregados uma única vez)
// Caminhos relativos a partir de public/index.html (documento que recebe os <link>)
const estilosGlobais = [
  "../src/styles/variables.css",
  "../src/styles/base.css",
  "../src/styles/main.css",
];

// Mapa de páginas: cada "page" tem template, css próprio e init (js opcional)
const paginas = {
  telaInicial: {
    template: telaInicialTpl,
    css: telaInicialCss,
    init: iniciarFluxoAuth,
  },
  // futuras páginas entram aqui, ex:
  // perfil: { template: perfilTpl, css: perfilCss, init: iniciarPerfil },
};

// Controla quais CSS já foram injetados, pra não duplicar <link>
const cssCarregados = new Set();

function carregarCss(caminho) {
  if (!caminho || cssCarregados.has(caminho)) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = caminho;
  document.head.appendChild(link);

  cssCarregados.add(caminho);
}

function carregarEstilosGlobais() {
  estilosGlobais.forEach(carregarCss);
}

function renderizarPagina(nomePagina) {
  const pagina = paginas[nomePagina];
  const app = document.getElementById("app");

  if (!pagina) {
    console.error(`Página "${nomePagina}" não encontrada.`);
    return;
  }

  carregarCss(pagina.css);

  app.innerHTML = pagina.template();

  if (typeof pagina.init === "function") {
    pagina.init();
  }
}

// Descobre qual página carregar (via ?page=xxx na URL, com fallback)
function obterPaginaAtual() {
  const params = new URLSearchParams(window.location.search);
  return params.get("page") || "telaInicial";
}

document.addEventListener("DOMContentLoaded", () => {
  carregarEstilosGlobais();
  renderizarPagina(obterPaginaAtual());
});
