import { GlobalConfig } from 'payload'
import { revalidateGlobalAfterChange } from '../hooks/revalidate-frontend'

export const Gallery: GlobalConfig = {
  slug: 'gallery',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      revalidateGlobalAfterChange({
        tags: ['gallery'],
      }),
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'hero',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
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
            {
              name: 'title',
              type: 'text',
              // required: true,
              localized: true,
            },
          ],
        },
        {
          label: 'left category',
          fields: [
            {
              name: 'galleryCategory',
              type: 'relationship',
              relationTo: 'gallery-category',
              hasMany: true,
            },
          ],
        },
        {
          label: 'top category',
          fields: [
            {
              name: 'topCategory',
              type: 'relationship',
              relationTo: 'category-video',
              hasMany: true,
            },
          ],
        },
      ],
    },
  ],
}
