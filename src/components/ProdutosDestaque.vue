<template>
  <div class="content ml-5">
    <h2 class="ml-3">Produtos em Destaque</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Código</th>
          <th>Produto</th>
          <th>Descrição</th>
          <th>Marca</th>
          <th>Quantidade</th>
          <th>Compra</th>
          <th>Venda</th>
          <th>Destaque</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="produto in produtos" v-bind:key="produto.id">
          <td>{{ produto.id }}</td>
          <td>{{ produto.nome }}</td>
          <td>{{ produto.descricao }}</td>
          <td>{{ marcas && marcas[produto.marca_id -1 ] && marcas[produto.marca_id - 1].nome }}</td>
          <td>{{ produto.quant }}</td>
          <td>{{ produto.valor_compra | estiloMoeda }}</td>
          <td>{{ produto.valor_venda | estiloMoeda }}</td>
          <td>{{ produto.destaque }}</td>
          <td>
            <button
              class="btn btn-danger btn-sm"
              title="Remover Destaque"
              @click="destacar(produto.id)"
            >
              <i class="fas fa-star"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      produtos: [],
      marcas: [],
    };
  },
  methods: {
    listar() {
      if (localStorage.getItem("token")) {
        axios
          .get(this.$urlAPI + "/destaques")
          .then((response) => (this.produtos = response.data));
        axios
          .get(this.$urlAPI + "/listamarcas")
          .then((response) => (this.marcas = response.data));
      }
    },
    destacar(id) {
      if (localStorage.getItem("token")) {
        axios.put(this.$urlAPI + `/produtos/destacar/${id}`);
        alert("Destaque alterado!");
        //window.location.reload();
        this.listar();
      }
      this.listar();
    },
  },
  mounted() {
    this.listar();
  },
  filters: {
    estiloMoeda(value) {
      return value.toLocaleString("pt-br", { minimumFractionDigits: 2 });
    },
  },
};
</script>
<style scoped>
table img {
  width: 100px;
  height: 60px;
}
</style>