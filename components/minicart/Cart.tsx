import { useCart } from "apps/vtex/hooks/useCart.ts";
import { formatPrice } from "$store/sdk/format.ts";
import Button from "$store/components/ui/Button.tsx";
import { AnalyticsEvent } from "apps/commerce/types.ts";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import CartItem from "./CartItem.tsx";
import Coupon from "./Coupon.tsx";
import Simulation from "./Simulation.tsx";
import Seller from "./Seller.tsx";

import Icon from "../ui/Icon.tsx";

// declare global {
//   interface Window {
//     DECO_SITES_STD: {
//       sendAnalyticsEvent: (args: AnalyticsEvent) => void;
//     };
//   }
// }

const CHECKOUT_URL = "https://austral.vtexcommercestable.com.br/checkout";

function Cart() {
  const { displayCart } = useUI();
  const { cart, loading, mapItemsToAnalyticsItems } = useCart();
  const isCartEmpty = cart.value?.items.length === 0;
  // const totalItems = cart.value?.items.length || 0;
  let quantity = 0;
  cart.value?.items.forEach((item) => quantity += item.quantity);
  const subTotal = cart.value?.totalizers.find((item) => item.id === "Items");
  const total = cart.value?.value;
  const discounts = cart.value?.totalizers.find((item) =>
    item.id === "Discounts"
  );
  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const installmentOptions = cart.value?.paymentData?.installmentOptions.find(
    (item) => item.paymentSystem === "1",
  )?.installments;

  const maxInstallments = installmentOptions?.[installmentOptions.length - 1]
    ?.count;
  const maxValueInstallment = installmentOptions
    ?.[installmentOptions.length - 1]?.value;

  if (cart.value === null) {
    return null;
  }

  // Empty State
  if (isCartEmpty) {
    return (
      <div
        style={{
          right: displayCart.value ? "0" : "",
          pointerEvents: displayCart.value ? "all" : "none",
        }}
        class={`fixed right-[-455px] top-0 z-50 transition-all duration-300 ease-linear flex items-end flex-col h-full ${
          !displayCart.value ? "" : "w-full"
        } sm:max-w-[455px] sm:min-w-[320px]`}
      >
        <div class="bg-white w-full h-full">
          <header
            class={`flex px-4 h-16 justify-between items-center border-b border-base-100`}
          >
            <h1 class="text-lg mr-5 text-info">
              Minha sacola
            </h1>
            <Button
              aria-label="Close"
              class={`btn btn-ghost hover:bg-transparent p-0  ${"outline-none text-[#636366] focus-visible:outline-none"}`}
              onClick={() => displayCart.value = false}
            >
              <Icon id="XMark" width={30} height={30} strokeWidth={1} />
            </Button>
          </header>
          <div class="absolute top-3 left-[30%] bg-white">
            <div class="p-1.5 text-xl relative ml-1 lg:ml-0">
              <span class="bg-primary rounded-full absolute top-1 right-0 text-white rounded-ful text-[10px] px-1.7 py-1 w-4 h-4 flex items-center justify-center">
                {quantity > 9 ? "9+" : quantity}
              </span>
              <i
                class={`${"icon-minicart"} text-lg lg:text-xl`}
              >
              </i>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center h-1/2">
            <span class="text-sm text-info">
              Sua sacola de compras está vazia.
            </span>
            <Button
              class="flex justify-center items-center min-w-[250px] h-[45px] text-xs bg-primary border-none text-white mt-10 py-3 px-2.5 rounded-md hover:opacity-80 transition duration-150"
              aria-label="Continuar comprando"
              onClick={() => {
                displayCart.value = false;
              }}
            >
              Continuar comprando
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        right: displayCart.value ? "0" : "",
        pointerEvents: displayCart.value ? "all" : "none",
      }}
      class={`fixed right-[-455px] top-0 z-50 transition-all duration-300 ease-linear flex items-end flex-col h-full ${
        !displayCart.value ? "" : "w-full"
      } sm:max-w-[455px] sm:min-w-[320px]`}
    >
      <div class="bg-white w-full h-full">
        <header
          class={`flex px-4 h-16 justify-between items-center border-b border-base-100`}
        >
          <h1 class="text-lg mr-5 text-info">
            Minha sacola
          </h1>
          <Button
            aria-label="Close"
            class={`btn btn-ghost hover:bg-transparent p-0  ${"outline-none text-[#636366] focus-visible:outline-none"}`}
            onClick={() => displayCart.value = false}
          >
            <Icon id="XMark" width={30} height={30} strokeWidth={1} />
          </Button>
        </header>
        <div class="absolute top-3 left-[30%] bg-white">
          <div class="p-1.5 text-xl relative ml-1 lg:ml-0">
            <span class="bg-primary rounded-full absolute top-1 right-0 text-white rounded-ful text-[10px] px-1.7 py-1 w-4 h-4 flex items-center justify-center">
              {quantity > 9 ? "9+" : quantity}
            </span>
            <i
              class={`${"icon-minicart"} text-lg lg:text-xl`}
            >
            </i>
          </div>
        </div>
        {/* Cart Items */}
        <div class="overflow-hidden max-h-[calc(100%-460px)] h-full">
          <ul
            role="list"
            class="container-minicart m-[15px] flex-grow overflow-y-auto h-full flex flex-col bg-white pb-5"
          >
            {cart.value.items.map((_, index) => (
              <CartItem index={index} key={index} />
            ))}
          </ul>
        </div>

        {/* Cart Footer */}
        <footer class="shadow-minicart bg-white relative bottom-0 w-full">
          {/* Subtotal */}
          {subTotal?.value && (
            <div class="border-b border-base-100 py-2.5 pt-[45px] flex flex-col justify-end items-end gap-2 mx-4 lg:mx-[25px]">
              <div class="flex justify-between items-center w-full">
                <span class="text-info text-sm">Subtotal</span>
                <span class="text-info text-sm">
                  {formatPrice(subTotal?.value / 100, currencyCode!, locale)}
                </span>
              </div>
            </div>
          )}
          <div class="flex flex-col">
            <Coupon />
            <Seller />
            <Simulation />
          </div>
          {/* Discount */}
          {discounts?.value && (
            <div class="border-b border-base-100 py-2.5 flex flex-col justify-end items-end gap-2 mx-4 lg:mx-[25px]">
              <div class="flex justify-between items-center w-full">
                <span class="text-info text-sm">Descontos</span>
                <span class="text-info text-sm text-neutral">
                  {formatPrice(discounts?.value / 100, currencyCode!, locale)}
                </span>
              </div>
            </div>
          )}
          {/* Total */}
          {total && (
            <div class="border-b border-base-100 py-2.5 flex flex-col justify-end items-end gap-2 mx-4 lg:mx-[25px]">
              <div class="flex justify-between items-center w-full">
                <span class="text-info text-sm">Total</span>
                <span class="flex flex-col text-right text-info text-sm font-bold">
                  {formatPrice(total / 100, currencyCode!, locale)}
                  <span class="font-normal">
                    {"ou " + maxInstallments + "X de " +
                      formatPrice(
                        (maxValueInstallment || 0) / 100,
                        currencyCode!,
                        locale,
                      )}
                  </span>
                </span>
              </div>
            </div>
          )}
          <div class="flex gap-2.5 px-[15px] lg:px-[25px] pb-7.5">
            <a
              class="flex cursor-pointer justify-center items-center w-full h-[45px] bg-transparent border border-primary text-primary py-3 px-2.5 rounded-md mt-3 hover:text-white hover:bg-primary hover:opacity-80 transition duration-150"
              onClick={() => {
                displayCart.value = false;
              }}
            >
              <Button
                aria-label="Continuar Comprando"
                data-deco="buy-button"
                class="w-full text-xs lg:text-base tracking-[.04em] leading-[1]"
                disabled={loading.value || cart.value.items.length === 0}
              >
                Continuar Comprando
              </Button>
            </a>
            <a
              class="flex justify-center items-center w-full h-[45px] bg-primary border-none text-white py-3 px-2.5 rounded-md mt-3 hover:text-info hover:opacity-80 transition duration-150"
              href={`/checkout#/cart`}
            >
              <Button
                data-deco="buy-button"
                aria-label="Finalizar Compra"
                class="w-full text-sm lg:text-base font-bold tracking-[.04em] leading-[1]"
                disabled={loading.value || cart.value.items.length === 0}
                onClick={() => {
                  sendEvent({
                    name: "begin_checkout",
                    params: {
                      currency: cart.value ? currencyCode! : "",
                      value: total
                        ? (total - (discounts?.value ?? 0)) / 100
                        : 0,
                      coupon: cart.value?.marketingData?.coupon ?? undefined,

                      items: cart.value
                        ? mapItemsToAnalyticsItems(cart.value)
                        : [],
                    },
                  });
                }}
              >
                Finalizar Compra
              </Button>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Cart;
