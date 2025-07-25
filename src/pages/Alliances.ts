import { text } from "express";
import { GlobalConfig } from "payload/types";
import linkGroup from "../fields/linkGroup";
import link from "../fields/link"
const AlliancesPage:GlobalConfig = {
    slug: 'alliances',
    label: 'Alliances',
    admin: {
        group: 'Page Content'
    },
    hooks: {
        afterChange: [async ({doc, req, previousDoc}) => {
            Promise.all([
                fetch(`${process.env.APP_LIVE_URL}/api/revalidate?path=/(pages)/alliances&type=page`,{}),
            ])
        }],
    },
    access: {
        read: () => true,
        
    },
    fields: [
        {
            type: "tabs",
            tabs: [
                {
                    name: "intro",
                    label: "Intro", 
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
                            required: true,
                        },
                        {
                            name: 'brief',
                            label: 'Brief',
                            type: 'textarea',
                            required: true
                        },
                    ]
                },
                {
                    name: "international",
                    label: "International Alliances", 
                    fields: [
                        {
                            name: 'text',
                            label: 'Intro',
                            type: 'richText',
                            required: true
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
                            name:'aboutVifalo',
                            label: "About Vifalo",
                            type: 'richText'
                        }
                    ]
                },
                {
                    name: "gallery",
                    label: "Gallery", 
                    fields: [
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
                    ]
                },
                {
                    name: "domestic",
                    label: "Domestic Alliances", 
                    fields: [
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
                    ]
                }
            ]
        }
        
        
    ]
}

export default AlliancesPage