<template>
  <section id="section">
    <div class="">
      <div class="p-1">
        <p class="h1">Профиль пользователя</p>
        
        <form v-if="!(edit_profile || edit_password)" class="p-1">
          <div class="mb-3">
            <p>Логин: {{login}}</p>
            <p>Имя: {{name}}</p>
          </div>
          <button 
            type="submit"
            class="btn btn-outline-primary me-3"
            @click="editProfile"
          >
            Редактировать профиль
          </button>
          <button
            type="submit"
            class="btn btn-outline-primary me-3"
            @click="editPassword"
          >
            Изменить пароль
          </button>
        </form>

        <form v-if="edit_profile" class="p-1 col-6 col-lg-4">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Логин</label>
            <input 
              type="text"
              class="form-control"
              v-bind:class="{'is-invalid': isValidLoginOrPassword}"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              :value="login"
            >
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Имя</label>
            <input 
              type="text"
              class="form-control"
              v-bind:class="{'is-invalid': isValidLoginOrPassword}"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              :value="name"
            >
          </div>

          <button type="submit" class="btn btn-outline-primary me-3" style="padding-left: 20pt; padding-right: 20pt;">Отмена</button>
          <button type="submit" class="btn btn-outline-primary" style="padding-left: 20pt; padding-right: 20pt;">Сохранить</button>
        </form>
        <form v-if="edit_password" class="col-6 col-lg-4">
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Старый пароль</label>
            <input
              type="password" 
              class="form-control" 
              v-bind:class="{'is-invalid': isValidLoginOrPassword}"
              id="exampleInputPassword1"
            >
            <label v-if="isValidLoginOrPassword" class="invalid-feedback">Неверный пароль</label>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Новый пароль</label>
            <input
              type="password" 
              class="form-control" 
              v-bind:class="{'is-invalid': isValidLoginOrPassword}"
              id="exampleInputPassword1"
            >
            <label v-if="isValidLoginOrPassword" class="invalid-feedback">Неверный пароль</label>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Повторите новый пароль</label>
            <input
              type="password" 
              class="form-control" 
              v-bind:class="{'is-invalid': isValidLoginOrPassword}"
              id="exampleInputPassword1"
            >
          </div>

          <button type="submit" class="btn btn-outline-primary me-3" style="padding-left: 20pt; padding-right: 20pt;">Отмена</button>
          <button type="submit" class="btn btn-outline-primary" style="padding-left: 20pt; padding-right: 20pt;">Сохранить</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'Profile',
  props: {
    // msg: String
  },
  // components: {
  //   OneDirection
  // },
  data() {
    return {
      login: 'user_login',
      name: 'Имя Пользователя',
      edit_password: false,
      edit_profile: false
    }
  },
  methods: {
    editProfile() {
      this.edit_profile = true;
      this.edit_password = false;      
    },
    editPassword() {
      this.edit_password = true;
      this.edit_profile = false;      
    },
  }
}
</script>

<style lang="scss">

</style>
