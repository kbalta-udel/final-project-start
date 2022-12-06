import update from 'immutability-helper'
import type { CSSProperties, FC } from 'react'
import { useCallback, useState } from 'react'
import type { XYCoord } from 'react-dnd'
import { useDrop } from 'react-dnd'

import { Box } from './Box'
import type { DragItem } from './interfaces'
import { ItemTypes } from './ItemTypes'

const styles: CSSProperties = {
  width: 1000,
  height: 100,
  border: '1px solid black',
  position: 'relative',
}

export interface MenuProps {
  hideSourceOnDrag: boolean
}

export interface MenuState {
  boxes: { [key: string]: { top: number; left: number; pic: string, title: string } }
}

export const  Menu: FC<MenuProps> = ({ hideSourceOnDrag }) => {
  const [boxes, setBoxes] = useState<{
    [key: string]: {
      top: number
      left: number
      pic: string
      title: string
    }
  }>({
    bed1: { top: 10, left: 110, pic: "./Furniture/bed1.jpg", title: 'bed1' },
    bed2: { top: 5, left: 200, pic: "./Furniture/bed2.jpg", title: 'bed2' },
    bed3: { top: 5, left: 300, pic: "./Furniture/bed3.jpg", title: 'bed3' },
    bed4: { top: 5, left: 400, pic:  "./Furniture/bed4.jpg", title: 'bed4'},
  })

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        }),
      )
    },
    [boxes, setBoxes],
  )

  // const [, drop] = useDrop(
  //   () => ({
  //     accept: ItemTypes.BOX,
  //     drop(item: DragItem, monitor) {
  //       const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
  //       const left = Math.round(item.left + delta.x)
  //       const top = Math.round(item.top + delta.y)
  //       moveBox(item.id, left, top)
  //       return undefined
  //     },
  //   }),
  //   [moveBox],
  // )

  return (
    <div style={styles}>
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
