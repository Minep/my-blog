import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

import Inspect from 'vite-plugin-inspect'

require("dotenv").config()

type AppConfigMapping = Record<string, string>

export default defineConfig({
  plugins: [
    vue(), 
    vueJsx(), 
    Inspect(), 
    AppConfiger({
      apiServer: "SYS_BACKEND_URL",
      siteName: "FRONT_SITE_NAME",
      ossServer: "FRONT_OSS_SERVER"
    }),
    AutoImport({
      resolvers: [ 
        ElementPlusResolver() ,
        IconsResolver({
          prefix: "Icon"
        })
      ]
    }),
    Components({
      resolvers: [ 
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep']
        })
      ]
    }),
    Icons({
      autoInstall: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

function AppConfiger(mappings: AppConfigMapping) {
  const appConfigModule = "virtual:app-configer"
  const appConfigModuleId = "\0" + appConfigModule

  const dynamicCode = `
    export const appConfig = {
      ${
        Object.keys(mappings)
              .map((v) => `'${v}': "${process.env[mappings[v]] ?? ''}"`)
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