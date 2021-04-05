<template>
  <section id="section">
    <div class="p-2">
    <button 
      type="button" 
      class="btn btn-outline-success"
      id="back-button"
      @click="backToAllCalcs"
    >
    ← Назад
    </button>
    </div>
    <div class="row align-items-end p-1">
      <div class="col-8">
        <p class="h1">{{calc.name}}</p>
      </div>
      <div class="col-4 text-end">
        <p class="h3">{{calc.fromDate}}-{{calc.toDate}}</p>
      </div>
    </div>
    
    <div class="p-1">
      <table class="table table-hover">
        <thead class="table-light">
          <tr>
            <th scope="col">№</th>
            <th scope="col">
              Статья расходов
            </th>
            <th scope="col">
              шифр
            </th>
            <th scope="col">
              по плану
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(costItem, i) in calc.costItems" :key="i">
              <th scope="row">{{i}}</th>
              <td>{{costItem.name}}</td>
              <td>{{costItem.cipher}}</td>
              <td>{{costItem.cost}}</td>
          </tr>
        </tbody>
        <tfoot class="table-light">
          <tr>
            <th scope="col" colspan="3" class="text-end">
              Итого
            </th>
            <th scope="col">
              1000
            </th>
          </tr>

        </tfoot>
      </table>
    </div>

    <!-- Кнопки -->
    <div class="d-grid gap-2 d-md-flex justify-content-end">
      <button 
        v-if="true"
        type="button" 
        class="btn btn-outline-success"
        @click="updateCalc"
      >
        Редактировать
      </button>
      <button type="button" class="btn btn-outline-primary">
        Печать
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Calc',
  props: ["backToAllCalcs", "calc", "updateCalc"],

}
</script>

<style lang="scss">

#back-button {
  padding: 1px; 
  padding-right: 20px;
  padding-left: 20px;
}

.pad-b {
  padding-top: 10pt;
}

</style>
