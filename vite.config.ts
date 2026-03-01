import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const mediaRoot = path.resolve(__dirname, 'media')

function mediaPlugin() {
  return {
    name: 'media-server',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const url = req.url.split('?')[0]
        let filePath: string
        try {
          filePath = path.join(mediaRoot, decodeURIComponent(url))
        } catch {
          return next()
        }

        let stat: fs.Stats
        try {
          stat = fs.statSync(filePath)
        } catch {
          return next()
        }

        if (!stat.isFile()) return next()

        const ext = path.extname(filePath).toLowerCase()
        const mimeMap: Record<string, string> = {
          '.mp4': 'video/mp4',
          '.mov': 'video/quicktime',
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.png': 'image/png',
          '.webp': 'image/webp',
          '.gif': 'image/gif',
        }
        const mimeType = mimeMap[ext] || 'application/octet-stream'
        const fileSize = stat.size
        const rangeHeader = req.headers['range']

        if (rangeHeader && mimeType.startsWith('video/')) {
          const match = rangeHeader.match(/bytes=(\d*)-(\d*)/)
          if (match) {
            const start = match[1] ? parseInt(match[1], 10) : 0
            const end = match[2] ? parseInt(match[2], 10) : fileSize - 1
            const chunkSize = end - start + 1
            res.writeHead(206, {
              'Content-Range': `bytes ${start}-${end}/${fileSize}`,
              'Accept-Ranges': 'bytes',
              'Content-Length': chunkSize,
              'Content-Type': mimeType,
            })
            fs.createReadStream(filePath, { start, end }).pipe(res)
            return
          }
        }

        res.writeHead(200, {
          'Content-Type': mimeType,
          'Content-Length': fileSize,
          'Accept-Ranges': 'bytes',
        })
        fs.createReadStream(filePath).pipe(res)
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), mediaPlugin()],
  publicDir: mediaRoot,
})
