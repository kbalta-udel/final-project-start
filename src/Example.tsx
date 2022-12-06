import type { FC } from 'react'
import { useCallback, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Container } from './Container'
import { Menu } from './Menu'
import  DropDown  from './Dropdown'


export const Example: FC = () => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [selectFurniture, setSelectFurniture] = useState<string>("");
  const furniture = () => {
    return ["Beds", "Couches", "Chairs"];
  };
  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };
  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowDropDown(false);
    }
  };
  const furnitureSelection = (furniture: string): void => {
    setSelectFurniture(furniture);
  };

  const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
  const toggle = useCallback(
    () => setHideSourceOnDrag(!hideSourceOnDrag),
    [hideSourceOnDrag],
  )

  return (
    <><div>
      <DndProvider backend={HTML5Backend}>
        <h1> Design Your Room!</h1>
        <Container hideSourceOnDrag={hideSourceOnDrag} />
        <Menu hideSourceOnDrag={hideSourceOnDrag} />
      </DndProvider>
    </div>
      {selectFurniture
      ? 'You are currently looking at'+ {selectFurniture}
      : "Select furniture type"}
    <div>
      <button
        className={showDropDown ? "active" : undefined}
        onClick={(): void => toggleDropDown()}
        onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
          dismissHandler(e)
        }
      >
         <div>{selectFurniture ? "Select: " + selectFurniture : "Select ..."} </div>
        {showDropDown && (
          <DropDown
            furniture={furniture()}
            showDropDown={false}
            toggleDropDown={(): void => toggleDropDown()}
            furnitureSelection={furnitureSelection}
          />
        )}
      </button>

      </div></>
  )
}
export default Example;
