import Art from "../models/art";

const index = async (req: any, res: any) => {
    try {
      const searchQuery = req.query.search as string | undefined;
      const category = req.query.category as string | undefined;
      let query: any = {};
  
      if (searchQuery) {
        query = { title: { $regex: searchQuery, $options: 'i' } };
      }
      if (category && category !== '') {
        query.category = category;
    }
  
      const result = await Art.find(query).sort({ createdAt: -1 });
  
      res.render("index", { title: "All Arts", arts: result, searchQuery: searchQuery, category:category });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  };

const add_art = (req: any, res: any) => {
    res.render('create', {title: 'Add Art'})
}

const post_art =(req: any, res: any) => {
    const art = new Art(req.body);

    art.save()
        .then((result) => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
}

const art_delete = (req: any, res: any) => {
    const id = req.params.id;
    Art.findByIdAndDelete(id)
        .then((result) => {
            if (!result) {
                res.status(404).send('Art not found');
                return;
            }
            res.json({ redirect: '/' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
}

const art_details = (req: any, res: any) => {
    const id = req.params.id;
    Art.findById(id)
        .then((result) => {
            if (!result) {
                res.status(404).send('Art not found');
                return;
            }
            res.render('details', { title: 'Art Details', art: result });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
}

const update_art = (req:any, res: any) => {
    const id = req.params.id;
    const newData = req.body;
    Art.findByIdAndUpdate(id, newData, {new:true})
        .then((result) => {
            if(!result) {
                res.status(404).send('Art not found');
                return;
            }
            res.redirect('/')
            })
        .catch((err)=> {
            console.log(err);
            res.status(500).send('Internal Server Error')
        })
    }


export default {
    index,
    art_details,
    add_art,
    post_art,
    art_delete,
    update_art
}