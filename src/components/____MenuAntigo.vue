<template>
  <div class="content ml-5">
    <div class="row">
      <div class="accordion col-sm" id="recolher">
        <div class="card bg-dark text-white">
          <div class="card-header">
            <h5 class="mb-0">
              <a class="btn text-white" type="button" href="/">Página Inicial</a>
            </h5>
          </div>
        </div>
        <div class="card bg-dark text-white">
          <div class="card-header">
            <h5 class="mb-0">
              <button
                class="btn text-white"
                type="button"
                data-toggle="collapse"
                data-target="#pedidos"
                aria-expanded="false"
                aria-controls="pedidos"
              >Pedidos</button>
            </h5>
          </div>

          <div id="pedidos" class="collapse" data-parent="#recolher">
            <div class="card-body">
              <tr>
                <a class="text-white" href="#">Pedidos em Aberto</a>
              </tr>
              <tr>
                <a class="text-white" href="#">Listagem de Pedidos</a>
              </tr>
              <tr>
                <a class="text-white" href="#">Cadastrar Pedido</a>
              </tr>
            </div>
          </div>
        </div>
        <div class="card bg-dark text-white">
          <div class="card-header">
            <h5 class="mb-0">
              <button
                class="btn text-white"
                type="button"
                data-toggle="collapse"
                data-target="#produtos"
                aria-expanded="false"
                aria-controls="produtos"
              >Produtos</button>
            </h5>
          </div>
          <div id="produtos" class="collapse" data-parent="#recolher">
            <div class="card-body">
              <tr>
                <a class="text-white" href="/cadastroproduto">Cadastro de Produtos</a>
              </tr>
              <tr>
                <a class="text-white" href="/listagemprodutos">Listagem de Produtos</a>
              </tr>
              <tr>
                <a class="text-white" href="/destaques">Produtos em Destaque</a>
              </tr>
            </div>
          </div>
        </div>
        <div class="card bg-dark text-white">
          <div class="card-header">
            <h5 class="mb-0">
              <button
                class="btn text-white"
                type="button"
                data-toggle="collapse"
                data-target="#clientes"
                aria-expanded="false"
                aria-controls="clientes"
              >Clientes</button>
            </h5>
          </div>
          <div id="clientes" class="collapse" data-parent="#recolher">
            <div class="card-body">
              <tr>
                <a class="text-white" href="/cadastrocliente">Cadastro de Clientes</a>
              </tr>
              <tr>
                <a class="text-white" href="/listagemclientes">Listagem de Clientes</a>
              </tr>
            </div>
          </div>
        </div>
        <div class="card bg-dark text-white">
          <div class="card-header">
            <h5 class="mb-0">
              <button
                class="btn text-white"
                type="button"
                data-toggle="collapse"
                data-target="#atendimento"
                aria-expanded="false"
                aria-controls="atendimento"
              >Atendimento</button>
            </h5>
          </div>
          <div id="atendimento" class="collapse" data-parent="#recolher">
            <div class="card-body">
              <tr>
                <a class="text-white" href="#">Listagem de Atendimento</a>
              </tr>
            </div>
          </div>
        </div>
        <div class="card bg-dark text-white">
          <div class="card-header">
            <h5 class="mb-0">
              <button
                class="btn text-white"
                type="button"
                data-toggle="collapse"
                data-target="#relatorios"
                aria-expanded="false"
                aria-controls="relatorios"
              >Relatórios</button>
            </h5>
          </div>
          <div id="relatorios" class="collapse" data-parent="#recolher">
            <div class="card-body">
              <tr>
                <a class="text-white" href="#">Relatório de Clientes</a>
              </tr>
              <tr>
                <a class="text-white" href="#">Relatório de Vendas</a>
              </tr>
              <tr>
                <a class="text-white" href="#">Relatório de Compras</a>
              </tr>
              <tr>
                <a class="text-white" href="#">Relatório de Produtos</a>
              </tr>
            </div>
          </div>
        </div>
      </div>
      <div class="container row">
        <template>
          <div class="center content-inputs">
            <br>
            <br>
            <vs-input
              type="password"
              v-model="value"
              label-placeholder="Password"
              :progress="getProgress"
              :visiblePassword="hasVisiblePassword"
              icon-after
              @click-icon="hasVisiblePassword = !hasVisiblePassword"
            >
              <template #icon>
                <i v-if="!hasVisiblePassword" class="bx bx-show-alt"></i>
                <i class="fas fa-eye"></i>
              </template>

              <template v-if="getProgress >= 100" #message-success>Secure password</template>
            </vs-input>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    value: "",
    hasVisiblePassword: false,
  }),
  computed: {
    getProgress() {
      let progress = 0;

      // at least one number

      if (/\d/.test(this.value)) {
        progress += 20;
      }

      // at least one capital letter

      if (/(.*[A-Z].*)/.test(this.value)) {
        progress += 20;
      }

      // at menons a lowercase

      if (/(.*[a-z].*)/.test(this.value)) {
        progress += 20;
      }

      // more than 5 digits

      if (this.value.length >= 6) {
        progress += 20;
      }

      // at least one special character

      if (/[^A-Za-z0-9]/.test(this.value)) {
        progress += 20;
      }

      return progress;
    },
  },
};
</script> 
<style scoped>
table img {
  width: 300px;
  height: 200px;
}
div.card-body {
  color: #385b80;
}
</style>
