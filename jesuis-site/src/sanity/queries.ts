// Локализованные поля выбираются прямо в GROQ: сначала $locale, затем ru → en → fr
const t = (field: string) =>
  `coalesce(${field}[$locale], ${field}.ru, ${field}.en, ${field}.fr)`;

const image = `{
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip
}`;

const body = (field: string) => `${t(field)}[]{
  ...,
  _type == "image" => {
    ...,
    "url": asset->url,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  }
}`;

export const settingsQuery = `*[_id == "siteSettings"][0]{
  mainProjectStatus,
  mainProjectUrl,
  telegramUrl,
  instagramUrl,
  youtubeUrl,
  email,
  introVideoUrl
}`;

const postCardFields = `
  _id,
  "slug": slug.current,
  "title": ${t("title")},
  "excerpt": ${t("excerpt")},
  publishedAt,
  "cover": coverImage${image}
`;

export const postsQuery = `*[_type == "post" && defined(slug.current)]
  | order(publishedAt desc)[0...$limit]{${postCardFields}}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  ${postCardFields},
  "body": ${body("content")}
}`;

export const otherPostsQuery = `*[_type == "post" && defined(slug.current) && slug.current != $slug]
  | order(publishedAt desc)[0...3]{${postCardFields}}`;

const productCardFields = `
  _id,
  "slug": slug.current,
  category,
  "title": ${t("title")},
  "subtitle": ${t("subtitle")},
  "shortDescription": ${t("shortDescription")},
  status,
  price,
  currency,
  "cover": coverImage${image},
  "coverVideoUrl": coverVideo.asset->url
`;

const productOrder = `order(coalesce(order, 9999) asc, _createdAt desc)`;

export const productsQuery = `*[_type == "product" && defined(slug.current)]
  | ${productOrder}{${productCardFields}}`;

export const featuredProductsQuery = `*[_type == "product" && defined(slug.current) && isFeatured == true]
  | ${productOrder}[0...6]{${productCardFields}}`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0]{
  ${productCardFields},
  "gallery": coalesce(galleryImages[]${image}, []),
  "body": ${body("description")}
}`;
