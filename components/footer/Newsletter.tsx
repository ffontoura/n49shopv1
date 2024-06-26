import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { useState } from "preact/compat";

export interface Props {
  title?: string;
  subtitle?: string;
  description?: string;
  placeholderName?: string;
  placebolderEmail?: string;
  textSubmitButton?: string;
  /**
   * @format color
   * @description Will be a readable tone of button if not specified
   */
  colorButton?: string;
  successText?: string;
  errorText?: string;
}

function Newsletter({
  title,
  subtitle,
  description,
  placeholderName,
  placebolderEmail,
  textSubmitButton,
  colorButton,
  successText,
  errorText,
}: Props) {
  const [visibility, setVisibility] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [messageResult, setMessageResult] = useState("");

  const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();

    const data = {
      firstName: firstName,
      email: email,
    };

    const response = await fetch("/deco/newsletter", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        "accept": "application/json",
      },
    });

    const result = await response.json();

    if (response.status == 201) {
      setShowSuccess(true);
      setEmail("");
      setFirstName("");
      setMessageResult("");
    } else {
      setShowSuccess(false);
      if (result?.Message == "duplicated entry") {
        setMessageResult("e-mail já cadastrado");
      } else {
        setMessageResult("Erro ao enviar informações");
      }
    }
    setVisibility(true);
  };

  return (
    <div class="max-w-3xl lg:mx-auto bg-white lg:flex border-t border-t-[#E4E4EA] p-6 lg:px-25">
      <div class="flex flex-col lg:w-2/5 gap-2.5 mb-2.5 px-4.5 lg:px-0">
        <span class="text-black text-sm uppercase">
          {title ? title : "Newsletter"}
        </span>
        <h1 class="text-black lg:text-1.5xl text-base font-bold tracking-wider">
          {subtitle ? subtitle : "Cadastre-se na nossa newsletter"}
        </h1>
        <p class="text-black text-xs">
          {description
            ? description
            : "Cadastre-se e ganhe 10%OFF em sua primeira compra"}
        </p>
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        class="flex flex-col items-center lg:flex-row lg:w-3/5 gap-2.5 px-4.5 mb-2.5 lg:px-0"
      >
        <input
          class="outline-none bg-white lg:w-2/5 rounded-md indent-2.5 border border-[#AEAEB2] w-full h-10 text-sm placeholder:text-sm placeholder:indent-2.5"
          required
          type="text"
          name="name"
          id="name"
          placeholder={placeholderName ? placeholderName : "Nome"}
          onChange={(e) =>
            setFirstName((e?.target as HTMLTextAreaElement).value)}
          value={firstName}
        />
        <input
          class="outline-none bg-white lg:w-2/5 rounded-md indent-2.5 border border-[#AEAEB2] w-full h-10 text-sm placeholder:text-sm placeholder:indent-2.5"
          required
          type="email"
          name="email"
          id="email"
          placeholder={placebolderEmail ? placebolderEmail : "E-mail"}
          onChange={(e) => setEmail((e?.target as HTMLTextAreaElement).value)}
          value={email}
        />
        <input
          class="text-white w-full lg:w-1/5 rounded-md text-base h-10 py-1 p-2.5 hover:opacity-80 cursor-pointer"
          style={{ backgroundColor: colorButton }}
          type="submit"
          value={textSubmitButton ? textSubmitButton : "Enviar"}
        />
      </form>
      <div
        class={`${
          visibility ? "flex" : "hidden"
        } justify-center items-center overflow-y-hidden fixed inset-0 z-50`}
        style={{ backgroundColor: "rgba(0,0,0,.4)" }}
      >
        <div
          class={`bg-white w-[32em] flex flex-col justify-center items-center p-5 relative`}
        >
          <div
            class="absolute top-3 right-3"
            onClick={() => setVisibility(false)}
          >
            <i class={`icon-close text-base text-black hover:text-[#f27474]`}>
            </i>
          </div>
          {showSuccess
            ? (
              <>
                <i class={`icon-check text-3xl text-neutral`}></i>
                <h4 class="text-base mt-4.5 mb-5 text-black">
                  {successText ? successText : "Cadastro realizado com sucesso"}
                </h4>
              </>
            )
            : (
              <>
                <i class={`icon-warning text-3xl text-neutral`}></i>
                <h4 class="text-base mt-4.5 mb-5 text-black">
                  {errorText ? errorText : "Ocorreu um erro!"}
                </h4>
              </>
            )}
          {messageResult
            ? <span class="text-xs text-black">{messageResult}</span>
            : <></>}
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
