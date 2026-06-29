// Caminhos das imagens, resolvidos a partir da localização deste módulo
// (igual ao professor faz com o CSS do header, usando import.meta.url)
const imgLogo = new URL('./img/logo.png', import.meta.url).href;
const imgGoogle = new URL('./img/logoG.png', import.meta.url).href;

const template = document.createElement('template');

template.innerHTML = `
    <link rel="stylesheet" href="${new URL('./telaInicial.css', import.meta.url).href}">

    <div class="container-bg">
      <div class="container-imglogo">
        <img class="style-imglogo" src="${imgLogo}" alt="Logo">
      </div>

      <div class="container-texto">
        <h1 class="style-txtlogo">NextStop</h1>
        <p class="style-tagline">Seu próximo destino começa aqui.</p>
      </div>

      <div class="container-btn">
        <button class="style-btn">Explorer</button>
      </div>
    </div>

    <div class="sobreposicao-auth" id="sobreposicaoAuth">
      <div class="cartao-auth">

        <!-- VIEW: LOGIN -->
        <div class="tela-auth ativa" id="tela-login">
          <div class="cabecalho-auth">
            <img class="style-imglogo-reduzida" src="${imgLogo}" alt="Logo">
            <h2 class="titulo-auth">Faça login no NextStop</h2>
          </div>

          <button class="botao-google">
            <img src="${imgGoogle}" alt="">
            Continue com o Google
          </button>

          <div class="divisor">ou</div>

          <label class="rotulo-auth">E-MAIL</label>
          <input type="email" class="campo-auth" placeholder="seuemail@exemplo.com">

          <label class="rotulo-auth">SENHA</label>
          <input type="password" class="campo-auth" placeholder="••••••••••••••">

          <button class="botao-primario" id="btnFazerLogin">Fazer Login</button>

          <p class="auth-trocar">Sem conta? <a href="#" id="irParaCadastroEmail">Crie um</a></p>
        </div>

        <!-- VIEW: CADASTRO - EMAIL -->
        <div class="tela-auth" id="tela-cadastro-email">
          <div class="cabecalho-auth">
            <img class="style-imglogo-reduzida" src="${imgLogo}" alt="Logo">
            <h2 class="titulo-auth">Boas-vindas ao NextStop</h2>
          </div>

          <button class="botao-google">
            <img src="${imgGoogle}" alt="">
            Continue com o Google
          </button>

          <div class="divisor">ou</div>

          <label class="rotulo-auth">E-MAIL</label>
          <input type="email" class="campo-auth" id="cadastroEmail" placeholder="seuemail@exemplo.com">

          <button class="botao-primario" id="btnContinuarEmail">Continuar com o e-mail</button>

          <p class="auth-trocar">Já tem conta? <a href="#" id="irParaLoginDoEmail">Entrar</a></p>
        </div>

        <!-- VIEW: CADASTRO - SENHA -->
        <div class="tela-auth" id="tela-cadastro-senha">
          <div class="cabecalho-auth">
            <img class="style-imglogo-reduzida" src="${imgLogo}" alt="Logo">
            <h2 class="titulo-auth">Boas-vindas ao NextStop</h2>
          </div>

          <button class="botao-google">
            <img src="${imgGoogle}" alt="">
            Continue com o Google
          </button>

          <div class="divisor">ou</div>

          <label class="rotulo-auth">SENHA</label>
          <input type="password" class="campo-auth" placeholder="••••••••••••••">

          <label class="rotulo-auth">Confirme a senha</label>
          <input type="password" class="campo-auth" placeholder="••••••••••••••">

          <button class="botao-primario" id="btnCadastrar">Cadastrar</button>

          <p class="auth-trocar">Já tem conta? <a href="#" id="irParaLoginDaSenha">Entrar</a></p>
        </div>

      </div>
    </div>
`;

class TelaInicialComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.iniciarFluxoAuth();
  }

  iniciarFluxoAuth() {
    const root = this.shadowRoot;

    const botaoExplorer = root.querySelector('.style-btn');
    const sobreposicao = root.getElementById('sobreposicaoAuth');

    const telas = {
      login: root.getElementById('tela-login'),
      cadastroEmail: root.getElementById('tela-cadastro-email'),
      cadastroSenha: root.getElementById('tela-cadastro-senha'),
    };

    function mostrarTela(chave) {
      Object.values(telas).forEach(t => t.classList.remove('ativa'));
      telas[chave].classList.add('ativa');
    }

    function abrirSobreposicao(chave) {
      mostrarTela(chave);
      sobreposicao.classList.add('aberta');
    }

    botaoExplorer.addEventListener('click', () => abrirSobreposicao('login'));

    root.getElementById('irParaCadastroEmail').addEventListener('click', (e) => {
      e.preventDefault();
      mostrarTela('cadastroEmail');
    });

    root.getElementById('btnContinuarEmail').addEventListener('click', () => {
      mostrarTela('cadastroSenha');
    });

    root.getElementById('irParaLoginDoEmail').addEventListener('click', (e) => {
      e.preventDefault();
      mostrarTela('login');
    });

    root.getElementById('irParaLoginDaSenha').addEventListener('click', (e) => {
      e.preventDefault();
      mostrarTela('login');
    });

    root.getElementById('btnFazerLogin').addEventListener('click', () => {
      console.log('Login enviado');
    });

    root.getElementById('btnCadastrar').addEventListener('click', () => {
      console.log('Cadastro enviado');
    });
  }
}

export { TelaInicialComponent };
