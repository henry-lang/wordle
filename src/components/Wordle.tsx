import React, {useCallback, useEffect, useMemo, useState} from 'react'

import {Guess, CurrentGuess, EmptyGuess} from './Guess'
import words from '../../res/words.json'
import styles from './Wordle.module.css'

export const wordLength = 5
const numGuesses = 6

function useLetterCounts(word: string) {
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

    const isWin =
        guesses.length > 0 && guesses[guesses.length - 1].join('') === word
    const isLose = !isWin && guesses.length === numGuesses

    const onKeyPress = useCallback(
        ({key}: KeyboardEvent) => {
            if (isWin || isLose) return
            const isFinished = guess.length >= 5
            const isBackspace = key === 'Backspace'
            const isEnter = key === 'Enter'
            const isLetter = /^[a-zA-Z]$/.test(key)

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
            {isWin ? <h3 className={styles.gameStatus}>Nice job!</h3> : ''}
            {isLose ? <h3 className={styles.gameStatus}>Too bad.</h3> : ''}
            <div className={styles.board}>
                {guesses.map((guess, i) => (
                    <Guess {...{guess, word, counts}} key={i} />
                ))}
                {isWin || isLose ? '' : <CurrentGuess guess={guess} />}
                {Array.from({
                    length: numGuesses - guesses.length - 1,
                }).map((_, i) => (
                    <EmptyGuess key={i} />
                ))}
            </div>
        </div>
    )
}
