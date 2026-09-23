import {
  createStorefrontApiClient,
  type StorefrontApiClient,
} from "@shopify/storefront-api-client";
import { placeholderProducts } from "@/lib/products";
import type { Product } from "@/types/product";

const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const publicAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

let client: StorefrontApiClient | null = null;

function getClient() {
  if (!storeDomain || !publicAccessToken) {
    return null;
  }

  if (!client) {
    client = createStorefrontApiClient({
      storeDomain,
      publicAccessToken,
      apiVersion: "2026-01",
    });
  }

  return client;
}

export async function getAllProducts(): Promise<Product[]> {
  const shopify = getClient();

  if (!shopify) {
    return placeholderProducts;
  }

  // TODO: Replace placeholder data with a typed Storefront API products query.
  // const { data } = await shopify.request(PRODUCTS_QUERY);
  // return mapShopifyProducts(data.products.nodes);
  return placeholderProducts;
}

export async function getProductByHandle(
  handle: string,
): Promise<Product | null> {
  const shopify = getClient();

  if (!shopify) {
    return (
      placeholderProducts.find((product) => product.handle === handle) ?? null
    );
  }

  // TODO: Replace placeholder lookup with a typed productByHandle query.
  // const { data } = await shopify.request(PRODUCT_BY_HANDLE_QUERY, {
  //   variables: { handle },
  // });
  // return mapShopifyProduct(data.productByHandle);
  return placeholderProducts.find((product) => product.handle === handle) ?? null;
}

export async function createCart() {
  const shopify = getClient();

  if (!shopify) {
    return { id: "local-placeholder-cart", checkoutUrl: "/cart" };
  }

  // TODO: Add Shopify cartCreate mutation and return the real cart payload.
  return { id: "local-placeholder-cart", checkoutUrl: "/cart" };
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number,
) {
  const shopify = getClient();

  if (!shopify) {
    return {
      id: cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    };
  }

  // TODO: Add Shopify cartLinesAdd mutation using cartId, variantId, and quantity.
  return {
    id: cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  };
}
