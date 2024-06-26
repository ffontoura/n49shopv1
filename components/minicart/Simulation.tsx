import { useEffect, useRef, useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { formatPrice } from "$store/sdk/format.ts";

function Simulation() {
  const {
    cart,
    loading,
    updateItems,
  } = useCart();
  const displayInput = useSignal(false);
  const availableAddresses = cart.value?.shippingData?.availableAddresses;
  const postalCodeInit = availableAddresses
    ? availableAddresses[availableAddresses.length - 1]?.postalCode
    : undefined;
  const shippingPriceInit = cart.value?.totalizers.find((item) =>
    item.id === "Shipping"
  );
  const orderFormId = cart.value?.orderFormId || 0;
  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const item = cart.value?.items[0];
  const [postalCode, setPostalCode] = useState("");
  const [shippingPrice, setShippingPrice] = useState(0);

  const inputRef = useRef(null);

  const forceUpdateMinicart = () => {
    updateItems({ orderItems: [{ index: 0, quantity: item!.quantity }] });
  };

  const toggleInput = () => {
    displayInput.value = !displayInput.value;
  };

  const removeShipping = async (e: MouseEvent) => {
    e.preventDefault();

    const data = {
      address: null,
    };

    try {
      const response = await fetch(
        "/deco/shippingsimulation?id=" + orderFormId,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json",
            "accept": "application/json",
          },
        },
      );

      // const result = await response.json();
      if (response.status == 200) {
        setPostalCode("");
        forceUpdateMinicart();
        toggleInput();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const simulateShipping = async (e: MouseEvent) => {
    e.preventDefault();

    if (typeof cep === "string") {
      const data = {
        address: {
          addressType: "residential",
          postalCode: cep.replace("_", "").replace(".", "").replace(
            "-",
            "",
          ),
          country: "BRA",
        },
      };

      try {
        const response = await fetch(
          "/deco/shippingsimulation?id=" + orderFormId,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "content-type": "application/json",
              "accept": "application/json",
            },
          },
        );

        const result = await response.json();
        setShippingPrice(
          // deno-lint-ignore no-explicit-any
          result.totalizers.find((item: any) => item.id === "Shipping")?.value,
        );
        forceUpdateMinicart();
        toggleInput();
      } catch (error) {
        console.log(error);
      }
    }
  };

  function formatCEP(cep: string) {
    const formattedCep = cep.replace(/\D/g, ""); // Remove caracteres não numéricos
    const mask = "99.999-999";
    let maskedCep = "";

    for (let i = 0, j = 0; i < mask.length; i++) {
      if (mask[i] === "9") {
        maskedCep += formattedCep[j] || "_";
        j++;
      } else {
        maskedCep += mask[i];
      }
    }

    return maskedCep;
  }

  const [cep, setCep] = useState("");
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  const handleInputChange = (event) => {
    let { value } = event.target;
    // Remove todos os caracteres não numéricos
    value = value.replace(/\D/g, "");
    // Limita o tamanho máximo do input para 10 caracteres
    value = value.substring(0, 10);
    // Aplica a máscara (formato: xx.xxx-xxx)
    const maskedValue = value.replace(/(\d{2})(\d{0,3})(\d{0,3})/, "$1.$2-$3");
    // Atualiza o estado com o novo valor formatado
    setCep(maskedValue);
  };

  useEffect(() => {
    if (shippingPriceInit?.value) {
      setShippingPrice(shippingPriceInit.value);
      setPostalCode(postalCodeInit ?? "");
      toggleInput();
    }
  }, []);

  useEffect(() => {
    if (shippingPriceInit?.value) {
      setShippingPrice(shippingPriceInit.value);
    }
  }, [shippingPriceInit?.value]);

  useEffect(() => {
    if (!displayInput.value && inputRef.current) {
      // Obtenha o valor atual do input
      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      const inputValue = inputRef.current.value;

      let position = 0;
      for (let i = 0; i < inputValue.length; i++) {
        if (Number(inputValue[i]) || inputValue[i] == 0) {
          position = i + 1;
        }
      }
      // Coloque o caret no final do valor do input
      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      inputRef.current.setSelectionRange(inputValue.length, position);
    }
  }, [postalCode]);

  return (
    <div class="flex justify-between items-center py-2.5 mx-[15px] lg:mx-[25px] border-b border-base-100">
      <span class="text-sm text-info w-1/2">Calcular Frete</span>
      <form class="flex w-1/2 justify-end">
        {!displayInput.value && (
          <>
            <input
              ref={inputRef}
              id="simulate"
              name="simulate"
              class="w-full hover:placeholder:opacity-100 placeholder:opacity-0 text-sm h-8 rounded-md p-2 text-caption font-caption outline-1 outline-[#FDB913] px-2.5 border border-[#C7C7CC]"
              type="text"
              value={cep}
              maxLength={10}
              placeholder={"__.___-__"}
              // deno-lint-ignore ban-ts-comment
              // @ts-ignore
              onInput={handleInputChange}
            />
            <Button
              class="text-sm w-8 h-8 px-[5px] text-primary bg-transparent border border-primary rounded-md ml-[3px] border-primary text-primary hover:text-white hover:bg-primary hover:opacity-80 transition duration-150"
              type="submit"
              htmlFor="simulate"
              loading={loading.value}
              onClick={simulateShipping}
            >
              OK
            </Button>
          </>
        )}
        {displayInput.value && (
          <>
            <div class="flex flex-col text-sm text-right text-info">
              {formatCEP(cep)}
              <span class="text-primary text-xs font-bold">
                {shippingPrice == 0 ? "grátis" : "+" +
                  formatPrice(shippingPrice / 100, currencyCode!, locale)}
              </span>
            </div>
            <button
              class="ml-2.5"
              onClick={(e) => removeShipping(e)}
            >
              <Icon id="XMark" width={15} height={15} strokeWidth={1} />
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default Simulation;
