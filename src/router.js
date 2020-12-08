import Vue from 'vue'
import VueRouter from 'vue-router'
import AbrirPedido from './components/AbrirPedido.vue'
import Index from './components/Index.vue'
import Inicial from './components/Inicial.vue'
import DetalhesFornecedor from './components/DetalhesFornecedor.vue'
import DetalhesCliente from './components/DetalhesCliente.vue'
import CadastroProduto from './components/CadastroProduto.vue'
import CadastroFornecedor from './components/CadastroFornecedor.vue'
import CadastroCliente from './components/CadastroCliente.vue'
import CadastroMarca from './components/CadastroMarca.vue'
import CadastroCategoria from './components/CadastroCategoria.vue'
import ListagemProdutos from './components/ListagemProdutos.vue'
import ListagemClientes from './components/ListagemClientes.vue'
import ListagemPedidos from './components/ListagemPedidos.vue'
import ProdutosDestaque from './components/ProdutosDestaque.vue'
import RelatorioListagemClientes from './components/RelatorioListagemClientes.vue'
import RelatorioListagemProdutos from './components/RelatorioListagemProdutos.vue'

Vue.use(VueRouter)
export default new VueRouter({
    mode: 'history',
    routes: [
        // Unicas
        { path: '/', component: Index },
        { path: '/inicial', component: Inicial },
        { path: '/detalhesfornecedor/:id', name: 'datalhes-dos-fornecedores', component: DetalhesFornecedor },
        //{ path: '*', name: 'error404', compornent: error404},
        //Cadastros
        { path: '/cadastroproduto', name: 'novo-produto', component: CadastroProduto },
        { path: '/cadastrofornecedor', name: 'cadastro-de-fornecedor', component: CadastroFornecedor },
        { path: '/cadastrocliente', name: 'novo-cliente', component: CadastroCliente },
        { path: '/cadastrocategoria', name: 'nova-categoria', component: CadastroCategoria },
        { path: '/cadastromarca', name: 'nova-marca', component: CadastroMarca },
        //Listagem
        { path: '/listagemprodutos', name: 'listagem-de-produtos', component: ListagemProdutos },
        { path: '/listagemclientes', name: 'listagem-de-clientes', component: ListagemClientes },
        { path: '/listagempedidos', name: 'listagem-de-pedidos', component: ListagemPedidos },
        { path: '/destaques', name: 'produtos-em-destaque', component: ProdutosDestaque },
        //Pedidos
        { path: '/abrirpedido', name: 'novo-pedido', component: AbrirPedido },
        //Editar
        { path: '/clientes/:id', name: 'detalhes-cliente', component: DetalhesCliente },
        //Relatórios
        { path: '/relatorios/listagemclientes', name: 'relatorio-listagem-clientes', component: RelatorioListagemClientes },
        { path: '/relatorios/listagemprodutos', name: 'relatorio-listagem-produtos', component: RelatorioListagemProdutos },




    ]
})