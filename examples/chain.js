'use strict';

const Chain = require('../lib/blockchain/chain');

const chain = new Chain({
  network: 'testnet'
});

(async () => {
  await chain.open();

  const entry = await chain.getEntry(0);
  const nextEntry = await chain.getEntry(1);
  const isFull = await chain.isFull();
  await chain.replay(1)

  console.log(entry);
  console.log(nextEntry);
  // console.log(chain.isGenesis(entry));
  console.log(isFull);
})();
