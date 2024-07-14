import Art from "../models/art";
import { Request, Response } from "express";

interface MulterRequest extends Request {
  files?: Express.Multer.File[];
}

const index = async (req: any, res: any) => {
  try {
    const searchQuery = req.query.search as string | undefined;
    const category = req.query.category as string | undefined;
    const featured =
      req.query.featured === "true" || req.query.featured === "on";
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    const user = req.session.user;
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

    const [arts, totalArts] = await Promise.all([
      Art.find(query).skip(skip).limit(limit),
      Art.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalArts / limit);

    res.render("index", {
      title: "All Arts",
      arts: arts,
      searchQuery: searchQuery,
      category: category,
      featured: featured,
      currentPage: page,
      totalPages: totalPages,
      user: user,
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
  const user = req.session.user;
  res.render("create", {
    title: "Add Art",
    formData: formData,
    errors: errors,
    user: user,
  });
};

// POST ART FUNCTION
const post_art = async (req: any, res: Response) => {
  /* const multerReq = req as MulterRequest; */
  const { description, title, category, medium, dimension, featured } =
    req.body;
  const files: any[] | undefined = req.files;
  const errors: { [key: string]: string } = {};
  const user = req.session.user;

  if (!description) {
    errors["description"] = "* Description is required.";
  }
  if (!title) {
    errors["title"] = "* Title is required.";
  }
  if (!category) {
    errors["category"] = "* Category is required.";
  }
  if (!files || files.length === 0) {
    errors["images"] = "* At least one image is required.";
  }

  if (Object.keys(errors).length > 0) {
    return res.render("create", {
      title: "Add Art",
      errors: errors,
      formData: req.body,
      user: user,
    });
  }

  if (featured !== "yes" && featured !== "no") {
    errors["featured"] = "* Please select either Yes or No for Featured Art.";
  }

  let images: string[] = [];
  if (files) {
    images = files.map((file) => file.path);
  }

  const art = new Art({
    category,
    title,
    medium,
    dimension,
    description,
    images,
    featured: featured === "yes",
  });

  try {
    await art.save();
    req.flash("success", "Art piece added successfully!");
    res.redirect("/admin/arts");
  } catch (err) {
    console.error("Error saving art:", err);
    res.status(500).send("Internal Server Error");
  }
};

// const art_delete = (req: any, res: any) => {
//   const id = req.params.id;
//   Art.findByIdAndDelete(id)
//     .then((result) => {
//       if (!result) {
//         res.status(404).send("Art not found");
//         return;
//       }
//       req.flash('success', 'Art piece deleted successfully!');
//       res.redirect("/admin/arts");
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send("Internal Server Error");
//     });
// };

const art_soft_delete = (req: any, res: any) => {
  const id = req.params.id;
  Art.findByIdAndUpdate(id, { deleted: true })
    .then((result) => {
      if (!result) {
        res.status(404).send("Art not found");
        return;
      }
      req.flash("success", "Art piece deleted!");
      res.redirect("/admin/arts");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
};

const art_hard_delete = (req: any, res: any) => {
  const id = req.params.id;
  Art.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        res.status(404).send("Art not found");
        return;
      }
      req.flash("success", "Art piece permanently deleted!");
      res.redirect("/admin/arts");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
};

const art_recover = (req: any, res: any) => {
  const id = req.params.id;
  Art.findByIdAndUpdate(id, { deleted: false })
    .then((result) => {
      if (!result) {
        res.status(404).send("Art not found");
        return;
      }
      req.flash("success", "Art piece recovered!");
      res.redirect("/admin/arts");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
};

const art_details = (req: any, res: any) => {
  const user = req.session.user;
  const id = req.params.id;
  Art.findById(id)
    .then((result) => {
      if (!result) {
        res.status(404).send("Art not found");
        return;
      }
      res.render("details", { title: "Art Details", art: result, user: user });
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
      req.flash("success", "Art piece updated successfully!");
      res.redirect("/admin/arts");
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
  art_soft_delete,
  art_hard_delete,
  art_recover,
  update_art,
};
