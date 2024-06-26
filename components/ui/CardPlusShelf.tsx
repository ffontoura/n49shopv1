import type { Props as ICard } from "$store/components/ui/Card.tsx";
import Card from "$store/components/ui/Card.tsx";

import { Section } from "$live/blocks/section.ts";

export interface Props {
  card: ICard;
  productShelf: Section;
}

function CardPlusShelf(
  { card, productShelf }: Props,
) {
  const { Component, props } = productShelf;
  return (
    <div class="mt-[40px] sm:mt-0 sm:home-container md:my-15 flex flex-col md:flex-row">
      <div class="w-full md:w-1/2">
        <Card {...card} />
      </div>
      <div class="w-full md:w-1/2">
        <Component {...props} />
      </div>
    </div>
  );
}

export default CardPlusShelf;
