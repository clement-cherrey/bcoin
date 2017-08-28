'use strict';

const FullNode = require('../lib/node/fullnode');

const node = new FullNode({
  network : 'testnet',
  listen: true
});

// const node2 = new FullNode({
//   network : 'testnet',
// });

(async () => {
  await node.open();
  await node.connect();
  // await node2.open();
  // await node2.connect();

  node.on('connect', (entry, block) => {
    console.log('%s (%d) added to chain.', entry.rhash(), entry.height);
  });

  node.on('tx', (tx) => {
    console.log('%s added to mempool.', tx.txid());
  });

  node.pool.on('CMPCTBLOCK_PACKET', (packet, peer) => {
    console.log(Date.now());
    console.log('CMPCTBLOCK_PACKET!');
  });

  node.pool.on('PING_PACKET', (packet, peer) => {
    // console.log('packet:');
    // console.log(packet);
    // console.log(typeof packet);
    // console.log(Object.keys(packet))
    // console.log(Buffer.isBuffer(packet.nonce))
    // console.log(Object.keys(peer))
    // console.log(peer.address)
    // console.log(peer);
  });

  // node.startSync();
})();
