import { GlobalConfig } from 'payload'
import { revalidateGlobalAfterChange } from '../hooks/revalidate-frontend'

export const Home: GlobalConfig = {
  slug: 'home',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      revalidateGlobalAfterChange({
        tags: ['home'],
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
              // required: true,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  // required: true,
                  localized: true,
                },
                {
                  name: 'videoModal',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'slider',
          fields: [
            {
              name: 'slider',
              type: 'group',
              // required: true,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  // required: true,
                  localized: true,
                },
                {
                  name: 'heroSliderSection',
                  type: 'relationship',
                  relationTo: 'heroSliderSection',
                  hasMany: true,
                  // required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'map',
          fields: [
            {
              name: 'map',
              type: 'group',
              // required: true,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  // required: true,
                  localized: true,
                },
                {
                  name: 'provinceNames',
                  type: 'relationship',
                  relationTo: 'province-name',
                  hasMany: true,
                  // required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'image-logo-slider',
          fields: [
            {
              name: 'image-logo-slider',
              type: 'group',
              // required: true,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  // required: true,
                  localized: true,
                },
                {
                  name: 'logoSlider',
                  type: 'relationship',
                  relationTo: 'logoSlider',
                  hasMany: true,
                  // required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'updates',
          fields: [
            {
              name: 'updates',
              type: 'group',
              // required: true,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  // required: true,
                  localized: true,
                },
                {
                  name: 'text',
                  type: 'textarea',
                  // required: true,
                  localized: true,
                },
                {
                  name: 'updates',
                  type: 'relationship',
                  relationTo: 'updates',
                  hasMany: true,
                  // required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
