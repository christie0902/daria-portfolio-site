import Art from "../../models/art";

const index = async (req: any, res: any): Promise<void> => {
    const category = req.query.category;
    const page = parseInt(req.query.page) ?? 1;
    const pageSize = parseInt(req.query.pageSize) || 8;


    try {
        const query = category && category !== 'all' ? {category} : {};
        const skip = (page - 1) * pageSize;


        const totalCount = await Art.countDocuments(query);
        const totalPages = Math.ceil(totalCount / pageSize); 

        const result = await Art.find(query, {deleted:false})
                                .skip(skip)
                                .limit(pageSize)
                                // .sort({ createdAt: -1 });
            

        res.json({ arts: result, totalPages: totalPages });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error")
    }
}

const featuredArt = async (req: any, res: any): Promise<void> => {
    try {
        const result = await Art.find({featured: true}, {deleted:false}).sort({ createdAt: -1});
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error")
    }
}

const loadDetails = async (req: any, res: any): Promise<void> => {
    const id = req.params.id;
    try {
        const art = await Art.findById(id);
        res.json(art);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error')
    }
}



export default {
    index,
    featuredArt,
    loadDetails
};