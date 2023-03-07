const Inery = require('ineryjs');

const { Api, JsonRpc, JsSignatureProvider } = Inery;

const fetch = require('node-fetch');

const util = require('util');

const accountName = 'rizal21';

const privateKey = 'hsaoabwjkw';

const contract = 'value';

const action = 'set';

const data = {

  value: 42

};

const rpc = new JsonRpc('http://api.inery.io', { fetch });

const signatureProvider = new JsSignatureProvider([privateKey]);

const api = new Api({

  rpc,

  signatureProvider,

  textDecoder: new util.TextDecoder(),

  textEncoder: new util.TextEncoder(),

});

(async function() {

  try {

    const result = await api.transact({

      actions: [{

        account: accountName,

        name: action,

        authorization: [{

          actor: accountName,

          permission: 'active',

        }],

        data: data,

      }]

    }, {

      blocksBehind: 3,

      expireSeconds: 30,

    });

    console.log(result);

  } catch (e) {

    console.log(e);

  }

})();

