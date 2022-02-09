import React, {useCallback, useEffect, useMemo, useState} from 'react'

import {Guess, CurrentGuess, EmptyGuess} from './Guess'
import words from '../../res/words.json'
import styles from './Wordle.module.css'

export const wordLength = 5
const numGuesses = 6

function useLetterCounts(word: string): Record<string, number> {
    return useMemo(
        () =>
            word.split('').reduce<Record<string, number>>((counts, letter) => {
                if (!counts[letter]) {
                    counts[letter] = 1
                } else {
                    counts[letter] += 1
                }
                return counts
            }, {}),
        [word]
    )
}

function useWord() {
    const [word, setWord] = useState('')

    useEffect(() => {
        const valid = words.filter((word) => word.length == wordLength)
        const chosen = valid[Math.floor(Math.random() * valid.length)]
        console.log(chosen)
        setWord(chosen)
    }, [])

    return word
}

export default function Wordle(): JSX.Element {
    const [guesses, setGuesses] = useState<string[][]>([])
    const [guess, setGuess] = useState<string[]>([])
    const word = useWord()
    const counts = useLetterCounts(word)

    const onKeyPress = useCallback(
        ({key}: KeyboardEvent) => {
            const isFinished = guess.length >= 5
            const isBackspace = key === 'Backspace'
            const isEnter = key === 'Enter'
            const isLetter = /^[a-zA-Z]$/.test(key)
            console.log(key)

            if (isBackspace) {
                setGuess((prevGuess) => {
                    const newGuess = [...prevGuess]
                    newGuess.pop()
                    return newGuess
                })
            } else if (!isFinished && isLetter) {
                setGuess((prevGuess) => [...prevGuess, key])
            } else if (isFinished && isEnter) {
                setGuesses((prevGuesses) => [...prevGuesses, guess])
                setGuess([])
            }
        },
        [guess]
    )

    useEffect(() => {
        window.addEventListener('keydown', onKeyPress)
        return () => {
            window.removeEventListener('keydown', onKeyPress)
        }
    }, [onKeyPress])

    return (
        <div className={styles.wordle}>
            <h1 className={styles.title}>WORDLE</h1>
            <div className={styles.board}>
                {guesses.map((guess, i) => (
                    <Guess {...{guess, counts}} key={i} />
                ))}
                <CurrentGuess guess={guess} />
                {Array.from({length: numGuesses - guesses.length - 1}).map(
                    (_, i) => (
                        <EmptyGuess key={i} />
                    )
                )}
            </div>
        </div>
    )
}
