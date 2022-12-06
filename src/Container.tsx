import update from 'immutability-helper'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { listenerCount } from 'process'
import type { CSSProperties, FC } from 'react'
import { useCallback, useState } from 'react'
import type { XYCoord } from 'react-dnd'
import { useDrop } from 'react-dnd'

import { Box } from './Box'
import type { DragItem } from './interfaces'
import { ItemTypes } from './ItemTypes'
import { Furniture } from './Components/furniture'


//import { chair1 } from './Components/furniture'
//import { types } from '@babel/core'

const styles: CSSProperties = {
  width: 1000,
  height: 600,
  border: '1px solid black',
  position: 'relative',
}

export interface ContainerProps {
  hideSourceOnDrag: boolean
}

export interface ContainerState {
  boxes: { [key: string]: { top: number; left: number; pic: string, title: string } }
}

export const Container: FC<ContainerProps> = ({ hideSourceOnDrag }) => {
  const [boxes, setBoxes] = useState<{
    [key: string]: {
      top: number
      left: number
      pic: string
      title: string
      type: string
    }
  }>({
    //a: { top: 20, left: 80, pic: chair1.picture, title: '' },
   // b: { top: 180, left: 20, title: 'Drag me too' },
  })

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { 
              left: left, top: top, },
          },
        }),
      )
    },
    [boxes, setBoxes],
  )
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [continerList, setContainerList] = useState<Furniture>();


  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX && ItemTypes.FBOX,
      drop(item: DragItem, monitor) {
        const current: Furniture = monitor.getItem(); 
        if (monitor.getItemType() !== 'fbox') {
          const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
          const left = Math.round(item.left + delta.x)
          const top = Math.round(item.top + delta.y)
           ////////////////////////////////////////////////////
          moveBox(item.id, left, top)
          return undefined
         }
        else {
            setBoxes(
              update(boxes, {
                $merge: {
                  [current.type]: {
                    top: current.top,
                    left: current.left,
                    type: 'box'
                  }
                }
              })
            );
          return ;
      }
  }}),
    [moveBox],
  )

  return (
    <div ref={drop} style={styles}>
      {Object.keys(boxes).map((key) => {
        const { left, top, pic } = boxes[key] as {
          top: number
          left: number
          title: string
          pic: string
        }
        return (
          <Box
            key={key}
            id={key}
            left={left}
            top={top}
            pic={pic}
            //hideSourceOnDrag={hideSourceOnDrag}
          >
          </Box>
        )
      })}
    </div>
  )
}
