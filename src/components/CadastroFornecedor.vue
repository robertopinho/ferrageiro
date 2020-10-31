<template>
  <div class="container-fluid ml-5">
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
        <form @submit.prevent="salvar">
          <h2>Cadastro de Fornecedor</h2>
          <div>
            Fornecedor
            <input
              class="form-control col-11"
              type="text"
              required
              v-model="fornecedores.nome"
            />
          </div>
          <div>
            CNPJ
            <input
              class="form-control col-11"
              type="text"
              v-model="fornecedores.cnpj"
              maxlength="14"
            />
          </div>
          <div>
            Telefone Empresa
            <input
              class="form-control col-11"
              type="text"
              v-model="fornecedores.telefone"
            />
          </div>
          <div>
            Email
            <input
              class="form-control col-11"
              type="text"
              v-model="fornecedores.email"
            />
          </div>
          <div>
            Representante
            <input
              class="form-control col-11"
              type="text"
              v-model="fornecedores.representante"
            />
          </div>
          <div>
            Telefone Representante
            <input
              class="form-control col-11"
              type="text"
              v-model="fornecedores.telefone_representante"
            />
          </div>
          <div>
            Email Representante
            <input
              class="form-control col-11"
              type="text"
              v-model="fornecedores.email_representante"
            />
          </div>
          <br />
          <div class="ml-5 d-flex justify-content-center">
            <button type="submit" class="btn c-6 btn-dark">Cadastrar</button>
            &nbsp;
            <button type="reset" class="btn c-4 btn-light">Limpar</button>
          </div>
        </form>
      </vs-col>

      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
        <div class="table table-striped">
          <h2>Fornecedores</h2>

          <table class="table table-striped">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>CNPJ</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="listafornecedor in listafornecedores"
                v-bind:key="listafornecedor.id"
              >
                <td>{{ listafornecedor.id }}</td>
                <td>{{ listafornecedor.nome }}</td>
                <td>{{ listafornecedor.cnpj }}</td>
                <td>{{ listafornecedor.representante }}</td>

                <td>
                  <button
                    class="btn btn-danger btn-sm"
                    title="Excluir"
                    @click="excluir(listafornecedor.id)"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                  &nbsp;
                  <router-link
                    class="btn btn-info btn-sm"
                    title="Detalhes"
                    :to="`/detalhesfornecedor/${listafornecedor.id}`"
                  >
                    <i class="fas fa-poll-h"></i>
                  </router-link>
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
      fornecedores: {
        id: null,
        cnpj: null,
        email: null,
        email_representante: null,
        nome: null,
        representante: null,
        telefone: null,
        telefone_representante: null,
      },
      listafornecedores: [],
    };
  },

  methods: {
    salvar() {
      if (!this.$router.push("/")){
        this.$router.push("/");
        this.listar();
    
        return;
      }

      axios.post(this.$urlAPI + `/fornecedores`, this.fornecedores);
      alert("OK! Fornecedor cadastrado com sucesso.");
      this.fornecedores = {};
      this.listar();
    },

    listar() {
      if (localStorage.getItem("token")) {
        axios
          .get(this.$urlAPI + `/listafornecedores`)
          .then((response) => (this.listafornecedores = response.data));
      }
    },

    // async list(){
    //   if (localStorage.getItem("token")) { 
    //     const {data} = await axios.get(this.$urlAPI + `/listafornecedores`);

    //     this.listafornecedores = data
    //   }
    // },

    excluir(id) {
      if (localStorage.getItem("token")) {
        if (confirm(`Deseja excluir o fornecedor de id: ${id}?`)) {
          axios.delete(this.$urlAPI + `/listafornecedores/${id}`);
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
