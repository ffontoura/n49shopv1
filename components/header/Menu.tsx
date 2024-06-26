import Icon from "$store/components/ui/Icon.tsx";
import type { INavItem } from "./NavItem.tsx";
import type { CallToUsItem } from "./Header.tsx";
import BtnBack from "$store/components/header/BtnBack.tsx";
import BtnClose from "deco-sites/fashion/components/header/BtnClose.tsx";

export interface Props {
  items: INavItem[];
  callToUsItem: CallToUsItem[];
}

function MenuItem({ item, index }: { item: INavItem; index: number }) {
  return (
    <div class="collapse relative duration-500">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .MenuItem${index}:checked ~ .MenuItemChildren {
            left: 0;
          }
          .MenuItem${index}:checked ~ .chevron-icon {
            transform: rotate(-180deg);
          }
    
          .MenuItem${index}:checked ~ .accordion .accordion-body {
            grid-template-rows: 1fr;
          }
        `,
        }}
      />

      <input
        type="checkbox"
        class={`MenuItem${index} hidden`}
        name={`item${index}`}
        id={`item${item.label}`}
      />
      <label
        class="absolute right-0 w-12 h-[46px] z-10"
        for={`item${item.label}`}
      >
      </label>
      {item.children?.length
        ? (
          <Icon
            class="text-neutral absolute -right-1 w-12 chevron-icon top-4 transition-all ease-in-out duration-200"
            strokeWidth={4}
            size={17}
            id="ChevronDown"
          />
        )
        : ""}

      <div class="accordion">
        <div class="accordion-title px-0 py-4 min-h-min">
          {item?.children?.length
            ? (
              <label
                class="w-full block whitespace-nowrap text-sm leading-none"
                href={item.href}
                for={`item${item.label}`}
              >
                {item.label}
              </label>
            )
            : (
              <a
                class="w-full block whitespace-nowrap text-sm leading-none"
                href={item.href}
              >
                {item.label}
              </a>
            )}
        </div>
        {item.children?.length
          ? (
            <div class="accordion-body">
              <div class="accordion-body__overflow">
                <ul class="px-4">
                  <li>
                    <a
                      class="py-4 min-h-min underline w-full block whitespace-nowrap text-sm leading-none"
                      href={item.href}
                    >
                      Ver{" "}
                      <span class="capitalize">
                        {item.label.toLocaleLowerCase()}
                      </span>
                    </a>
                  </li>
                  {item.children?.map((node: INavItem, index: number) => (
                    <li>
                      <MenuItem
                        item={node}
                        index={Number(index.toString() + index.toString())}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
          : ""}
      </div>

      {
        /* {item.children?.length
        ? (
          <div
            class={`-left-full
            MenuItemChildren fixed top-0 transition-all w-[calc(100%-40px)] bg-white z-50 h-full duration-300 ease-linear`}
          >
            <ul class="">
              <BtnBack label={item.label} />
              {item.children?.map((node: INavItem, index: number) => (
                <li class="border-b border-b-[#F2F2F7] px-4">
                  <MenuItem
                    item={node}
                    index={Number(index.toString() + index.toString())}
                  />
                </li>
              ))}
            </ul>
          </div>
        )
        : ""} */
      }
    </div>
  );
}

function Menu({ items, callToUsItem }: Props) {
  return (
    <>
      <input
        type="checkbox"
        class="menuModalCheckbox hidden"
        name="menu"
        id="menu"
      />
      <div
        class={`overlayMenu -left-full fixed top-0 transition-all w-full bg-info opacity-60 z-40 h-full duration-300 ease-linear`}
      />
      <div
        class={`MenuModal -left-full fixed top-0 transition-all w-[calc(100%-40px)] bg-white z-50 h-full duration-300 ease-linear flex flex-col overflow-y-auto pb-8`}
      >
        <BtnClose />
        <ul class={`px-4 w-full flex flex-col`}>
          {items.map((item, index) => (
            <li class="border-b border-b-[#F2F2F7]">
              <MenuItem item={item} index={index} />
            </li>
          ))}
        </ul>

        <ul class="flex w-full flex-col mt-7 bg-white">
          <li>
            <a
              class="flex items-center gap-4 px-4"
              href="/"
            >
              <i class="icon-phone text-xl"></i>
              <span class="text-sm text-[#636366] leading-none">
                ATENDIMENTO
              </span>
            </a>
          </li>
          {callToUsItem.map((item) => (
            <li>
              <a
                class="flex items-center gap-5 px-4 pt-4"
                href={item.label}
              >
                <span class="text-sm leading-none">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Menu;
