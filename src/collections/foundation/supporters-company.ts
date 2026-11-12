import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate-frontend'
import type { CollectionConfig } from 'payload'

const REVALIDATE = {
  tags: ['foundation'],
}

export const SupportersCompany: CollectionConfig = {
  slug: 'supportersCompany',
  admin: {
    useAsTitle: 'text',
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      // required: true,
    },
    {
      name: 'text',
      type: 'textarea',
      // required: true,
      localized: true,
    },
  ],
}
