<template>
  <section id="section">
    <div class="d-flex justify-content-center">
      <div class="col-6 col-lg-4 p-1">
        <p class="h1">Вход</p>
        
        <form class="p-1">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Логин</label>
            <input 
              type="text"
              class="form-control"
              v-bind:class="{'is-invalid': !isValidLoginOrPassword}"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="user.login"
            >
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Пароль</label>
            <input
              type="password" 
              class="form-control" 
              v-bind:class="{'is-invalid': !isValidLoginOrPassword}"
              id="exampleInputPassword1"
              v-model="user.password"
            >
            <label v-if="!isValidLoginOrPassword" class="invalid-feedback">Неверный логин или пароль</label>
          </div>
          <button 
            type="submit"
            class="btn btn-primary"
            @click="login"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'LoginForm',
  props: ["setUser"],
  data() {
    return {
      user: {
        login: '',
        password: ''
      },

      // haveTry: false
      // isValidLoginOrPassword: true,
    }
  },
  created: async function() {
    // this.haveTry = false;
    // this.isValidLoginOrPassword = true;
  },
  computed: {
    isValidLoginOrPassword() {
      // console.log(this.$store.state.userId)
      // return this.$store.state.userId != null || !this.haveTry;
      return true;
    }
  },
  methods: {
    login() {
      // await this.$store.dispatch('login');
      // this.haveTry = true;
      this.setUser('id1111');
    }
  }
}
</script>

<style lang="scss">

</style>
