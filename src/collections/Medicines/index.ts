import { CollectionConfig } from "payload/types";
import { slugField } from "../../fields/slug";
import linkGroup from "../../fields/linkGroup";
const Medicines:CollectionConfig = {
    slug: 'medicines',
    labels: {
        singular: 'Medicine',
        plural: 'Medicines'
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
    hooks: {
        afterChange: [async ({doc, req, previousDoc, operation}) => {
            // Promise.all([
            //     fetch(`${process.env.APP_LIVE_URL}/api/revalidate?path=/(pages)/brand-portfolio&type=page`,{}),
            //     fetch(`${process.env.APP_LIVE_URL}/api/revalidate?path=/(pages)/patient-assistances/&type=page`,{}),
            // ])
        }],
        afterDelete: [async () => {
            await fetch(
                `${process.env.APP_LIVE_URL}/api/revalidate?path=/(pages)/patient-assistances/[slug]&type=page`,{
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
            name: 'name',
            label: 'Name',
            type: 'text',
            required: false
        },
        {
            name: 'introduction',
            label: 'Introduction',
            type: 'textarea',
            required: false
        },
        {
            name: 'brand',
            label: 'Brand',
            type: 'text',
            required: false,
            admin: {
                position: 'sidebar'
            }
        },
        slugField(),
        {
            name: 'indication',
            label: 'Indication',
            type: 'textarea',
            required: false
        },
        {
            name: 'flavour',
            label: 'Flavour',
            type: 'text',
            required: false
        },

        {
            name: 'dosageDriection',
            label: 'DOSAGE & ADMINISTRATION',
            type: 'richText',
            required: false,
            
        },
        {
            name: 'preparationGuidelines',
            label: 'Preparation Guidelines',
            type: 'richText',
            required: false,
        },
        {
            name: 'packing',
            label: 'Pack Size',
            type: 'textarea',
            required: false
        },
        {
            name: 'dosageForm',
            label: 'Dosage Form',
            type: 'text',
            required: false,
            admin: {
                position:"sidebar"
            }
        },
        {
            name: 'notice',
            label: 'IMPORTANT NOTICE',
            type: 'textarea',
            required: false
        },
        
        {
            name: 'dataCard',
            label: 'Data Card Link',
            type: 'text',
            required: false
        },

        {
            name: 'storage',
            label: 'Storage',
            type: 'textarea',
            required: false
        },
        
        {
            name: 'images',
            label: 'Images',
            type: 'array',
            fields: [
                {
                    name: 'image',
                    label: 'Image',
                    type: 'upload',
                    relationTo: "media",
                }
            ]
        },
        {
            name:'disease',
            label:"Patient Assistance",
            type: 'relationship',
            relationTo: 'diseases',
            required: false,
            admin: {
                position: "sidebar"
            }
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
            name: "featuredImage",
            label: "Featured Image",
            type: "upload",
            relationTo: 'media',
            admin: {
                position: "sidebar"
            }
        }

    ]

}

export default Medicines