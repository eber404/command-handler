import express from 'express'

import { createUserIoC } from '@/infra/ioc/create-user-ioc'
import { ExpressAdapter } from '@/infra/http/express-adapter'

const { createUserController } = createUserIoC()

const server = express()
server.use(express.json())

server.post('/users', ExpressAdapter.adapt(createUserController))

server.listen(3000, () => console.log('Listening on port 3000'))
