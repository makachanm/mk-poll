import { Router } from "itty-router"

import poll from './module/poll'
import history from './module/history'

const app = Router({ base: "/apiv1"})

app.post('/poll', async (req) => {
   return await poll(req)
})

app.get('/history', async (req) => {
  return await history(req)
})

export default {
  fetch: app.handle
}