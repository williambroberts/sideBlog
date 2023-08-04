import React from 'react'
import Animator from '../../components/animator/animator'
import H1 from '../../components/setup/h1'
import DisplayCategory from '../write/components/display/displayCategory'
import Link from 'next/link'
import { Card } from '../../components/Cards/Card'
import IconWebauthn from '../../icons/signIn'
import IconAppwrite from '../../components/Cards/write'
import IconReadthedocs from '../../components/Cards/read'

const AboutPage = () => {
  return (
    <main 
    
    
    className='page'>
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
                This is a <strong>full stack</strong> blog site template. It has a working <strong>CMS</strong> system.

            </p>
        </Animator>
        <Animator index={4}>
            <p className='about__p'>
                It was built with <code>Next.Js</code>, <code>TypeScript</code> and uses <code>Firebase</code>
                for the backend.
            </p>
        </Animator>
        <Animator index={5}>
            <p>
                You are very welcome to 
                <Link className='underline px-0.5 hover:font-bold' href="/signUp"
                
                >sign up</Link>and write your own blog on this site.
                View the source code <a 
                className='underline hover:font-bold pl-0.5'
                target="_blank" href="https://github.com/williambroberts/sideBlog">here</a>.
            </p>
        </Animator>
        <div className='
        py-10
        grid grid-cols-3 gap-2 w-full'>
            <Animator index={6}>
                <Card 
                text='Discover'
                icon={<IconWebauthn/>}
                index={0}
                />
            </Animator>
            <Animator index={7}>
                <Card 
                text='Write'
                icon={<IconAppwrite/>}
                index={1}
                />
            </Animator>
            <Animator index={7}>
                <Card 
                text='Read'
                icon={<IconReadthedocs/>}
                index={2}
                />
            </Animator>
        </div>
    </main>
  )
}

export default AboutPage