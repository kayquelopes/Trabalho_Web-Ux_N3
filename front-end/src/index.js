import { TelaInicial } from './components/tela inicial/index.js';
import { Header } from './components/header/index.js';
import { Footer } from './components/footer/index.js';
import { Revisao } from './components/revisao/index.js';
import { Home } from './components/home/index.js';
import { Detalhe } from './components/detalhe/index.js';
import { Perfil } from './components/perfil/index.js';
import { MinhasReservas } from './components/minhas-reservas/index.js';
import { EscolhaPagamento } from './components/escolha-pagamento/index.js';
import { CadastroCartao } from './components/cadastro-cartao/index.js';
import { ReservaConfirmada } from './components/reserva-confirmada/index.js';
import { App } from './components/app/index.js';

customElements.define('page-inicial', TelaInicial);
customElements.define('app-header', Header);
customElements.define('app-footer', Footer);
customElements.define('page-revisao', Revisao);
customElements.define('page-home', Home);
customElements.define('page-detalhe', Detalhe);
customElements.define('page-perfil', Perfil);
customElements.define('page-minhas-reservas', MinhasReservas);
customElements.define('page-escolha-pagamento', EscolhaPagamento);
customElements.define('page-cadastro-cartao', CadastroCartao);
customElements.define('page-reserva-confirmada', ReservaConfirmada);
customElements.define('page-app', App);

console.log('App inicializado e componentes registrados.');
