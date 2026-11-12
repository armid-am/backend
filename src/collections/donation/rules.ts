import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate-frontend'
import type { CollectionConfig } from 'payload'

const REVALIDATE = {
  tags: ['donation'],
}

export const Rules: CollectionConfig = {
  slug: 'rules',
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
      required: false,
      localized: true,
    },
    {
      name: 'text',
      type: 'text',
      required: false,
      localized: true,
    },
  ],
}
