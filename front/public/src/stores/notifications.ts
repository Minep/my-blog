import type { UINotification } from "@/helpers";
import { defineStore } from "pinia";

export const useNotification = defineStore("notification", {
    state: (): { queue: Required<UINotification>[] } => ({
        queue: []
    }),
    getters: {
        all: (state) => state.queue
    },
    actions: {
        push(notification: UINotification) {
            if (!notification.elapse) {
                notification.elapse = 5
            }
            else if (notification.elapse > 10) {
                notification.elapse = 10
            }
            if (this.queue.length >= 10) {
                this.queue.shift()
            }
            this.queue.push(notification as Required<UINotification>)
        },
        tryPurge() {
            for (let i = 0; i < this.queue.length; i++) {
                const element = this.queue[i];
                if (element.elapse <= 0) {
                    this.queue.splice(i,1)
                    break
                }
                element.elapse--;
            }
        }
    }
})