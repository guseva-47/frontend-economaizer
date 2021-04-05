<template>
  <!-- 
    TODO:
      dropdown редактирование/просмотр калькуляции
      иконка к кнопке Поиск
  -->
  <section id="section">
    <div  v-if="!(isCalc || isCreateOrUpdate)">
      <p class="h1 p-1">Плановые калькуляции</p>
      <!-- Кнопки -->
      <div class="d-grid gap-2 d-md-flex p-1">
        <button
          type="button"
          class="btn btn-outline-success"
          @click="isCreateOrUpdate = true"
        >
          + Новая калькуляция
        </button>
        <button 
          type="button"
          class="btn btn-outline-primary"
          @click="search_form = !search_form"
        >
          Поиск по...
        </button>
      </div>

      <div v-if="search_form" id="search_form">
        <div class="row g-3 align-items-center p-1">
          <div class="col-auto">
            <label for="inputPassword6" class="col-form-label">Название:</label>
          </div>
          <div class="col-3">
            <input type="text" id="inputPassword6" class="form-control" placeholder="Название калькуляции">
          </div>

          <div class="col-auto text-end">
            <label for="inputPassword6" class="col-form-label">От:</label>
          </div>
          <div class="col-2">
            <input type="text" id="inputPassword6" class="form-control text-center" placeholder="ДД.ММ.ГГГГ">
          </div>

          <div class="col-auto text-end">
            <label for="inputPassword6" class="col-form-label">До:</label>
          </div>
          <div class="col-2">
            <input type="text" id="inputPassword6" class="form-control text-center" placeholder="ДД.ММ.ГГГГ">
          </div>

          <div class="col-auto btn-group">
            <!-- TODO -->
            <button type="button" class="btn btn-outline-primary">
              Найти
            </button>
            <button type="button" class="btn btn-outline-warning">
              Сбросить
            </button>
          </div>
        </div>
      </div>

      <!-- Таблица -->
      <div class="p-1">
        <table class="table table-hover">
          <thead class="table-light align-middle">
            <tr>
              <th scope="col">№</th>
              <th scope="col">
                Название
                <button 
                  type="button"
                  class="btn btn-sm"
                  v-bind:class="{'btn-outline-success': !isName, 'btn-success': isName}"
                  @click="sortCalcsItems(1)"
                >{{arrov}}</button>
              </th>
              <th scope="col">
                От
                <button 
                  type="button"
                  class="btn btn-sm"
                  v-bind:class="{'btn-outline-success': !isFrom, 'btn-success': isFrom}"
                  @click="sortCalcsItems(2)"
                >{{arrov}}</button>
              </th>
              <th scope="col">
                До
                <button 
                  type="button"
                  class="btn btn-sm"
                  v-bind:class="{'btn-outline-success': !isTo, 'btn-success': isTo}"
                  @click="sortCalcsItems(3)"
                >{{arrov}}</button>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(calc, i) in calculations" :key="i">
              <th scope="row">{{i}}</th>
              <td @click="showCalculation(calc)">{{calc.name}}</td>
              <td>{{calc.fromDate}}</td>
              <td>{{calc.toDate}}</td>
              <td>
                <div class="dropdown">
                  <button class="btn btn-outline-secondary" data-bs-toggle="dropdown" style="padding-inline:3px;"> ⁝ </button>
                  <!-- <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Рецепт подробно</a></li>
                    <li><a class="dropdown-item" href="#">Удалить заказ</a></li>
                  </ul> -->
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Calc v-if="isCalc" :backToAllCalcs="backToAllCalcs" :calc="calcToShow" :updateCalc="createOrUpdate" />
    <NewCalc v-if="isCreateOrUpdate" :backToAllCalcs="backToAllCalcs" :backToCalc="backToCalc" :calcToUpdate="calcToShow" />
    
  </section>
</template>

<script>
import Calc from './Calc.vue'
import NewCalc from './NewCalc.vue'

export default {
  name: 'Calculation',
  components: {
    Calc,
    NewCalc
  },
  data() {
    return {
      search_form: false,
      // colomnSort: 1--по имени, 2--дата "от",  3--дата "до"
      colomnSort: 2,
      // isUp: true--по возростанию, false--по убыванию
      isUp: false,

      isCreateOrUpdate: true,
      isCalc: false,
      calcToShow: null,
      
      calculations: null,
    }
  },
  created: async function() {
    await this.getCalculations();
    this.calculations = this.$store.state.calculations;
  },
  computed: {
    arrov() {
      return this.isUp ? '↑' : '↓';
    },
    isName() {
      return this.colomnSort == 1
    },
    isFrom() {
      return this.colomnSort == 2
    },
    isTo() {
      return this.colomnSort == 3
    }
  },
  methods: {
    sortCalcsItems(colI) {
      if (this.colomnSort == colI) this.isUp = !this.isUp;
      this.colomnSort = colI;

      // TODO Собственно сортировка
    },

    backToAllCalcs() {
      this.isCalc = false;
      this.isCreateOrUpdate = false;
      this.calcToShow = null;
    },

    backToCalc(calc) {
      this.isCalc = true;
      this.isCreateOrUpdate = false;
      this.calcToShow = calc;
    },

    showCalculation(calculation) { 
      this.calcToShow = calculation;
      this.isCalc = true;
    },

    createOrUpdate() {
      this.isCreateOrUpdate = true;
      this.isCalc = false;
    },

    async getCalculations() {
      await this.$store.dispatch('getCalculations');
    },
  },
  
}
</script>

<style lang="scss">
#section {
  padding-top: 10pt;
}
#search_form {
  padding-top: 10pt;
  padding-bottom: 10pt;
}
</style>
