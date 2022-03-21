<template>
  <div class="editEventComponent">
    <form class="form-group" @submit.prevent="editEvent(activeEvent.id)">
      <input
        type="text"
        class="form-control"
        :placeholder="activeEvent.name"
        v-model="state.editedEvent.name"
      />
      <input
        type="text"
        class="form-control"
        :placeholder="activeEvent.description"
        v-model="state.editedEvent.description"
      />
      <button class="btn btn-block btn-dark" type="submit">Submit</button>
    </form>

    <button @click="cancelEvent(activeEvent.id, activeEvent)">
      cancel event
    </button>
  </div>
</template>

<script>
import { computed, reactive } from "@vue/reactivity"
import { AppState } from '../AppState'
import { eventsService } from "../services/EventsService"
export default {
  name: 'EditEventForm',
  setup() {
    const state = reactive({
      editedEvent: {
      }
    })
    const loggedInUser = computed(() => AppState.account)

    return {
      state,
      activeEvent: computed(() => AppState.activeEvent),
      loggedInUser,
      editEvent(id) {
        eventsService.editEvent(id, state.editedEvent)
      },
      cancelEvent(id, activeEvent) {
        eventsService.cancelEvent(id, activeEvent)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
</style>