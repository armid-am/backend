import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate-frontend'
import type { CollectionConfig } from 'payload'

const DONORS_REVALIDATE = {
  tags: ['donation'],
}

export const Donors: CollectionConfig = {
  slug: 'donors',
  admin: {
    useAsTitle: 'email',
    components: {
      beforeList: ['@/components/ExportDonorsPDF/index#ExportDonorsPDFButton'],
    },
  },
  orderable: true,
  access: {
    read: () => true,
    create: () => true,
  },
  hooks: {
    afterChange: [revalidateAfterChange(DONORS_REVALIDATE)],
    afterDelete: [revalidateAfterDelete(DONORS_REVALIDATE)],
  },

  fields: [
    {
      name: 'email',
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
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      validate: (value: unknown) => {
        if (typeof value !== 'string') return 'Invalid phone number'
        return /[0-9]/.test(value) ? true : 'Invalid phone number'
      },
      required: true,
    },
    {
      name: 'money',
      type: 'text',
      validate: (value: unknown) => {
        if (typeof value !== 'string') return 'Invalid money value'
        return /[0-9]/.test(value) ? true : 'Invalid money value'
      },
      admin: {
        components: {
          Cell: '@/components/MoneyCell/index#MoneyCell',
        },
      },
      required: true,
    },
    {
      name: 'currency',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'donate',
      type: 'select',
      required: true,
      options: [
        {
          label: 'success',
          value: 'success',
        },
        {
          label: 'fail',
          value: 'fail',
        },
      ],
    },
    {
      name: 'isAnonimous',
      type: 'select',
      required: false,
      defaultValue: 'no',
      options: [
        {
          label: 'yes',
          value: 'yes',
        },
        {
          label: 'no',
          value: 'no',
        },
      ],
    },
  ],
}
