import { createApp } from 'vue'
import 'bootstrap/scss/bootstrap.scss'
import router from './router'
import { createStore } from 'vuex'
import App from './App.vue'

const store = createStore({
  state: {
    calculations: [],

    // Вид справочника, получаемого от сервера
    products: [
      {
        id: '',
        name: '',
        cipher: '',
        marriage: '',
      }
    ],

    materials: {
      id: '',
      cipher: '',
      name: '',
      cost: '',
    },

    zp: {
      id: '',
      cost: '',
    },

    profile: {
      login: 'user_login',
      name: 'Name Surname',
    },
  },
  getters: {
    // getProfile(state) {
    //   return state.profile;
    // },
    // getDirectorys(state) {
    //   return state.directorys;
    // },
    // getDirectory(state, i) {
    //   return state.directorys[i];
    // },
    // getCalculations(state) {
    //   return state.calculations;
    // },
    // getCalculation(state, i) {
    //   return state.calculations[i];
    // },
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setCalculation(state, i, calculation) {
      state.calculations[i] = calculation;
    },
    setCalculations(state, calculations) {
      state.calculations = calculations;
    },
    setProducts(state, products) {
      state.products = products;
    },
    setMaterials(state, materials) {
      state.materials = materials;
    }
  },
  actions: {
    async getCalculations({ commit }) {
      // c -- результат запроса к серверу
      const c = [
        {
          name: 'name of calc 1',
          fromDate: '01.02.2021',
          toDate: '15.04.2020',
          marriage: 2,
          products: [
            { id: 1, name: 'product 1', cipher: '10101', marriage: '2'},
            { id: 2, name: 'product 2', cipher: '202020', marriage: '1'},
          ],
          materials: [
            {
              id: 1,
              cipher: 'm10101',
              name: 'material 1',
              cost: 200
            },
            {
              id: 2,
              cipher: 'm20202',
              name: 'material 2',
              cost: 300
            }
          ],
          stati: [
            { name: 'statia 1', cipher: '01010', cost: '20'},
            { name: 'statia 2', cipher: '0220', cost: '220'},
          ]
        },
  
        {
          name: 'name of calc 2',
          fromDate: '15.11.2020',
          toDate: '10.09.2020',
          marriage: 1,
          products: [
            { name: 'izdelie 11', cipher: '01010'},
            { name: 'izdelie 22', cipher: '0220'},
          ],
          material: [
            { name: 'izdelie 11', cipher: '01010', cost: 210},
            { name: 'izdelie 22', cipher: '02220', cost: 410},
            { name: 'izdelie 33', cipher: '03030', cost: 4150},
          ],
          stati: [
            { name: 'statia 11', cipher: '01010'},
            { name: 'statia 22', cipher: '0220'},
          ]
        }
      ];
      commit('setCalculations', c);
    },

    async getAllProducts({commit}) {
      const prod = [
        {
          id: 1,
          name: 'product 1',
          cipher: '101010',
          marriage: 2
        },
        {
          id: 2,
          name: 'product 2',
          cipher: '020202',
          marriage: 1
        },
        {
          id: 3,
          name: 'product 3',
          cipher: '030303',
          marriage: 3
        },
      ]
      console.log('STORE get all prod')
      commit('setProducts', prod);
    },

    async getMaterials({commit}, productsId) {

      const deleteDuplicates = (arr) => {
        arr = arr.slice();
        for(let i = 0; i < arr.length - 1; i++)
          if (arr[i] != -1)
            for(let j = i + 1; j < arr.length; j++)
              if (arr[i] == arr[j]) arr[j] = -1;
  
        return arr.filter(item => !(item == -1 || item == ''));
      }
      productsId = deleteDuplicates(productsId);
      
      // имитация работы сервера
      const materialsDirectory = [
        {
          id: 1,
          cipher: 'm10101',
          name: 'material 1',
        },
        {
          id: 2,
          cipher: 'm20202',
          name: 'material 2',
        },
        {
          id: 3,
          cipher: 'm303003',
          name: 'material 3',
        },
        {
          id: 4,
          cipher: 'm04040',
          name: 'material 4',
        },
      ]
      let newMaterials = []
      productsId.forEach(prod => {
        if(prod != '')
          newMaterials.push(materialsDirectory[prod - 1]);
      })
      
      console.log(`STORE \nnew materials = `)
      console.log(newMaterials)
      
      commit('setMaterials', newMaterials);
    },

  }
})

createApp(App).use(router).use(store).mount('#app')
