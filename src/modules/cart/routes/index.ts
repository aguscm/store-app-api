import express from "express";
import { getCartProducts, createPurchase, getPurchasesByUserId } from "../data";
import { requireLogin } from "../../users";
import { ERRORS } from "../../../helpers/errors";

const router = express.Router();

// GET - Get cart products
router.route("/").get(function (req, res) {
  try {
    const rawItems = req.query.items;

    if (!rawItems || typeof rawItems !== "string") {
      const error = ERRORS.EMPTY_CART;
      res.status(error.status).json({ id: error.id, message: error.message });
      return;
    }

    let items;

    try {
      items = JSON.parse(rawItems);
    } catch {
      const error = ERRORS.EMPTY_CART;
      res.status(error.status).json({ id: error.id, message: error.message });
      return;
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      const error = ERRORS.EMPTY_CART;
      res.status(error.status).json({ id: error.id, message: error.message });
      return;
    }

    const hasInvalidItem = items.some((item) => {
      const hasInvalidProductId = !item?.productId || typeof item.productId !== "string";
      const hasInvalidQuantity = typeof item?.quantity !== "number" || item.quantity <= 0 || !Number.isInteger(item.quantity);
      return hasInvalidProductId || hasInvalidQuantity;
    });

    if (hasInvalidItem) {
      const error = ERRORS.EMPTY_CART;
      res.status(error.status).json({ id: error.id, message: error.message });
      return;
    }

    const productIds = items.map((item) => item.productId);

    const validProducts = getCartProducts(productIds);

    if (validProducts.length === 0) {
      const error = ERRORS.EMPTY_CART;
      res.status(error.status).json({ id: error.id, message: error.message });
      return;
    }

    res.status(200).json({ products: validProducts });
  } catch (error) {
    const err = ERRORS.INTERNAL_SERVER_ERROR;
    res.status(err.status).json({ id: err.id, message: err.message, error: error.message });
  }
});

// POST - Purchase products
router.route("/purchase").post(requireLogin, function (req, res) {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      const error = ERRORS.EMPTY_CART;
      res.status(error.status).json({ id: error.id, message: error.message });
      return;
    }

    const hasInvalidItem = items.some((item) => {
      const hasInvalidProductId = !item?.productId || typeof item.productId !== "string";
      const hasInvalidQuantity = typeof item?.quantity !== "number" || item.quantity <= 0 || !Number.isInteger(item.quantity);
      return hasInvalidProductId || hasInvalidQuantity;
    });

    if (hasInvalidItem) {
      const error = ERRORS.EMPTY_CART;
      res.status(error.status).json({ id: error.id, message: error.message });
      return;
    }

    // Get user ID from request (set by requireLogin middleware)
    const userId = (req as any).user.userId;

    // Create purchase
    const purchase = createPurchase(userId, items);

    if (!purchase) {
      const error = ERRORS.EMPTY_CART;
      res.status(error.status).json({ id: error.id, message: error.message });
      return;
    }

    res.status(201).json({
      message: "Purchase completed successfully",
      purchase
    });
  } catch (error) {
    const err = ERRORS.INTERNAL_SERVER_ERROR;
    res.status(err.status).json({ id: err.id, message: err.message, error: error.message });
  }
});

// GET - Get user purchases
router.route("/purchases").get(requireLogin, function (req, res) {
  try {
    // Get user ID from request (set by requireLogin middleware)
    const userId = (req as any).user.userId;

    // Get user purchases
    const purchases = getPurchasesByUserId(userId);

    res.status(200).json({
      purchases,
      total: purchases.length
    });
  } catch (error) {
    const err = ERRORS.INTERNAL_SERVER_ERROR;
    res.status(err.status).json({ id: err.id, message: err.message, error: error.message });
  }
});

module.exports = router;
