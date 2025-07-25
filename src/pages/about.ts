import { text } from "express";
import { GlobalConfig } from "payload/types";
import linkGroup from "../fields/linkGroup";
import link from "../fields/link"
const AboutPage:GlobalConfig = {
    slug: 'about',
    label: 'About Page',
    admin: {
        group: 'Page Content'
    },
    // versions:{
    //     drafts: true
    // },
    hooks: {
        afterChange: [async ({doc, req, previousDoc}) => {
            Promise.all([
                fetch(`${process.env.APP_LIVE_URL}/api/revalidate?path=/(pages)/about-us&type=page`,{}),
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
                    name: 'banner',
                    label: 'Banner',
                    fields: [
                        {
                            name: 'heading',
                            label: 'Heading',
                            type: 'text',
                            required: true
                        },
                        {
                            name: 'text',
                            label: 'Text',
                            type: 'textarea',
                            required: true
                        },
                        {
                            name: 'subHeading',
                            label: 'Sub Heading',
                            type: 'text',
                            required: true
                        },
                        {
                            name: 'media',
                            label: 'Banner Image',
                            type: 'upload',
                            relationTo: 'media'
                        },
                        {
                            name: 'bottomText',
                            label: 'Text',
                            type: 'richText',
                            required: true
                        },

                    ]
                },
                {
                    name: 'features',
                    label: 'Features',
                    fields: [
                        {
                            name: 'icons',
                            label: 'Icons',
                            type: 'array',
                            fields: [
                                {
                                    name:'icon',
                                    'label': 'Icon',
                                    type: 'group',
                                    fields: [
                                        {
                                            name: 'icon',
                                            label: 'Icon',
                                            type: 'upload',
                                            relationTo: 'media',
                                            
                                        },
                                        {
                                            name: 'title',
                                            label: 'Title',
                                            type: 'text',
                                            required: true
                                        },
                                       
                                    ]
                                },
                            ]
                        },
                     

                    ]
                },
                {
                    name: 'mdMessage',
                    label: 'MD Message',
                    fields: [
                        {
                            name: 'heading',
                            label: 'Heading',
                            type: 'text',
                            required: true
                        },
                        {
                            name: 'subHeading',
                            label: 'Sub Heading',
                            type: 'text',
                            required: true
                        },
                        {
                            name: 'text',
                            label: 'Text',
                            type: 'richText',
                            required: true
                        },
                        {
                            name: 'image',
                            label: 'Image',
                            type: 'upload',
                            relationTo: 'media',
                            
                        },
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
                    ]
                },
                {
                    name: 'missionVision',
                    label: 'Our Mission & Vision',
                    fields: [
                        {
                            name: 'heading',
                            label: 'Heading',
                            type: 'text',
                            required: true
                        },
                        {
                            name: 'block',
                            label: 'Blocks',
                            type: 'array',
                            fields: [
                                {
                                    name:'block',
                                    label: 'Block',
                                    type: 'group',
                                    fields: [
                                        {
                                            name: 'image',
                                            label: 'Image',
                                            type: 'upload',
                                            relationTo: 'media',
                                            
                                        },
                                        {
                                            name: 'title',
                                            label: 'Title',
                                            type: 'text',
                                            required: true
                                        },
                                        {
                                            name: 'text',
                                            label: 'Text',
                                            type: 'text',
                                            required: true
                                        },
                                       
                                    ]
                                },
                            ]
                        },
                        
                    ]
                },
                {
                    name: 'ourTeam',
                    label: 'Our Team',
                    fields: [
                        {
                            name: 'heading',
                            label: 'Heading',
                            type: 'text',
                            required: true
                        },
                        {
                            name: 'text',
                            label: 'Text',
                            type: 'text',
                            required: true
                        },
                    ]
                },
               
            ]

        }
    ]
}

export default AboutPage