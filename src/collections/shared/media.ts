import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate-frontend'
import type { CollectionConfig } from 'payload'

const MEDIA_REVALIDATE = {
  tags: ['home', 'foundation', 'gallery', 'donation', 'contact'],
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },
  hooks: {
    afterChange: [revalidateAfterChange(MEDIA_REVALIDATE)],
    afterDelete: [revalidateAfterDelete(MEDIA_REVALIDATE)],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      hidden: true,
    },
    {
      name: 'position',
      type: 'select',
      required: false,
      defaultValue: 'center',
      options: [
        {
          label: 'center',
          value: 'center',
        },
        {
          label: 'top',
          value: 'top',
        },
        {
          label: 'bottom',
          value: 'bottom',
        },
        {
          label: 'left',
          value: 'left',
        },
        {
          label: 'right',
          value: 'right',
        },
      ],
    },
  ],
  upload: {
    crop: false,
    focalPoint: false,
  },
}
