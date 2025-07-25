import { CollectionConfig } from "payload/types";
import { slugField } from "../../fields/slug";
import linkGroup from "../../fields/linkGroup";
const Publications:CollectionConfig = {
    slug: 'publications',
    labels: {
        singular: 'Publication',
        plural: 'Publications'
    },
    access: {
        read: () => true
    },
    versions: {
        drafts: true,
    },
    admin: {
        useAsTitle: "title",
    },
    hooks: {
        beforeValidate: [
            ({data, req, operation}) => {
                console.log('beforeValidate')
                console.log(data)
                const publishDate = new Date(data.publishDate);
                const publishYear = publishDate.getFullYear(); //Adding for easy filters
                data.publishYear = publishYear
                console.log(data)
                return data
            }
        ],
        afterChange: [async ({doc, req, previousDoc, operation}) => {
            Promise.all([
                fetch(`${process.env.APP_LIVE_URL}/api/revalidate?path=/(pages)/publications&type=page`,{}),
            ])
        }],
        afterDelete: [async () => {
            await fetch(
                `${process.env.APP_LIVE_URL}/api/revalidate?path=/(pages)/publications`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        }]
    },
    fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            required: true
        },
        {
            name: 'link',
            label: 'Link',
            type: 'group',
            fields: [{
                type: 'row',
                fields: [{
                    name: 'url',
                    label: 'URL',
                    type: 'text',
                    required: true,
                    admin: {
                        width: '50%',
                    },
                },
                {
                    name: 'label',
                    label: 'Label',
                    type: 'text',
                    required: true,
                    admin: {
                        width: '50%',
                    },
                }]
            }
            ]
        },
        {
            name: 'publishDate',
            label: 'Publish Date',
            type: 'date',
            // defaultValue: 
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
            name: 'publishYear',
            label: 'PublishYear',
            type: 'text',
            required: false,
            admin: {
                hidden:false
            }
        },

    ]

}

export default Publications