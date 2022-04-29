/* eslint-disable no-undef */
const NewsList = (category) => {
    let page = 0
    const pageSize = 5
    const apiKey = '858c9b5adb944841b39d58b8ae3a6bfb'
    
    const printNews = res => {
        const $newsList = document.querySelector('.news-list')
        const {data} = res
        data.articles.forEach(item => {
            const article = `
            <section class="news-item">
                <div class="thumbnail">
                    <a href=${item.url} target="_blank" rel="noopener noreferrer">
                    <img src=${item.urlToImage} alt="thumbnail" />
                    </a>
                </div>
                <div class="contents">
                    <h2>
                        <a href=${item.url} target="_blank" rel="noopener noreferrer">${item.title}</a>
                    </h2>
                    <p>${item.description}</p>
                </div>
            </section>`
            $newsList.insertAdjacentHTML('beforeend', article)
        })
    }
    

    const fetchNews = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=kr&category=${category === 'all' ? '' : category}&page=${page++}&pageSize=${pageSize}&apiKey=${apiKey}`
        return await axios.get(url)
    }

    const render = async (callApi, callTemplate) => {
        const response = await callApi()
        callTemplate(response)
    }

    const makeNews =  () => {
        const $root = document.querySelector('#root')
        const $container = document.createElement('div')
        $container.classList.add('news-list-container')
        $container.innerHTML = `<article class="news-list">`
        $root.appendChild($container)

        const $div = document.createElement('div')
        $div.classList.add('scroll-observer')
        $div.innerHTML = `<img src="img/ball-triangle.svg" alt="Loading..." />`
        $container.appendChild($div)
    }

    const loadNews = async () => {
        try {
            await render(fetchNews, printNews)
        } catch(e) {
            console.log(e)
        }
    }


    const newsScrollObserver = new IntersectionObserver(
        ([{ isIntersecting}]) => {
            if (isIntersecting) {
                page++
                loadNews()
            }
        }
    )

    makeNews()

    const $scroll_observer = document.querySelector('.scroll-observer')
    newsScrollObserver.observe($scroll_observer)
}

export default NewsList
