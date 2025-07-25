import { CollectionConfig } from "payload/types";
import { slugField } from "../../fields/slug";
import linkGroup from "../../fields/linkGroup";
const News:CollectionConfig = {
    slug: 'news',
    labels: {
        singular: 'News',
        plural: 'News Articles'
    },
    access: {
        read: () => true
    },
    versions: {
        drafts: true,
    },
    admin: {
        useAsTitle: "title",
        group: 'News'
    },
    hooks: {
        afterChange: [async ({doc, req, previousDoc, operation}) => {
            Promise.all([
                fetch(`${process.env.APP_LIVE_URL}/api/revalidate?path=/news&type=page`,{}),
                fetch(`${process.env.APP_LIVE_URL}/api/revalidate?path=/news/${doc.slug}`,{}),
            ])
        }],
        afterDelete: [async () => {
            await fetch(
                `${process.env.APP_LIVE_URL}/api/revalidate?path=/news`,{
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
            name: 'newsUrl',
            label: 'News Article URL',
            type: 'text',
            required: true,
            admin: {
                condition: (data, siblingData, { user }) => {
                    if (data.external) {
                      return true
                    } else {
                      return false
                    }
                },
            }
        },
        {
            name: 'content',
            label: 'Content',
            type: 'richText',
            required: false,
            admin: {
                condition: (data, siblingData, { user }) => {
                    if (!data.external) {
                      return true
                    } else {
                      return false
                    }
                },
            }
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
        slugField(),
        {
            name: 'external',
            label: 'External News Article',
            type: 'checkbox',
            required: false,
            admin: {
                position: "sidebar"
            }
        },
        {
            name: 'category',
            label: 'Category',
            type: 'relationship',
            relationTo: 'news-category',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: "featuredImage",
            label: "Featured Image",
            type: "upload",
            relationTo: 'media',
            admin: {
                position: "sidebar"
            }
        },
       

    ]

}

export default News