import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate-frontend'
import type { CollectionConfig } from 'payload'

const REVALIDATE = {
  tags: ['home'],
}

export const LogoSlider: CollectionConfig = {
  slug: 'logoSlider',
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
      required: false,
    },
    {
      name: 'logo-image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'url',
      type: 'text',
    },
  ],
}
