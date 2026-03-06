import { CertificatesList } from '@/components/CertificatesList'
import { getCertificates } from '@/serverActions/certificatesActions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/certificates')({
  loader: async () => {
    return getCertificates()
  },
  component: CertificatesComponent,
})

function CertificatesComponent() {
  const certificates = Route.useLoaderData() || []
  return <div><CertificatesList certificates={certificates} /></div>
}
