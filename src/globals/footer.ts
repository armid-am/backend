import { GlobalConfig } from 'payload'
import { revalidateGlobalAfterChange } from '../hooks/revalidate-frontend'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      revalidateGlobalAfterChange({
        tags: ['footer'],
      }),
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'logo',
          fields: [
            {
              name: 'logo',
              type: 'group',
              // required: true,
              fields: [
                {
                  name: 'logo-sub-text',
                  type: 'textarea',
                  // required: true,
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          label: 'foundation',
          fields: [
            {
              name: 'foundation',
              type: 'group',
              // required: true,
              fields: [
                {
                  name: 'foundation-links',
                  relationTo: 'foundationLink',
                  type: 'relationship',
                  hasMany: true,
                },
              ],
            },
          ],
        },
        {
          label: 'gallery',
          fields: [
            {
              name: 'gallery',
              type: 'group',
              // required: true,
              fields: [
                {
                  name: 'gallery-links',
                  relationTo: 'gallery-category',
                  type: 'relationship',
                  hasMany: true,
                },
              ],
            },
          ],
        },
        {
          label: 'subscribe',
          fields: [
            {
              name: 'subscribe',
              type: 'group',
              // required: true,
              fields: [
                {
                  name: 'text',
                  type: 'textarea',
                  // required: true,
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          label: 'bottom-text',
          fields: [
            {
              name: 'bottom-text',
              type: 'group',
              // required: true,
              fields: [
                {
                  name: 'text',
                  type: 'textarea',
                  // required: true,
                  localized: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
