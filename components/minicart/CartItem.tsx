import Image from "apps/website/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { AnalyticsEvent } from "apps/commerce/types.ts";
import { sendEvent } from "$store/sdk/analytics.tsx";

// declare global {
//   interface Window {
//     DECO_SITES_STD: {
//       sendAnalyticsEvent: (args: AnalyticsEvent) => void;
//     };
//   }
// }

interface Props {
  index: number;
}

function CartItem({ index }: Props) {
  const { loading, cart, updateItems, mapItemsToAnalyticsItems } = useCart();
  const item = cart.value!.items[index];
  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const {
    imageUrl,
    skuName,
    sellingPrice,
    listPrice,
    name,
    quantity,
  } = item;

  const isGift = sellingPrice < 0.01;

  const notFirst = index > 0 ? "border-t border-t-base-100" : "";

  return (
    <li class={`flex flex-row justify-between items-start ${notFirst}`}>
      <Image
        src={imageUrl.replace("-55-55", "-120-180")}
        alt={skuName}
        width={60}
        height={90}
        class="object-cover object-center my-3 rounded-md"
      />
      <div class="flex-grow p-2.5">
        <span class="text-xs text-[#1B1B1D] whitespace-nowrap">{name}</span>
        <div class="flex flex-col lg:flex-row">
          <div class="flex items-center gap-2 my-3 lg:flex-col lg:items-start ">
            <span class="text-sm text-info font-bold w-25 flex flex-col">
              {listPrice > sellingPrice &&
                (
                  <span class="line-through text-[#636366] text-xs ">
                    {formatPrice(listPrice / 100, currencyCode!, locale)}
                  </span>
                )}
              {isGift
                ? "Grátis"
                : formatPrice(sellingPrice / 100, currencyCode!, locale)}
            </span>
            <span class="text-xs text-info">
              Tamanho: <span class="text-neutral">{name.split(" ").pop()}</span>
            </span>
          </div>
          <div class="max-w-min flex items-center gap-2.5 lg:my-3 lg:h-fit">
            <span class="text-black text-xs">Qtd:</span>
            <QuantitySelector
              disabled={loading.value || isGift}
              quantity={quantity}
              onChange={(quantity) => {
                updateItems({ orderItems: [{ index, quantity }] });
                const quantityDiff = quantity - item.quantity;

                if (!cart.value) return;

                sendEvent({
                  name: quantityDiff < 0 ? "remove_from_cart" : "add_to_cart",
                  params: {
                    items: mapItemsToAnalyticsItems({
                      items: [{
                        ...item,
                        quantity: Math.abs(quantityDiff),
                      }],
                      marketingData: cart.value.marketingData,
                    }),
                  },
                });
              }}
            />
          </div>
        </div>
      </div>
      <Button
        onClick={() => {
          updateItems({ orderItems: [{ index, quantity: 0 }] });
          if (!cart.value) return;
          sendEvent({
            name: "remove_from_cart",
            params: {
              items: mapItemsToAnalyticsItems({
                items: [item],
                marketingData: cart.value.marketingData,
              }),
            },
          });
        }}
        // disabled={loading.value || isGift}
        // loading={loading.value}
        class="btn btn-ghost hover:bg-transparent minicart__remove disable:bg-white"
      >
        <i
          class={`${"icon-close"} text-lg lg:text-xl`}
        >
        </i>
      </Button>
    </li>
  );
}

export default CartItem;
