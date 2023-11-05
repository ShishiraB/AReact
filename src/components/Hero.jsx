import { logo } from '../assets'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
        <nav className='flex justify-between items-center w-full mb-10 pt-3'>
            <img src={logo} alt='sumz_logo' className='w-28 object-contain' />
            <div className='space-x-3'>
                <button
                    type='button'
                    onClick={() => window.open('https://github.com/ShishiraB/aireact')}
                    className='black_btn'
                    >
                    GitHub
                </button>
                <button
                    type='button'
                    onClick={() => window.open('https://rapidapi.com/restyler/api/article-extractor-and-summarizer')}
                    className='black_btn'
                    >
                    Rapid Api
                </button>
            </div>
        </nav>
        <h1 className='head_text'>
            Summarize Blog with <br className='max-md:hidden' />
            <span 
                className='orange_gradient'>
                AReact
            </span>
        </h1>
        <h2 className='desc'>
            Summarize your Blog with AReact. <br className='max-md:hidden' />
            Just copy and paste your Blog and <br className='max-md:hidden' />
            we'll summarize it for you.
        </h2>
    </header>
  )
}

export default Hero