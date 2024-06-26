import { useUI } from "$store/sdk/useUI.ts";
import type { CallToUsItem } from "$store/components/header/Header.tsx";
import type { IconsHeader } from "$store/components/header/Header.tsx";

function ServiceMenu(
  { callToUsItem, iconsHeader }: {
    callToUsItem: CallToUsItem[];
    iconsHeader: IconsHeader;
  },
) {
  const {
    displayOverlay,
    displayServiceMenu,
    displaySearchbar,
    displayOverlayServiceMenu,
  } = useUI();

  return (
    <>
      <div class="hidden lg:block relative z-30">
        <button
          class="lg:ml-7.5"
          aria-label="Atendimento"
          onClick={() => {
            displayOverlayServiceMenu.value = !displayOverlayServiceMenu.value;
            displayOverlay.value = false;
            displayServiceMenu.value = !displayServiceMenu.value;
            displaySearchbar.value = false;
          }}
        >
          <i class={`${iconsHeader?.callToUs || "icon-phone"} lg:text-2.5xl`}>
          </i>
        </button>
        <div
          class={`${
            displayServiceMenu.value
              ? "opacity-1 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } absolute top-14 -left-36 min-w-[240px] bg-white rounded-md shadow-service py-8.5 px-4.5`}
        >
          <div
            class={"w-3 h-3 border-l border-l-[#C7C7CC] border-t border-t-[#C7C7CC] rotate-45 bg-white absolute top-[-7px] right-11"}
          >
          </div>
          <div class="flex flex-col gap-5">
            {callToUsItem.map((item) => (
              <a class="text-sm" href={item.href}>{item.label}</a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceMenu;
