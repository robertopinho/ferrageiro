<template>
  <div id="pdf" class="content ml-5">
    <button class="btn btn-sm btn-light float-right mr-1" @click="exportPDF">
      Export PDF
    </button>

    <div class="table table-striped">
      <h2 class="ml-3">Relatório - Listagem de clientes</h2>

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
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in clientes" v-bind:key="cliente.id">
            <td>{{ cliente.id }}</td>
            <td>{{ cliente.nome }}</td>
            <td>{{ cliente.email }}</td>
            <td>{{ cliente.cpf }}</td>
            <td>{{ cliente.telefone }}</td>
            <td>{{ cidade && cidade[cliente.cidade_id - 1] && cidade[cliente.cidade_id - 1].nome }}</td>
            <td>{{ cliente.enderecoBairro }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

    exportPDF() {
      var linhas = this;
      var colunas = [
        { title: "Código", dataKey: "id" },
        { title: "Nome", dataKey: "nome" },
        { title: "Email", dataKey: "email" },
        { title: "CPF", dataKey: "cpf" },
        { title: "Telefone", dataKey: "telefone" },
        { title: "Cidade", dataKey: "cidade_id" },
        { title: "Bairro", dataKey: "enderecoBairro" },
        { title: "Pedidos", dataKey: "" },
        { title: "R$ Gastos", dataKey: "" },
      ];
      const doc = new jsPDF("landscape");
      const img = new Image();
      var dataAtual = new Date();
      var data = "Data: " + dataAtual.toLocaleString("pt-br");
      doc.text("RELATÓRIO - CLIENTES CADASTRADOS", 100, 25);
      doc.setFontSize(10);
      doc.text(241, 26, data);
      img.onload = function () {
        doc.autoTable(colunas, linhas.clientes, {
          margin: { top: 27 },
          content: "Text",
          colSpan: 2,
          rowSpan: 2,
          styles: { halign: "left" },
        });
        doc.addImage(img.src, 10, 3, 40, 22);
        doc.save("Relatório - Clientes cadastrados.pdf");
      };
      img.crossOrigin = ""; // for demo as we are at different origin than image
      // img.src = "https://upload.wikimedia.org/wikipedia/commons/0/08/Intel_logo_%282006%29.jpg"; // some random imgur image
      img.src = "https://i.ibb.co/DRmFjmX/Logo-Ferragem.jpg"; // some random imgur image
      // img.src = "//i.imgur.com/QJ4AJXKb.jpg"; // some random imgur image

      //imprime o documento
      // doc.autoPrint(columns)
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