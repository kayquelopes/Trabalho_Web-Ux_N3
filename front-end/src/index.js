import { Header } from './components/header/index.js';


// Central Registration of Web Components
customElements.define('app-header', Header);


// Pages
customElements.define('page-home', Home);

console.log('App initialized and components registered.');
