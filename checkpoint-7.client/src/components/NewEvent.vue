<template>
  <form @submit.prevent="createEvent">
    <div class="mb-3">
      <label for="event-name" class="form-label">Event Name:</label>
      <input
        v-model="state.newEvent.name"
        type="text"
        class="form-control"
        id="event-name"
      />
    </div>
    <div class="mb-3">
      <label for="event-description" class="form-label"
        >Event Description:</label
      >
      <input
        v-model="state.newEvent.description"
        type="text"
        class="form-control"
        id="event-description"
      />
      <label for="event-image" class="form-label">image:</label>
      <input
        v-model="state.newEvent.coverImg"
        type="text"
        class="form-control"
        id="event-image"
      />
      <label for="event-location" class="form-label">location:</label>
      <input
        v-model="state.newEvent.location"
        type="text"
        class="form-control"
        id="event-location"
      />
      <label for="event-capacity" class="form-label"> capcity: </label>
      <input
        v-model="state.newEvent.capacity"
        type="number"
        class="form-control"
        id="event-capacity"
      />
      <label for="event-startDate" class="form-label"> start date</label>
      <input
        v-model="state.newEvent.startDate"
        type="date"
        class="form-control"
        id="event-startDate"
      />
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>


<script>
import { reactive } from "@vue/reactivity";
import { eventsService } from "../services/EventsService"
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { Modal } from "bootstrap";
import { router } from "../router";
export default {
  setup() {
    const state = reactive({
      newEvent: {}
    })
    return {
      state,
      async createEvent() {
        try {
          const event = await eventsService.createEvent(state.newEvent);
          state.newEvent = {};
          router.push({ name: "ActiveEvent", params: { eventId: event.id } })
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    }
  },
}
</script>


<style lang="scss" scoped>
</style>
© 2022 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
Loading complete