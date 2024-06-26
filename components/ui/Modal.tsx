import Button from "$store/components/ui/Button.tsx";
import { useEffect, useRef } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

import Icon from "./Icon.tsx";

// Lazy load a <dialog> polyfill.
if (IS_BROWSER && typeof globalThis.window.HTMLDialogElement === "undefined") {
  await import(
    "https://raw.githubusercontent.com/GoogleChrome/dialog-polyfill/5033aac1b74c44f36cde47be3d11f4756f3f8fda/dist/dialog-polyfill.esm.js"
  );
}

export type Props = JSX.IntrinsicElements["dialog"] & {
  title?: string;
  mode?: "sidebar-right" | "sidebar-left" | "center";
  onClose?: () => Promise<void> | void;
  loading?: "lazy" | "eager";
  datatype?: "default" | "zoom";
};

const dialogStyles = {
  "sidebar-right": "animate-slide-left",
  "sidebar-left": "animate-slide-right",
  center: "animate-fade-in",
};

const sectionStyles = {
  "sidebar-right": "justify-end",
  "sidebar-left": "justify-start",
  center: "justify-center items-center",
};

const containerStyles = {
  "sidebar-right": "h-full w-full sm:max-w-[455px] sm:min-w-[320px]",
  "sidebar-left": "h-full w-full sm:max-w-lg",
  center: "",
};

const Modal = ({
  open,
  title,
  mode = "sidebar-right",
  onClose,
  children,
  loading,
  datatype = "default",
  ...props
}: Props) => {
  const lazy = useSignal(false);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open === false) {
      if (datatype == "default") {
        document.getElementsByTagName("body").item(0)?.classList.remove(
          "no-scroll",
        );
      }
      ref.current?.open === true && ref.current.close();
    } else if (open === true) {
      if (datatype == "default") {
        document.getElementsByTagName("body").item(0)?.classList.add(
          "no-scroll",
        );
      }
      ref.current?.open === false && ref.current.showModal();
      lazy.value = true;
    }
  }, [open]);

  return (
    <dialog
      {...props}
      ref={ref}
      class={`bg-transparent backdrop-opacity-50 p-0 m-0 max-w-full w-full max-h-full h-full ${
        dialogStyles[mode]
      } ${props.class ?? ""} ${datatype == "zoom" ? "w-screen h-screen" : ""}`}
      onClick={(e) =>
        (e.target as HTMLDialogElement).tagName === "SECTION" && onClose?.()}
      onClose={onClose}
    >
      <section
        class={`w-full h-full flex ${
          datatype == "zoom" ? "bg-[#ffffffe6]" : "bg-[#1c1c1e99]"
        } ${sectionStyles[mode]}`}
      >
        <div
          class={`bg-white relative flex flex-col max-h-full ${
            containerStyles[mode]
          } ${datatype == "zoom" ? "h-full" : ""}`}
        >
          <header
            class={`flex px-4 h-16 justify-between items-center border-b border-base-100 ${
              datatype == "zoom" ? "absolute right-[-25%] top-[20px]" : ""
            }`}
          >
            <h1>
              <span class="text-lg mr-5 text-info">{title}</span>
            </h1>
            <Button
              class={`btn btn-ghost hover:bg-transparent p-0  ${
                datatype == "zoom"
                  ? "outline-none text-[#636366] focus-visible:outline-none"
                  : ""
              }`}
              onClick={onClose}
            >
              <Icon id="XMark" width={30} height={30} strokeWidth={1} />
            </Button>
          </header>
          <div
            class={`flex-grow flex flex-col ${
              datatype == "zoom" ? "" : "overflow-y-auto"
            }`}
          >
            {loading === "lazy" ? lazy.value && children : children}
          </div>
        </div>
      </section>
    </dialog>
  );
};

export default Modal;
