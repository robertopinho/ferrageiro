<template>
  <div class="content ml-5">
    <div class="d-flex justify-content-between">
      <h2>Detalhes do cliente</h2>
      <div class="mx-3 mt-3">
        <router-link
          class="btn btn-sm btn-light"
          v-if="!editavel"
          :to="`/listagemclientes`"
        >
          <i class="fas fa-undo"></i> Voltar
        </router-link>
        &nbsp;
        <button
          class="btn btn-sm btn-light"
          v-if="!editavel"
          @click="editavel = !editavel"
        >
          <i class="fas fa-user-edit"></i>
        </button>
      </div>
    </div>
    <div v-for="cliente in cliente" v-bind:key="cliente.id" class="row mx-auto">
      <div class="col-sm-7">
        Nome completo
        <input
          class="form-control"
          :disabled="!editavel"
          :class="{ view: !editavel }"
          type="text"
          v-model="cliente.nome"
        />
      </div>
      <div class="col-sm-5">
        CPF
        <input
          class="form-control"
          type="text"
          v-model="cliente.cpf"
          :disabled="!editavel"
          :class="{ view: !editavel }"
        />
      </div>
      <div class="col-sm-1">
        UF
        <select
          id="uf"
          class="form-control"
          v-model="cliente.uf_id"
          :disabled="!editavel"
          :class="{ view: !editavel }"
        >
          <option v-for="uf in uf" :key="uf.id" :value="uf.id">
            {{ uf.sigla }}
          </option>
        </select>
      </div>
      <div class="col-sm-3">
        Cidade
        <select
          id="cidade"
          class="form-control"
          v-model="cliente.cidade_id"
          :disabled="!editavel"
          :class="{ view: !editavel }"
        >
          <option v-for="cidade in cidade" :key="cidade.id" :value="cidade.id">
            {{ cidade.nome }}
          </option>
        </select>
      </div>
      <div class="col-sm-6">
        Endereço
        <input
          class="form-control"
          placeholder="Ex.: Av. Duque de Caxias"
          type="text"
          v-model="cliente.enderecoLogradouro"
          :disabled="!editavel"
          :class="{ view: !editavel }"
        />
      </div>
      <div class="col-sm-2">
        Número
        <input
          class="form-control"
          type="text"
          v-model="cliente.enderecoNumero"
          :disabled="!editavel"
          :class="{ view: !editavel }"
        />
      </div>
      <div class="col-sm-6">
        Complemento
        <input
          class="form-control"
          type="text"
          v-model="cliente.enderecoComplemento"
          :disabled="!editavel"
          :class="{ view: !editavel }"
        />
      </div>
      <div class="col-sm-3">
        Bairro
        <input
          class="form-control"
          type="text"
          v-model="cliente.enderecoBairro"
          :disabled="!editavel"
          :class="{ view: !editavel }"
        />
      </div>

      <div class="col-sm-3">
        Telefone
        <input
          class="form-control"
          type="text"
          v-model="cliente.telefone"
          :disabled="!editavel"
          :class="{ view: !editavel }"
        />
      </div>
      <div class="col-sm-6">
        Email
        <input
          class="form-control"
          type="email"
          v-model="cliente.email"
          :disabled="!editavel"
          :class="{ view: !editavel }"
        />
      </div>

      <div class="container col-9 d-flex justify-content-center mt-5">
        <button
          v-if="editavel"
          @click.prevent="salvar()"
          class="btn col-4 btn-dark"
        >
          Salvar
        </button>
        &nbsp;

        <router-link
          class="btn col-sm-4 btn-light"
          v-if="editavel"
          :to="`/listagemclientes`"
        >
          Cancelar
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;//Vue.config.silent = true;
import axios from "axios";
export default {
  data() {
    return {
      editavel: false,
      cliente: [],
      cidade: [],
      uf: [],
    };
  },

  methods: {
    listar() {
      console.log(this.cliente);
      axios
        .get(this.$urlAPI + `/clientes/${this.$route.params.id}`)
        .then((response) => (this.cliente = response.data));
      axios
        .get(this.$urlAPI + "/cidade")
        .then((response) => (this.cidade = response.data));
      axios
        .get(this.$urlAPI + "/uf")
        .then((response) => (this.uf = response.data));
    },
    salvar() {
      if (localStorage.getItem("token")) {
        axios
          .put(
            this.$urlAPI + `/clientes/${this.$route.params.id}`,
            this.cliente[0]
          )
          .then(this.goBack());

        this.cliente = this.cliente[0];
      }
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
  mounted() {
    this.listar();
  },
  filters: {},
};
</script>
<style scoped></style>
