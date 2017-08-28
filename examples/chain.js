'use strict';

const Chain = require('../lib/blockchain/chain');

const chain = new Chain({
  network: 'testnet'
});

(async () => {
  await chain.open();

  const entry = await chain.getEntry(0);
  const isFull = await chain.isFull();

  console.log(entry);
  console.log(isFull);
})();
