import React, {useMemo} from 'react'

import {wordLength} from './Wordle'
import {Letter, LetterStatus} from './Letter'
import styles from './Guess.module.css'

function useCheckLetters({guess, word, counts}: GuessProps) {
    return useMemo(() => {
        const extras = {...counts}
        guess.forEach((letter, i) => {
            if (word[i] === letter) {
                extras[letter]--
            }
        })

        return guess.map((letter, i) => {
            if (word[i] === letter) return LetterStatus.Correct
            if (extras[letter]) return LetterStatus.Present
            return LetterStatus.Absent
        })
    }, [guess])
}

interface GuessProps {
    guess: string[]
    word: string
    counts: Record<string, number>
}

export function Guess({guess, word, counts}: GuessProps): JSX.Element {
    const statuses = useCheckLetters({guess, word, counts})

    return (
        <div className={styles.guess}>
            {statuses.map((status, i) => (
                <Letter letter={guess[i]} status={status} key={i} />
            ))}
        </div>
    )
}

interface CurrentGuessProps {
    guess: string[]
}

export function CurrentGuess({guess}: CurrentGuessProps): JSX.Element {
    return (
        <div className={styles.guess}>
            {guess.map((_, i) => (
                <Letter
                    letter={guess[i]}
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
