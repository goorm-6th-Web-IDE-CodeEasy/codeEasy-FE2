// worker.ts
import { setupWorker } from 'msw'
import { handlers } from './handler'

export const worker = setupWorker(...handlers)

worker.start({
    onUnhandledRequest: 'bypass',
})
