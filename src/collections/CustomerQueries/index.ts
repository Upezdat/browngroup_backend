import payload from "payload";
import { CollectionConfig } from "payload/types";
import { slugField } from "../../fields/slug";
import linkGroup from "../../fields/linkGroup";
const CustomerQueries:CollectionConfig = {
    slug: 'customer-queries',
    labels: {
        singular: 'Pack Query',
        plural: 'Pack Queries'
    },
    hooks: {
        afterChange: [
            (({doc, req, previousDoc, operation}) => {
                console.log(req)
                const customerMessage = {
                    to: doc.email,
                    subject: 'Brawn Rare Disease : We Have Recived Your Query',
                    html: `<h5>Hi ${doc.name} <br/> We have succeffuly recieved your email.<h5>`
                }

                const adminMessage = {
                    to: process.env.ADMIN_EMAIL,
                    subject: 'Brawn Rare Disease : We Have Recived Your Query',
                    html: `<p>Hi ${doc.name} <br/><br/> You have recieved a query from the BRAWN website contact form.<p>`
                }

                payload.sendEmail(
                    customerMessage
                )
                payload.sendEmail(
                    adminMessage
                )
                

                
            })
        ]
    },
    access: {
        read: () => true,
        create: ({req , data}) => {
            console.log(data)
            if(process.env.API_TOKEN === req.get('x-api-key')){
                return true 
            }
           return false
        } 
        
    },
    versions: {
        drafts: true,
    },
    
    admin: {
        useAsTitle: "name",
    },
    fields: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            required: true
        },
        {
            name: 'phone',
            label: 'Phone Number',
            type: 'text',
            required: false,
        },
        {
            name: 'state',
            label: 'State',
            type: 'text',
            required: true,
            
        },
        {
            name: 'city',
            label: 'City',
            type: 'text',
            required: true,
            
        },
        {
            name: 'pack',
            label: 'Pack',
            type: 'text',
            required: true,
            
        },
        {
            name: 'message',
            label: 'Message',
            type: 'textarea',
            required: true,
            
        },

    ]

}

export default CustomerQueries