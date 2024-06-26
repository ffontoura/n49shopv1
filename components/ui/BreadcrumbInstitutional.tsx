import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";

export interface Props {
  breadcrumb: string;
}

export default function BreadcrumbInstitutional({ breadcrumb }: Props) {
  return (
    <div class="px-[15px] sm:px-25 max-w-[1920px] mx-auto my-2.5">
      <Breadcrumb
        itemListElement={[
          {
            name: "Institucional",
            item: "/",
            position: 1,
            "@type": "ListItem",
          },
          {
            name: breadcrumb,
            item: "/",
            position: 2,
            "@type": "ListItem",
          },
        ]}
      />
    </div>
  );
}
