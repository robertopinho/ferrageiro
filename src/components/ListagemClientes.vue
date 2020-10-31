<template>
  <div class="content ml-5">
    <h2 class="ml-3">Listagem de Clientes</h2>
    <div class="table table-striped">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Cidade</th>
            <th>Bairro</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in clientes" v-bind:key="cliente.id">
            <td>{{ cliente.id }}</td>
            <td>{{ cliente.nome }}</td>
            <td>{{ cliente.email }}</td>
            <td>{{ cliente.cpf }}</td>
            <td>{{ cliente.telefone }}</td>
            <td>{{ cidade && cidade[cliente.cidade_id -1] && cidade[cliente.cidade_id - 1].nome }}</td>
            <td>{{ cliente.enderecoBairro }}</td>
            <td>
              <router-link
                :to="`/clientes/${cliente.id}`"
                class="btn btn-primary btn-sm"
              >
                <i class="far fa-eye"></i>
              </router-link>
              <button
                class="btn btn-danger btn-sm mx-1"
                title="Excluir"
                @click="excluir(cliente.id)"
              >
                <i class="far fa-trash-alt"></i>
              </button>

              <button
                class="btn btn-secondary btn-sm"
                title="Lista de Pedidos"
                @click="listar(cliente.id)"
              >
                <i class="fas fa-list-ol"></i>
              </button>
              <button
                class="btn btn-info btn-sm mx-1"
                title="Adicionar Pedido"
                @click="adicionar(cliente.id)"
              >
                <i class="fas fa-plus"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      clientes: [],
      cidade: [],
    };
  },
  methods: {
    listar() {
      if (localStorage.getItem("token")) {
        axios
          .get(this.$urlAPI + `/clientes`)
          .then((response) => (this.clientes = response.data));
        axios
          .get(this.$urlAPI + `/cidade`)
          .then((response) => (this.cidade = response.data));
      }
    },
    excluir(id) {
      console.log(this.clientes);
      if (localStorage.getItem("token")) {
        if (confirm(`Confirma exclusão do cliente '${id}'?`)) {
          axios
            .delete(this.$urlAPI + `/clientes/${id}`)
            .catch(
              alert(
                "Cliente possui pedidos em seu nome, impossível deletar cliente."
              )
            );
          this.listar();
        }
        this.listar();
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
  width: 100px;
  height: 60px;
}
</style>