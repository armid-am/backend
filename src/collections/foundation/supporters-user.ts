import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate-frontend'
import type { CollectionConfig } from 'payload'

const REVALIDATE = {
  tags: ['foundation'],
}

export const SupportersUser: CollectionConfig = {
  slug: 'supportersUser',
  admin: {
    useAsTitle: 'fullName',
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
      name: 'fullName',
      type: 'text',
      // required: true,
      localized: true,
    },
  ],
}
