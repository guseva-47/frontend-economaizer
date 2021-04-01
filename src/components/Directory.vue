<template>
  <section id="section">
    <div v-if="!isOneDir">
      <div class="row align-items-end p-1">
        <p class="h1">Нормативно-справочная информация</p>
      </div>
      
      <ol class="list-group list-group-numbered p-1">
        <a href="#" class="list-group-item list-group-item-action">1. Изделия</a>
        <a href="#" class="list-group-item list-group-item-action" @click="isOneDir = true">2. Метриалы</a>
        <a href="#" class="list-group-item list-group-item-action">3. Норма расхода материала</a>
        <a href="#" class="list-group-item list-group-item-action">4. Норма расхода заработной платы</a>
        <a href="#" class="list-group-item list-group-item-action">5. Единицы измерения</a>
        <a href="#" class="list-group-item list-group-item-action">6. Статьи расходов</a>
      </ol>
    </div>

    <OneDirection v-if="isOneDir" :backToDirectory="backToDirectory" />
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
      isOneDir: false,
    }
  },
  methods: {
    backToDirectory() {
      this.isOneDir = false;
    }
  }
}
</script>

<style lang="scss">

#back-button{
  padding: 1px; 
  padding-right: 20px;
  padding-left: 20px;
}

</style>
