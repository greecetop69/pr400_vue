import { writeFile } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const version = Math.floor(Date.now() / 1000) // Генерируем Unix timestamp
const versionPath = join(__dirname, '../public/version.json') // Путь исправлен

await writeFile(versionPath, JSON.stringify({ version }, null, 2))
console.log(`✅ Обновлена версия билда: ${version}`)
