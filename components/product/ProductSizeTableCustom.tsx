import { Table } from "$store/loaders/ProductSizeTable.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";

export interface ComponentProps {
  /**
   * @default 'Tabela de Medidas'
   */
  titleAction?: string;
  /**
   * @default 'Tabela de Medidas'
   */
  titleModal?: string;
}

interface ComponentSizeTableProps extends ComponentProps {
  table?: Table;
}

export function ProductSizeTableCustom(
  {
    table,
    titleAction = "Tabela de Medidas",
    titleModal = "Tabela de Medidas",
  }: ComponentSizeTableProps,
) {
  if (!table) return null;
  const columns = table.columns;

  const headers = columns.map((col) => col.head);
  const rows = columns[0].values.map((_, rowIndex) =>
    columns.map((col) => col.values[rowIndex])
  );

  return (
    <div class="py-3">
      <button
        class="text-primary text-sm flex items-center gap-1"
        onClick={() =>
          document.querySelector<HTMLDialogElement>("#my_modal_sizetable")
            ?.showModal()}
      >
        <Icon
          id={"Ruler"}
          width={24}
          height={24}
          strokeWidth={1}
          class="text-primary"
        />{" "}
        {titleAction}
      </button>
      <dialog
        id="my_modal_sizetable"
        className="modal"
      >
        <div className="modal-box relative overflow-visible sm:w-11/12 max-w-2xl sm:px-7 sm:pt-6 sm:pb-[42px] rounded-2xl">
          <h3 className="font-bold text-sm sm:text-lg mb-[18px]">{titleModal}</h3>
          <div className="w-full border rounded-lg overflow-hidden">
            <figure class="overflow-x-auto w-full">
              <table class="w-full text-center divide-y divide-gray-200">
                <thead>
                  <tr class="divide-x divide-gray-200">
                    {headers.map((header) => (
                      <th
                        key={header}
                        class="text-xs sm:text-sm text-info font-semibold p-1"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} class="divide-x divide-gray-200">
                      {row.map((value, colIndex) => (
                        <td
                          key={colIndex}
                          class="text-xs sm:text-sm text-info  text-center p-1"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </figure>
          </div>
          <div
            className="w-12 h-12 border-none absolute top-[11px] sm:top-[15px] right-[6px] sm:right-[9px] cursor-pointer"
          >
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn bg-transparent hover:bg-transparent focus:bg-transparent border-none outline-none"
                aria-label="Fechar a tabela de medidas"
              >
                <i class={`icon-close`}></i>
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
