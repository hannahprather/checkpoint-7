<template>
  <div class="col-4 p-4 bg-warning rounded mb-2">
    <router-link
      :to="{ name: 'ActiveEvent', params: { eventId: event.id } }"
      class="text-dark"
    >
      <h2 @click="setActive(event.id)">{{ event.name }}</h2>
    </router-link>
    <p>Start date: {{ new Date(event.startDate).toLocaleString() }}</p>
    <p>Capacity: {{ event.capacity }}</p>
    <p>Location: {{ event.location }}</p>
  </div>
</template>


<script>
import { eventsService } from "../services/EventsService"
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      setActive(id) {
        eventsService.getEventById(id)
      },

    }
  }
}
</script>


<style lang="scss" scoped>
</style>
