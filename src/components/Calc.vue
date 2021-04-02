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
    <div class="row align-items-end p-1">
      <div class="col-8">
        <p class="h1">Название 1</p>
      </div>
      <div class="col-4 text-end">
        <p class="h3">01.02.2021-15.04.2020</p>
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
          <tr>
            <th scope="row">1</th>
            <td>Статья расходов 1</td>
            <td>0201</td>
            <td>200</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Статья расходов 2</td>
            <td>0101</td>
            <td>800</td>
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
  props: ["backToCalcs"],
  data() {
    return {
    }
  },
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
