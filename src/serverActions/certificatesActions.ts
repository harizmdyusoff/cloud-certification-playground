import { createServerFn } from '@tanstack/react-start'
// import * as fs from 'node:fs'
// import type { certificatesData } from '@/types/certificates'

// Read certificates from the JSON file and return them as a JavaScript object
// const CERTIFICATES_FILE = 'src/data/certificates.json'
// export const getCertificates = createServerFn({ method: 'GET' }).handler(async () => {
//   const certificates = await fs.promises.readFile(CERTIFICATES_FILE, 'utf-8')
//   return JSON.parse(certificates) as certificatesData
// })

const API_URL =
  'https://gist.githubusercontent.com/harizmdyusoff/db7ddd6ada89c13b1db19f1eb5e279ce/raw/15e4adb25f208b6d51b8012fba30b31066359551/certificates.json'

export const getCertificates = createServerFn({ method: 'GET' }).handler(
  async () => {
    const request = new Request(API_URL)
    const response = await fetch(request)

    if (!response.ok) {
      throw new Error(`Failed to fetch certificates: ${response.statusText}`)
    }

    return response.json()
  },
)
