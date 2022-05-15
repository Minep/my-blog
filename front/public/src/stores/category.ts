import { api } from '@/api'
import type { CategoryLevel } from '@/helpers'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore({
  id: 'category',
  state: (): { current?: CategoryLevel } => ({ }),
  getters: {
    currentLevel: (state) => {
      return state.current
    }
  },
  actions: {
    async navigateTo (cid: string): Promise<CategoryLevel> {
      const result = await api.gateway.get<CategoryLevel>(api.v1.category(cid));
      this.current = result.payload
      return result.payload as CategoryLevel
    }
  }
})
