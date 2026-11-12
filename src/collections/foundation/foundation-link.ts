import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate-frontend'
import type { CollectionConfig } from 'payload'

const REVALIDATE = {
  tags: ['foundation', 'footer'],
}

export const FoundationLink: CollectionConfig = {
  slug: 'foundationLink',
  admin: {
    useAsTitle: 'name',
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
      name: 'name',
      type: 'text',
      // required: true,
      localized: true,
    },
  ],
}
