import {PickerProps, usePicker} from "./usePicker";
import {GRID_SIZE}              from "../../utils/utils";
import './picker.scss';

const getAscendingArrayOfGridSize = Array.from(Array(GRID_SIZE).keys());

const Picker = (props: PickerProps) => {
  const {isVisible, pickerRef, onNumberPick} = usePicker(props);

  return isVisible ? (
    <div className='picker'
         ref={pickerRef}
    >
      {
        getAscendingArrayOfGridSize.map(val => (
          <div key={val} className='number' onClick={() => onNumberPick(val + 1)}>
            {val + 1}
          </div>
        ))
      }
    </div>
  ) : null;
};

export default Picker;
