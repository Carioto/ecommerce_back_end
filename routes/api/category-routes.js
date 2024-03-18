const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
   const cateData = await Category.findAll({
    include: [{model:Product}],
   }) 
   res.status(200).json(cateData);
  } catch (err) {
    res.status(500).json(err);
 }
});

router.get('/:id', async (req, res) => {
try{
  const cateData = await Category.findByPk(req.params.id,{
    include:[{model:Product}],
  });
  if (!cateData){
    return res.status(404).json({message:'No tag with that ID exists'});
  }
  res.status(200).json(cateData);
} catch (err) {
  res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
try {
  const newCate = await Category.create(req.body);
  return res.json(newCate);
} catch (err) {
  res.status(500).json(err)
}
});

router.put('/:id', async (req, res) => {
  const upCate = await Category.update(
    {
      category_name: req.body.name
    },
    {
      where: {
        id: req.params.id,
      }
    }
  )
  if (upCate[0] === 0){
    res.status(404).json({message:'No tag with that ID exists'});
    return;
  }
  return res.json(upCate);
});

router.delete('/:id', async (req, res) => {
  try {
    const cateData = await Category.destroy({
      where:{
        id:req.params.id,
      },
    });
    if (!cateData){
      res.status(404).json({message:'That category does not exist'});
      return;
    }
    res.status(200).json(cateData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
