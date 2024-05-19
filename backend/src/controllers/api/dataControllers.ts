import Art from "../../models/art";

const index = async (req: any, res: any): Promise<void> => {
    try {
        const result = await Art.find().sort({ createdAt: -1});
        res.json(result);
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

export default {
    index,
    featuredArt
};