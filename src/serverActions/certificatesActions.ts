import { createServerFn } from '@tanstack/react-start'
import * as fs from 'node:fs'
import type { certificatesData } from '@/types/certificates'

const CERTIFICATES_FILE = 'src/data/certificates.json'

export const getCertificates = createServerFn({ method: 'GET' }).handler(async () => {
  const certificates = await fs.promises.readFile(CERTIFICATES_FILE, 'utf-8')
  return JSON.parse(certificates) as certificatesData
})