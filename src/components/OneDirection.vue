<template>
  <section id="section">
    <button 
        type="button" 
        class="btn btn-outline-success"
        id="back-buttom"
      >
      - Назад
      </button>
    <div class="row align-items-end">
      <p class="h1">Материалы</p>
    </div>
    
        <table class="table table-hover">
      <thead class="table-light">
        <tr>
          <th scope="col">№</th>
          <th scope="col">
            Наименование
          </th>
          <th scope="col">
            шифр
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Статья расходов 1</td>
          <td>0201</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Статья расходов 2</td>
          <td>0101</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  name: 'Direction',
  props: {
    // msg: String
  },
  data() {
    return {
    }
  },
}
</script>

<style lang="scss">

#back-buttom{
  padding: 1px; 
  padding-right: 20px;
  padding-left: 20px;
}

</style>
