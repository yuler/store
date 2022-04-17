import fs from 'node:fs/promises'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * Expose Codebase `ROOT` path
 */
export const ROOT = resolve(__dirname, '../../')

export async function exists(path: string): Promise<boolean> {
  try {
    await fs.access(path)
  } catch {
    return false
  }
  return true
}

export async function ensureDir(path: string) {
  const dir = dirname(path)
  if (!(await exists(dir))) {
    await fs.mkdir(dir, {recursive: true})
  }
}
