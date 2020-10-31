<template>
  <div class="content ml-5">
    <!-- <form @submit.prevent="salvar"> -->
    <h2 class="ml-2">Cadastro de Clientes</h2>

    <div class="row mx-auto">
      <div class="col-sm-7">
        Nome completo
        <input
          class="form-control"
          type="text"
          v-model="cliente.nome"
          required
        />
      </div>
      <div class="col-sm-5">
        CPF
        <input
          class="form-control"
          type="text"
          v-model="cliente.cpf"
          required
        />
      </div>
      <div class="col-sm-1">
        UF
        <select id="uf" class="form-control" v-model="cliente.uf_id" required>
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
          required
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
          required
        />
      </div>
      <div class="col-sm-2">
        Número
        <input
          class="form-control"
          type="text"
          v-model="cliente.enderecoNumero"
          required
        />
      </div>
      <div class="col-sm-6">
        Complemento
        <input
          class="form-control"
          type="text"
          v-model="cliente.enderecoComplemento"
        />
      </div>
      <div class="col-sm-3">
        Bairro
        <input
          class="form-control"
          type="text"
          v-model="cliente.enderecoBairro"
          required
        />
      </div>

      <div class="col-sm-3">
        Telefone
        <input
          class="form-control"
          type="text"
          v-model="cliente.telefone"
          required
        />
      </div>
      <div class="col-sm-6">
        Email
        <input
          class="form-control"
          type="email"
          v-model="cliente.email"
          required
        />
      </div>
      <div class="col-sm-3">
        Senha
        <input
          class="form-control"
          placeholder="******"
          type="password"
          v-model="cliente.senha"
          name="senha"
          id="senha"
          required
        />
      </div>
      <div class="col-sm-3">
        Confirmar senha
        <input
          class="form-control"
          placeholder="******"
          type="password"
          name="senhaconf"
          id="senhaconf"
          required
        />
      </div>
      <div class="container col-7">
        <br />
        <br />
        <button class="btn btn-dark col-6" @click.stop.prevent="salvar()">
          Cadastrar
        </button>

        &nbsp;
        <button type="reset" class="btn col-sm-4 btn-light">Limpar</button>
      </div>
    </div>
    <!-- </form> -->
  </div>
</template>
<script>

import axios from "axios";
export default {
  data() {
    return {
      cliente: {
        id: null,
        nome: null,
        telefone: null,
        enderecoLogradouro: null,
        email: null,
        enderecoBairro: null,
        uf_id: null,
        cidade_id: null,
        cpf: null,
        enderecoComplemento: null,
        enderecoNumero: null,
      },
      cidade: [],
      uf: [],
    };
  },

  methods: {
    listar() {
      axios
        .get(this.$urlAPI + "/cidade")
        .then((response) => (this.cidade = response.data));
      axios
        .get(this.$urlAPI + "/uf")
        .then((response) => (this.uf = response.data));
    },
    salvar() {
      if (localStorage.getItem("token")) {
        var s1 = document.getElementById("senha");
        var s2 = document.getElementById("senhaconf");
        if (s1.value != s2.value) {
          alert("Senha não confere, digite novamente.");
        } else {
          axios.post(this.$urlAPI + `/clientes`, this.cliente);
          this.cliente = {};
          alert("OK! Cliente cadastrado com sucesso.");

          //window.location.reload();
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
  filters: {},
};
</script>
<style scoped></style>
