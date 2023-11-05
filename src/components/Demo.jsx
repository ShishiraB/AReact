import { useState, useEffect } from "react"
import { useLazyGetSummaryQuery } from "../services/article"
import { copy, linkIcon, loader, tick } from '../assets'

const Demo = () => {
  const [articles, setArticles] = useState({
    url: '',
    summary: '',
})
const [copied, setCopied] = useState("")
const [allarticles, setallarticles] = useState([])

const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery()

useEffect(() => {
  const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))
if(articlesFromLocalStorage) {
  setallarticles(articlesFromLocalStorage)
}
}, [] )

const handleSubmit = async (e) => {
  e.preventDefault()

  const { data } = await getSummary({articleurl:articles.url})
  if(data?.summary){
    const newArticle= { ...articles, summary: data.summary }
    const updatedArticles = [newArticle, ...allarticles]
    setArticles(newArticle)
    setallarticles(updatedArticles)
    localStorage.setItem('articles', JSON.stringify(updatedArticles))
  }
}

const handleCopy = (copyUrl) => {
  setCopied(copyUrl)
  navigator.clipboard.writeText(copyUrl)
  setTimeout(() => setCopied(false), 3000)
}

return (
  <section className="mt-16 w-full max-w-xl">

    <div className="flex flex-col w-full gap-2">
      <form 
        className="relative flex justify-center items-center "
        onSubmit={handleSubmit}
      >
        <img 
          src={linkIcon}
          alt="linkicon"
          className="absolute left-0 my-2 ml-3 w-5"
        />
        <input 
          type="url"
          placeholder="Enter your URL"
          value={articles.url}
          onChange={(e) => setArticles({ ...articles, url: e.target.value })}
          required
          className="url_input peer-odd:"  
        />
        <button
          type='submit'
          className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
        >
          ↵
        </button>
      </form>
      <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
        {allarticles.map((item, index) => (
          <div
            key={`link-${index}`}
            onClick={() => setArticles(item)}
            className="link_card"
          >
            <div className="copy_btn" onClick={() => handleCopy(item.url)}>
              <img
                src={copied === item.url ? tick : copy}
                alt="copy_icon"
                className="w-[40%] h-[40%] object-contain"
                />
            </div>
            <p className="flex-1 front-satoshi text-blue-700 font-medium truncate">
              {item.url}
            </p>
          </div>
        ))}
      </div>
    </div>
    <div className="my-10 max-w-full flex justify-center items-center">
      {isFetching ? (
        <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
      ) : error ? (
        <p className="font-inter font-bold text-black text-center">
          Well, that wasn't supposed to happen ...
          <br />
          <span className="font-satoshi font-normal text-gray-700">
            {error?.data?.error}
          </span>
        </p>
      ) : (
        articles.summary && (
          <div className="flex flex-col gap-3">
            <h2 className="font-satoshi font-bold text-gray-600 text-xl">
              Blog <span
              className="blue_gradient">Summary</span>
            </h2>
            <div className="summary_box">
              <p className="font-inter font-medium text-sm text-gray-700">
                {articles.summary}
              </p>
            </div>
          </div>
        
      ))}

    </div>
  </section>
)}

export default Demo