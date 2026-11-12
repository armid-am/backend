import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate-frontend'
import type { CollectionConfig } from 'payload'

const REVALIDATE = {
  tags: ['gallery', 'footer'],
}

export const GalleryCategory: CollectionConfig = {
  slug: 'gallery-category',
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
      localized: true,
    },
    {
      name: 'item',
      type: 'relationship',
      relationTo: 'gallery-sub-category',
      hasMany: true,
    },
    {
      name: 'disabled',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
