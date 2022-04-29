import Nav from './Nav.js';
import NewsList from './NewsList.js';

const Index = () => {
    const category = {}
    
    const handler = {
        get : (obj, name) => {
            if (name === 'id') {
                return  obj[name] ? obj[name] : 'all'
            }
        },
        set : (obj, name, value) => {
            if (name === 'id') {
                obj[name] = value
                return true
            }
        }
    }

    
    const proxy = new Proxy(category, handler)
    
    const $navItems = document.querySelectorAll('.category-item')
    $navItems.forEach((nav) => {
        nav.addEventListener('click', () => {
            const $container = document.querySelector('.news-list-container')
            $container.remove()

            const id = nav.id
            proxy.id = id

            const $selectedItem = document.querySelector('.active')
            $selectedItem.classList.remove('active')
            nav.classList.add('active')
            NewsList(proxy.id)
        })
    })

}

export default Index
export { Nav, NewsList };
