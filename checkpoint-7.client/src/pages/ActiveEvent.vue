<template>
  <div class="active-event-page">
    <h1>This is the active event page</h1>
    <p>{{ activeEvent.name }}</p>

    <EditEventForm />
    <p>Canceled: {{ activeEvent.isCanceled }}</p>
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

    }
  }


}
</script>
