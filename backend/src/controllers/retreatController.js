const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllRetreats = async(req,res)=>{
    try{
        const {filter , location , page=1 , limit=100 , search} = req.query;

        const parsedPage = parseInt(page);
        const parsedLimit = parseInt(limit);
        
        const where = {
            AND :[
                filter ? {title : {contains : filter , mode : 'insensitive'}} : {},
                location ? {location : {contains : location , mode :'insensitive'}} : {},
                search ?{
                    OR :[
                        {title : {contains : search , mode : 'insensitive'} },
                        {location : {contains : search , mode : 'insensitive'} },
                    ]
                } :{}
            ]
        }

        const retreats = await prisma.retreat.findMany({
            where ,
            skip : (parsedPage - 1) * parsedLimit ,
            take : parsedLimit 
        })

        res.status(200).json(retreats);
    }catch(err){
        console.log("Error :" , err)
        res.status(500).json({message : "Internal server Error"});
    }
}

const getRetreatById = async(req,res)=>{
    try{
        const retreat = await prisma.retreat.findUnique({
            where : {id : parseInt(req.params.id)}
        })
        res.status(200).json(retreat);

    }catch(err){
        res.status(500).json({message : "Internal server Error"});
    }
}

module.exports={getAllRetreats , getRetreatById};