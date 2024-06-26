import { useEffect, useState } from "preact/hooks";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import { useSignal } from "@preact/signals";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";

function Seller() {
  const {
    cart,
    loading,
    sendAttachment,
  } = useCart();
  const displayInput = useSignal(false);
  const marketingData = cart.value?.marketingData;
  const openTextField = cart.value?.openTextField;
  const [sellerCode, setSellerCode] = useState("");
  const [nameSeller, setNameSeller] = useState("");

  const toggleInput = () => {
    displayInput.value = !displayInput.value;
  };

  const removeSeller = (e: MouseEvent) => {
    e.preventDefault();

    sendAttachment({ attachment: "openTextField", body: { value: "" } });
    sendAttachment({
      attachment: "marketingData",
      body: { utmiCampaign: "semcodigo" },
    });

    setSellerCode("");
    setNameSeller("");
    toggleInput();
  };

  const editSeller = (e: MouseEvent) => {
    e.preventDefault();

    setSellerCode(nameSeller);
    toggleInput();
  };

  const sellerVerification = async (e: MouseEvent) => {
    e.preventDefault();

    if (typeof sellerCode === "string") {
      const response = await fetch(
        "/deco/searchseller?id=" + sellerCode,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "accept": "application/json",
          },
        },
      );

      const result = await response.json();

      if (result.length) {
        if (result[0].status) {
          setNameSeller(result[0].nome);
          sendAttachment({
            attachment: "openTextField",
            body: { value: result[0].nome },
          });
          sendAttachment({
            attachment: "marketingData",
            body: { utmiCampaign: result[0].codigo },
          });
          toggleInput();
        }
      }
    }
  };

  useEffect(() => {
    // deno-lint-ignore no-explicit-any
    if (marketingData?.utmiCampaign && (openTextField as any)?.value) {
      setSellerCode(marketingData?.utmiCampaign);
      // deno-lint-ignore no-explicit-any
      setNameSeller((openTextField as any)?.value);
      toggleInput();
    }
  }, []);

  return (
    <div class="flex justify-between items-center py-2.5 mx-[15px] lg:mx-[25px] border-b border-base-100">
      <span class="text-sm text-info w-1/2">Código do Vendedor</span>
      <form class="flex w-1/2 justify-end">
        {!displayInput.value && (
          <>
            <input
              id="coupon"
              name="coupon"
              class="w-full text-sm h-8 rounded-md p-2 text-caption font-caption outline-1 outline-[#FDB913] px-2.5 border border-[#C7C7CC]"
              type="text"
              value={sellerCode ?? ""}
              placeholder={""}
              onChange={(e: { currentTarget: { value: string } }) =>
                setSellerCode(e.currentTarget?.value)}
            />
            <Button
              class="text-sm w-8 h-8 px-[5px] text-primary bg-transparent border border-primary rounded-md ml-[3px] border-primary text-primary hover:text-white hover:bg-primary hover:opacity-80 transition duration-150"
              type="submit"
              htmlFor="coupon"
              loading={loading.value}
              onClick={sellerVerification}
            >
              OK
            </Button>
          </>
        )}
        {displayInput.value && (
          <>
            <div class="flex flex-col justify-center text-sm lg:text-xs text-right text-[#636366]">
              {nameSeller}
            </div>
            <button
              class="group ml-2.5 text-sm w-8 h-8 px-[5px] text-primary bg-transparent border border-primary rounded-md border-primary text-primary hover:text-white hover:bg-primary hover:opacity-80 transition duration-150"
              onClick={(e) => editSeller(e)}
            >
              <i
                class={`${"icon icon-edit"} text-xs text-primary group-hover:text-white`}
              >
              </i>
            </button>
            <button
              class="ml-2.5 text-sm w-8 h-8 px-[5px] text-primary bg-transparent border border-primary rounded-md border-primary text-primary hover:text-white hover:bg-primary hover:opacity-80 transition duration-150"
              onClick={(e) => removeSeller(e)}
            >
              <Icon
                id="XMark"
                width={17}
                height={17}
                strokeWidth={1}
                class="mx-auto"
              />
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default Seller;
