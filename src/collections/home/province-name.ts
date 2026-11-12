import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate-frontend'
import type { CollectionConfig } from 'payload'

const REVALIDATE = {
  tags: ['home'],
}

export const ProvinceName: CollectionConfig = {
  slug: 'province-name',
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
      name: 'section-title',
      type: 'text',
      // required: false,
      localized: true,
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
      name: 'videoPosts',
      type: 'relationship',
      relationTo: 'videoPosts',
      hasMany: true,
    },
  ],
}
