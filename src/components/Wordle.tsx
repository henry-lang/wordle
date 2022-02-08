import React, {useCallback, useEffect, useState} from 'react'

import {Guess, CurrentGuess, EmptyGuess} from './Guess'
import words from '../../res/words.json'
import styles from './Wordle.module.css'

export const wordLength = 5
const numGuesses = 6

function useWord() {
    const [word, setWord] = useState('')

    useEffect(() => {
        const valid = words.filter((word) => word.length == wordLength)
        setWord(valid[Math.floor(Math.random() * valid.length)])
    }, [])

    return word
}

export default function Wordle(): JSX.Element {
    const [guesses, setGuesses] = useState<string[][]>([])
    const [guess, setGuess] = useState<string[]>([])
    const word = useWord()

    const onKeyPress = useCallback(
        ({key}: KeyboardEvent) => {
            const isFinished = guess.length >= 5
            const isBackspace = key === 'Backspace'
            const isEnter = key === 'Enter'
            const isLetter = /^[a-z]$/.test(key)

            if (isBackspace) {
                setGuess((prevGuess) => {
                    const newGuess = [...prevGuess, key]
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
        window.addEventListener('keypress', onKeyPress)
        return () => {
            window.removeEventListener('keypress', onKeyPress)
        }
    }, [onKeyPress])

    return (
        <div className={styles.wordle}>
            {guesses.map((guess, i) => (
                <Guess guess={guess} key={i} />
            ))}
            <CurrentGuess guess={guess} />
            {Array.from({length: numGuesses - guesses.length - 1}).map((_, i) => (
                <EmptyGuess key={i} />
            ))}
        </div>
    )
}
