import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false so Next.js handles caching (ISR)
  stega: {
    studioUrl: '/studio',
  },
})
