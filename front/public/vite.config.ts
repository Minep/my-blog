import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import Inspect from 'vite-plugin-inspect'

require("dotenv").config()

type AppConfigMapping = Record<string, string>

const configMapping: AppConfigMapping = {
  apiServer: "FRONT_PUBLIC_API_SERVER",
  adminEntry: "BACKSTAGE_ENTRY"
}

export default defineConfig({
  plugins: [vue(), vueJsx(), Inspect(), appConfig(configMapping)],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

function appConfig(mappings: AppConfigMapping) {
  const appConfigModule = "virtual:app-configer"
  const appConfigModuleId = "\0" + appConfigModule

  const dynamicCode = `
    export const appConfig = {
      ${
        Object.keys(mappings)
              .map((v) => `'${v}': '${process.env[mappings[v]] ?? ""}'`)
              .join(',')
      }
    }
  `

  return {
      name: "app-config-loader",
      resolveId (id: string) {
        if (id === appConfigModule) {
            return appConfigModuleId
        }
      },
      load(id: string) {
          if (id === appConfigModuleId) {
              return {
                code: dynamicCode,
                moduleSideEffects: false
              }
          }
      }
  }
}