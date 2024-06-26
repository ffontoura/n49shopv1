import Button from "$store/components/ui/Button.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "$store/sdk/useAddToCart.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { useQuickView } from "../../sdk/useQuickView.ts";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
  openPdp: boolean;
  url: string;
  currentUrl: string;
}

function AddToCartButton(
  {
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
    openPdp,
    url,
    currentUrl,
    ...btnProps
  }: Props,
) {
  const {
    displayModalSelectSKU,
    displayModalShare,
  } = useUI();

  const props = useAddToCart({
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
  });

  const { selectedSku } = useQuickView();

  const classBtn =
    "flex cursor-pointer justify-center items-center w-full bg-primary border-none text-white py-3 px-2.5 rounded-md mt-3 hover:bg-primary hover:opacity-80 max-w-[385px]";

  if (openPdp) {
    return (
      <a
        href={url}
        class={classBtn}
      >
        Adicionar à Sacola
      </a>
    );
  }

  if (!selectedSku.value) {
    return (
      <>
        <div
          class={classBtn}
          onClick={() => displayModalSelectSKU.value = true}
        >
          Adicionar à Sacola
        </div>

        <div
          class={`${
            displayModalSelectSKU.value || displayModalShare.value
              ? "opacity-40 pointer-events-all"
              : "pointer-events-none opacity-0"
          } fixed w-full h-screen right-0 top-0 transition-all z-50 ease-linear duration-300 bg-info`}
          onClick={() => {
            displayModalSelectSKU.value = false;
            displayModalShare.value = false;
          }}
        >
        </div>
        <div
          class={`${
            displayModalSelectSKU.value
              ? "flex pointer-events-all"
              : "pointer-events-none hidden"
          } fixed z-[52] fixed w-full h-screen right-0 top-0 flex justify-center items-center`}
          onClick={() => displayModalSelectSKU.value = false}
        >
          <div
            style={{
              animation: displayModalSelectSKU.value
                ? "swal2-show .3s"
                : "swal2-hide .15s forwards",
            }}
            class={`w-[32em] bg-white p-[1.25em] rounded-[.3125em] flex flex-col justify-center items-center`}
          >
            <div class="text-[#f8bb86] border-[.25em] border-[#facea8] w-[5em] h-[5em] rounded-[50%] m-[1.25em_auto_1.875em]">
              <p class="text-[3.75em] text-center relative top-[-10px]">!</p>
            </div>
            <h3 class="text-[#545454] text-[1.125em] mb-[1.25em]">
              Por favor selecione o tamanho desejado!
            </h3>
            <button class="bg-[#000] text-white text-[1.0625em] p-[.625em_2em] m-[.3125em]">
              OK
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <Button
      {
        // data-deco="add-to-cart"s
        ...props
      }
      {...btnProps}
      class={classBtn}
    >
      Adicionar à Sacola
    </Button>
  );
}

export default AddToCartButton;
