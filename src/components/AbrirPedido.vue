<template>
  <div class="row ml-5 mr-1">
    <div class="col-12">
      <form @submit.prevent="salvarCliente">
        Cliente
        <select id="Cliente" v-model="clientes.id" class="form-control">
          <option
            v-for="cliente in clientes"
            :key="cliente.id"
            :value="cliente.id"
          >
            {{ cliente.nome }}
          </option>
        </select>
      </form>
    </div>
    <div class="col-7">
      <form
        @submit.prevent="pesquisar"
        class="form-inline d-flex justify-content-center md-form form-sm mt-4"
      >
        <input
          v-model="pesquisa"
          class="form-control form-control-sm mr-1 col-6"
          type="text"
          placeholder="Filtrar Produtos"
          aria-label="Search"
        />

        <button class="btn-sm btn-info" type="submit">
          <i class="fas fa-search" aria-hidden="true"></i>
        </button>
      </form>
      Listagem de Produtos
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Marca</th>
            <th>Venda</th>
            <th>Estoque</th>
            <th>Quantidade</th>
            <th class="text-center">Adicionar</th>
          </tr>
        </thead>
        <tbody v-if="produtos">
          <tr v-for="produto in produtos" v-bind:key="produto.id">
            <td>{{ produto.nome }}</td>
            <td>
              {{
                marcas &&
                marcas[produto.marca_id - 1] &&
                marcas[produto.marca_id - 1].nome
              }}
            </td>
            <td>R$ {{ produto.valor_venda | estiloMoeda }}</td>
            <td>{{ produto.quant }}</td>
            <vue-numeric-input
              id="quant"
              align="center"
              v-model="produto.quant_compra"
              :max="produto.quant"
              :min="0"
            ></vue-numeric-input>

            <td class="text-center">
              <button
                class="btn btn-sm btn-success"
                title="Adicionar ao Carrinho"
                @click="adicionar(produto)"
              >
                <i class="fas fa-plus"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="carrinho" class="col-5">
      <form @submit.prevent="salvar">
        Carrinho de Compras
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Valor Unid.</th>
              <th>Valor Total</th>
              <th class="text-center">Remover</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pedido" v-bind:key="item.id">
              <td>{{ item.nome }}</td>
              <th>{{ item.quant_compra }}</th>
              <td>R$ {{ item.valor_venda | estiloMoeda }}</td>
              <td>
                R$ {{ (item.valor_venda * item.quant_compra) | estiloMoeda }}
              </td>
              <td class="d-flex justify-content-center">
                <button
                  class="btn btn-sm text-danger d-flex"
                  title="Remover do Carrinho"
                  @click="remover(item)"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex">
          <div class="bg-success text-center col-10">
            <h3 class="text-white" id="valortotal">
              Total compra: R$ {{ valorTotal | estiloMoeda }}
            </h3>
          </div>
          <button type="submit" class="btn-dark">Realizar venda</button>
        </div>
        <pre>{{ pedido }}</pre>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      clientes: [],
      marcas: [],
      produtos: [],
      pesquisa: "",
      pedido: [],
    };
  },
  methods: {
    listar() {
      if (localStorage.getItem("token")) {
        axios.get(this.$urlAPI + "/produtos").then((response) => {
          this.produtos = [];
          response.data.map((item) => {
            //Vue.set(item, 'quant_compra', 2)
            item.quant_compra = 0;
            this.produtos.push(item);
          });
        });
        axios
          .get(this.$urlAPI + "/listamarcas")
          .then((response) => (this.marcas = response.data));
      }
    },
    adicionar(produto) {
      if (produto.quant_compra == 0) {
        return;
      }
      const produtoCarrinho = this.pedido.find((item) => item.id == produto.id);
      if (!produtoCarrinho) {
        this.pedido.push(Object.assign({}, produto));

        return;
      }
      const somaProdutoCarrinho =
        produtoCarrinho.quant_compra + produto.quant_compra;
      if (somaProdutoCarrinho <= produto.quant) {
        produtoCarrinho.quant_compra = somaProdutoCarrinho;
      } else {
        alert("Produto em quantidade inferior no estoque.");
      }
    },
    remover(produto) {
      this.pedido = this.pedido.filter((item) => item !== produto);
    },
    pesquisar() {
      if (this.pesquisa.length == 0) {
        this.listar();
      } else {
        console.log(this.pesquisa);
        axios
          .get(this.$urlAPI + `/busca/${this.pesquisa}`)
          .then((response) => (this.produtos = response.data));
      }
    },
    salvar() {
      console.log("Conteúdo carrinho:", this.pedido);
      if (this.valorTotal == 0) {
        alert("Carrinho vazio");
      } else {
        // const carrinho_id;
        console.log("sads", this.pedido);

        axios
          .post(this.$urlAPI + "/pedido", this.pedido)
          .then((response) => {
            console.log("res", response);
          })

          .catch((error) => console.log("err >>", error));
        this.pedido = {};
      }
    },
  },
  computed: {
    valorTotal() {
      if (!this.pedido) {
        return;
      }
      let total = 0;
      this.pedido.map((item) => {
        total = total + item.valor_venda * item.quant_compra;
      });
      return total;
    },
  },
  mounted() {
    this.listar();
    if (localStorage.getItem("token")) {
      axios
        .get(this.$urlAPI + `/clientes`)
        .then((response) => (this.clientes = response.data));
    }
  },
  filters: {
    estiloMoeda(value) {
      return value.toLocaleString("pt-br", { minimumFractionDigits: 2 });
    },
  },
};
</script>

<style scoped>
#carrinho {
  margin-top: 55px;
}
#quant {
  margin-top: 14px;
}
#valortotal {
  margin-top: 10px;
}
</style>