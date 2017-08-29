'use strict';
const fs = require('fs')

const FullNode = require('../lib/node/fullnode');
const util = require('../lib/utils/util');
const NetAddress = require('../lib/primitives/netaddress');

const node = new FullNode({
  // network : 'testnet',
  db: 'leveldb',
  // workers: true
});

(async () => {
  // console.log(node.pool.hosts.size())
  await node.open();
  // console.log(node.pool.hosts.size())
  await node.connect();
  console.log('after connect:', node.pool.hosts.size())
  // let hehe = await node.chain.db.getTip()
  // let b1 = await node.chain.getEntry(481900);
  // let b2 = await node.chain.getEntry(481810);
  // let b3 = await node.chain.getEntry(481710);
  // let inv1 = b1.toInv()
  // let inv2 = b2.toInv()
  // let inv3 = b3.toInv()
  // // console.log(hehe);
  // console.log(util.revHex(inv1.hash))
  // console.log(util.revHex(inv2.hash))
  // console.log(util.revHex(inv3.hash))

  // let hashes = []
  //
  // for (var i = 0; i < 100; i++) {
  //   let height = 481700 + i
  //   let b = await node.chain.getEntry(height);
  //   let inv = b.toInv()
  //   let hash = util.revHex(inv.hash)
  //   // console.log(hash)
  //   hashes.push(hash)
  // }
  // console.log('after loop');

  // try {
  //   console.log(hashes.length);
  //   const newFileContent = JSON.stringify(hashes)
  //   fs.writeFileSync(__dirname + '/hashes.json', newFileContent, 'utf8') // synchronous
  // } catch (e) {
  //   console.log(e);
  // }
  // console.log('> File rewrite');

  node.on('connect', (entry, block) => {
    console.log('%s (%d) added to chain.', entry.rhash(), entry.height);
  });

  node.on('tx', (tx) => {
    // console.log('%s added to mempool.', tx.txid());
  });

  node.startSync();

  node.pool.hosts.reset()
  node.pool.peers.destroy()
  // node.pool.hosts.reset()


  console.log('after destroy&reset:', node.pool.hosts.size())

  setTimeout(() => {
    console.log('later...', node.pool.hosts.size())
  }, 5000)


  // try {
  //   let addr = new NetAddress({
  //    //  services: 1,
  //     host: "163.172.42.186",
  //     port: 8333,
  //     time: util.now()
  //   })
  //   node.pool.createOutbound(addr)
  // }
  // catch (e) {
  //   console.error(e);
  // }



})();
