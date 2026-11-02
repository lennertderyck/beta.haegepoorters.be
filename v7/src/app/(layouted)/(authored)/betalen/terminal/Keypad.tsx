"use client";

import Icon from "@/components/basics/Icon/Icon";
import Input from "@/components/basics/Input/Input";
import { FC, useEffect, useState } from "react";

interface Props {}

const Keypad: FC<Props> = () => {
  const [value, setValue] = useState<number>(0);
  const [pressed, setPressed] = useState<Set<string>>(new Set());

  const DECIMALS = 2;

  // Commma addition mode
  // - auto (awlays display 2 decimal places)
  // - manual (user manually inputs the decimal separator)
  const [inputMode, setInputMode] = useState<"auto" | "manual">("manual");

  const factor = inputMode === "auto" ? 10 ** DECIMALS : 1;

  const bindAddValueHandler = (amount: number) => () => {
    setValue((prev) => {
      if (!Number.isInteger(amount) || amount < 0) {
        throw new Error("add() expects a non-negative integer");
      }

      return prev * 10 ** String(amount).length + amount;
    });
  };

  const removeLastValueHandler = () => () => {
    setValue((prev) => {
      if (inputMode === "manual") {
        return Math.floor(prev / 10);
      } else {
        return Math.floor(prev / 10); // In auto mode, we treat the value as cents
      }
    });
  };

  const s = [
    [
      { keyPress: "Digit1", label: "1", onPress: bindAddValueHandler(1) },
      { keyPress: "Digit2", label: "2", onPress: bindAddValueHandler(2) },
      { keyPress: "Digit3", label: "3", onPress: bindAddValueHandler(3) }
    ],
    [
      { keyPress: "Digit4", label: "4", onPress: bindAddValueHandler(4) },
      { keyPress: "Digit5", label: "5", onPress: bindAddValueHandler(5) },
      { keyPress: "Digit6", label: "6", onPress: bindAddValueHandler(6) }
    ],
    [
      { keyPress: "Digit7", label: "7", onPress: bindAddValueHandler(7) },
      { keyPress: "Digit8", label: "8", onPress: bindAddValueHandler(8) },
      { keyPress: "Digit9", label: "9", onPress: bindAddValueHandler(9) }
    ],
    [
      {
        keyPress: "Comma",
        label: inputMode === "manual" ? "," : "",
        onPress: () => {
          if (inputMode === "manual") {
            setWillSetComma(true);
          }
        }
      },
      { keyPress: "Digit0", label: "0", onPress: bindAddValueHandler(0) },
      {
        keyPress: "Delete",
        label: <Icon name="delete-back-line" />,
        onPress: removeLastValueHandler()
      }
    ]
  ];

  useEffect(() => {
    const down = (e: KeyboardEvent) =>
      setPressed((prev) => new Set(prev).add(e.code));

    const up = (e: KeyboardEvent) =>
      setPressed((prev) => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });

    const reset = () => setPressed(new Set());

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", reset);
    };
  }, []);

  const d = inputMode === "auto" ? value / 100 : value;

  const formatCurrency = (cents: number) => {
    const formatted = d.toLocaleString("nl-BE", {
      minimumFractionDigits: inputMode === "auto" ? 2 : 0,
      maximumFractionDigits: inputMode === "auto" ? 2 : 0
    });
    return formatted;
  };

  const formattedCurreny = (value / factor).toFixed(
    inputMode === "auto" ? DECIMALS : 0
  );

  return (
    <div className="w-50">
      <Input
        className="font-serif font-bold text-right mb-4"
        value={formattedCurreny}
        readOnly
      />
      <div data-keys-acive={[...pressed].join(" ")}>
        <div className="flex flex-col gap-4">
          {s.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-4">
              {row.map((col) => (
                <button
                  key={col.keyPress}
                  onClick={col.onPress}
                  className="border border-neutral-100 p-4 aspect-square w-20 rounded-lg active:bg-neutral-100 active:scale-95 transition-transform grid place-items-center"
                >
                  {col.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Keypad;
