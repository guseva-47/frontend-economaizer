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
        <!-- Название плановой калькуляции -->
        <div class="mb-3 col-6 col-md-8">
          <label class="form-label">Название плановой калькуляции:</label>
          <input 
            type="text"
            class="form-control"
            placeholder="Название калькуляции"
            v-model="calc.nameCalc"
            v-bind:class="{'is-invalid': !isValidName}"
          >
        </div>
        <!-- от -->
        <div class="mb-3 col-3 col-md-2">
          <label class="form-label">От:</label>
          <input 
            type="text"
            class="form-control"
            placeholder="ДД.ММ.ГГГГ"
            v-model="calc.dateFrom"
            v-bind:class="{'is-invalid': !isValidDate}"
          >
        </div>
        <!-- до -->
        <div class="mb-3 col-3 col-md-2">
          <label class="form-label">До:</label>
          <input 
            type="text"
            class="form-control"
            placeholder="ДД.ММ.ГГГГ"
            v-model="calc.dateTo"
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
            <th colspan="2">процент брака</th>
          </tr>
        </thead>
        <!-- TODO сохранить изделия и перейти к заполнению материалов и прочих статей затрат
          подсветить дублирующиеся продукты и предложить удалить
        -->
        <tbody>
          <tr v-for="(prod, i) in calc.products" :key="i">
            <th scope="row">{{i+1}}</th>
            <td>
              <select 
                class="form-select"
                v-model="choisedProductsId[i]"
                v-bind:class="{'is-invalid': !isValidProdct[i]}
              ">
                <option  v-for="(prod, i) in allProducts"  :key="i" :value="prod.id" >{{prod.name}}</option>
              </select>
            </td>
            <td>{{prod.cipher}}</td>
            <td>{{prod.marriage}}</td>
            <td class="text-end">
              <button 
                type="button"
                class="btn btn-outline-danger"
                @click="deleteProduct(i)"
              >
                x
              </button>
            </td>
          </tr>
          <tr>
            <th></th>
            <td colspan="4">
              <button 
                class="btn btn-outline-secondary" 
                data-bs-toggle="tooltip" 
                data-bs-placement="right"
                title="Добавить строку"
                v-on:click="addRow"
                id="add-button"
              >
                + Изделие
              </button>
            </td>
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
          <tr v-for="(material, i) in calc.materials" :key="i">
            <th scope="row">{{i+1}}</th>
            <td>
              {{material.name}}
            </td>
            <td>{{material.cipher}}</td>
            <td>
              <input 
                type="text"
                class="form-control"
                placeholder="0.0"
                v-model="material.cost"
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Кнопки -->
    <div class="d-grid gap-2 d-md-flex justify-content-end">
      <button type="button" class="btn btn-outline-primary">
        Отмена
      </button>
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
  props: ["backToCalcs", "calcToUpdate"],
  data() {
    return {

      calc: {
        id: -1,
        nameCalc: '',
        dateFrom: moment().format("DD.MM.YYYY"),
        dateTo: moment().add(1, 'month').format("DD.MM.YYYY"),
        marriage: 0,
        products: [],
        materials: []
      },

      needValidCheck: false,
      // id изделий, выбранных пользователем для калькуляции
      choisedProductsId: [],
      allProducts: [],
      flag: true,
      isValidProdct:[],
    }
  },
  created: async function() {
    await this.getProducts();
    this.allProducts = this.$store.state.products;

    if (this.calcToUpdate !== null) {
      this.calc.nameCalc = this.calcToUpdate.name;
      this.calc.dateFrom = this.calcToUpdate.fromDate;
      this.calc.dateTo = this.calcToUpdate.toDate;
      this.calc.products = this.calcToUpdate.products;
      this.calc.materials = this.calcToUpdate.materials;
      this.calc.marriage = this.calcToUpdate.marriage;
    }
    else {
      this.calc.products = [
        {
          id: '',
          names: '',
          cipher: '',
          marriage: ''
        }
      ]
      this.calc.materials = []
    }
    this.calc.products.forEach(prod => this.choisedProductsId.push(prod.id))
  },
  computed: {
    isValidName() {
      if(!this.needValidCheck) return true;
      return this.calc.nameCalc.length > 0;
    },
    isValidDate() {
      if(!this.needValidCheck) return true;
      return moment(this.calc.dateFrom, 'DD.MM.YYYY') <= moment(this.calc.dateTo, 'DD.MM.YYYY')
    },
    materials() {
      console.log('Обновление materials')
      return this.choisedProductsId.filter(id => id !== '');
    }
  },
  watch: {
    materials: async function (newProductsId) {
      console.log('WTCH 1')

      for(let i = 0; i < this.choisedProductsId.length; i++) {
        let newProd = this.allProducts.find(item => item.id == this.choisedProductsId[i])
        this.calc.products[i] = newProd;
        if (!newProd) {          
          this.choisedProductsId = [this.allProducts[0].id];
          this.calc.products[i] = this.allProducts[0];
        }
      }
      // TODO почему-то не уходит массив мтарых материалов
      await this.getMaterials(newProductsId);

      const newMaterials = this.$store.state.materials;
      this.calc.materials = this.updateCost(newMaterials, this.calc.materials)

      this.isValidProdct = this.isValidProducts(this.choisedProductsId);
    }
  },
  methods: {
    saveCalc() {
      this.needValidCheck = true;
      if (!(this.isValidName && this.isValidDate)) return;
      this.backToCalcs();

      // отправить запрос на сервер с сохранением калькуляции
    },
    addRow() {
      this.choisedProductsId.push(this.allProducts[0].id);
      this.calc.products.push(
        {
          id: '',
          names: '',
          cipher: '',
          marriage: ''
        }
      ); 
    },
    updateCost(newMaterials, oldMaterials) {
      if(!oldMaterials) return newMaterials;

      for(let i = 0; i < newMaterials.length; i++) {
        oldMaterials.forEach(oldM => {
          if(oldM.id == newMaterials[i].id) 
            newMaterials[i].cost = oldM.cost
        })
      }
      return newMaterials;
    },
    isValidProducts(arr) {
      const result = arr.map(() => true);
      console.log(result)
      for(let i = arr.length - 1; i > 0; i--){
        let isOk = true;
        for(let j = i - 1; j >= 0 && isOk; j--)
          if(arr[i] == arr[j]) {
            result[i] = false;
            isOk = false;
          }
      }
      return result;
    },

    async deleteProduct(i) {
      this.choisedProductsId.splice(i, 1);
      this.calc.products.splice(i, 1);
    },

    async getProducts() {
      await this.$store.dispatch('getAllProducts');
    },

    async getMaterials(productsId) {
      this.$store.dispatch('getMaterials', productsId);
    },
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
