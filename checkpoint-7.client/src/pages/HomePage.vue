<template>
  <div class="container-fluid">
    <div class="row">
      <div
        v-for="e in events"
        :key="e.eventId"
        :event="e"
        class="col-4 p-4 bg-warning rounded mb-2"
      />
      <Event :event="e" />
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
