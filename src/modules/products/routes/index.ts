import express from "express";
import type { IProduct, IProductFilter } from "../interfaces";
import { getProducts, getProductById, addProduct, editProduct, deleteProduct, validateProductFields } from "../data";
import { isValidCategory } from "../helpers";
import { ERRORS } from "../../../helpers/errors";

const router = express.Router();

// GET - Get all products with pagination and filtering
router.route("/").get(function (req, res) {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    // Validate limit and offset
    if (limit <= 0) {
      const error = ERRORS.INVALID_LIMIT;
      res.status(error.status).json({ id: error.id, message: error.message });
      return;
    }

    if (offset < 0) {
      const error = ERRORS.NEGATIVE_OFFSET;
      res.status(error.status).json({ id: error.id, message: error.message });
      return;
    }

    const filterBy: IProductFilter = {};

    if (req.query.category) {
      const category = req.query.category as string;
      if (!isValidCategory(category)) {
        const error = ERRORS.INVALID_CATEGORY;
        res.status(error.status).json({ id: error.id, message: typeof error.message === 'function' ? error.message(category) : error.message });
        return;
      }
      filterBy.category = category as any;
    }

    if (req.query.brand) {
      filterBy.brand = req.query.brand as string;
    }

    const result = getProducts(limit, offset, Object.keys(filterBy).length > 0 ? filterBy : undefined);

    // Return 204 No Content if offset is beyond total products
    if (offset >= result.total && result.total > 0) {
      res.status(204).send();
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    const err = ERRORS.INTERNAL_SERVER_ERROR;
    res.status(err.status).json({ id: err.id, message: err.message, error: error.message });
  }
});

// GET - Get a product by ID
router.route("/:id").get(function (req, res) {
  const { id } = req.params;

  const product: IProduct = getProductById(id);

  if (!product) {
    const error = ERRORS.PRODUCT_NOT_FOUND;
    res.status(error.status).json({ id: error.id, message: error.message });
    return;
  }

  res.status(200).json(product);
});

module.exports = router;
