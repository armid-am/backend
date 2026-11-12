import { GlobalConfig } from 'payload'
import { revalidateGlobalAfterChange } from '../hooks/revalidate-frontend'

export const Foundation: GlobalConfig = {
  slug: 'foundation',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      revalidateGlobalAfterChange({
        tags: ['foundation', 'updates', 'reports'],
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
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Foundation',
          fields: [
            {
              type: 'tabs',
              tabs: [
                {
                  label: 'tabsTitle',
                  fields: [
                    {
                      name: 'title1',
                      type: 'text',
                      localized: true,
                    },
                    {
                      name: 'title2',
                      type: 'text',
                      localized: true,
                    },
                    {
                      name: 'title3',
                      type: 'text',
                      localized: true,
                    },
                  ],
                },
                {
                  label: 'category-menu',
                  fields: [
                    {
                      name: 'categories-links',
                      type: 'group',
                      localized: true,
                      fields: [
                        {
                          name: 'category-links-title',
                          type: 'relationship',
                          relationTo: 'foundationLink',
                          hasMany: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  label: 'about',
                  fields: [
                    {
                      name: 'about',
                      type: 'group',
                      fields: [
                        {
                          name: 'title',
                          type: 'text',
                          localized: true,
                        },
                        {
                          name: 'description',
                          type: 'textarea',
                          localized: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  label: 'our-mission',
                  fields: [
                    {
                      name: 'project',
                      type: 'group',
                      fields: [
                        {
                          name: 'title',
                          type: 'text',
                          localized: true,
                        },
                        {
                          name: 'first-text',
                          type: 'text',
                          localized: true,
                        },
                        {
                          name: 'second-text',
                          type: 'text',
                          localized: true,
                        },
                        {
                          name: 'image',
                          type: 'upload',
                          relationTo: 'media',
                        },
                        {
                          name: 'posts',
                          type: 'array',
                          fields: [
                            {
                              name: 'before-title',
                              type: 'text',
                              localized: true,
                            },
                            {
                              name: 'title',
                              type: 'text',
                              localized: true,
                            },
                            {
                              name: 'text',
                              type: 'textarea',
                              localized: true,
                            },
                          ],
                        },
                        {
                          name: 'fourth-text',
                          type: 'textarea',
                          localized: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  label: 'strategy',
                  fields: [
                    {
                      name: 'our-activity',
                      type: 'group',
                      fields: [
                        {
                          name: 'title',
                          type: 'text',
                          localized: true,
                        },
                        {
                          name: 'first-text',
                          type: 'textarea',
                          localized: true,
                        },
                        {
                          name: 'second-text',
                          type: 'textarea',
                          localized: true,
                        },
                        {
                          name: 'image-first',
                          type: 'upload',
                          relationTo: 'media',
                        },
                        {
                          name: 'image-second',
                          type: 'upload',
                          relationTo: 'media',
                        },
                        {
                          name: 'image-third',
                          type: 'upload',
                          relationTo: 'media',
                        },
                      ],
                    },
                  ],
                },
                {
                  label: 'film-topics',
                  fields: [
                    {
                      name: 'topics',
                      type: 'group',
                      fields: [
                        {
                          name: 'title',
                          type: 'text',
                          localized: true,
                        },
                        {
                          name: 'posts',
                          type: 'array',
                          fields: [
                            {
                              name: 'title',
                              type: 'text',
                              localized: true,
                            },
                            {
                              name: 'text',
                              type: 'textarea',
                              localized: true,
                            },
                          ],
                        },
                        {
                          name: 'first-text',
                          type: 'textarea',
                          localized: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  label: 'board-of-trustees',
                  fields: [
                    {
                      name: 'board-of-guardians',
                      type: 'group',
                      fields: [
                        {
                          name: 'title',
                          type: 'text',
                          localized: true,
                        },
                        {
                          name: 'board-guardian-users',
                          type: 'relationship',
                          relationTo: 'boardOfGuardianUser',
                          hasMany: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  label: 'team-members',
                  fields: [
                    {
                      name: 'team',
                      type: 'group',
                      fields: [
                        {
                          name: 'title',
                          type: 'text',
                          localized: true,
                        },
                        {
                          name: 'team-users',
                          type: 'relationship',
                          relationTo: 'teamUsers',
                          hasMany: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  label: 'supporters',
                  fields: [
                    {
                      name: 'supporters',
                      type: 'group',
                      fields: [
                        {
                          name: 'title',
                          type: 'text',
                          localized: true,
                        },
                        {
                          name: 'supporters-companies',
                          type: 'relationship',
                          relationTo: 'supportersCompany',
                          hasMany: true,
                        },
                        {
                          name: 'supporters-users',
                          type: 'relationship',
                          relationTo: 'supportersUser',
                          hasMany: true,
                        },
                        {
                          name: 'supporter-author-post',
                          type: 'group',
                          localized: true,
                          fields: [
                            {
                              name: 'author-image',
                              type: 'upload',
                              relationTo: 'media',
                            },
                            {
                              name: 'author-fullName',
                              type: 'text',
                              localized: true,
                            },
                            {
                              name: 'author-top-text',
                              type: 'textarea',
                              localized: true,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Updates',
          fields: [
            {
              name: 'updates',
              type: 'relationship',
              relationTo: 'updates',
              hasMany: true,
            },
          ],
        },
        {
          label: 'Reports',
          fields: [
            {
              name: 'reports',
              type: 'relationship',
              relationTo: 'reports',
              hasMany: true,
            },
          ],
        },
        {
          label: 'right-video',
          fields: [
            {
              name: 'video',
              type: 'group',
              fields: [
                {
                  name: 'video-url',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
