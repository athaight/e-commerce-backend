const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Get/Find all categories
router.get('/', (req, res) => {
  Category.findAll({
    include: [
      {model: Product}, {
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
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {model: Product},{
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
router.post('/', (req, res) => {
  // create a new category
    
  Category.create(req.body)
  .then((category) => {
   if (req.body.tagIds.length) {
     const categoryTagIdArr = req.body.tagIds.map((tag_id) => {
       return{
         category_id: category.id,
         tag_id,
       };
     });
     return categoryTagIdArr.bulkCreate(categoryTagIdArr);
   }
   res.status(200).json(category);
  })
  .then((categoryTagIds) => res.status(200).json(categoryTagIds))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
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
   
    const categoryTagIds = categoryTags.map(({ tag_id}) => tag_id);
    
    const newCategoryTags = req.body.tagIds
    .filter((tag_id) => !categoryTagIds.includes(tag_id))
    .map((tag_id) => {
      return {
        category_id: req.params.is,
        tag_id,
      };
    })
    const categoryTagsToRemove = categoryTags
    .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
    .map(({ id }) => id);

    return Promise.all([
      CategoryTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newCategoryTags),
    ]);
})
.then((updatedCategoryTags) => res.json(updatedCategoryTags))
.catch((err) => {
  res.status(400).json(err);
})

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
