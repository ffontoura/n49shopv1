import { useEffect, useState } from "preact/hooks";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";

function Coupon() {
  const { cart, loading, addCouponsToCart } = useCart();
  const marketingData = cart.value?.marketingData;
  const [couponValue, setCouponValue] = useState("");

  const removeCouponToCart = (e: MouseEvent) => {
    e.preventDefault();

    addCouponsToCart({ text: "" });
    setCouponValue("");
  };

  const applyCouponToCart = (e: MouseEvent) => {
    e.preventDefault();

    if (typeof couponValue === "string") {
      const text = couponValue;
      addCouponsToCart({ text });
    }
  };

  useEffect(() => {
    if (marketingData?.coupon) {
      setCouponValue(marketingData?.coupon);
    }
  }, []);

  return (
    <div class="flex justify-between items-center py-2.5 mx-[15px] lg:mx-[25px] border-b border-base-100">
      <span class="text-sm text-info w-1/2">Cupom de Desconto</span>
      <form class="flex w-1/2 justify-end">
        {!marketingData?.coupon && (
          <>
            <input
              id="coupon"
              name="coupon"
              class="w-full text-sm h-8 rounded-md p-2 text-caption font-caption outline-1 outline-[#FDB913] px-2.5 border border-[#C7C7CC]"
              type="text"
              value={couponValue ?? ""}
              placeholder={""}
              onChange={(e: { currentTarget: { value: string } }) =>
                setCouponValue(e.currentTarget?.value)}
            />
            <Button
              class="text-sm w-8 h-8 px-[5px] text-primary bg-transparent border border-primary rounded-md ml-[3px] border-primary text-primary hover:text-white hover:bg-primary hover:opacity-80 transition duration-150"
              type="submit"
              htmlFor="coupon"
              loading={loading.value}
              onClick={applyCouponToCart}
            >
              OK
            </Button>
          </>
        )}
        {marketingData?.coupon && (
          <>
            <div class="flex flex-col text-sm text-right text-info">
              {couponValue}
            </div>
            <button
              class="ml-2.5"
              onClick={(e) => removeCouponToCart(e)}
            >
              <Icon id="XMark" width={15} height={15} strokeWidth={1} />
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default Coupon;
