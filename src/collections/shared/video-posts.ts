import { notifySubscribers } from '@/hooks/notify-subscribers'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate-frontend'
import type { CollectionConfig } from 'payload'

const VIDEO_POSTS_REVALIDATE = {
  tags: ['gallery', 'home', 'foundation'],
}

export const VideoPosts: CollectionConfig = {
  slug: 'videoPosts',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [notifySubscribers, revalidateAfterChange(VIDEO_POSTS_REVALIDATE)],
    afterDelete: [revalidateAfterDelete(VIDEO_POSTS_REVALIDATE)],
  },
  fields: [
    {
      name: 'keyword',
      type: 'text',
    },
    {
      name: 'date',
      type: 'date',
      required: false,
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'address',
      type: 'text',
      localized: true,
    },
    // {
    //   name: 'category',
    //   type: 'relationship',
    //   relationTo: 'category-video',
    // },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      hidden: true,
    },
    {
      name: 'url-youtube-vudeo',
      type: 'text',
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
