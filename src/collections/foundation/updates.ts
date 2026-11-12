import { notifySubscribers } from '@/hooks/notify-subscribers'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate-frontend'
import type { CollectionConfig } from 'payload'

const UPDATES_REVALIDATE = {
  tags: ['foundation', 'home'],
}

export const Updates: CollectionConfig = {
  slug: 'updates',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [notifySubscribers, revalidateAfterChange(UPDATES_REVALIDATE)],
    afterDelete: [revalidateAfterDelete(UPDATES_REVALIDATE)],
  },
  fields: [
    {
      name: 'keyword',
      type: 'text',
      required: false,
    },
    {
      name: 'title',
      type: 'text',
      required: false,
      localized: true,
    },
    {
      name: 'date',
      type: 'date',
      required: false,
    },
    {
      name: 'province',
      type: 'text',
      required: false,
      localized: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'image',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'video',
          fields: [
            {
              name: 'url',
              type: 'text',
            },
          ],
        },
      ],
      required: false,
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      localized: true,
    },
    {
      name: 'posts',
      type: 'blocks',
      blocks: [
        {
          slug: 'images',
          labels: { singular: 'Image', plural: 'Images' },
          fields: [
            {
              name: 'images',
              type: 'relationship',
              relationTo: 'media',
              hasMany: true,
            },
          ],
        },
        {
          slug: 'video',
          labels: { singular: 'Video', plural: 'Video' },
          fields: [
            {
              name: 'url',
              type: 'text',
            },
          ],
        },
        {
          slug: 'text',
          labels: { singular: 'Text', plural: 'Texts' },
          fields: [
            {
              name: 'text',
              type: 'textarea',
              localized: true,
            },
          ],
        },
        {
          slug: 'title',
          labels: { singular: 'Title', plural: 'Titles' },
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          slug: 'quote',
          labels: { singular: 'Quote', plural: 'Quotes' },
          fields: [
            {
              name: 'quote',
              type: 'textarea',
              localized: true,
            },
          ],
        },
      ],
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'send notification to subscribers',
      },
    },
  ],
}
