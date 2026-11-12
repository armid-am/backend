import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate-frontend'
import type { CollectionConfig } from 'payload'

const REVALIDATE = {
  tags: ['donation'],
}

export const DonationRules: CollectionConfig = {
  slug: 'donationRules',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateAfterChange(REVALIDATE)],
    afterDelete: [revalidateAfterDelete(REVALIDATE)],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      // required: true,
      localized: true,
    },
    {
      name: 'rules',
      type: 'relationship',
      relationTo: 'rules',
      hasMany: true,
    },
  ],
}
