import Button from "../ui/Button.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
}

const QUANTITY_MAX_VALUE = 100;

// Remove default browser behavior: https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp
// TODO: Figure out how to add it via tailwind config.
const innerStyle = `
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
`;

function QuantitySelector({ onChange, quantity, disabled, loading }: Props) {
  const decrement = () => onChange?.(Math.max(0, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  return (
    <div class="form-control">
      <div class="input-group">
        <Button
          class="btn-square w-[31px] h-[26px] text-[8px] text-info border border-primary rounded-tl-md rounded-bl-md"
          onClick={decrement}
          disabled={disabled}
          loading={loading}
        >
          <i class="icon icon-minus"></i>
        </Button>
        <input
          class="input bg-white text-center disable:bg-white text-xs px-0 w-[30px] h-[26px] text-accent"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          max={QUANTITY_MAX_VALUE}
          min={1}
          value={quantity}
          // disabled={disabled}
          onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
        />
        <Button
          class="btn-square w-[31px] h-[26px] text-[8px] text-info border border-primary rounded-tl-md rounded-bl-md"
          onClick={increment}
          disabled={disabled}
          loading={loading}
        >
          <i class="icon icon-plus"></i>
        </Button>
      </div>
    </div>
  );
}

export default QuantitySelector;
