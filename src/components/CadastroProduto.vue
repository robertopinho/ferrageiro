<template>
  <div class="content ml-5">
    <template>
      <vs-row class="mx-auto">
        <vs-row justify="space-between">
          <h2 class="ml-2">Cadastro de Produtos</h2>
          <div class="d-flex justify-content-center">
            <button
              class="btn btn-sm btn-light float-right mr-1"
              @click="activeMarca = !activeMarca"
            >
              Nova Marca
            </button>
            <vs-dialog v-model="activeMarca">
              <template #header>
                <h4 class="not-margin">
                  Nova
                  <b>Marca</b>
                </h4>
              </template>
              <form @submit.prevent="salvarMarca">
                <div>
                  Marca
                  <input
                    required
                    class="form-control"
                    type="text"
                    v-model="marcas.nome"
                  />
                </div>
                <br />
                <div class="d-flex justify-content-center">
                  <button dark type="submit" class="btn col-sm-6 btn-dark">
                    Cadastrar
                  </button>
                  <div style="color: White">_</div>
                  <button type="reset" class="btn col-sm-4 btn-light">
                    Limpar
                  </button>
                </div>
              </form>
            </vs-dialog>

            <button
              class="btn btn-sm btn-light float-right mr-3"
              @click="activeCategoria = !activeCategoria"
            >
              Nova Categoria
            </button>
            <vs-dialog v-model="activeCategoria">
              <template #header>
                <h4 class="not-margin">
                  Nova
                  <b>Categoria</b>
                </h4>
              </template>
              <form @submit.prevent="salvarCategoria">
                <div>
                  Categoria
                  <input
                    required
                    class="form-control"
                    type="text"
                    v-model="categorias.nome"
                  />
                </div>
                <br />
                <div class="d-flex justify-content-center">
                  <button dark type="submit" class="btn col-sm-6 btn-dark">
                    Cadastrar
                  </button>
                  <div style="color: White">_</div>
                  <button type="reset" class="btn col-sm-4 btn-light">
                    Limpar
                  </button>
                </div>
              </form>
            </vs-dialog>
          </div>
        </vs-row>
      </vs-row>
    </template>
    <form @submit.prevent="salvar">
      <div class="row mx-auto">
        <div class="col-sm-2">
          Data de Compra
          <input
            class="form-control"
            type="date"
            v-model="produto.data_compra"
          />
        </div>
        <div class="col-sm-10">
          Fornecedor
          <select
            id="fornecedor"
            required
            v-model="produto.fornecedor_id"
            class="form-control"
          >
            <option
              v-for="fornecedor in listafornecedores"
              :key="fornecedor.id"
              :value="fornecedor.id"
            >
              {{ fornecedor.nome }}
            </option>
          </select>
        </div>
        <div class="col-sm-6">
          Produto
          <input
            required
            class="form-control"
            type="text"
            v-model="produto.nome"
          />
        </div>
        <div class="col-sm-3">
          Categoria
          <select
            id="categoria"
            v-model="produto.categoria_id"
            class="form-control"
          >
            <option
              v-for="listacategoria in listacategorias"
              :key="listacategoria.id"
              :value="listacategoria.id"
            >
              {{ listacategoria.nome }}
            </option>
          </select>
        </div>
        <div class="col-sm-3">
          Marca
          <select
            id="listamarca"
            v-model="produto.marca_id"
            class="form-control"
          >
            <option
              v-for="listamarca in listamarcas"
              :key="listamarca.id"
              :value="listamarca.id"
            >
              {{ listamarca.nome }}
            </option>
          </select>
        </div>
        <div class="col-sm-12">
          Descrição
          <input class="form-control" type="text" v-model="produto.descricao" />
        </div>

        <div class="col-sm-1">
          Unidade
          <select class="form-control" v-model="produto.unidade">
            <option>UN</option>
            <option>CX</option>
            <option>PÇ</option>
            <option>kg</option>
            <option>m</option>
            <option>cm</option>
          </select>
        </div>
        <div class="col-sm-1">
          Peso
          <input class="form-control" type="text" v-model="produto.peso" />
        </div>
        <div class="col-sm-2">
          Quantidade
          <input
            class="form-control"
            required
            type="number"
            v-model="produto.quant"
          />
        </div>
        <div class="col-sm-2">
          Quant. Mínima
          <input
            class="form-control"
            type="number"
            v-model="produto.quant_minima"
          />
        </div>
        <div class="col-sm-2">
          Valor de Compra
          <input
            required
            id="valor_compra"
            class="form-control"
            type="text"
            v-model="produto.valor_compra"
          />
        </div>
        <div class="col-sm-2">
          Porcentagem
          <input
            id="porcentagem"
            class="form-control"
            type="text"
            v-model="produto.porcentagem"
            v-on:change="CalcPorcent"
          />
        </div>
        <div class="col-sm-2">
          Valor de Venda
          <input
            required
            id="valor_venda"
            class="form-control"
            type="text"
            v-model="produto.valor_venda"
          />
        </div>

        <!--  <div class="col-sm-6 imagem">
              <label>Imagem do Produto</label>
             <input
                type="file"
                class="form-control-file"
                v-file="produto.image"
              /> 
               </div> 
        -->

        <div class="container">
          <br />
          <br />
        </div>
        <div class="container col-7 d-flex justify-content-center">
          <button type="submit" class="btn col-sm-6 btn-dark">Cadastrar</button>
          <div style="color: White">_</div>
          &nbsp;
          <button type="reset" class="btn col-sm-4 btn-light">Limpar</button>
        </div>
      </div>
    </form>
    <br />
    <br />
    <br />
    <br />
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      produto: {
        id: null,
        data_compra: null,
        nome: null,
        descricao: null,
        imagem: "./img/default.jpg",
        unidade: null,
        quant: null,
        quant_minima: null,
        valor_compra: null,
        porcentagem: null,
        valor_venda: null,
        peso: null,
        fornecedor_id: null,
        categoria_id: null,
        marca_id: null,
      },
      listafornecedores: [],
      listacategorias: [],
      listamarcas: [],
      marcas: {
        id: null,
        nome: null,
      },
      categorias: {
        id: null,
        nome: null,
      },
      activeMarca: false,
      activeCategoria: false,
    };
  },

  methods: {
    listar() {
      if (!localStorage.getItem("token")) {
        this.$router.push("/");
      } else {
        axios
          .get(this.$urlAPI + "/listafornecedores")
          .then((response) => (this.listafornecedores = response.data));
        axios
          .get(this.$urlAPI + "/listacategorias")
          .then((response) => (this.listacategorias = response.data));
        axios
          .get(this.$urlAPI + "/listamarcas")
          .then((response) => (this.listamarcas = response.data));
      }
    },
    salvar() {
      if (!localStorage.getItem("token")) {
        this.$router.push("/");
      } else {
        axios.post(this.$urlAPI + `/produtos`, [this.produto]);
        alert("OK! Produto cadastrado com sucesso.");
        this.produto = {};
        console.log(this.produto);
        //window.location.reload();
      }
    },
    salvarMarca() {
      if (!localStorage.getItem("token")) {
        this.$router.push("/");
      } else {
        if ((this.marca = !0)) {
          axios.post(this.$urlAPI + `/marcas`, this.marcas);
          this.marcas = {};
          alert(`OK! Marca cadastrada com sucesso.`);
          this.listar();
        }
        //window.location.reload();
        this.listar();
      }
    },
    salvarCategoria() {
      if (!localStorage.getItem("token")) {
        this.$router.push("/");
      } else {
        if (this.categorias == this.categorias) {
          axios.post(this.$urlAPI + `/categorias`, this.categorias);
          alert("OK! Categoria cadastrada com sucesso.");
          this.categorias = {};
          //window.location.reload();
          this.listar();
        }
        this.listar();
      }
    },
    CalcPorcent() {
      var compra = parseFloat(document.getElementById("valor_compra").value);
      var porcentagem = parseFloat(
        document.getElementById("porcentagem").value
      );
      document.getElementById("valor_venda").value = (
        compra +
        (compra * porcentagem) / 100
      ).toFixed(2);
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

