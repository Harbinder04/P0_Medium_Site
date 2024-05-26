import { Form } from '../components/Form'
import {Quote} from '../components/Quote'

export const Signin = ()=>{
    return <div className='md:grid md:grid-cols-2 flex justify-center items-center h-screen w-screen md:h-full md:w-full'>
            <Form formtype="Sign in" />
        <div className='hidden md:grid'>
        <Quote />
        </div>
    </div>
}