const getAllProducts = (req, res) => {
  res.status(200).json({ message: req.params.url });
};
const getSingleProducts = (req, res) => {
  res.status(200).json({ message: req.params.url });
};
const createProduct = (req, res) => {
  res.status(200).json({ message: req.params.url });
};
const updateProduct = (req, res) => {
  res.status(200).json({ message: req.params.url });
};
const deleteProduct = (req, res) => {
  res.status(200).json({ message: req.params.url });
};
const postReview = (req, res) => {
  res.status(200).json({ message: req.params.url });
};

exports.getAllProducts = getAllProducts;
exports.getSingleProducts = getSingleProducts;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.postReview = postReview;
