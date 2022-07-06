import List from '../pages/List'
import Movie from '../pages/Movie'
import NotFound from '../pages/NotFound'

export default {
  routes: [
    {
      path: '$',
      component: List,
    },
    {
      path: '*',
      component: NotFound,
    },
    {
      path: 'movie/:id',
      component: Movie,
      cache: 0,
    },
  ],
}
