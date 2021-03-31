<template>
  <!-- 
    TODO:
      dropdown редактирование/просмотр калькуляции
      иконка к кнопке Поиск
      кнопка сортировки
      добавить паддинг-топ
  -->
  <section id="section">
    <p class="h1">Плановые калькуляции</p>
    <!-- Кнопки -->
    <div class="d-grid gap-2 d-md-flex">
      <button type="button" class="btn btn-outline-success">
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
      <div class="row g-3 align-items-center">
        <div class="col-auto">
          <label for="inputPassword6" class="col-form-label">Название:</label>
        </div>
        <div class="col-3">
          <input type="text" id="inputPassword6" class="form-control" placeholder="Название калькуляции">
        </div>

        <div class="col-auto text-end">
          <label for="inputPassword6" class="col-form-label pp">От:</label>
        </div>
        <div class="col-2">
          <input type="text" id="inputPassword6" class="form-control text-center" placeholder="ДД.ММ.ГГГГ">
        </div>

        <div class="col-auto text-end">
          <label for="inputPassword6" class="col-form-label pp">До:</label>
        </div>
        <div class="col-2">
          <input type="text" id="inputPassword6" class="form-control text-center" placeholder="ДД.ММ.ГГГГ">
        </div>

        <div class="col-1">
          <button type="button" class="btn btn-outline-success">
            Найти
          </button>
        </div>
      </div>
    </div>

    <table class="table table-hover">
      <thead class="table-light">
        <tr>
          <th scope="col">№</th>
          <th scope="col">
            Название
            <button type="button" class="btn btn-sm btn-outline-success">v</button>
          </th>
          <th scope="col">
            От
            <button type="button" class="btn btn-sm btn-outline-success">v</button>
          </th>
          <th scope="col">
            До
            <button type="button" class="btn btn-sm btn-outline-success">v</button>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Название 1</td>
          <td>01.02.2021</td>
          <td>15.04.2020</td>
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
        <tr>
          <th scope="row">2</th>
          <td>Название 2</td>
          <td>15.11.2020</td>
          <td>01.09.2020</td>
          <td>
            <div class="dropdown">
              <button class="btn btn-outline-secondary" data-bs-toggle="dropdown" style="padding-inline:3px;"> ⁝ </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <Calc v-if="false"/>
    
  </section>
</template>

<script>
import Calc from './Calc.vue'

export default {
  name: 'Calculation',
  props: {
    // msg: String
  },
  components: {
    Calc
  },
  data() {
    return {
      search_form: false,
    }
  },
}
</script>

<style lang="scss">
#section {
  padding-top: 10pt;
}
.pp {
  padding-left: 10pt;
}
#search_form {
  padding-top: 10pt;
  padding-bottom: 10pt;
}
</style>
