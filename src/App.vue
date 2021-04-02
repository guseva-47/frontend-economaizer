<template>
  <div class="">
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
    <div  id="nav-tabContent">
      <div class="container-xxl tab-content">
        <div
          class="tab-pane fade"
          v-bind:class="{show: isCalcTab, active: isCalcTab}"
          id="nav-calc" role="tabpanel" aria-labelledby="nav-home-tab"
        >
          <Calculation />
        </div>
        <div 
          class="tab-pane fade"
          v-bind:class="{show: isDirectTab, active: isDirectTab}"
          id="nav-direction" role="tabpanel" aria-labelledby="nav-profile-tab">
            <Directory/>
          </div>
        <div 
          class="tab-pane fade"
          v-bind:class="{show: isProfileTab, active: isProfileTab}"
          id="nav-profile" role="tabpanel" aria-labelledby="nav-contact-tab"
        >
          <Profile />
          <LoginForm v-if="false" :isValidLoginOrPassword="isValidLoginOrPassword"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Calculation from './components/Calculation.vue'
import Directory from './components/Directory.vue'
import Profile from './components/Profile.vue'
import LoginForm from './components/LoginForm.vue'

export default {
  name: 'App',
  components: {
    Calculation,
    Directory,
    Profile,
    LoginForm
  },
  data() {
    return {
      selected_tab_i: 0,
      isValidLoginOrPassword: false
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
// #nav {
//   // padding-left: 30px;
//   background-color: #dbdbdb;
// }

html, body {
  margin: 0;
  border: 0;
}
</style>
