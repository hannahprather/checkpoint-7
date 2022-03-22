<template>
  <div class="col-5 p-4 bg-grey rounded m-1">
    <div
      :class="{
        'strike-through': event.isCanceled === true,
      }"
    >
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
