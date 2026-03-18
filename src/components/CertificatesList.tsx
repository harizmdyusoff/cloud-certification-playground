import type { Certificate } from '@/types/certificates'
import {
  Button,
  Label,
  makeStyles,
  Subtitle1,
  Subtitle2,
  Title2,
} from '@fluentui/react-components'
import { BackNav } from './BackNav'
import { useState } from 'react'
import { Pagination } from './Pagination'
import { CustomDropdown } from './Dropdown'
import { useEffect } from 'react'

interface CertificatesListProps {
  certificates: Certificate[]
}

const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '16px',
    width: '100%',
    paddingTop: '5%',
    paddingBottom: '5%',
    margin: '0 auto 16px',
    [`@media (min-width: ${breakpoints.sm})`]: { width: '540px' }, // sm
    [`@media (min-width: ${breakpoints.md})`]: { width: '720px' }, // md
    [`@media (min-width: ${breakpoints.lg})`]: { width: '900px' }, // lg
  },
  certificateCardHeader: {
    display: 'flex',
    flexDirection: 'column',
  },
  certificatesCardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },
  certificateCard: {
    border: '4px solid',
    padding: '8px 16px 16px 16px',
  },
  certificateCardBottom: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',

    '& Button': {
      marginTop: '20px',
    },
  },
  certificateTypo: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  certificateCardFilters: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
})

export function CertificatesList({ certificates }: CertificatesListProps) {
  const styles = useStyles()

  if (certificates.length === 0) {
    return <p>No certificates available.</p>
  }

  const sortedcertificates = [...certificates].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  const [page, setPage] = useState(1)
  const noItemsPerPage = 6
  const [selectedProvider, setSelectedProvider] = useState('All')
  const providers = ['All', 'Aws', 'Azure']

  // const [selectedRole, setSelectedRole] = useState('All')
  // const roles = ['All', 'AI Engineer', 'Administrator', 'Developer', 'Security Engineer', 'Data Engineer', 'Solutions Architect', 'Cloud Practitioner', 'Solutions Architect', 'Developer', 'Data Engineer', 'Network Engineer', 'Database Administrator', 'Virtualization Engineer', 'Developer', 'DevOps Engineer', 'Systems Administrator', 'Solutions Architect', 'DevOps Engineer', 'Machine Learning Engineer', 'AI Practitioner']

  const filteredCertificates = sortedcertificates.filter((certificate) => {
    if (selectedProvider === 'All') return true
    return certificate.vendor.toLowerCase() === selectedProvider.toLowerCase()
  })
  const totalPages = Math.ceil(filteredCertificates.length / noItemsPerPage)
  const paginatedcertificates = filteredCertificates.slice(
    (page - 1) * noItemsPerPage,
    page * noItemsPerPage,
  )

  useEffect(() => {
    setPage(1)
  }, [selectedProvider])

  return (
    <div className={styles.container}>
      <div className={styles.certificateCardHeader}>
        <Title2>
          <BackNav /> Certificates
        </Title2>
        <Label>List of certificates from Azure and AWS</Label>
      </div>
      <Subtitle1>Browse certificates</Subtitle1>
      <div className={styles.certificateCardFilters}>
        {CustomDropdown(providers, selectedProvider, setSelectedProvider, 'Select a cloud provider')}
        {/* {CustomDropdown(roles, selectedRole, setSelectedRole, 'Select a role')} */}
      </div>
      <div className={styles.certificatesCardContainer}>
        {paginatedcertificates.map((certificate) => (
          <div key={certificate.id} className={styles.certificateCard}>
            <div className={styles.certificateCardBottom}>
              <Subtitle2 className={styles.certificateTypo}>
                {certificate.name}
              </Subtitle2>
              <Label className={styles.certificateTypo}>
                {certificate.description}
              </Label>
              <Button size="large" shape="square" appearance="primary">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  )
}
