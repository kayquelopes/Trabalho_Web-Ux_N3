function iniciarFluxoAuth() {
  const botaoExplorer = document.querySelector('.style-btn');
  const sobreposicao = document.getElementById('sobreposicaoAuth');

  const telas = {
    login: document.getElementById('tela-login'),
    cadastroEmail: document.getElementById('tela-cadastro-email'),
    cadastroSenha: document.getElementById('tela-cadastro-senha'),
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

  document.getElementById('irParaCadastroEmail').addEventListener('click', (e) => {
    e.preventDefault();
    mostrarTela('cadastroEmail');
  });

  document.getElementById('btnContinuarEmail').addEventListener('click', () => {
    mostrarTela('cadastroSenha');
  });

  document.getElementById('irParaLoginDoEmail').addEventListener('click', (e) => {
    e.preventDefault();
    mostrarTela('login');
  });

  document.getElementById('irParaLoginDaSenha').addEventListener('click', (e) => {
    e.preventDefault();
    mostrarTela('login');
  });

  document.getElementById('btnFazerLogin').addEventListener('click', () => {
    console.log('Login enviado');
  });

  document.getElementById('btnCadastrar').addEventListener('click', () => {
    console.log('Cadastro enviado');
  });
}

document.addEventListener('DOMContentLoaded', iniciarFluxoAuth);