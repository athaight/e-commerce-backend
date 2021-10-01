const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
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

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((category_name) => {
    
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
