import {Quote} from '../components/Quote'
import { Form } from '../components/Form'

export const Signup = ()=>{
    return <div className='md:grid md:grid-cols-2 flex justify-center items-center h-screen w-screen md:h-full md:w-full'>
            <Form formtype="Sign up" />
        <div className='hidden md:grid'>
        <Quote />
        </div>
    </div>
}