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
    <div class="row p-1">
      <p class="h1" v-if="calcToUpdate">Редактировать плановую калькуляцию</p>
      <p class="h1" v-else>Новая плановая калькуляция</p>
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
            v-model="calc.name"
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
            v-model="calc.fromDate"
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
            v-model="calc.toDate"
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

    <!-- Таблица стоимости заработных плат -->
    <div class="p-1">
      <table class="table table-hover">
        <thead class="table-light">
          <tr>
            <th scope="col">№</th>
            <th scope="col">
              Зароботная плата
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
          <tr v-for="(cost, i) in calc.costs" :key="i">
            <th scope="row">{{i+1}}</th>
            <td>
              {{cost.name}}
            </td>
            <td>{{cost.cipher}}</td>
            <td>
              <input 
                type="text"
                class="form-control"
                placeholder="0.0"
                v-model="cost.cost"
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Кнопки -->
    <div class="d-grid gap-2 d-md-flex justify-content-end">
      <button type="button" class="btn btn-outline-primary" @click="cancelChanges">
        Отменить изменения
      </button>
      <button type="button" class="btn btn-outline-danger" @click="deleteCalc">
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
import rfdc from 'rfdc'

const clone = rfdc()

export default {
  name: 'Calc',
  props: ["backToAllCalcs", "backToCalc", "calcToUpdate"],
  data() {
    return {

      calc: {
        id: -1,
        name: '',
        fromDate: moment().format("DD.MM.YYYY"),
        toDate: moment().add(1, 'month').format("DD.MM.YYYY"),
        marriage: 0,
        products: [],
        materials: [],
        costs: [],
      },

      needValidCheck: false,
      // id изделий, выбранных пользователем для калькуляции
      choisedProductsId: [],
      allProducts: [],
      isValidProdct:[],
    }
  },
  created: async function() {
    
    await this.getProducts();
    this.allProducts = this.$store.state.products;

    if (this.calcToUpdate !== null) {
      this.calc = clone(this.calcToUpdate);
    }
    else {
      this.calc.id = -1;
      this.calc.products = []
      this.calc.materials = []
      this.calc.costs = []
    }
    this.calc.products.forEach(prod => this.choisedProductsId.push(prod.id))
  },
  computed: {
    isValidName() {
      if(!this.needValidCheck) return true;
      return this.calc.name.length > 0;
    },
    isValidDate() {
      if(!this.needValidCheck) return true;
      return moment(this.calc.fromDate, 'DD.MM.YYYY') <= moment(this.calc.toDate, 'DD.MM.YYYY')
    },
    materials() {
      return this.choisedProductsId.filter(id => id !== '');
    }
  },
  watch: {
    materials: async function (newProductsId) {

      for(let i = 0; i < this.choisedProductsId.length; i++) {
        let newProd = this.allProducts.find(item => item.id == this.choisedProductsId[i])
        this.calc.products[i] = newProd;
        if (!newProd) {          
          this.choisedProductsId = [this.allProducts[0].id];
          this.calc.products[i] = this.allProducts[0];
        }
      }
      await this.getMaterials(newProductsId);
      await this.getCosts(newProductsId);

      const newMaterials = this.$store.state.materials;
      const newCosts = this.$store.state.costs;
      this.calc.materials = this.updateCost(newMaterials, this.calc.materials);
      this.calc.costs = this.updateCost(newCosts, this.calc.costs)

      this.isValidProdct = this.updateValidProd(this.choisedProductsId);
    }
  },
  methods: {
    async deleteCalc() {
      // отправить запрос на сервер с просьбой удлаить
      // отправить запрос с получением нового списка калькуляций
      // вернуться ко всем калькуляциям
      // todo
      this.backToAllCalcs();
    },
    async saveCalc() {
      this.needValidCheck = true;
      if (!(this.isValidName && this.isValidDate)) return;
      if (this.isValidProdct.includes(false)) return;
      this.backToAllCalcs();

      // отправить запрос на сервер с сохранением калькуляции
      // получить сохраненную калькуляцию от сервера
      // todo

      // передать калькуляцию в форму
      this.backToCalc(this.calc);
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
    updateValidProd(arr) {
      const result = arr.map(() => true);
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
    async getCosts(productsId) {
      this.$store.dispatch('getCosts', productsId);
    },

    cancelChanges() {
      if (this.calcToUpdate !== null) {
        this.calc = clone(this.calcToUpdate);
      }
      else {
        this.calc.id = -1;
        this.calc.name = '';
        this.calc.fromDate = '';
        this.calc.toDate = '';
        this.calc.products = '';
        this.calc.materials = [];
        this.calc.costs = [];
        this.calc.marriage = '';
        this.calc.products = [];
      }
      this.choisedProductsId = [];
      this.calc.products.forEach(prod => this.choisedProductsId.push(prod.id))
      this.needValidCheck = false;
      this.isValidProdct = this.updateValidProd(this.choisedProductsId);
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
