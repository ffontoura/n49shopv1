import { useUI } from "$store/sdk/useUI.ts";
import Button from "$store/components/ui/Button.tsx";
import Icon from "../ui/Icon.tsx";

interface Props {
  title: string;
  url: string;
}

function NavigatorShare({ title, url }: Props) {
  const {
    displayModalShare,
  } = useUI();

  const handleClick = () => {
    navigator.share
      ? navigator.share({
        title: title,
        url: url,
      })
      : displayModalShare.value = true;
  };

  return (
    <>
      <button
        class="product__share absolute top-[-30px] right-4 lg:static lg:mt-3 lg:ml-5"
        onClick={handleClick}
        aria-label="Share Product"
      >
        <i class="icon icon-share text-[22px] lg:text-[26px] text-primary"></i>
      </button>
      <div
        class={`${
          displayModalShare.value ? "flex z-[51]" : "hidden"
        } w-full h-screen pointer-events-none fixed top-0 right-0 justify-center items-center `}
      >
        <div class="relative w-[32em] bg-white text-[1rem] p-[1.25em] max-w-[277px] min-h-[153px] rounded pointer-events-auto flex flex-col gap-[25px] justify-center items-center">
          <h3 class="text-[14px] text-[#000]">COMPARTILHE</h3>
          <div class="flex justify-between items-center w-[110px]">
            <a
              href={`javascript: window.open('https://wa.me/?text=${url}', '_blank', 'noopener noreferrer');`}
            >
              <i class="product__social-icon icon icon-whatsapp text-primary text-[22px]" />
            </a>
            <a
              href={`javascript: window.open('https://www.facebook.com/sharer/sharer.php?u=${url}', '_blank', 'noopener noreferrer');`}
            >
              <i class="product__social-link product__social-link--facebook icon icon-facebook text-primary text-[22px]" />
            </a>
            <a
              href={`javascript: window.open('https://www.pinterest.com/sharer/sharer.php?u=${url}', '_blank', 'noopener noreferrer');`}
            >
              <i class="product__social-icon icon icon-pinterest text-primary text-[22px]" />
            </a>
          </div>
          <Button
            class={`btn btn-ghost hover:bg-transparent p-0 absolute top-0 right-[7px] text-[#000] ${"outline-none text-[#636366] focus-visible:outline-none"}`}
            onClick={() => displayModalShare.value = false}
          >
            <Icon id="XMark" width={30} height={30} strokeWidth={1} />
          </Button>
        </div>
      </div>
    </>
  );
}

export default NavigatorShare;
