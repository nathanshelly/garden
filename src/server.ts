import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'

const {PORT, NODE_ENV} = process.env
const dev = NODE_ENV === 'development'

polka() // You can also use Express
  .use(
    compression({threshold: 0}),
    sirv('static', {dev}),
    // TODO: remove below cast when this PR is merged/released
    // ref - https://github.com/sveltejs/sapper/pull/1710
    sapper.middleware() as any,
  )
  .listen(PORT, (err: Error) => {
    if (err) console.log('error', err)
  })
