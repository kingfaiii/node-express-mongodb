const { z } = require('zod');

const productReview = z.object({
  user: z.string(),
  name: z.string().min(1),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().min(5, { message: 'Must be at least 5 characters' }),
});

exports.createProduct = z.object({
  productName: z
    .string()
    .min(1, { message: 'This Field is Required' })
    .trim()
    .toLowerCase(),
  productDescription: z.string().min(1, { message: 'This Field is Required' }),
  isActive: z.boolean().default(true),
  inventoryStock: z.coerce
    .number()
    .int()
    .min(0, { message: 'Stock Cannot Be Lower Than 0' }),
  price: z.coerce
    .number()
    .positive({ message: 'Price Should be greater than 0' }),
  productCategories: z
    .array(z.string().min(1, { message: 'This Field is Required' }))
    .default([]),
  productVariants: z.array(z.string()).default([]),
  mainImage: z
    .string()
    .trim()
    .toLowerCase()
    .url({ message: 'Invalid Image URL' }),
  imageGallery: z.array(z.string().url()).default([]),
  imageAlt: z.string().optional().default('Product Images'),
  sku: z.string().optional(),
  slug: z.string().toLowerCase().trim().optional(),
  brand: z
    .string()
    .min(1, { message: 'Your Product Needs a Brand Name' })
    .toLowerCase(),
  isFeatured: z.boolean().default(false),
  reviews: z.array(productReview).default([]),
  rating: z.number().default(0),
  numReviews: z.number().default(0),
});
