import image from '../assets/background.jpg'

const Background = () => {
  return (
    <div className=''>
        <img src={image} alt='background' className='fixed top-0 left-0 w-full h-full object-cover -z-50' />
        <div className='fixed top-0 left-0 w-full h-full object-cover -z-30 bg-black opacity-30' />
        <div className='backdrop-blur-[4px] fixed top-0 left-0 w-full h-full object-cover -z-40 bg-black/20' />
    </div>
  )
}

export default Background