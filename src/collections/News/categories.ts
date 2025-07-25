import { CollectionConfig } from "payload/types";
import { slugField } from "../../fields/slug";
import linkGroup from "../../fields/linkGroup";
const NewsCategories:CollectionConfig = {
    slug: 'news-category',
    labels: {
        singular: 'Category',
        plural: 'Categories'
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
            required: false
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
        slugField()
    ]

}

export default NewsCategories