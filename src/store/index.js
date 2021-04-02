// import { createApp } from 'vue'
// import { createStore } from 'vuex'

// const app = createApp({ ... })
// const store = createStore({ ... })

// app.use(store)

// const store = createStore({
//   state: {
//     headBase: {
//       n: '012032',
//       date: null,
//       okud: '0330506',
//       okp: '',
//       okdp: '',
//       vidoperac: ''
//     },
//     headPeople: {
//       organization: "Сладкая ложка",
//       otpravitel: 'Столовая №1',
//       poluchatel: 'Буфет №1',
//       matLico: {
//         doljnost: 'Начальник производства',
//         fio: 'Сомова Антонина Николаевна'
//       },
//       rukovoditel: {
//         doljnost: 'Директор',
//         fio: 'Началова Т. К.'
//       },
//       glavbuh: 'Мамонтова Л. А.'
//     },
//     table: [
//       { 
//         id:1,
//         product: {
//           title: "Грибы соленые",
//           kod: "1121"
//         },
//         edinica: {
//           title: "ШТ",
//           kod: "796"
//         },
//         izdelia: [10, 0, 0, 0, 0, 0],
//         vozvrat: 0,
//         itogo: {
//           count: 0,
//           price1: {
//             p: 7,
//             c: 70
//           },
//           price2: {
//             p: 10,
//             c: 100
//           }

//         },
//         primecnanie: 'Банки литровые'
//       },
//       { 
//         id:2,
//         product: {
//           title: "",
//           kod: ""
//         },
//         edinica: {
//           title: "",
//           kod: ""
//         },
//         izdelia: [0, 0, 0, 0, 0, 0],
//         vozvrat: 0,
//         itogo: {
//           count: 0,
//           price1: {
//             p: 0,
//             c: 0
//           },
//           price2: {
//             p: 0,
//             c: 0
//           }

//         },
//         primecnanie: ''
//       },
//     ],
//     time: {
//       time: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
//       count: 1,
//     },
//   },
//   getters: {
//     getHeadBase(state) {
//       return state.headBase;
//     },
//     getHeadPeople(state) {
//       return state.headPeople;
//     },
//     getTable(state) {
//       return state.table;
//     },
//     getTime(state) {
//       return state.time;
//     },
//     getTableRow(state, i) {
//       return state.table[i];
//     },
//   },
//   mutations: {
//     setHeadPeople(state, headPeople) {
//       state.headPeople = headPeople;
//     },
//     setHeadBase(state, headBase) {
//       state.headBase = headBase;
//     },
//     setTable(state, table) {
//       state.table = table;
//     },
//     setTableRow(state, i, row) {
//       state.table[i] = row;
//     },
//   },
//   actions: {
//     updateHeadPeople({ commit }, headPeople) {
//       commit('setHeadPeople', headPeople)
//     },
//     updateHeadBase({ commit }, headBase) {
//       commit('setHeadBase', headBase)
//     },    
//   }
// })