const template = document.createElement('template');

template.innerHTML = `
  <link rel="stylesheet" href="${new URL('./perfil.css', import.meta.url).href}">

  <div class="profile-card">
    <div class="avatar">K</div>
    <p class="profile-name">Kayque Lopes</p>
    <p class="profile-email">kayque@example.com</p>
  </div>

  <div class="section-card">
    <h2 class="section-card-title">Informações Pessoais</h2>
    <div class="form-grid">
      <div class="form-group">
        <label class="form-label">Nome</label>
        <input type="text" class="form-input" value="Kayque Lopes">
      </div>
      <div class="form-group">
        <label class="form-label">Sobrenome</label>
        <input type="text" class="form-input" value="Lopes">
      </div>
      <div class="form-group form-full">
        <label class="form-label">E-mail</label>
        <input type="email" class="form-input" value="kayque@example.com">
      </div>
      <div class="form-group">
        <label class="form-label">Telefone</label>
        <input type="text" class="form-input" placeholder="(00) 00000-0000">
      </div>
      <div class="form-group">
        <label class="form-label">Cidade</label>
        <input type="text" class="form-input" placeholder="Sua cidade">
      </div>
      <div class="form-group form-full">
        <button class="btn-primary" id="btnSalvar">✓ Salvar Alterações</button>
      </div>
    </div>

    <a href="?page=minhas-reservas" data-link="minhas-reservas" class="link-reservas">📅 Ver minhas reservas →</a>
  </div>
`;

class PerfilComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.getElementById('btnSalvar').addEventListener('click', () => {
      alert('Perfil atualizado com sucesso!');
    });
  }
}

export { PerfilComponent };
