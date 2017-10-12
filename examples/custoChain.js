'use strict';

// const bcoin = require('../..');
const FullNode = require('../lib/node/fullnode');

const node = new FullNode({
  network: 'testnet',
  db: 'memory'
  // workers: true
});

(async () => {
  await node.open();
  await node.connect();

  node.on('connect', (entry, block) => {
    console.log('%s (%d) added to chain.', entry.rhash(), entry.height);
  });

  node.on('tx', (tx) => {
    console.log('%s added to mempool.', tx.txid());
  });

  node.startSync();

  setTimeout(async function () {
    node.stopSync();
    let nextEntry = await node.chain.db.getEntryByHeight(402)
    let nextBlock = await node.chain.db.getBlock(nextEntry.hash)
    let nextNextEntry = await node.chain.db.getEntryByHeight(403)
    let nextNextBlock = await node.chain.db.getBlock(nextNextEntry.hash)
    await node.chain.reset(401)
    // let newTip = await node.chain.db.getTip()
    let newTip = await node.chain.tip

    let tadaaaa = await node.chain.add(nextBlock)
    let lastTip = await node.chain.db.getTip()

    console.log(newTip);
    // console.log(nextBlock);
    console.log(tadaaaa);
    console.log(lastTip);
  }, 2 * 1000);

})().catch((err) => {
  console.error(err.stack);
  process.exit(1);
});
