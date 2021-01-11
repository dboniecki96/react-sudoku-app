import {useCallback, useEffect, useRef} from "react";
import {GRID_SIZE}                      from "../../../hooks/useSudoku/sudokuUtils";
import './picker.scss';

const arr = Array.from(Array(GRID_SIZE).keys());

interface PickerProps {
  isVisible?: boolean;
  onNumberPick: (number: number) => void;
  onClosePicker: () => void;
}

const Picker = ({isVisible, onNumberPick, onClosePicker}: PickerProps) => {
  const pickerRef = useRef<HTMLDivElement>(null);

  const clickedOutside = useCallback((event: MouseEvent) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
      onClosePicker();
    }
  }, [onClosePicker]);

  useEffect(() => {
    document.addEventListener('click', clickedOutside, true);
    return () => document.removeEventListener('click', clickedOutside, true)
  }, [clickedOutside, pickerRef]);

  return isVisible ? (
    <div className='picker'
         ref={pickerRef}
    >
      {arr.map(val => <div key={val}
                           className='number'
                           onClick={() => onNumberPick(val + 1)}
      >{val + 1}</div>)}
    </div>
  ) : null;
};

export default Picker;
