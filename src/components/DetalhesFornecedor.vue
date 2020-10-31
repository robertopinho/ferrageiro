<template>
  <div class="ml-5">
    <!-- <vs-button
          dark
          border
          textWhite
          class="btn float-right"
          @click="goBack"
        >
          <i class="fas fa-undo"></i> Voltar
        </vs-button> -->

    <button class="btn btn-sm btn-light float-right" @click="goBack">
      <i class="fas fa-undo"></i> Voltar
    </button>

    <div class="table table-striped">
      <h2>Detalhes Fornecedor</h2>

      <table class="table table-striped">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Representante</th>
            <th>Telefone Representante</th>
            <th>Email Representante</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ detalhesfornecedor.id }}</td>
            <td>{{ detalhesfornecedor.nome }}</td>
            <td>{{ detalhesfornecedor.cnpj }}</td>
            <td>{{ detalhesfornecedor.telefone }}</td>
            <td>{{ detalhesfornecedor.email }}</td>
            <td>{{ detalhesfornecedor.representante }}</td>
            <td>{{ detalhesfornecedor.telefone_representante }}</td>
            <td>{{ detalhesfornecedor.email_representante }}</td>
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
      detalhesfornecedor: [],
    };
  },

  methods: {
    listar() {
      axios
        .get(this.$urlAPI + `/detalhesfornecedor/${this.$route.params.id}`)
        .then((response) => (this.detalhesfornecedor = response.data));
      console.log(this.$route.params.id);

      console.log(this.detalhesfornecedor);
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
  mounted() {
    this.listar();
    console.log(this.detalhesfornecedor);
  },
};
</script>
<style scoped></style>
