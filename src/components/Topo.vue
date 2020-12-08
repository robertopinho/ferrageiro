<template>
  <div class="hidden">
    <div class="mt-5"></div>
    <vs-navbar shadow square center-collapsed dark textWhite v-model="active">
      Ferrageiro - Sistema de Controle
      <!--
       
        <vs-navbar-item :active="active == 'inicial'" id="inicial">Inicial</vs-navbar-item>
      <vs-navbar-item :active="active == 'pedidos'" id="pedidos">Pedidos</vs-navbar-item>
      <vs-navbar-item :active="active == 'produtos'" id="produtos">Produtos</vs-navbar-item>
      <vs-navbar-item :active="active == 'clientes'" id="clientes">Clientes</vs-navbar-item>

      -->

      <template #right>
        <vs-button
          gradient
          style="min-width: 60px; min-height: 30px"
          primary
          animation-type="scale"
          href="http://localhost:8081"
          blank
        >
          <i class="fas fa-store"></i>
          <template #animate>Ir Loja</template>
        </vs-button>
      </template>
    </vs-navbar>
    <vs-sidebar
      background="dark"
      textWhite
      absolute
      hover-expand
      reduce
      v-model="active"
      open
    >
      <template #logo>
        <!-- ...img logo -->
      </template>
      <vs-sidebar-item color="primary" to="/inicial" id="paginainicial">
        <template #icon>
          <i class="fas fa-store"></i>
        </template>
        Página Inicial
      </vs-sidebar-item>
      <!-- Pedido -->

      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item arrow>
            <template #icon>
              <i class="fas fa-truck"></i>
            </template>
            Pedidos
          </vs-sidebar-item>
        </template>
        <vs-sidebar-item flat id="pedidoaberto"
          >Pedidos em Aberto</vs-sidebar-item
        >
        <vs-sidebar-item flat :to="{name : 'listagem-de-pedidos'}" id="listagempedidos"
          >Listagem de Pedidos</vs-sidebar-item
        >
        <vs-sidebar-item flat :to="{ name: 'novo-pedido' }" id="abrirpedido"
          >Abrir Pedido</vs-sidebar-item
        >
      </vs-sidebar-group>
      <!-- /Pedido -->
      <!-- Produto -->
      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item arrow>
            <template #icon>
              <i class="fas fa-box-open"></i>
            </template>
            Produtos
          </vs-sidebar-item>
        </template>
        <vs-sidebar-item
          flat
          :to="{ name: 'novo-produto' }"
          id="cadastroproduto"
          >Cadastro de Produtos</vs-sidebar-item
        >
        <vs-sidebar-item
          flat
          :to="{ name: 'listagem-de-produtos' }"
          id="listagemprodutos"
          >Listagem de Produtos</vs-sidebar-item
        >
        <vs-sidebar-item
          flat
          :to="{ name: 'produtos-em-destaque' }"
          id="produtosemdestaque"
          >Produtos em Destaque</vs-sidebar-item
        >
        <vs-sidebar-item
          flat
          :to="{ name: 'cadastro-de-fornecedor' }"
          id="cadastrofornecedor"
          >Fornecedor</vs-sidebar-item
        >
        <vs-sidebar-item
          flat
          :to="{ name: 'nova-categoria' }"
          id="cadastrocategoria"
          >Categorias</vs-sidebar-item
        >
        <vs-sidebar-item flat :to="{ name: 'nova-marca' }" id="cadastromarca"
          >Marcas</vs-sidebar-item
        >
      </vs-sidebar-group>
      <!-- /Produto -->
      <!-- Cliente -->
      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item arrow>
            <template #icon>
              <i class="fas fa-user-friends"></i>
            </template>
            Clientes
          </vs-sidebar-item>
        </template>
        <vs-sidebar-item
          flat
          :to="{ name: 'novo-cliente' }"
          id="cadastrocliente"
          >Novo Cliente</vs-sidebar-item
        >
        <vs-sidebar-item
          flat
          :to="{ name: 'listagem-de-clientes' }"
          id="listagemclientes"
          >Listagem de Clientes</vs-sidebar-item
        >
      </vs-sidebar-group>
      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item arrow>
            <template #icon>
              <i class="far fa-chart-bar"></i>
            </template>
            Relatórios
          </vs-sidebar-item>
        </template>
        <vs-sidebar-item flat>Estoque Mínimo</vs-sidebar-item>
        <vs-sidebar-item flat :to="{ name: 'relatorio-listagem-clientes' }"
          >Listagem de Clientes</vs-sidebar-item
        >
        <vs-sidebar-item flat :to="{name: 'relatorio-listagem-produtos'}" >Listagem de Produtos</vs-sidebar-item>
        <vs-sidebar-item flat>Relatório de Pedidos</vs-sidebar-item>
        <vs-sidebar-item flat>Relatório de Caixa</vs-sidebar-item>
        <vs-sidebar-item flat>Relatório de Lucro</vs-sidebar-item>
      </vs-sidebar-group>

      <!-- /Cliente -->

      <template #footer>
        <vs-row justify="space-between">
          <vs-button
            blank
            href="https://web.whatsapp.com/"
            icon
            color="whatsapp"
          >
            <i class="fab fa-whatsapp"></i>
          </vs-button>
        </vs-row>
      </template>
    </vs-sidebar>
  </div>
</template>
  <script>
export default {
  data: () => ({
    active: "home",
    activeSidebar: false,
  }),
};
</script>

