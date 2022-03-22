<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <h5 class="text-center">- Events You're Attending -</h5>
  <div class="col-12" v-for="e in myTickets" :key="e.id">
    <Event :event="e.event" />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import NewEvent from "../components/NewEvent.vue"
import { eventsService } from "../services/EventsService"
export default {

  name: 'Account',
  setup() {
    watchEffect(async () => {
      try {
        if (AppState.account.id) {
          await eventsService.getMyTickets(AppState.account.id)
        }
      } catch (error) {
        logget.log('cant fetch your tickets')
      }
    })
    onMounted(async () => {
      await eventsService.getAll()
    })
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
