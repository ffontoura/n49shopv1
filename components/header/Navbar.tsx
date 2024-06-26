import Searchbar from "$store/islands/HeaderSearchbar.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import MyAccountButton from "$store/islands/MyAccountButton.tsx";
import Menu from "$store/components/header/Menu.tsx";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";
import NavItem from "./NavItem.tsx";

import ServiceMenu from "$store/islands/ServiceMenu.tsx";
import type { INavItem } from "./NavItem.tsx";
import type { CallToUsItem } from "./Header.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { IconsHeader } from "$store/components/header/Header.tsx";

function Navbar({ items, searchbar, logo, callToUsItem, iconsHeader }: {
  items: INavItem[];
  searchbar: SearchbarProps;
  logo: LiveImage;
  callToUsItem: CallToUsItem[];
  iconsHeader: IconsHeader;
}) {
  return (
    <div class="flex flex-row justify-between items-center w-full px-1.5 bg-white relative z-50 h-[58px] 2xl:position-unset lg:h-[auto] lg:mx-auto lg:max-w-3xl lg:border-b lg:border-base-200 lg:px-4 xl:px-25 lg:max-h-[97px]">
      <div class="hidden lg:block absolute w-full h-full left-0 bg-white z-30" />

      <div class="lg:hidden">
        <Buttons variant="menu" iconsHeader={iconsHeader} />
        <Menu items={items} callToUsItem={callToUsItem} />

        <Buttons variant="search" iconsHeader={iconsHeader} />
      </div>

      <a href="/" aria-label="Store logo" class="block px-4 py-3 z-30">
        <Image
          src={logo}
          alt={"Austral - Loja Oficial"}
          width={150}
          height={44}
          class="object-cover object-center w-[120px] lg:w-[150px]"
          preload={false}
        />
      </a>

      <ul class="containerNavItems hidden lg:flex justify-center 2xl:ml-20 z-30">
        {items.map((item, index) => <NavItem item={item} index={index} />)}
      </ul>

      <div
        class={`overlayNavItems h-0 opacity-0 z-20 fixed bg-info right-full left-0 top-0 w-full transition-all duration-300 ease-linear`}
      />

      <div class="flex-none flex items-center justify-end gap-2 relative z-30">
        <Searchbar searchbar={searchbar} />
        <div class="hidden lg:block">
          <Buttons
            variant="search"
            searchDesktop={true}
            iconsHeader={iconsHeader}
          />
        </div>

        <ServiceMenu callToUsItem={callToUsItem} iconsHeader={iconsHeader} />

        <div class="z-30">
          <MyAccountButton />
          <Buttons variant="cart" iconsHeader={iconsHeader} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
