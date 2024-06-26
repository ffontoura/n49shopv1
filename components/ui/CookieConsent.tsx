import Button from "$store/components/ui/Button.tsx";
import { useId } from "preact/hooks";
import Icon from "./Icon.tsx";

const script = (id: string) => {
  const callback = () => {
    const KEY = "store-cookie-consent";
    const ACCEPTED = "accepted";
    const HIDDEN = "translate-y-[200%]";

    const consent = localStorage.getItem(KEY);
    const elem = document.getElementById(id);

    if (consent !== ACCEPTED && elem) {
      const accept = elem.querySelector("[data-button-cc-accept]");
      accept && accept.addEventListener("click", () => {
        localStorage.setItem(KEY, ACCEPTED);
        elem.classList.add(HIDDEN);
      });
      const close = elem.querySelector("[data-button-cc-close]");
      close &&
        close.addEventListener("click", () => elem.classList.add(HIDDEN));
      elem.classList.remove(HIDDEN);
    }
  };

  addEventListener("scroll", callback, { once: true });
};

function CookieConsent() {
  const id = `cookie-consent-${useId()}`;

  return (
    <>
      <div
        id={id}
        class="transform-gpu translate-y-[200%] transition fixed bottom-0 w-screen z-50"
      >
        <div class="max-w-[1312px] sm:mx-auto sm:rounded-[6px_6px_0px_0px] py-[25px] px-5 flex flex-col sm:flex-row gap-[30px] items-start sm:items-center bg-white shadow-cookieconsent">
          <span class="flex justify-between sm:justify-start sm:gap-[15px] pt-[20px] sm:pt-0 items-center flex-grow text-xs text-info leading-[1.4]">
            <i class="icon icon-info">
              <svg
                class="text-primary"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="#5881CA"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                  fill="#5881CA"
                >
                </path>
                <path
                  d="M8.49931 5.10909H11.1033L10.6693 11.5071H8.93331L8.49931 5.10909ZM9.80131 15.0211C9.41864 15.0211 9.09664 14.8998 8.83531 14.6571C8.58331 14.4051 8.45731 14.1018 8.45731 13.7471C8.45731 13.3924 8.58331 13.0984 8.83531 12.8651C9.08731 12.6224 9.40931 12.5011 9.80131 12.5011C10.1933 12.5011 10.5153 12.6224 10.7673 12.8651C11.0193 13.0984 11.1453 13.3924 11.1453 13.7471C11.1453 14.1018 11.0146 14.4051 10.7533 14.6571C10.5013 14.8998 10.184 15.0211 9.80131 15.0211Z"
                  fill="#5881CA"
                >
                </path>
              </svg>
            </i>
            <p class="max-w-[80%] mr-[30px]">
              Políticas alteradas. Para sua maior segurança, atualizamos as{" "}
              <a
                href="/institucional/politica-de-privacidade"
                class="text-primary underline"
              >
                Políticas de Privacidade
              </a>{" "}
              e{" "}
              <a
                class="text-primary underline"
                href="/institucional/termo-de-uso"
              >
                Termos de Uso do site
              </a>.{" "}
              <br />Ao continuar navegando nele, entendemos que você está ciente
              e de acordo com elas.
            </p>
          </span>

          <div class="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
            <Button
              data-button-cc-accept
              aria-label="Ok, Entendi"
              class="flex justify-center items-center mx-auto w-[190px] text-xs sm:text-base bg-primary border-none text-white h-10 rounded-md hover:opacity-80 transition duration-150 sm:mr-[60px]"
            >
              Ok, Entendi
            </Button>
            <Button
              data-button-cc-close
              aria-label="Close cookie consent"
              class="absolute top-1 right-1 sm:relative sm:top-0 sm:right-0"
            >
              <Icon id="XMark" width={30} height={30} strokeWidth={1.5} />
            </Button>
          </div>
        </div>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: `(${script})("${id}");` }}
      />
    </>
  );
}

export default CookieConsent;
