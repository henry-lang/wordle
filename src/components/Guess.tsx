import React from 'react'

import {wordLength} from './Wordle'
import {Letter} from './Letter'
import styles from './Guess.module.css'

interface GuessProps {
    guess: string[]
}

export function Guess({guess}: GuessProps): JSX.Element {
    return (
        <div className={styles.guess}>
            {[...guess].map((letter, i) => (
                <Letter word={guess} color index={i} key={i} />
            ))}
        </div>
    )
}

export function CurrentGuess({guess}: GuessProps): JSX.Element {
    return (
        <div className={styles.guess}>
            {[...guess].map((letter, i) => (
                <Letter word={guess} index={i} key={i}></Letter>
            ))}
            {Array.from({length: wordLength - guess.length}).map((_, i) => (
                <Letter key={i} />
            ))}
        </div>
    )
}

export function EmptyGuess(): JSX.Element {
    return (
        <div className={styles.guess}>
            {Array.from({length: wordLength}).map((_, i) => (
                <Letter key={i} />
            ))}
        </div>
    )
}
