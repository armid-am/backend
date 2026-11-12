import type { CollectionConfig } from 'payload'

export const EmailMessages: CollectionConfig = {
  slug: 'email-messages',
  access: {
    read: () => true,
    create: () => true,
  },
  admin: {
    components: {
      beforeList: ['@/components/ExportEmailMessagesPDF/index#ExportEmailMessagesPDFButton'],
    },
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
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
      name: 'theme',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
  ],
}
