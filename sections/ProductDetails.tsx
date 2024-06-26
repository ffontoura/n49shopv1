import ProductDetails, {
  MainProps,
  Props,
} from "$store/components/product/ProductDetails.tsx";

function ProductDetailsSection(props: MainProps) {
  return <ProductDetails {...props} />;
}

export default ProductDetailsSection;

export function loader(
  { page, variant, colors, ...props }: Props,
  req: Request,
) {
  return {
    ...props,
    currentUrl: req.url,
    page: page,
    colors: colors,
    variant: variant,
  };
}
