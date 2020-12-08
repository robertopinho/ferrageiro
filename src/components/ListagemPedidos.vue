<template>
  <div class="content ml-5">
    <h2 class="ml-3">Listagem de pedido</h2>
    <div class="table table-striped">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Código</th>
            <th>Cliente</th>
            <th>Data da compra</th>
            <th>Data da entrega</th>
            <th>Desconto</th>
            <th>Status</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pedido in pedido" v-bind:key="pedido.id">
            <td>{{ pedido.id }}</td>
            <td>
              {{
                cliente &&
                cliente[pedido.id_cliente - 1] &&
                cliente[pedido.id_cliente - 1].nome
              }}
            </td>
            <td>{{ pedido.data_compra }}</td>
            <td>{{ pedido.data_entrega }}</td>
            <td>{{ pedido.desconto }}%</td>
            <td>{{ pedido.status }}</td>
            <td>R$ {{ pedido.valor | estiloMoeda }}</td>
            <td>
              <!-- <router-link
                :to="`/pedido/${pedido.id}`"
                class="btn btn-primary btn-sm"
              >
                <i class="far fa-eye"></i>
              </router-link> -->
              <button
                class="btn btn-danger btn-sm mx-1"
                title="Excluir"
                @click="excluir(pedido.id)"
              >
                <i class="far fa-trash-alt"></i>
              </button>

              <button
                class="btn btn-secondary btn-sm"
                title="Lista de Pedidos"
                @click="listar(pedido.id)"
              >
                <i class="fas fa-list-ol"></i>
              </button>
              <button
                class="btn btn-info btn-sm mx-1"
                title="Adicionar Pedido"
                @click="adicionar(pedido.id)"
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
      pedido: [],
      cliente: [],
    };
  },
  methods: {
    listar() {
      if (localStorage.getItem("token")) {
        axios
          .get(this.$urlAPI + `/pedido`)
          .then((response) => (this.pedido = response.data));
        axios
          .get(this.$urlAPI + `/clientes`)
          .then((response) => (this.cliente = response.data));
      }
    },
    excluir(id) {
      console.log(this.pedido);
      if (localStorage.getItem("token")) {
        if (confirm(`Confirma exclusão do pedido '${id}'?`)) {
          axios
            .delete(this.$urlAPI + `/pedido/${id}`)
            .catch(alert("Impossível deletar pedidos."));
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
    estiloData(value) {
      return value.toLocaleString('pt-br')
    }
  },
};
</script>
<style scoped>
table img {
  width: 100px;
  height: 60px;
}
</style>