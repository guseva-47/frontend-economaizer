<template>
  <section id="section">
    <div class="p-2">
    <button 
      type="button" 
      class="btn btn-outline-success"
      id="back-button"
      @click="backToCalcs"
    >
    - Назад
    </button>
    </div>
    <div class="row p-1">
      <p class="h1">Новая плановая калькуляция</p>
    </div>

    <!-- Название, от, до -->
    <div class="row g-3 align-items-center p-1">
        <div class="mb-3 col-6 col-md-8">
          <label class="form-label">Название плановой калькуляции:</label>
          <input 
            type="text"
            class="form-control"
            placeholder="Название калькуляции"
            v-model="nameCalc"
            v-bind:class="{'is-invalid': !isValidName}"
          >
        </div>
        <div class="mb-3 col-3 col-md-2">
          <label class="form-label">От:</label>
          <input 
            type="text"
            class="form-control"
            placeholder="ДД.ММ.ГГГГ"
            v-model="dateFrom"
            v-bind:class="{'is-invalid': !isValidDate}"
          >
        </div>
        <div class="mb-3 col-3 col-md-2">
          <label class="form-label">До:</label>
          <input 
            type="text"
            class="form-control"
            placeholder="ДД.ММ.ГГГГ"
            v-model="dateTo"
            v-bind:class="{'is-invalid': !isValidDate}"
          >
        </div>
    </div>
    
    <!-- Таблица изделий -->
    <div class="p-1">
      <table class="table table-hover">
        <thead class="table-light">
          <tr>
            <th scope="col">№</th>
            <th scope="col">
              Изделие
            </th>
            <th scope="col">
              шифр
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>
              <select class="form-select" aria-label="Default select example">
                <option  v-for="(opt, i) in options"  :key="i" :value="i" >{{opt}}</option>
              </select>
            </td>
            <td>0101</td>
          </tr>
          <tr>
            <th></th>
            <td>
              <button 
                class="btn btn-outline-secondary" 
                data-bs-toggle="tooltip" 
                data-bs-placement="right"
                title="Добавить строку"
                v-on:click="addRow"
                id="add-button"
              >
                +
              </button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Таблица стоимости материалов -->
    <div class="p-1">
      <table class="table table-hover">
        <thead class="table-light">
          <tr>
            <th scope="col">№</th>
            <th scope="col">
              Материал
            </th>
            <th scope="col">
              шифр
            </th>
            <th scope="col">
              стоимость
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>
              Материал 1
            </td>
            <td>0101</td>
            <td>
              <input 
                type="text"
                class="form-control"
                placeholder="0.0"
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Таблица стоимости по статьям затрат -->
    <div class="p-1">
      <table class="table table-hover">
        <thead class="table-light">
          <tr>
            <th scope="col">№</th>
            <th scope="col">
              Статья затрат
            </th>
            <th scope="col">
              шифр
            </th>
            <th scope="col">
              стоимость
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>
              <select class="form-select" aria-label="Default select example">
                <option  v-for="(opt, i) in options"  :key="i" :value="i" >{{opt}}</option>
              </select>
            </td>
            <td>0101</td>
            <td>
              <input 
                type="text"
                class="form-control"
                placeholder="0.0"
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Кнопки -->
    <div class="d-grid gap-2 d-md-flex justify-content-end">
      <button type="button" class="btn btn-outline-danger">
        Удалить
      </button>
      <button 
        type="button" 
        class="btn btn-outline-success"
        @click="saveCalc"
      >
        Сохранить и рассчитать
      </button>
    </div>
  </section>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Calc',
  props: ["backToCalcs"],
  data() {
    return {
      nameCalc: '',
      dateFrom: moment().format("DD.MM.YYYY"),
      dateTo: moment().add(1, 'month').format("DD.MM.YYYY"),
      products: '',
      needValidCheck: false,

      options: ['Изделие 1', 'Изделие 2']
    }
  },
  computed: {
    isValidName() {
      if(!this.needValidCheck) return true;
      return this.nameCalc.length > 0;
    },
    isValidDate() {
      if(!this.needValidCheck) return true;
      return moment(this.dateFrom, 'DD.MM.YYYY') <= moment(this.dateTo, 'DD.MM.YYYY')
    }
  },
  methods: {
    saveCalc() {
      this.needValidCheck = true;
      if (!(this.isValidName && this.isValidDate)) return;
      this.backToCalcs();
    },
    addRow() {
      
    }

  }
}
</script>

<style lang="scss">

#back-button {
  padding: 1px; 
  padding-right: 20px;
  padding-left: 20px;
}

#add-button {
  padding: 1px; 
  padding-right: 30px;
  padding-left: 30px;
}

.pad-b {
  padding-top: 10pt;
}

</style>
