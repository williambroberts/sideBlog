import React from 'react'
import Animator from '../../components/animator/animator'
import H1 from '../../components/setup/h1'
import DisplayCategory from '../write/components/display/displayCategory'

const AboutPage = () => {
  return (
    <main className='page'>
        <Animator index={1}>
            <DisplayCategory
            category='greetings'
            />
        </Animator>
        <Animator index={2}>
            <h1>
                About
            </h1>
        </Animator>
        <Animator index={3}>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta ut illo sint aliquam minima
                 nemo laborum placeat dolorum, laboriosam reiciendis?
            </p>
        </Animator>
        <Animator index={4}>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta ut illo sint aliquam minima
                 nemo laborum placeat dolorum, laboriosam reiciendis?
            </p>
        </Animator>
    </main>
  )
}

export default AboutPage