export interface Certificate {
  id: string
  createdAt: string
  name: string
  description: string
  badgeUrl: string
  vendor: string
  level: string
  role: string
  subject: string
  externalLink: string
}

export type certificatesData = Certificate[]
