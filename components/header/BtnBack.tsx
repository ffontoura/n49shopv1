import Icon from "$store/components/ui/Icon.tsx";

function BtnBack({ label }: { label: string }) {
  return (
    <li
      class="border-b border-b-base-100 bg-[#F2F2F7] py-4 leading-none text-left text-primary text-base px-12"
      onClick={() => {
        const menuPai = document.getElementById(
          `item${label}`,
        ) as HTMLInputElement;
        menuPai.checked = false;
        console.log(menuPai.checked);
      }}
    >
      <Icon
        class="text-primary absolute -left-2 w-12 top-4"
        strokeWidth={1}
        size={17}
        id="ChevronLeft"
      />
      Voltar
    </li>
  );
}

export default BtnBack;
