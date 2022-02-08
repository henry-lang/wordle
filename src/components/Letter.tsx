import React from 'react'

import styles from './Letter.module.css'

type LetterProps =
    | {
          word: string[]
          index: number
          color?: boolean
      }
    | {
          word?: undefined
          index?: never
          color?: never
      }

export function Letter({word, index, color}: LetterProps) {
    return <span className={styles.letter}>{word?.at(index).toUpperCase() || ''}</span>
}
