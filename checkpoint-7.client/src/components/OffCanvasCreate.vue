<template>
  <div class="off-canvas">
    <div
      class="offcanvas offcanvas-start"
      tabindex="-1"
      id="offcanvas"
      aria-labelledby="offcanvasLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasLabel">Create an Event</h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <EditEventForm />
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { router } from "../router"
import EditEventForm from "./EditEventForm.vue"
export default {
  components: { EditEventForm },
  setup() {
    return {
      projects: computed(() => AppState.events),
    }
  }
}
</script>


<style lang="scss" scoped>
</style>