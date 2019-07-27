import React, {Component} from 'react';
import Hangman from './hangman-figure';
import Answer from './Answer';
import Output from './Output';
import Letters from './Letters';
import Next from './Next';
import Streak from './streak';
import words from './words';

class game extends Component {

    state = {
        picked: [""],
        incorrectPicks: 0,
        answerList : {},
        answer : [{word: "hello world", hint : "Common computer programing phrase"}],
        gameStatus: 0, // 0 - play, 1 - won,  2 - lost
        streak: 0,
    }


    componentDidMount() {
        let answerList = words;
        // Shuffle the array
        answerList.sort(function () { return 0.5 - Math.random() });
        const answer = answerList.pop();
        answer.word = answer.word.toUpperCase();
    }

    addAlphas = (alpha) => {
        let alphaList = this.state.picked;
        alphaList.push(alpha);
        this.setState({ picked: alphaList }, () => {
            let word = this.state.answer[0].word.replace(new RegExp('[^' + this.state.picked + ']', 'g'), '-');
            if (word.indexOf('-') === -1) {
                this.setState({
                    gameStatus: 1,
                    streak: this.state.streak + 1
                })
            }
        });

        // Adding if statement and the regex as the else part in the above callback
        // will make the process slow. In the current setup we add regex for every
        // alphabet added increasing the number of cases. Find optimal way.

        if (this.state.answer[0].word.indexOf(alpha) === -1) {
            this.setState({ incorrectPicks: (this.state.incorrectPicks + 1) }, () => {
                if (this.state.incorrectPicks === 6) {
                    this.setState({
                        gameStatus: 2,
                        streak: 0,
                    })
                }
            });
        }
    }

    nextWord = () => {
        const answer = this.state.answerList.pop();
        answer.word = answer.word.toUpperCase();
        this.setState({
            picked: [" "],
            incorrectPicks: 0,
            answer,
            gameStatus: 0,
        });
    }

    render() {
        return (
            <div className='container'>
                <div className='title'>Hangman Game</div>
                <div className='figureWrapper'>
                    <Hangman
                        incorrectPicks={this.state.incorrectPicks}
                    />
                </div>
                <div className='answerWrapper'>
                    <Output
                        gameStatus={this.state.gameStatus}
                        answer={this.state.answer.word}
                    />
                    <Answer
                        answer={this.state.answer}
                        pickedArray={this.state.picked}
                    />
                    <div className='info'>(Hint: Quotes are from movies)</div>
                    <Letters
                        pickedArray={this.state.picked}
                        gameStatus={this.state.gameStatus}
                        addAlphas={this.addAlphas}
                    />
                    <Streak
                        streak={this.state.streak}
                    />
                    <Next
                        gameStatus={this.state.gameStatus}
                        answerList={this.state.answerList}
                        nextWord={this.nextWord}
                    />
                </div>
            </div>
        );
    };
};

export default game;
