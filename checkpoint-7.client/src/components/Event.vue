<template>
  <div>
    <router-link
      :to="{ name: 'ActiveEvent', params: { eventId: event.id } }"
      class="text-dark"
    >
      <h2 @click="setActive(event.id)">{{ event.name }}</h2>
    </router-link>
  </div>
</template>


<script>
import { router } from "../router"
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
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>
