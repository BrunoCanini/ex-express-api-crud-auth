const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const {validationResult} = require("express-validator");

async function index(req, res){
    const filtri = {}
    const {parola, published} = req.query

    if(published){
        const boolpublished = published == "true"
        filtri.published = boolpublished
    }

    if(parola){
        filtri.title= {
            contains: parola
        }
    }

    const data = await prisma.post.findMany({
        where: filtri,
        include: {
            category: true,
            tags: true
        }
    })
    // console.log(data)
    return res.json(data)
}

async function show(req, res){
    
    const slug = req.params.slug;

    const data = await prisma.post.findUnique({
        where: {
            slug: slug,
        },
        include: {
            category: true,
            tags: true
        }
    })

    if(!data){
        throw new Error("not found man");
    }

    return res.json(data);
}

async function store(req, res){
    
    const validation = validationResult(req);

    if(!validation.isEmpty()){
        return res.status(422).json(validation.array())
    }

    const datiIngresso = matchedData(req);

    const newPost = await prisma.post.create({
        data: {
            title: datiIngresso.title,
            slug: datiIngresso.slug,
            image: datiIngresso.image,
            content: datiIngresso.content,
            published: datiIngresso.published,
            category: {
                create: {
                    title: datiIngresso.category,
                }
            },
            tags: {
                create: {
                    title: datiIngresso.tags
                }
            }  
        }
    })

    return res.json(newPost);
}

async function update(req, res){
    
    const slug = req.params.slug;
    const datiIngresso = req.body;

    const post = await prisma.post.findUnique({
        where:{
            slug: slug,
        }
    })

    if(!post){
        throw new Error("Not Found Man")
    }

    const pizzaAggiornata = await prisma.post.update({
        data: datiIngresso,
        where: {
            slug: slug,
        }
    })

    return res.json(pizzaAggiornata);

}

async function destroy(req, res){
    
    await prisma.post.delete({
        where:{
            slug: req.params.slug
        }
    });

    return res.json({message: "post eliminato correttamente"})
}

module.exports= {
    index,
    show,
    store,
    update,
    destroy
}