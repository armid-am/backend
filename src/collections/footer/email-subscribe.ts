import type { CollectionConfig } from 'payload'

export const EmailSubscribe: CollectionConfig = {
  slug: 'email-subscribe',
  access: {
    create: () => true,
    read: () => true,
  },
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        if (!data?.email) return data

        const existing = await req.payload.find({
          collection: 'email-subscribe',
          where: {
            email: {
              equals: data.email,
            },
          },
        })

        if (existing.docs.length > 0) {
          throw new Error('Этот email уже подписан')
        }

        return data
      },
    ],
  },
  admin: {
    components: {
      beforeList: ['@/components/ExportEmailSubscribePDF/index#ExportEmailSubscribePDFButton'],
    },
  },
  fields: [
    {
      name: 'email',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'locale',
      type: 'text',
      required: false,
      defaultValue: 'hy',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'phone',
      type: 'text',
      unique: true,
      required: true,
    },
  ],
}
