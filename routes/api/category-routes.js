const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// Get/Find all categories
router.get("/", (req, res) => {
  Category.findAll({
    include: [
      { model: Product },
      {
        model: Tag,
        through: ProductTag,
      },
    ],
  })
    // be sure to include its associated Products
    .then((products) => res.json(products))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// find one category by its `id` value
router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      { model: Product },
      {
        model: Tag,
        through: ProductTag,
      },
    ],
  })
    // be sure to include its associated Products
    .then((products) => res.json(products))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// TODO working on this section
router.post("/", (req, res) => {
  // create a new category







  Category.create(req.body)
    .then((category) => {
      if (req.body.tagIds.length) {
        const categoryTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            category_id: category.id,
            tag_id,
          };
        });
        return CategoryTag.bulkCreate(categoryTagIdArr);
      }
      res.status(200).json(category);
    })
    .then((categoryTagIds) => res.status(200).json(categoryTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      return CategoryTag.findAll({ where: { category_id: req.params.id } });
    })
    .then((categoryTags) => {
      const categoryTagIds = categoryTags.map(({ tag_id }) => tag_id);

      const newCategoryTags = req.body.tagIds
        .filter((tag_id) => !categoryTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            category_id: req.params.id,
            tag_id,
          };
        });
      const categoryTagsToRemove = categoryTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      return Promise.all([
        CategoryTag.destroy({ where: { id: categoryTagsToRemove } }),
        CategoryTag.bulkCreate(newCategoryTags),
      ]);
    })
    .then((updatedCategoryTags) => res.json(updatedCategoryTags))
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete on category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: "Ah ah ah, Category not found with this id..." });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
