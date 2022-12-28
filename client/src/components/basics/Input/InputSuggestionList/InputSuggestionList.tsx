import {FC, useMemo} from "react";
import {useWatch} from "react-hook-form";
import useControlledInputs from "../../../../utils/hooks/useControlledInputs/useControlledInputs";
import {ListSuggestion} from "../Input.types";
import styles from './InputSuggestionList.module.scss';

interface Props {
  fieldName: string;
  list: ListSuggestion[];
  onSelect: () => void;
}

const InputSuggestionList: FC<Props> = ({fieldName: name, list, onSelect}) => {
  const inputValue = useWatch({name});
  const [, {formContext}] = useControlledInputs(name);

  const handleSelection = (suggestion: ListSuggestion) => {
    formContext.setValue(name as string, suggestion);
    onSelect();
  };

  const suggestionsBasedOnInput = useMemo(() => {
    if (inputValue === "" || !inputValue) {
      return list;
    } else {
      return list.filter(suggestion => {
        if (typeof suggestion === "string") {
          return suggestion.includes(inputValue);
        } else return true;
      });
    }
  }, [list, inputValue]);

  return (
    <ul className={ styles.list }>
      {suggestionsBasedOnInput.map((suggestion, index) => (
        <li
          key={index}
          onClick={() => handleSelection(suggestion)}
          className={ styles.item }
          role="button">
          {suggestion}
        </li>
      ))}
    </ul>
  );
};

export default InputSuggestionList;
