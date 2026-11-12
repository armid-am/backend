import { GlobalConfig } from 'payload'
import { revalidateGlobalAfterChange } from '../hooks/revalidate-frontend'

export const Donation: GlobalConfig = {
  slug: 'donation',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      revalidateGlobalAfterChange({
        tags: ['donation'],
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
              name: 'hero',
              type: 'group',
              required: true,
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
                  required: false,
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          label: 'form',
          fields: [
            {
              name: 'form-text',
              type: 'textarea',
              required: false,
              localized: true,
            },
          ],
        },
        {
          label: 'donors',
          fields: [
            {
              name: 'donors',
              type: 'array',
              required: false,
              fields: [
                {
                  name: 'donor',
                  type: 'relationship',
                  relationTo: 'donors',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
