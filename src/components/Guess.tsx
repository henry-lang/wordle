import React from 'react'

import {wordLength} from './Wordle'
import {Letter, LetterStatus} from './Letter'
import styles from './Guess.module.css'

interface GuessProps {
    guess: string[]
}

export function Guess({
    guess,
    counts,
}: GuessProps & {counts: Record<string, number>}): JSX.Element {
    return (
        <div className={styles.guess}>
            {guess.map((_, i) => (
                <Letter
                    letter={guess.at(i)}
                    status={LetterStatus.Absent}
                    key={i}
                />
            ))}
        </div>
    )
}

export function CurrentGuess({guess}: GuessProps): JSX.Element {
    return (
        <div className={styles.guess}>
            {guess.map((_, i) => (
                <Letter
                    letter={guess.at(i)}
                    status={LetterStatus.None}
                    key={i}
                ></Letter>
            ))}
            {Array.from({length: wordLength - guess.length}).map((_, i) => (
                <Letter letter={''} status={LetterStatus.None} key={i} />
            ))}
        </div>
    )
}

export function EmptyGuess(): JSX.Element {
    return (
        <div className={styles.guess}>
            {Array.from({length: wordLength}).map((_, i) => (
                <Letter letter={''} status={LetterStatus.None} key={i} />
            ))}
        </div>
    )
}
