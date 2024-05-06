const Art = require("../models/art");

const index = (req, res) => {
  Art.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Arts", arts: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
};

const add_art = (req, res) => {
    res.render('create', {title: 'Add Art'})
}

const post_art =(req, res) => {
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

const art_delete = (req, res) => {
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

const art_details = (req, res) => {
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

module.exports = {
    index,
    art_details,
    add_art,
    post_art,
    art_delete
}