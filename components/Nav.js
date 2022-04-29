const Nav = () => {

    makeNav()
 
    function makeNav() {
        // Nav 만들기
        const $root = document.querySelector('#root')
        const $container = document.createElement('nav')
        $container.classList.add('category-list')
        $root.appendChild($container)

        const $ul = document.createElement('ul')

        $container.appendChild($ul)

        $ul.innerHTML = ''

        let id
        let content
    
        const idList = ['all', 'business', 'entertainment', 'health', 'science', 'sports', 'technology']
        const contentList = ['전체보기', '비즈니스', '엔터테인먼트', '건강', '과학', '스포츠', '기술']
    
        for ( let i = 0; i < idList.length; i++) {
            id = idList[i]
            content = contentList[i]
            $ul.innerHTML = $ul.innerHTML + `<li id=${id} class="category-item">${content}</li>`
        }

        const all = document.querySelector('#all')
        all.classList.add('active')

    }
}

export default Nav
