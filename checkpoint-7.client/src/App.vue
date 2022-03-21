<template>
  <header>
    <Navbar />
  </header>
  <main>
    <b
      title="Create event"
      class="
        create-btn
        btn btn-light
        text-dark
        rounded-pill
        shadow
        d-flex
        align-items-center
        justify-content-center
      "
      data-bs-toggle="modal"
      data-bs-target="#project-modal"
    >
      <i class="mdi mdi-plus"></i>
    </b>
    <router-view />
  </main>
  <footer></footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.create-btn {
  font-size: 20px;
  height: 60px;
  width: 60px;
  z-index: 100;
  position: fixed;
  top: 12vh;
  left: 5vh;
}
</style>
