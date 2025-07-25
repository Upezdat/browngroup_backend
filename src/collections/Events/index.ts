import { CollectionConfig } from "payload/types";
import { slugField } from "../../fields/slug";
import linkGroup from "../../fields/linkGroup";
const Events:CollectionConfig = {
    slug: 'events',
    labels: {
        singular: 'Event',
        plural: 'Events'
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
        afterChange: [async ({doc, req, previousDoc, operation}) => {
            Promise.all([
                fetch(`${process.env.APP_LIVE_URL}/api/revalidate?path=/events&type=page`,{}),
            ])
        }],
        afterDelete: [async () => {
            await fetch(
                `${process.env.APP_LIVE_URL}/api/revalidate?path=/events&type=page`,{
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
            name: 'discription',
            label: 'Discription',
            type: 'textarea',
            required: false
        },
        {
            name: 'url',
            label: 'URL',
            type: 'text',
            required: false,
            admin: {
                width: '100%',
            },
        },
        {
            name: 'location',
            label: 'Event Location',
            type: 'text',
            required: true,
            admin: {
                position: 'sidebar',
            },
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
            name: 'eventStartDate',
            label: 'Event Start Date',
            type: 'date',
            required: true,
            admin: {
                position: 'sidebar',
                date: {
                    displayFormat: 'd MMM yyy',
                  },
            },
        },
        {
            name: 'eventDate',
            label: 'Event Date',
            type: 'text',
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: "featuredImage",
            label: "Featured Image",
            type: "upload",
            relationTo: 'media',
            required: false,
            admin: {
                position: "sidebar"
            }
        }

    ]

}

export default Events