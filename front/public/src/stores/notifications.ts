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
        inform(text: string, elapse = 3) {
            this.popup(text, "info", elapse)
        },
        success(text: string, elapse = 3) {
            this.popup(text, "success", elapse)
        },
        warn(text: string, elapse = 3) {
            this.popup(text, "warn", elapse)
        },
        error(text: string, elapse = 3) {
            this.popup(text, "error", elapse)
        },
        popup(text: string, level: "success" | "warn" | "info" | "error", elapse: number) {
            this.push({
                message: text,
                elapse: elapse,
                level: level
            })
        },
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