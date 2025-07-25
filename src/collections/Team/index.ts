import { CollectionConfig } from "payload/types";
import { slugField } from "../../fields/slug";
import linkGroup from "../../fields/linkGroup";
const Team:CollectionConfig = {
    slug: 'team',
    labels: {
        singular: 'Member',
        plural: 'Team'
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
            name: 'designation',
            label: 'Designation',
            type: 'text',
            required: true
        },
        {
            name: 'education',
            label: 'Education',
            type: 'text',
            required: true
        },
        {
            name: 'brief',
            label: 'Brief',
            type: 'textarea',
            required: true
        },
        {
            name: 'publishDate',
            label: 'Publish Date',
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
        {
            name: "memberImage",
            label: "Member Image",
            type: "upload",
            relationTo: 'media',
            admin: {
                position: "sidebar"
            }
        }

    ]

}

export default Team