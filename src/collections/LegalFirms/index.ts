import { CollectionConfig } from "payload/types";
import { slugField } from "../../fields/slug";
import linkGroup from "../../fields/linkGroup";
const LegalFirms:CollectionConfig = {
    slug: 'legal-firms',
    labels: {
        singular: 'Legal Firm',
        plural: 'Legal Firms'
    },
    access: {
        read: () => true
    },
    versions: {
        drafts: true,
    },
    admin: {
        useAsTitle: "name",
    },
    fields: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: false
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            required: false
        },
        {
            name: "image",
            label: "Featured Image",
            type: "upload",
            relationTo: 'media',
            admin: {
                position: "sidebar"
            }
        },
        {
            name: 'location',
            label: 'Location',
            type: 'text',
            required: false
        },
        {
            name: 'phone',
            label: 'Phone Number',
            type: 'text',
            required: false,
        },
        {
            name: 'email',
            label: 'Email Address',
            type: 'email',
            required: false,
            
        },
        {
            name: 'website',
            label: 'Website',
            type: 'text',
            required: false,
            
        },
        {
            name: 'createDate',
            label: 'Create Date',
            type: 'date',
            admin: {
                position: 'sidebar',
                date: {
                    displayFormat: 'd MMM yyy',
                  },
            },
            hooks: {
                beforeValidate: [({ value }) => {
                    value = value ? value : new Date();
                    return value
                }],
            },
        },
    ]

}

export default LegalFirms