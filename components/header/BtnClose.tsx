import Icon from "$store/components/ui/Icon.tsx";

function BtnClose() {
  return (
    <label
      aria-label="Close"
      class="fixed right-0 top-2 z-50 hidden opacity-0 transition-all duration-500"
      for="menu"
      onClick={() => {
        const menuPai = document.querySelectorAll<HTMLInputElement>(
          `input[id^="item"]`,
        );
        menuPai.forEach((element) => {
          element.checked = false;
        });
      }}
    >
      <Icon
        id="XMark"
        width={35}
        height={35}
        strokeWidth={1.5}
        class="text-white"
      />
    </label>
  );
}

export default BtnClose;
