import { text } from "express";
import { GlobalConfig } from "payload/types";
import linkGroup from "../fields/linkGroup";
import link from "../fields/link"
const TherapyFocusPage:GlobalConfig = {
    slug: 'therapyFocus',
    label: 'Therapy Focus',
    admin: {
        group: 'Page Content'
    },
    // versions:{
    //     drafts: true
    // },
    hooks: {
        afterChange: [async ({doc, req, previousDoc}) => {
            Promise.all([
                fetch(`${process.env.APP_LIVE_URL}/api/revalidate?path=/(pages)/therapy-focus&type=page`,{}),
            ])
        }],
    },
    access: {
        read: () => true,
        
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
            required: true,
        },
        {
            name: 'brief',
            label: 'Brief',
            type: 'textarea',
            required: true
        },
        {
            name: 'text',
            label: 'Text',
            type: 'richText',
            required: true
        },
        {
            name: 'medicinalTherapy',
            label: 'Medicinal therapy brief',
            type: 'textarea',
            required: true
        },
        {
            name:'medicinalTherapyDisease',
            label:"Medicinal Patient Assistance",
            type: 'relationship',
            relationTo: 'diseases',
            required: true,
            hasMany: true
           
        },
        {
            name: 'nutritionalTherapy',
            label: 'Nutritional therapy brief',
            type: 'textarea',
            required: true
        },
        {
            name:'nutritionalTherapyDisease',
            label:"Nutritional Patient Assistance",
            type: 'relationship',
            relationTo: 'diseases',
            required: true,
            hasMany: true
        },

    ]
}

export default TherapyFocusPage