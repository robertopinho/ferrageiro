<template>
  <div class="container-fluid ml-5">
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
        <form @submit.prevent="salvar">
          <h2>Nova Marca</h2>

          <div>
            Marca
            <input class="form-control col-11" type="text" v-model="marcas.nome" />
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
          <h2>Marcas Cadastradas</h2>

          <table class="table table-striped">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="listamarca in listamarcas" v-bind:key="listamarca.id">
                <td>{{ listamarca.id }}</td>
                <td>{{ listamarca.nome }}</td>

                <td>
                  <button
                    class="btn btn-danger btn-sm"
                    title="Excluir"
                    @click="excluir(listamarca.id)"
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
      marcas: {
        id: null,
        nome: null,
      },
      listamarcas: [],
    };
  },

  methods: {
    salvar() {
      if (localStorage.getItem("token")) {
        if ((this.marca = !0)) {
          axios.post(this.$urlAPI + `/marcas`, this.marcas);
          this.marcas = {};
          alert(`OK! Marca cadastrada com sucesso.`);
        }
        //window.location.reload();
        this.listar();
      }
    },

    listar() {
      if (localStorage.getItem("token")) {
        axios
          .get(this.$urlAPI + `/listamarcas`)
          .then((response) => (this.listamarcas = response.data));
      }
    },
    excluir(id) {
      if (localStorage.getItem("token")) {
        if (confirm(`Deseja excluir a marca de id: ${id}?`)) {
          axios.delete(this.$urlAPI + `/listamarcas/${id}`);
          this.listar();
        }
        this.listar();
      } else {
        this.$router.push("/");
      }
    },
  },

  mounted() {
    this.listar();
  },
};
</script>
<style scoped></style>
