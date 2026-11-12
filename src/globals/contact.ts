import { GlobalConfig } from 'payload'
import { revalidateGlobalAfterChange } from '../hooks/revalidate-frontend'
//
export const Contact: GlobalConfig = {
  slug: 'contact',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      revalidateGlobalAfterChange({
        tags: ['contact'],
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
          label: 'form',
          fields: [
            {
              name: 'text',
              type: 'text',
              localized: true,
            },
          ],
        },
      ],
    },
  ],
}
