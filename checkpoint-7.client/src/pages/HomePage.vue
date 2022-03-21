<template>
  <div
    class="
      home
      flex-grow-1
      d-flex
      flex-column
      align-items-center
      justify-content-center
    "
  >
    <div class="home-card p-5 bg-white rounded elevation-3">
      <img
        src="https://bcw.blob.core.windows.net/public/img/8600856373152463"
        alt="CodeWorks Logo"
        class="rounded-circle"
      />
      <h1 class="my-5 bg-dark text-white p-3 rounded text-center">
        Vue 3 Starter
      </h1>
      <event v-for="e in events" :key="e.eventId" :event="e" />
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity"
import { onMounted } from "@vue/runtime-core"
import { eventsService } from "../services/EventsService"
import { AppState } from "../AppState"
import Event from "../components/Event.vue"

export default {
  components: { Event },
  name: 'Home',
  setup() {

    onMounted(async () => {
      await eventsService.getAll()
    })

    return {
      events: computed(() => AppState.events),
      account: computed(() => AppState.account),
    }
  },
}

</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
