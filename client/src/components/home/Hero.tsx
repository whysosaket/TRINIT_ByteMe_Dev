import { useEffect } from 'react'
import { Lamp } from '../../ui/Lamp'
import {motion} from 'framer-motion'

const Hero = () => {

  useEffect(() => {
    // un mount after 5 sewconds
    setTimeout(() => {
      return () => {
        console.log('unmounting')
      }
    }, 5000);
  }, [])

  return (
    <motion.div
    initial={{ y: 0, opacity: 1}}
    animate={{ y: 300, opacity: 0}}
    transition={{ duration: 1, delay: 3.7}}
    className='absolute w-full top-0'>
        <Lamp />
    </motion.div>
  )
}

export default Hero