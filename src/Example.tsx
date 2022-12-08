import type { FC } from 'react'
import { useCallback, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Container } from './Container'
import { Menu } from './Menu'
import Dropdown from './DropDownMenu'
import './Example.css'


export const Example: FC = () => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [selectFurniture, setSelectFurniture] = useState<string>("");
  const furniture = () => {
    return ["Beds", "Couches", "Chairs", "Presets", "Tables", "Toilets", "Extras"];
  };
  //setSelectFurniture("Beds");
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
    var collection = ({});
    if (furniture === "Beds") {
      collection = ({
        bed1: { top: 10, left: 110, picture: "./Furniture/bed1.jpg", title: 'bed1', type: 'fbox' },
        bed2: { top: 5, left: 200, picture: "./Furniture/bed2.jpg", title: 'bed2', type: 'fbox' },
        bed3: { top: 5, left: 300, picture: "./Furniture/bed3.jpg", title: 'bed3', type: 'fbox' },
        bed4: { top: 5, left: 400, picture:  "./Furniture/bed4.jpg", title: 'bed4', type: 'fbox'},
      })
    }
    else if (furniture === "Couches") {
      collection = ({
        couch1: { top: 10, left: 110, picture: "./Furniture/couch1.jpg", title: 'couch1', type: 'fbox' },
        couch2: { top: 5, left: 200, picture: "./Furniture/couch2.jpg", title: 'couch2', type: 'fbox' },
        couch3: { top: 5, left: 300, picture: "./Furniture/couch3.jpg", title: 'couch3', type: 'fbox' },
        couch4: { top: 5, left: 400, picture:  "./Furniture/couch4.jpg", title: 'couch4', type: 'fbox'},
        couch5: { top: 5, left: 500, picture:  "./Furniture/couch5.jpg", title: 'couch5', type: 'fbox'},
        couch6: { top: 5, left: 600, picture:  "./Furniture/couch6.jpg", title: 'couch6', type: 'fbox'},
 
      })
    }
    else if (furniture === "Chairs") {
      collection = ({
        chair1: { top: 10, left: 110, picture: "./Furniture/chair1.jpg", title: 'chair1', type: 'fbox' },
        chair2: { top: 5, left: 200, picture: "./Furniture/chair2.jpg", title: 'chair2', type: 'fbox' },
        chair3: { top: 5, left: 300, picture: "./Furniture/chair3.jpg", title: 'chair3', type: 'fbox' },
        chair4: { top: 5, left: 400, picture:  "./Furniture/chair4.jpg", title: 'chair4', type: 'fbox'},
        chair5: { top: 5, left: 500, picture: "./Furniture/chair5.jpg", title: 'chair5', type: 'fbox' },
        chair6: { top: 5, left: 600, picture: "./Furniture/chair6.jpg", title: 'chair6', type: 'fbox' },

      })
    }
    else if (furniture === "Presets") {
      collection = ({
        preset1: { top: 5, left: 50, picture: "./Furniture/preset1.jpg", title: 'preset1', type: 'fbox' },
        preset2: { top: 5, left: 200, picture: "./Furniture/preset2.jpg", title: 'preset2', type: 'fbox' },
        preset3: { top: 5, left: 300, picture: "./Furniture/preset3.jpg", title: 'preset3', type: 'fbox' },
        preset4: { top: 5, left: 400, picture:  "./Furniture/preset4.jpg", title: 'preset4', type: 'fbox'},
        preset5: { top: 5, left: 500, picture: "./Furniture/preset5.jpg", title: 'preset5', type: 'fbox' },
        preset6: { top: 5, left: 600, picture: "./Furniture/preset6.jpg", title: 'preset6', type: 'fbox' },
        preset7: { top: 5, left: 700, picture: "./Furniture/preset7.jpg", title: 'preset7', type: 'fbox' },

      })
    }
    else if (furniture === "Tables") {
      collection = ({
        table1: { top: 10, left: 110, picture: "./Furniture/table1.jpg", title: 'table1', type: 'fbox' },
        table2: { top: 5, left: 200, picture: "./Furniture/table2.jpg", title: 'table2', type: 'fbox' },
        table3: { top: 5, left: 300, picture: "./Furniture/table3.jpg", title: 'table3', type: 'fbox' },
        table4: { top: 5, left: 400, picture:  "./Furniture/table4.jpg", title: 'table4', type: 'fbox'},
        table5: { top: 5, left: 500, picture: "./Furniture/table5.jpg", title: 'table5', type: 'fbox' },
      })
    }
    else if (furniture === "Toilets") {
      collection = ({
        toilet1: { top: 10, left: 110, picture: "./Furniture/toilet1.jpg", title: 'toilet1', type: 'fbox' },
        toilet2: { top: 5, left: 200, picture: "./Furniture/toilet2.jpg", title: 'toilet2', type: 'fbox' },
      })
    }
    else if (furniture === "Extras") {
      collection = ({
        piano: { top: 10, left: 110, picture: "./Furniture/piano.jpg", title: 'piano', type: 'fbox' },
      })
    }
    setmenuBoxes(collection);
  };

  const [menuboxes, setmenuBoxes] = useState<{
    [key: string]: {
      top: number
      left: number
      picture: string
      title: string
      type: string
    }
  }>({
    blank: {top: 10, left: 10, picture: "./Furniture/blank.jpg", title: 'blank', type: 'fbox'}  
  })

  const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const toggle = useCallback(
    () => setHideSourceOnDrag(!hideSourceOnDrag),
    [hideSourceOnDrag],
  )

  return (
    <>
        <h1> Design Your Room!</h1>
      {selectFurniture
      ? 'You are currently looking at '+ selectFurniture 
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
          <Dropdown
            furniture={furniture()}
            showDropDown={false}
            toggleDropDown={(): void => toggleDropDown()}
            furnitureSelection={furnitureSelection}
          />
        )}
      </button>
      <div>
  
      <DndProvider backend={HTML5Backend}>
        
        <Container hideSourceOnDrag={hideSourceOnDrag} />
        <Menu hideSourceOnDrag={hideSourceOnDrag} menuboxes={menuboxes} setmenuBoxes={setmenuBoxes}/>
      </DndProvider>
    </div>
      </div></>
  )
}
export default Example;
