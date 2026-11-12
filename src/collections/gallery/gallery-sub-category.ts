import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate-frontend'
import type { CollectionConfig } from 'payload'

const REVALIDATE = {
  tags: ['gallery'],
}

export const GallerySubCategory: CollectionConfig = {
  slug: 'gallery-sub-category',
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
      name: 'videoPosts',
      type: 'relationship',
      relationTo: 'videoPosts',
      hasMany: true,
      // required: true,
    },
  ],
}
