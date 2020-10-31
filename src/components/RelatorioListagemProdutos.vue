<template>
  <div id="pdf" class="content ml-5">
    <button class="btn btn-sm btn-light float-right mr-1" @click="exportPDF">
      Export PDF
    </button>

    <div class="table table-striped">
      <h2 class="ml-3">Relatório - Listagem de produtos</h2>

      <table class="table table-striped">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Marca</th>
            <th>Categoria</th>
            <th>Fornecedor</th>
            <th>Quantidade</th>
            <th>Quant. min.</th>
            <th>Preço Compra</th>
            <th>Preço Venda</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="produto in produtos" v-bind:key="produto.id">
            <td>{{ produto.id }}</td>
            <td>{{ produto.nome }}</td>
            <td>
              {{
                marcas &&
                marcas[produto.marca_id - 1] &&
                marcas[produto.marca_id - 1].nome
              }}
            </td>
            <td>
              {{
                categorias &&
                categorias[produto.categoria_id - 1] &&
                categorias[produto.categoria_id - 1].nome
              }}
            </td>
            <td>
              {{
                fornecedores &&
                fornecedores[produto.fornecedor_id - 1] &&
                fornecedores[produto.fornecedor_id - 1].nome
              }}
            </td>
            <td>{{ produto.quant }}</td>
            <td>{{ produto.quant_minima }}</td>
            <td>R$ {{ produto.valor_compra | estiloMoeda }}</td>
            <td>R$ {{ produto.valor_venda | estiloMoeda }}</td>
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
      produtos: [],
      marcas: [],
      categorias: [],
      fornecedores: [],
    };
  },
  methods: {
    listar() {
      if (localStorage.getItem("token")) {
        axios
          .get(this.$urlAPI + `/produtos`)
          .then((response) => (this.produtos = response.data));
        axios
          .get(this.$urlAPI + `/listamarcas`)
          .then((response) => (this.marcas = response.data));
        axios
          .get(this.$urlAPI + `/listacategorias`)
          .then((response) => (this.categorias = response.data));
        axios
          .get(this.$urlAPI + `/listafornecedores`)
          .then((response) => (this.fornecedores = response.data));
      }
    },

    exportPDF() {
      var linhas = this;
      var colunas = [
        { title: "Código", dataKey: "id" },
        { title: "Nome", dataKey: "nome" },
        { title: "Marca", dataKey: "marca_id" },
        { title: "Categoria", dataKey: "categoria_id" },
        { title: "Fornecedor", dataKey: "fornecedor_id" },
        { title: "Quant.", dataKey: "quant" },
        { title: "Quant. mín.", dataKey: "quant_minima" },
        { title: "Preço compra", dataKey: "valor_compra" },
        { title: "Preço venda", dataKey: "valor_venda" },
      ];
      const doc = new jsPDF("landscape");
      const img = new Image();
      var dataAtual = new Date();
      var data = "Data: " + dataAtual.toLocaleString("pt-br");
      doc.text("RELATÓRIO - PRODUTOS CADASTRADOS", 100, 25);
      doc.setFontSize(10);
      doc.text(241, 26, data);
      img.onload = function () {
        doc.autoTable(colunas, linhas.produtos, {
          margin: { top: 27 },
          content: "Text",
          colSpan: 2,
          rowSpan: 2,
          styles: { halign: "left" },
        });
        doc.addImage(img.src, 10, 3, 40, 22);
        doc.save("Relatório - Produtos cadastrados.pdf");
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