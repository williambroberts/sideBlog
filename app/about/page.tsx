import React from 'react'
import Animator from '../../components/animator/animator'
import DisplayCategory from '../write/components/display/displayCategory'
import Link from 'next/link'
import { Card } from '../../components/Cards/Card'
import IconWebauthn from '../../icons/signIn'
import IconWrite from '../../icons/write'
import IconBasic_spread from '../../components/Cards/read'

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
            <h1 className='font-bold'>
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
            <h4
            className='font-semibold text-xl'
            >What can you do here?</h4>
        </Animator>
        <div className='
        py-10
        grid grid-cols-3 gap-2 w-full'>
            <Animator index={6}>
                <Card 
                text='Create your own account'
                icon={<IconWebauthn/>}
                index={0}
                />
            </Animator>
            <Animator index={7}>
                <Card 
                text='Write & edit your blogs'
                icon={<IconWrite/>}
                index={1}
                />
            </Animator>
            <Animator index={7}>
                <Card 
                text='Search & read blogs'
                icon={<IconBasic_spread/>}
                index={2}
                />
            </Animator>
        </div>
    </main>
  )
}

export default AboutPage