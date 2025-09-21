import { defineConfig, loadEnv } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isNetlify = env.DEPLOY_TARGET === 'netlify'

  return {
    plugins: [
      viteTsConfigPaths({ projects: ['./tsconfig.json'] }),
      tailwindcss(),
      tanstackStart({
        target: isNetlify ? 'netlify' : undefined,
        customViteReactPlugin: isNetlify,
        spa: { enabled: true },
      }),
      viteReact(),
    ],
  }
})
