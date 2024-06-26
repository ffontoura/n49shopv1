import { useSignal } from "@preact/signals";
import Image from "apps/website/components/Image.tsx";
// import Modal from "$store/components/ui/Modal.tsx";

interface Props {
  image: string;
  alternativeText: string;
  index: number;
  width: number;
  height: number;
  aspectRatio: string;
}

function ProductImageZoom(
  { image, alternativeText, width, height, aspectRatio, index }: Props,
) {
  const open = useSignal(false);

  return (
    <>
      <Image
        class="w-[49%] rounded-md cursor-pointer"
        sizes="(max-width: 640px) 100vw, 40vw"
        style={{ aspectRatio: aspectRatio }}
        src={image!}
        alt={alternativeText}
        width={width}
        height={height}
        // Preload LCP image for better web vitals
        preload={index === 0}
        loading={index === 0 ? "eager" : "lazy"}
        onClick={() => open.value = true}
      />
      <div
        onClick={() => open.value = false}
        style={{
          opacity: open.value ? "1" : "0",
          pointerEvents: open.value ? "all" : "none",
        }}
        class={`fixed left-0 top-0 z-50 transition-all duration-700 ease bg-[#ffffffe6] w-full h-full flex justify-center items-center`}
      >
        <div>
          <Image
            class="h-screen w-full"
            sizes="(max-width: 640px) 100vw, 40vw"
            style={{ aspectRatio: aspectRatio }}
            src={image!}
            alt={alternativeText}
            width={width}
            height={height}
            // Preload LCP image for better web vitals
            preload={false}
            loading={"lazy"}
            onClick={() => open.value = false}
          />
        </div>
        <i class="icon icon-close cursor-pointer absolute right-1/4 top-10 text-xl">
        </i>
      </div>
    </>
  );
}

export default ProductImageZoom;
