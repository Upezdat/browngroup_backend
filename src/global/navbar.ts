import { text } from "express";
import { GlobalConfig } from "payload/types";
import linkGroup from "../fields/linkGroup";
import link from "../fields/link"
const NavMenu:GlobalConfig = {
    slug: 'navMenu',
    label: 'Menu',
    admin: {
        group: 'Global Settings'
    },
    // versions:{
    //     drafts: true
    // },
    hooks: {
        afterChange: [async ({doc, req, previousDoc}) => {
           
        }],
    },
    access: {
        read: () => true,
        
    },
    fields: [
        {
            name: 'portfolio',
            label: 'Brand Portfolio',
            type:"relationship",
            relationTo: 'medicines',
            hasMany: true
        },
        {
            name: 'patientAssistances',
            label: 'Patient Assistances',
            type:"relationship",
            relationTo: 'diseases',
            hasMany: true
        }
    ]
}

export default NavMenu