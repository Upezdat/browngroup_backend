import { text } from "express";
import { GlobalConfig } from "payload/types";
import linkGroup from "../fields/linkGroup";
import link from "../fields/link";
const HomeGlobal:GlobalConfig = {
    slug: 'home',
    label: 'Home Page',
    admin: {
        group: 'Page Content'
    },
    // versions:{
    //     drafts: true
    // },
    hooks: {
        afterChange: [async ({doc, req, previousDoc}) => {
            Promise.all([
                fetch(`${process.env.APP_LIVE_URL}/api/revalidate?path=/(pages)&type=page`,{}),
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
                            name: 'media',
                            label: 'Background Video',
                            type: 'upload',
                            relationTo: 'media'
                        },
                        link(),

                    ]
                },
                {
                    name: 'introduction',
                    label: 'Introduction',
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
                            name: 'images',
                            label: 'Images',
                            type: 'group',
                            fields: [
                                {
                                    type: 'row',
                                    fields: [
                                        {
                                            name: 'imageOne',
                                            label: 'First Image',
                                            type: 'upload',
                                            relationTo: 'media',
                                            admin: {
                                                width: '33.33%'
                                            }
                                        },
                                        {
                                            name: 'imageTwo',
                                            label: 'Second Image',
                                            type: 'upload',
                                            relationTo: 'media',
                                            admin: {
                                                width: '33.33%'
                                            }
                                        },
                                        {
                                            name: 'imageThree',
                                            label: 'Third Image',
                                            type: 'upload',
                                            relationTo: 'media',
                                            admin: {
                                                width: '33.33%'
                                            }
                                        },
                                    ]
                                },
                            ]
                        },
                        link(),

                    ]
                },
                {
                    name: 'challenge',
                    label: 'Challenge',
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
                            type: 'textarea',
                            required: true
                        },
                    ]
                },
                {
                    name: 'whyBrawn',
                    label: 'Why Brawn',
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
                        link(),
                        {
                            name: 'iconBoxes',
                            label: 'Icon Boxes',
                            type: 'group',
                            fields: [
                                {
                                    type: 'row',
                                    fields: [
                                        {
                                            name: 'iconBoxOne',
                                            label: 'First Icon Box',
                                            type: "group",
                                            admin: {
                                                width: '33.33%'
                                            },
                                            fields: [
                                                {
                                                    name: 'icon',
                                                    label: 'Icon',
                                                    type: 'upload',
                                                    relationTo: 'media',
                                                    required: true
                                                },
                                                {
                                                    name: 'title',
                                                    label: "Title",
                                                    type: "text",
                                                    required: true
                                                },
                                                {
                                                    name: 'text',
                                                    label: 'Text',
                                                    type: 'textarea',
                                                    required: true
                                                }
                                            ]
                                        },
                                        {
                                            name: 'iconBoxTwo',
                                            label: 'Second Icon Box',
                                            type: "group",
                                            admin: {
                                                width: '33.33%'
                                            },
                                            fields: [
                                                {
                                                    name: 'icon',
                                                    label: 'Icon',
                                                    type: 'upload',
                                                    relationTo: 'media',
                                                    required: true
                                                },
                                                {
                                                    name: 'title',
                                                    label: "Title",
                                                    type: "text",
                                                    required: true
                                                },
                                                {
                                                    name: 'text',
                                                    label: 'Text',
                                                    type: 'textarea',
                                                    required: true
                                                }
                                            ]
                                        },
                                        {
                                            name: 'iconBoxThree',
                                            label: 'Third Icon Box',
                                            type: "group",
                                            admin: {
                                                width: '33.33%'
                                            },
                                            fields: [
                                                {
                                                    name: 'icon',
                                                    label: 'Icon',
                                                    type: 'upload',
                                                    relationTo: 'media',
                                                    required: true
                                                },
                                                {
                                                    name: 'title',
                                                    label: "Title",
                                                    type: "text",
                                                    required: true
                                                },
                                                {
                                                    name: 'text',
                                                    label: 'Text',
                                                    type: 'textarea',
                                                    required: true
                                                }
                                            ]
                                        }
                                    ]
                                },
                            ]
                        },
                    ]
                },
                {
                    name: 'mission',
                    label: 'Our mission and vision',
                    fields: [
                        {
                            name: 'heading',
                            label: 'Heading',
                            type: 'text',
                            required: true
                        },
                        {
                            
                            type: 'row',
                            fields:[
                                {
                                    name: 'leftText',
                                    label: 'Left Text',
                                    type: 'textarea',
                                    required: true,
                                    admin: {
                                        width: '50%'
                                    }
                                },
                                {
                                    name: 'rightText',
                                    label: 'Right Text',
                                    type: 'textarea',
                                    required: true,
                                    admin: {
                                        width: '50%'
                                    }
                                },
                            ]
                        }
                    ]
                },
                {
                    name: 'therapyFocus',
                    label: 'Therapy Focus',
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
                            type: 'textarea',
                            required: true,
                        },
                       link(),
                       {
                        name:'bgImage',
                        label: "Background Image",
                        type: "upload",
                        relationTo: "media"
                    }
                    ]
                },
                {
                    name: 'newsArticles',
                    label: 'News Article',
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
                            type: 'textarea',
                            required: true,
                        },
                    ]
                },
                {
                    name: 'partnerWithUs',
                    label: 'Partner With US',
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
                        
                        link(),
                        {
                            name:'bgImage',
                            label: "Background Image",
                            type: "upload",
                            relationTo: "media"
                        }
                    ]
                },
            ]

        }
    ]
}

export default HomeGlobal