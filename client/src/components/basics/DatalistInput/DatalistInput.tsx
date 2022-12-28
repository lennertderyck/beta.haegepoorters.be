import {FC, useRef, useState} from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { usePopper } from "react-popper";
import { FormControlField } from "../../../types/forms";
import BaseInput from "../Input/BaseInput";
import { ListSuggestion } from "../Input/Input.types";
import InputSuggestionList from "../Input/InputSuggestionList/InputSuggestionList";
import styles from "./DatalistInput.module.scss";

interface Props extends Omit<FormControlField, "list"> {
  list: ListSuggestion[];
}

const DatalistInput: FC<Props> = ({ name, list, ...otherProps }) => {
  const [inFocus, setInFocus] = useState(false);
  const popperElement = useRef<HTMLDivElement | null>(null);
  const containerRef = useDetectClickOutside({
    onTriggered: () => setInFocus(false),
    triggerKeys: ["Escape"],
  });
  
  const {attributes} = usePopper(containerRef.current, popperElement.current);
  
  const handleSuggestionListSelection = () => setInFocus(false);
  
  // TODO: create popper hook with element refs, returns Popper element with named children
  
  return (
    <div data-testid="datalistInput" className="position-relative" ref={ containerRef }>
      <BaseInput
        name={name}
        autoComplete="off"
        onFocus={() => setInFocus(true)}
        {...otherProps}
      />
      <div ref={ popperElement } className={ styles.datalist } {...attributes.popper}>
        {inFocus && (
          <InputSuggestionList fieldName={name} list={list || []} onSelect={handleSuggestionListSelection} />
        )}
      </div>
    </div>
  );
};

export default DatalistInput;
