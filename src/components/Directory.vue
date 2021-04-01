<template>
  <section id="section">
    <div class="row align-items-end p-1">
      <p class="h1">Нормативно-справочная информация</p>
    </div>
    
    <ol class="list-group list-group-numbered p-1">
      <a href="#" class="list-group-item list-group-item-action">1. Изделия</a>
      <a href="#" class="list-group-item list-group-item-action">2. Метриалы</a>
      <a href="#" class="list-group-item list-group-item-action">3. Норма расхода материала</a>
      <a href="#" class="list-group-item list-group-item-action">4. Норма расхода заработной платы</a>
      <a href="#" class="list-group-item list-group-item-action">5. Единицы измерения</a>
    </ol>

    <!-- Кнопки -->
    <div class="d-grid gap-2 d-md-flex justify-content-end p-1">
      <button 
        v-if="true"
        type="button" 
        class="btn btn-outline-success"
      >
        Редактировать
      </button>
      <button type="button" class="btn btn-outline-primary">
        Печать
      </button>
    </div>

    <OneDirection v-if="true" />
  </section>
</template>

<script>
import OneDirection from './OneDirection.vue'
export default {
  name: 'Direction',
  props: {
    // msg: String
  },
  components: {
    OneDirection
  },
  data() {
    return {
    }
  },
}
</script>

<style lang="scss">

#back-button{
  padding: 1px; 
  padding-right: 20px;
  padding-left: 20px;
}

</style>
