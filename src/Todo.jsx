import React, { useState, useEffect } from 'react'
/*
import logo from './logo.svg'
import './App.css'
*/

import workBtnClicked from "./assets/work-clicked.png";
import breakBtn from "./assets/break.png";
import workGif from "./assets/work.gif";
import breakGif from "./assets/break.gif";
import background from './assets/Rowdyhacks Website.png';
import cowboyCorgi from "./assets/CowboyCorgi.png";

function Todo() {

    const [timeLeft, setTimeLeft] = useState(25 * 60)
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [encouragement, setEncouragement] = useState("");


    const cheerMessages = [
        "Slow motion is still motion!",
        "without rain there are no flowers.",
        "to be or not to be",
        "Stretch your legs!",
        "Breathe"
    ];

    const breakMessages = [
        "Stay hydrated!",
        "Snacks, maybe?",
        "Take a deep breath!",
        "Look away from the screen!",
        "Stand up and stretch!"
    ];

    //Encouragement message updater
    useEffect(() => {
        let messageInterval

        if (isRunning) {
            const messages = isBreak ? breakMessages : cheerMessages
            setEncouragement(messages[0])
            let index = 1

            messageInterval = setInterval(() => {
                setEncouragement(messages[index])
                index = (index + 1) % messages.length
            }, 4000) // every 4 seconds
        } else {
            setEncouragement("")
        }

        return () => clearInterval(messageInterval)
    }, [isRunning, isBreak])



    //Countdown timer with auto-switch between work and break
    useEffect(() => {
        let timer
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1)
            }, 1000)
        } else if (isRunning && timeLeft === 0) {
            if (!isBreak) {
                // Switch to break
                setIsBreak(true)
                setTimeLeft(5 * 60)
            } else {
                // Switch to work
                setIsBreak(false)
                setTimeLeft(25 * 60)
            }
        }
        return () => clearInterval(timer)
    }, [isRunning, timeLeft, isBreak])


    const formatTime = seconds => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0')
        const s = (seconds % 60).toString().padStart(2, '0')
        return `${m}:${s}`
    }

    const switchMode = (breakMode) => {
        setIsBreak(breakMode)
        setIsRunning(false)
        setTimeLeft(breakMode ? 5 * 60 : 25 * 60)
    }
        return (
            <div style={{ fontFamily: 'Retrograde-Regular, monospace', textAlign: 'center', marginTop: '3rem' }}>
                
                <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Pomodoro Timer</h1>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                    {isBreak ? 'Break Time!' : 'Work Time!'}
                </div>
                <div style={{ fontSize: '4rem', fontFamily: 'Retrograde-Regular, monospace', letterSpacing: '0.1em', marginBottom: '2rem' }}>
                    {formatTime(timeLeft)}
                </div>
                <button
                    style={{
                        fontFamily: 'Retrograde-Regular, monospace',
                        fontSize: '1.5rem',
                        padding: '0.75rem 2rem',
                        borderRadius: '8px',
                        border: '2px solid #222',
                        background: '#e0e0e0',
                        cursor: 'pointer',
                        marginTop: '1rem',
                        boxShadow: '2px 2px 0 #888',
                    }}
                    onClick={() => {
                        if (!isRunning) {
                            setIsRunning(true)
                        } else {
                            setIsRunning(false)
                            setIsBreak(false)
                            setTimeLeft(25 * 60)
                        }
                    }}
                >
                    {isRunning ? 'Reset' : 'Start'}
                </button>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <img
                            src={cowboyCorgi}
                            alt="Cowboy Corgi"
                            style={{
                                marginTop: '2.5rem',
                                width: '220px',
                                height: 'auto',
                            }}
                        />
                    </div>
            </div>
        );
}

export default Todo