import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Wordle from './components/Wordle'
import './index.css'

const Index = () => {
    return <Wordle />
}

ReactDOM.render(<Index />, document.getElementById('root'))
