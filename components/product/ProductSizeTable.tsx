import { Head } from "$fresh/runtime.ts";

function ProductSizeTable({ category }: { category: string }) {
  if (category != "Acessórios") {
    return (
      <>
        <Head>
          <style
            dangerouslySetInnerHTML={{
              __html: `
                        .szb-vfr-btns {
                            margin: 0 !important;
                            margin-top: 5px !important;
                        }
                        .vfr__button--clean {
                          gap: 3px;
                        }
                        button#szb-chart-button:before, button#szb-vfr-button:before {
                          margin-top: -7px;
                        }
                    `,
            }}
          />
        </Head>
        <div class="content inline--default product__select"></div>
        <script
          defer
          id="sizebay-vfr-v4"
          src="/australCulture_prescript.js"
        />
      </>
    );
  } else {
    return null;
  }
}

export default ProductSizeTable;
