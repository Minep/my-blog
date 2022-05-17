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
      const result = await api.v1.category(cid).get<CategoryLevel>();
      this.current = result.payload
      return result.payload as CategoryLevel
    }
  }
})
