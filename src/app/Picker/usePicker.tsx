import {useCallback, useEffect, useRef} from "react";

export interface PickerProps {
  isVisible?: boolean;
  onNumberPick: (number: number) => void;
  onClosePicker: () => void;
}

export const usePicker = ({onClosePicker, isVisible, onNumberPick}: PickerProps) => {
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

  return {
    isVisible,
    pickerRef,
    onNumberPick
  };
};
