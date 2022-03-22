<template>
  <div class="active-event-page">
    <div class="row text-center">
      <h1>{{ activeEvent.name }}</h1>
    </div>
    <div class="col-10">
      <div class="row justify-content-center image-fluid p-3">
        <img :src="activeEvent.coverImg" alt="event pic" />
      </div>
    </div>
    <EditEventForm />
    <p>Canceled: {{ activeEvent.isCanceled }}</p>
    <p>Capacity: {{ activeEvent.capacity }}</p>
    <button @click="attendEvent(activeEvent.id)" class="text-dark">
      Attend Event
    </button>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core"
import { useRoute } from "vue-router"
import { eventsService } from "../services/EventsService"
import { AppState } from "../AppState"
import EditEventForm from "../components/EditEventForm.vue"
export default {
  components: { EditEventForm },
  name: 'ActiveEvent',
  setup() {
    const route = useRoute()
    onMounted(() => {
      eventsService.getEventById(route.params.eventId)
    })

    return {
      activeEvent: computed(() => AppState.activeEvent),
      async attendEvent(eventId) {
        await eventsService.attendEvent(eventId)
      }
    }
  }


}
</script>
