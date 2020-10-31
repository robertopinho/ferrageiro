<template>
  <div class="content ml-5">
    <form
      @submit.prevent="pesquisar"
      class="form-inline d-flex justify-content-center md-form form-sm"
    >
      <input
        v-model="pesquisa"
        class="form-control form-control-sm mr-1 col-6"
        type="text"
        placeholder="Pesquise aqui seu produto"
        aria-label="Search"
      />

      <button class="btn-sm btn-info" type="submit">
        <i class="fas fa-search" aria-hidden="true"></i>
      </button>
    </form>
    <h2 class="ml-2">Listagem de Produtos</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Código</th>
          <th>Produto</th>
          <!-- <th>Descrição</th> -->
          <th>Marca</th>
          <th>Quantidade</th>
          <th>Compra</th>
          <th>Venda</th>
          <th>Destaque</th>
          <th>Imagem</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="produto in produtos" v-bind:key="produto.id">
          <td>{{produto.id}}</td>
          <td>{{produto.nome}}</td>
          <td>{{produto.descricao}}</td>
          <td>{{marcas && marcas[produto.marca_id -1] && marcas[produto.marca_id -1].nome}}</td>
          <td>{{produto.quant}}</td>
          <td>{{produto.valor_compra | estiloMoeda}}</td>
          <td>{{produto.valor_venda | estiloMoeda}}</td>
          <td>{{produto.destaque}}</td>
          <td>
            <img :src="produto.imagem" />
          </td>

          <td>
            <div class="center">
              <vs-dialog v-model="active">
                <td>
                  <img v-bind:src="produto.imagem" width="350" />
                </td>
              </vs-dialog>
            </div>
            <button class="btn btn-sm btn-info" title="Destacar" @click="destacar(produto.id)">
              <i class="fas fa-star"></i>
            </button>
            <button @click="active=!active" class="btn btn-sm btn-dark mx-1" title="Imagem Produto">
              <i class="fas fa-image"></i>
            </button>
            <button class="btn btn-danger btn-sm" title="Excluir" @click="excluir(produto.id)">
              <i class="far fa-trash-alt"></i>
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
      active: false,
      pesquisa : '',
      
    };
  },
  methods: {
    listar() {
      if (localStorage.getItem("token")) {
        axios
          .get(this.$urlAPI + "/produtos")
          .then((response) => (this.produtos = response.data));
        axios
          .get(this.$urlAPI + "/listamarcas")
          .then((response) => (this.marcas = response.data));
      }
    },
    excluir(id) {
      if (localStorage.getItem("token")) {
        if (confirm(`Confirma exclusão do produto '${id}'?`)) {
          axios.delete(this.$urlAPI + `/produtos/${id}`);
          this.listar();
          //window.location.reload();
        }
        this.listar();
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
  width: 50px;
  height: 50px;
}
</style>

