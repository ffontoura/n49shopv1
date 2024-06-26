import { useSignal } from "@preact/signals";

import { normalizePhoneNumber } from "deco-sites/australroupas/sdk/mask.ts";

import { PORTAL_SUBDOMAIN } from "deco-sites/australroupas/constants.ts";

export interface Warning {
  title: string;
  subtitle: string;
}

export interface Input {
  label: string;
  placeholder?: string;
}

export interface Form {
  name: Input;
  telephone: Input;
  email: Input;
  message: Input;
}

export interface Props {
  form: Form;
  button: { title: string };
  warning: Warning;
}

export default function TalToUsForm({ form, button, warning }: Props) {
  const SUBDOMAIN = PORTAL_SUBDOMAIN;

  const name = useSignal("");
  const telephone = useSignal("");
  const email = useSignal("");
  const message = useSignal("");

  const showModal = useSignal(false);

  const inputStyle =
    "text-[12px] rounded-md border-[1px] border-[#C7C7CC] h-10 indent-[10px]";

  function sendMessage() {
    const data = {
      "nome": name.value,
      "telefone": telephone.value,
      "email": email.value,
      "mensagem": message.value,
    };

    const options = {
      "method": "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("/api/dataentities/FC/documents", options)
      .then((response) => {
        if (response.status == 201) {
          showModal.value = true;
        }
      });
  }

  return (
    <>
      <div class="home-container-mobile sm:home-container">
        <form
          class="flex flex-col gap-4 sm:max-w-[898px] mx-auto mt-5 mb-10"
          onSubmit={(e) => {
            sendMessage();
            e.preventDefault();
          }}
        >
          <div class="flex flex-wrap sm:flex-nowrap gap-2.5">
            <div class="flex flex-col gap-[5px] w-full">
              <label htmlFor="name" class="text-[12px] text-[#1C1C1E]">
                {form.name.label}
              </label>
              <input
                type="text"
                id="name"
                class={inputStyle}
                required={true}
                placeholder={form.name.placeholder}
                value={name}
                onChange={(e) =>
                  name.value = (e.target as HTMLInputElement).value}
              />
            </div>
            <div class="flex flex-col gap-[5px] w-full">
              <label htmlFor="telephone" class="text-[12px] text-[#1C1C1E]">
                {form.telephone.label}
              </label>
              <input
                type="text"
                id="telephone"
                class={inputStyle}
                required={true}
                placeholder={form.telephone.placeholder}
                value={telephone}
                maxLength={15}
                onChange={(e) =>
                  telephone.value = normalizePhoneNumber(
                    (e.target as HTMLInputElement).value,
                  )}
              />
            </div>
            <div class="flex flex-col gap-[5px] w-full">
              <label htmlFor="email" class="text-[12px] text-[#1C1C1E]">
                {form.email.label}
              </label>
              <input
                type="text"
                id="email"
                class={inputStyle}
                required={true}
                placeholder={form.email.placeholder}
                value={email}
                onChange={(e) =>
                  email.value = (e.target as HTMLInputElement).value}
              />
            </div>
          </div>
          <div>
            <div class="flex flex-col gap-[5px] w-full">
              <label htmlFor="message" class="text-[12px] text-[#1C1C1E]">
                {form.message.label}
              </label>
              <textarea
                class="text-[12px] rounded-md border-[1px] border-[#C7C7CC] px-2.5 py-[15px] h-[242px]"
                id="message"
                type="text"
                max="1000"
                min="3"
                placeholder={form.message.placeholder}
                style="resize: none;"
                required={true}
                rows={14}
                value={message}
                onChange={(e) =>
                  message.value = (e.target as HTMLInputElement).value}
              >
              </textarea>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row gap-5 justify-between mt-1 sm:mt-10">
            <span class="text-[14px] text-[#636366]">Dados obrigatórios*</span>
            <button
              class="bg-[#5881ca] text-white w-full lg:w-1/5 rounded-md text-base h-10 py-1 p-2.5 hover:opacity-80 cursor-pointer"
              type="submit"
            >
              {button.title}
            </button>
          </div>
        </form>
      </div>
      <div
        class={`${
          showModal.value ? "flex" : "hidden"
        } w-full h-full fixed top-0 left-0 justify-center items-center bg-[#00000066]`}
      >
        <div class="w-full max-w-[500px] bg-white p-4 relative flex flex-col justify-center items-center gap-4">
          <i class="icon icon-check text-[30px] "></i>
          <h4>{warning.title}</h4>
          <span class="text-[12px]">{warning.subtitle}</span>

          <button
            class="text-[40px] absolute top-0 right-0 hover:text-[#f27474] h-10 w-10 flex items-center justify-center font-light transition-all duration-75"
            onClick={() => showModal.value = false}
          >
            ×
          </button>
        </div>
      </div>
    </>
  );
}
