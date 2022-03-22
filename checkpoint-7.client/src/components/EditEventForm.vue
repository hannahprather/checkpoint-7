<template>
  <div class="editEventComponent">
    <form class="form-group" @submit.prevent="editEvent()">
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
      <input
        type="text"
        class="form-control"
        :placeholder="activeEvent.coverImg"
        v-model="state.editedEvent.coverImg"
      />
      <input
        type="text"
        class="form-control"
        :placeholder="activeEvent.location"
        v-model="state.editedEvent.location"
      />
      <input
        type="text"
        class="form-control"
        :placeholder="activeEvent.capacity"
        v-model="state.editedEvent.capacity"
      />
      <input
        type="text"
        class="form-control"
        :placeholder="activeEvent.startDate"
        v-model="state.editedEvent.startDate"
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
import { watchEffect } from "@vue/runtime-core"
export default {
  name: 'EditEventForm',
  props: {
    activeEvent: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      editedEvent: {}
    })
    const loggedInUser = computed(() => AppState.account)
    watchEffect(() => {
      state.editedEvent = { ...props.activeEvent }
    })
    return {
      state,
      loggedInUser,
      editEvent() {
        eventsService.editEvent(state.editedEvent)
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