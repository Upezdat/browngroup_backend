import { CollectionConfig } from "payload/types";
import { slugField } from "../../fields/slug";
import linkGroup from "../../fields/linkGroup";
const DiagnosticLabs:CollectionConfig = {
    slug: 'diagnostic-labs',
    labels: {
        singular: 'Diagnostic Lab',
        plural: 'Diagnostic Labs'
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
            required: true
        },
        {
            name: 'location',
            label: 'Location',
            type: 'text',
            required: true
        },
        {
            name: 'phone',
            label: 'Phone Number',
            type: 'text',
            required: true,
        },
        {
            name: 'email',
            label: 'Email Address',
            type: 'email',
            required: true,
            
        },
        {
            name: 'website',
            label: 'Website',
            type: 'text',
            required: true,
            
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

export default DiagnosticLabs