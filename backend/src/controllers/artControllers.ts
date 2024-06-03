import Art from "../models/art";
import { Request, Response } from 'express';

interface MulterRequest extends Request {
  files?: Express.Multer.File[];
}

const index = async (req: any, res: any) => {
  try {
    const searchQuery = req.query.search as string | undefined;
    const category = req.query.category as string | undefined;
    const featured =
      req.query.featured === "true" || req.query.featured === "on";
    let query: any = {};

    if (searchQuery) {
      query = { title: { $regex: searchQuery, $options: "i" } };
    }
    if (category && category !== "") {
      query.category = category;
    }
    if (featured) {
      query.featured = true;
    }

    const result = await Art.find(query).sort({ createdAt: -1 });

    res.render("index", {
      title: "All Arts",
      arts: result,
      searchQuery: searchQuery,
      category: category,
      featured: featured,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};


// ADD ART FORM
const add_art = (req: any, res: any) => {
  const formData = {};
  const errors = {};
  res.render("create", { title: "Add Art", formData: formData, errors: errors });
};

// POST ART FUNCTION
const post_art = async (req: Request, res: Response) => {
  const multerReq = req as MulterRequest;
  const { description, title, category, medium, dimension, featured } = multerReq.body;
  const errors: { [key: string]: string } = {};

  if (!description) {
    errors["description"] = "* Description is required.";
  }
  if (!title) {
    errors["title"] = "* Title is required.";
  }
  if (!category) {
    errors["category"] = "* Category is required.";
  }
  if (!multerReq.files || multerReq.files.length === 0) {
    errors["images"] = "* At least one image is required.";
  }

  if (Object.keys(errors).length > 0) {
    return res.render("create", { title: "Add Art", errors: errors, formData: multerReq.body });
  }

  if (featured !== "yes" && featured !== "no") {
    errors["featured"] = "* Please select either Yes or No for Featured Art.";
  }

  let images: string[] = [];
  if (multerReq.files) {
    images = multerReq.files.map((file: Express.Multer.File) => file.filename);
  }

  const art = new Art({
    category,
    title,
    medium,
    dimension,
    description,
    images,
    featured: featured === "yes"
  });

  try {
    await art.save();
    req.flash('success', 'Art piece added successfully!');
    res.redirect("/arts");
  } catch (err) {
    console.error("Error saving art:", err);
    res.status(500).send("Internal Server Error");
  }
};

const art_delete = (req: any, res: any) => {
  const id = req.params.id;
  Art.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        res.status(404).send("Art not found");
        return;
      }
      req.flash('success', 'Art piece deleted successfully!');
      res.redirect("/arts");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
};

const art_details = (req: any, res: any) => {
  const id = req.params.id;
  Art.findById(id)
    .then((result) => {
      if (!result) {
        res.status(404).send("Art not found");
        return;
      }
      res.render("details", { title: "Art Details", art: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
};

const update_art = (req: any, res: any) => {
  const id = req.params.id;
  const newData = req.body;
  Art.findByIdAndUpdate(id, newData, { new: true })
    .then((result) => {
      if (!result) {
        res.status(404).send("Art not found");
        return;
      }
      req.flash('success', 'Art piece updated successfully!');
      res.redirect("/arts");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
};

export default {
  index,
  art_details,
  add_art,
  post_art,
  art_delete,
  update_art,
};
