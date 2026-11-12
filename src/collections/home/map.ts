import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate-frontend'
import type { CollectionConfig } from 'payload'

const REVALIDATE = {
  tags: ['home'],
}

export const Maps: CollectionConfig = {
  slug: 'map',
  admin: {
    useAsTitle: 'provinceName',
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
      name: 'provinceName',
      type: 'text',
    },
    {
      name: 'number-of-monuments',
      type: 'number',
      // required: true,
    },
    {
      name: 'monuments-text',
      type: 'text',
      // required: true,
      localized: true,
    },
    {
      name: 'Area',
      type: 'number',
      // required: true,
    },
    {
      name: 'population',
      type: 'number',
      // required: true,
    },
    {
      name: 'cities',
      type: 'number',
      // required: true,
    },
    {
      name: 'villages',
      type: 'number',
      // required: true,
    },
    {
      name: 'text',
      type: 'textarea',
      // required: true,
      localized: true,
    },
    {
      name: 'text-title',
      type: 'text',
      // required: true,
      localized: true,
    },
    {
      name: 'videoPosts',
      type: 'relationship',
      relationTo: 'videoPosts',
      hasMany: true,
    },
  ],
}
