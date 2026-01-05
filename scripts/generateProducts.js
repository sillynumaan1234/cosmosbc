import fs from "fs";
import path from "path";

const PRODUCTS_DIR = path.join(process.cwd(), "public/products");
const OUTPUT_FILE = path.join(process.cwd(), "src/data/products.json");

const products = [];

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const categories = fs.readdirSync(PRODUCTS_DIR);

for (const category of categories) {
  const categoryPath = path.join(PRODUCTS_DIR, category);

  if (!fs.statSync(categoryPath).isDirectory()) continue;

  const files = fs.readdirSync(categoryPath);

  for (const file of files) {
    if (!file.endsWith(".png")) continue;

    const nameWithPrice = file.replace(".png", "");
    const lastSpaceIndex = nameWithPrice.lastIndexOf(" ");

    if (lastSpaceIndex === -1) {
      console.warn(`Skipping invalid filename: ${file}`);
      continue;
    }

    const name = nameWithPrice.substring(0, lastSpaceIndex);
    const price = Number(nameWithPrice.substring(lastSpaceIndex + 1));

    if (isNaN(price)) {
      console.warn(`Invalid price in filename: ${file}`);
      continue;
    }

    products.push({
      id: `${category}-${slugify(name)}-${price}`,
      name,
      price,
      category,
      image: `/products/${category}/${file}`,
    });
  }
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(products, null, 2));

console.log(`✅ Generated ${products.length} products`);