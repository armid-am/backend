import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate-frontend'
import type { CollectionConfig } from 'payload'

const REVALIDATE = {
  tags: ['home'],
}

export const HeroSliderSection: CollectionConfig = {
  slug: 'heroSliderSection',
  admin: {
    useAsTitle: 'videoTitle',
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
      name: 'videoTitle',
      type: 'text',
      // required: true,
      localized: true,
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      hidden: true,
    },
    {
      name: 'videoPosts',
      type: 'relationship',
      relationTo: 'videoPosts',
      // required: true,
    },
  ],
}
