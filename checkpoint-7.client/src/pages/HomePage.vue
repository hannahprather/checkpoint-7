<template>
  <div class="container-fluid">
    <div class="row">
      <div class="bg-light text-center text-dark">
        <h1>THE TOWER</h1>
        <h6>For all your booking needs</h6>
      </div>
    </div>

    <div class="row">
      <div class="d-flex justify-content-between">
        <button class="btn btn-primary" title="" @click="filterEvents('')">
          All
        </button>

        <button
          class="btn btn-primary"
          title=""
          @click="filterEvents('convention')"
        >
          Conventions
        </button>

        <button
          class="btn btn-primary"
          title=""
          @click="filterEvents('concert')"
        >
          Concerts
        </button>

        <button class="btn btn-primary" title="" @click="filterEvents('sport')">
          Sports
        </button>

        <button
          class="btn btn-primary"
          title=""
          @click="filterEvents('digital')"
        >
          Digital
        </button>
      </div>
    </div>
    <div class="row justify-content-center">
      <Event v-for="e in events" :key="e.id" :event="e" />
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity"
import { onMounted, watchEffect } from "@vue/runtime-core"
import { eventsService } from "../services/EventsService"
import { AppState } from "../AppState"
import Event from "../components/Event.vue"
import { logger } from "../utils/Logger"

export default {
  components: { Event },
  name: 'Home',
  setup() {
    const events = ref([])
    const filter = ref('')

    onMounted(async () => {
      await eventsService.getAll()
    })
    watchEffect(() => {
      let e = AppState.events
      if (filter.value != '') {
        e = AppState.events.filter(e => e.type == filter.value)
      }
      events.value = e
    })
    return {
      events,
      filterEvents(type) {
        try {
          filter.value = type
        } catch (error) {
          logger.log('error in filter')
        }
      }
    }


    // events: computed(() => AppState.events),
    // account: computed(() => AppState.account),

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
