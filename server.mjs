import express from 'express'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const app = express()
const port = Number.parseInt(process.env.PORT || '3000', 10)

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/', async (_req, res) => {
  const blockNumber = await client.getBlockNumber()
  res.json({
    name: 'web3-api-viem-express',
    blockNumber: blockNumber.toString(),
  })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`server listening on ${port}`)
})
