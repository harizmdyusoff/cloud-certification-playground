import type { Certificate } from '@/types/certificates'
import { Body2, Button, Caption1, Divider, Label, makeStyles, Subtitle1, Subtitle2, Title2 } from '@fluentui/react-components'
import { useRouter } from '@tanstack/react-router'
import { BackNav } from './BackNav'
import { useState } from 'react'
import { Pagination } from './Pagination'

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
  certificatesCardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    height: "450px"
  },
  certificateCard: {
    border: "4px solid",
    padding: "8px 16px 16px 16px",
  },
  certificateCardTop: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "-8px",
    "& Button": {
      minWidth: "24px",
      padding: "0",
    },
    "& Button:hover": {
      color: "#E84641",
    },
  },
  certificateCardBottom: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
})

export function CertificatesList({ certificates }: CertificatesListProps) {
  const styles = useStyles()
  const router = useRouter()

  if (!certificates || certificates.length === 0) {
    return <p>No certificates available.</p>
  }

  // It's generally better to sort in the UI (here) if you want flexibility in presentation.
  // If you always want certificates sorted from the backend, sort in certificatesActions.
  // For this component, sorting here is fine:
  const sortedcertificates = [...certificates].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const [page, setPage] = useState(1)
  const noItemsPerPage = 6
  const totalPages = Math.ceil(sortedcertificates.length / noItemsPerPage)
  const paginatedcertificates = sortedcertificates.slice((page-1)*noItemsPerPage, page*noItemsPerPage)

  return (
    <div className={styles.container}>
      <Title2><BackNav /> Certificates Collection</Title2>
      <Label>This page implements certificate collection by reading a file method.</Label>
      <Subtitle1>Your certificates</Subtitle1>
      <div className={styles.certificatesCardContainer}>
        {paginatedcertificates.map((certificate) => (
          <div key={certificate.id} className={styles.certificateCard}>
            <div className={styles.certificateCardBottom}>
              <Subtitle2>{certificate.name}</Subtitle2>
              <Body2>{certificate.description}</Body2>
              <Caption1>Created At: {new Date(certificate.createdAt).toLocaleString()}</Caption1>
            </div>
          </div>
        ))}
      </div>
      {/* <Pagination page={page} totalPages={totalPages} setPage={setPage} /> */}
    </div>
  )
}