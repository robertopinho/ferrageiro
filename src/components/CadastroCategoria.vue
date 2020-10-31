<template>
  <div class="container-fluid ml-5">
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
        <form @submit.prevent="salvar">
          <h2>Nova Categoria</h2>

          <div class="row">
            <div class="container">
              Categoria
              <input
                class="form-control col-11"
                type="text"
                required
                v-model="categorias.nome"
              />
            </div>
          </div>
          <br />
          <br />
          <div class="container col-7">
            <button type="submit" class="btn col-sm-6 btn-dark">
              Cadastrar
            </button>
            &nbsp;
            <button type="reset" class="btn col-sm-4 btn-light">Limpar</button>
          </div>
        </form>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
        <div class="table table-striped">
          <h2>Categorias Cadastradas</h2>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="listacategoria in listacategorias"
                v-bind:key="listacategoria.id"
              >
                <td>{{ listacategoria.id }}</td>
                <td>{{ listacategoria.nome }}</td>

                <td>
                  <button
                    class="btn btn-danger btn-sm"
                    title="Excluir"
                    @click="excluir(listacategoria.id)"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      categorias: {
        id: null,
        nome: null,
      },
      listacategorias: [],
    };
  },
  methods: {
    salvar() {
      if (!localStorage.getItem("token")) {
        this.$router.push("/");
      } else {
        axios.post(this.$urlAPI + `/categorias`, this.categorias);
        alert("OK! Categoria cadastrada com sucesso.");
        this.categorias = {};
        this.listar();
      }
      this.listar();
    },
    listar() {
      if (localStorage.getItem("token")) {
        axios
          .get(this.$urlAPI + `/listacategorias`)
          .then((response) => (this.listacategorias = response.data));
      }
    },
    excluir(id) {
      if (localStorage.getItem("token")) {
        if (confirm(`Confirma exclusão da categoria '${id}'?`)) {
          axios.delete(this.$urlAPI + `/listacategorias/${id}`);
          //window.location.reload();
          this.listar();
        }
      } else {
        this.$router.push("/");
      }
      this.listar();
    },
  },
  mounted() {
    this.listar();
  },
};
</script>
<style scoped></style>
