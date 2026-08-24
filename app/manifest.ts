import type {MetadataRoute} from "next"

export default function manifest():MetadataRoute.Manifest{
    return {
        name:"Koraa - Apprends ta langue maternelle facilement",
        short_name:"Koraa",
        description:"Apprends le ghomala et d'autres langues maternelles africaines, avec l'anglais comme langue pont. 100% gratuit, 100% hors ligne.",
        start_url:"/fr",
        display:"standalone",
        orientation:"portrait",
        background_color:"#ffffff",
        theme_color:"",
        lang:"fr-FR",
        icons:[
            {
                src:"/brand/logo.png",
                sizes:"512x512",
                type:"image/png",
                purpose:"any",
            },{
                src:"/brand/logo.png",
                sizes:"192x192",
                type:"image/png",
                purpose:"maskable"
            },
        ]
        
        
    }
}