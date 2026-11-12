import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate-frontend'
import type { CollectionConfig } from 'payload'

const REVALIDATE = {
  tags: ['gallery'],
}

export const CategoryVideo: CollectionConfig = {
  slug: 'category-video',
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
    {
      name: 'provinceName',
      type: 'relationship',
      relationTo: 'province-name',
      maxDepth: 1,
      admin: { hidden: true },
    },
    {
      name: 'videoPosts',
      type: 'relationship',
      relationTo: 'videoPosts',
      hasMany: true,
      // required: true,
    },
  ],
}
