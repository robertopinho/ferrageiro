<template>
  <div class="d-flex justify-content-center">
    <form class="form-signin mt-5" @submit.prevent="logar">
      <vs-button @click="active=!active">Login</vs-button>
      <vs-dialog blur prevent-close not-close v-model="active">
        <template #header>
          <h4 class="not-margin">
            Login
            <b>Ferrageiro</b> 🛠
          </h4>
        </template>

        <div class="con-form">
          <small class="d-flex justify-content">Usuário</small>
          <vs-input
            type="email"
            id="inputEmail"
            class="form-control"
            required
            autofocus
            v-model="email"
          ></vs-input>
          <small>Senha</small>
          <vs-input
            type="password"
            id="inputPassword"
            class="form-control"
            required 
            v-model="senha"
          ></vs-input>
        </div>

        <template #footer>
          <div class="footer-dialog">
            <vs-button block>Login</vs-button>

            <br />
          </div>
        </template>
      </vs-dialog>
    </form>
  </div>
</template>
  <script>
import axios from "axios";
export default {
  data() {
    return {
      active: true,
      email: null,
      senha: null,
    };
  },
  methods: {
    logar() {
      axios
        .post(this.$urlAPI + "/login", { email: this.email, senha: this.senha })
        .then((response) => {
          if (response.data.user == null) {
            alert("Erro... Email ou senha inválido");
          } else {
            localStorage.setItem("token", response.data.access_token);
            this.$router.push("/inicial");
          }
        });
    },
  },
};
</script>
  <style lang="stylus">
  getColor(vsColor, alpha = 1) {
    unquote('rgba(var(--vs-' + vsColor + '), ' + alpha + ')');
  }

  getVar(var) {
    unquote('var(--vs-' + var + ')');
  }

  .not-margin {
    margin: 0px;
    font-weight: normal;
    padding: 10px;
  }

  .con-form {
    width: 100%;

    .flex {
      display: flex;
      align-items: center;
      justify-content: space-between;

      a {
        font-size: 0.8rem;
        opacity: 0.7;

        &:hover {
          opacity: 1;
        }
      }
    }

    .vs-checkbox-label {
      font-size: 0.8rem;
    }

    .vs-input-content {
      margin: 10px 0px;
      width: calc(100%);

      .vs-input {
        width: 100%;
      }
    }
  }

  .footer-dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: calc(100%);

    .new {
      margin: 0px;
      margin-top: 20px;
      padding: 0px;
      font-size: 0.7rem;

      a {
        color: getColor('primary') !important;
        margin-left: 6px;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .vs-button {
      margin: 10px;
    }
  }
</style>