import { CollectionConfig } from "payload/types";
import { slugField } from "../../fields/slug";
import linkGroup from "../../fields/linkGroup";
const Diseases:CollectionConfig = {
    slug: 'diseases',
    labels: {
        singular: 'Patient Assistance',
        plural: 'Patient Assistances'
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
            //     fetch(`${process.env.APP_LIVE_URL}/api/revalidate?path=/patient-assistances/${doc.slug}`,{}),
            // ])
        }],
        afterDelete: [async () => {
            // await fetch(
            //     `${process.env.APP_LIVE_URL}/api/revalidate?path=/(pages)/patient-assistances`,{
            //         method: 'GET',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     }
            // );
        }]
    },
    fields: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true
        },
        {
            name: 'heading',
            label: 'Heading',
            type: 'text',
            required: false,
        },
        {
            name: 'brief',
            label: 'Brief',
            type: 'textarea',
            required: false
        },
        slugField(),
        {
            name: 'redirect',
            label: 'Redirect to contact us page',
            type: 'checkbox',
            required: false,
            admin: {
                position: "sidebar"
            }
        },
        {
            name:"type",
            label:"Therapy Type",
            type: "select",
            options:[
                {
                    value: "medicinal",
                    label: "Medicinal Therapy"
                },
                {
                    value: "nutritional",
                    label: "Nutritional Therapy"
                }
            ],
            required: false,
            admin: {
                position: "sidebar",
            }
        },
        {
            type: 'tabs',
            tabs: [
                    
                    {
                        name: 'about',
                        label: 'About',
                        fields: [
                            {
                                name: 'content',
                                label: 'Content',
                                type: 'richText',
                                required: false
                            },
                            
                        ]
                    },
                    {
                        name: 'medicines',
                        label: 'Medicines',
                        fields: [
                            {
                                name: 'intro',
                                label: 'Intro',
                                type: 'textarea',
                                required: false
                            },
                            {
                                name: 'medicines',
                                label: 'Select Related Medicines/Brand Packs',
                                type:"relationship",
                                relationTo: 'medicines',
                                hasMany: true
                            }
                        ]
                    },
                    {
                        name: 'legalFirms',
                        label: 'Legal advocacy',
                        fields: [
                            {
                                name: 'intro',
                                label: 'Intro',
                                type: 'textarea',
                                required: false
                            },
                            {
                                name: 'legalFirms',
                                label: 'Select Related Legal Firms',
                                type:"relationship",
                                relationTo: 'legal-firms',
                                hasMany: true
                            }
                        ]
                    },
                    {
                        name: 'diagnosticLabs',
                        label: 'Diagnostic Labs',
                        fields: [
                            {
                                name: 'intro',
                                label: 'Intro',
                                type: 'richText',
                                required: false
                            },
                            {
                                name: 'diagnosticLabs',
                                label: 'Select Related Diagnostic Labs',
                                type:"relationship",
                                relationTo: 'diagnostic-labs',
                                hasMany: true
                            }
                        ]
                    },
                    {
                        name: 'news',
                        label: 'Related News',
                        fields: [
                            {
                                name: 'intro',
                                label: 'Intro',
                                type: 'textarea',
                                required: false
                            },
                            {
                                name: 'news',
                                label: 'Select Related News Category',
                                type:"relationship",
                                relationTo: 'news',
                                hasMany: true
                            }
                        ]
                    }
            ],
            admin: {
                condition: (data, siblingData, { user }) => {
                    if (!data.redirect) {
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

export default Diseases