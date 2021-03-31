<template>
  <div class="row">
    <nav>
      <div class="nav nav-tabs" id="nav" role="tablist">
        <div class="container-xxl d-flex flex-row">
          <!-- Калькуляция calc -->
          <button 
            class="nav-link"
            v-bind:class="{active: isCalcTab}"
            @click="selected_tab_i = 0"
            id="nav-calc-tab"
          >
            Калькуляция
          </button>
          <!-- Справочная информация direction -->
          <button 
            class="nav-link"
            v-bind:class="{
              active: isDirectTab,
              not_active_tab: !isDirectTab,
              }"
            @click="selected_tab_i = 1"
            id="nav-direction-tab"
          >
            Справочная информация
          </button>
          <!-- Профиль profile -->
          <button 
            class="nav-link ms-auto n-a-b" 
            v-bind:class="{active: isProfileTab}"
            @click="selected_tab_i = 2"
            id="nav-profile-tab"
          >
            Профиль
          </button>
        </div>
      </div>
    </nav>
    <div class="" id="nav-tabContent">
      <div class="container-xxl tab-content">
        <div
          class="tab-pane fade"
          v-bind:class="{show: isCalcTab, active: isCalcTab}"
          id="nav-calc" role="tabpanel" aria-labelledby="nav-home-tab"
        >
          1...
        </div>
        <div 
          class="tab-pane fade"
          v-bind:class="{show: isDirectTab, active: isDirectTab}"
          id="nav-direction" role="tabpanel" aria-labelledby="nav-profile-tab">
            2...
          </div>
        <div 
          class="tab-pane fade"
          v-bind:class="{show: isProfileTab, active: isProfileTab}"
          id="nav-profile" role="tabpanel" aria-labelledby="nav-contact-tab"
        >
            3...
        </div>
      </div>
    </div>
  </div>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      selected_tab_i: 0,
    }
  },
  computed: {
    isCalcTab() {
      return this.selected_tab_i === 0;
    },
    isDirectTab() {
      return this.selected_tab_i === 1;
    },
    isProfileTab() {
      return this.selected_tab_i === 2;
    }
  }
}
</script>

<style lang="scss">
#nav {
  // padding-left: 30px;
  background-color: #dbdbdb;
}
</style>
