import React from 'react'

import styles from './Letter.module.css'

export enum LetterStatus {
    None,
    Absent,
    Present,
    Correct,
}

interface LetterProps {
    letter: string
    status: LetterStatus
}

export function Letter({letter, status}: LetterProps): JSX.Element {
    return (
        <span
            className={`${styles.letter} ${
                status == LetterStatus.Absent ? styles.absent : ''
            } ${status == LetterStatus.Present ? styles.present : ''} ${
                status == LetterStatus.Correct ? styles.correct : ''
            }`}
        >
            {letter.toUpperCase() || ''}
        </span>
    )
}
