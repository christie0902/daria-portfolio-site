import Art from "../../models/art";

const index = async (req: any, res: any): Promise<void> => {
    const category = req.query.category;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 8;


    try {
        const query = category && category !== 'all' ? {category} : {};
        const skip = (page - 1) * pageSize;


        const totalCount = await Art.countDocuments(query); // Count total documents matching the query
        const totalPages = Math.ceil(totalCount / pageSize); // Calculate total pages

        const result = await Art.find(query)
                                .sort({ createdAt: -1 })
                                .skip(skip)
                                .limit(pageSize);

        res.json({ arts: result, totalPages: totalPages });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error")
    }
}

const featuredArt = async (req: any, res: any): Promise<void> => {
    try {
        const result = await Art.find({featured: true}).sort({ createdAt: -1});
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