# cashu-js

`cashu-js` is an npm package for building Cashu ecash wallets.

Cashu is an Ecash implementation based on David Wagner's variant of Chaumian blinding. Token logic based on [minicash](https://github.com/phyro/minicash) ([description](https://gist.github.com/phyro/935badc682057f418842c72961cf096c)) which implements a [Blind Diffie-Hellman Key Exchange](https://cypherpunks.venona.com/date/1996/03/msg01848.html) scheme written down by Ruben Somsen [here](https://gist.github.com/RubenSomsen/be7a4760dd4596d06963d67baf140406).

### Progress
- [x] Request mint
- [x] Mint tokens
- [x] Split tokens
- [x] Send tokens
- [x] Receive tokens
- [x] Melt tokens
- [x] Check spendable
- [x] Check fees
- [x] Keysets
- [x] Local storage
- [x] Serialize tokens V1
- [x] Serialize tokens V2
- [x] LNURL-pay


### Running and testing the client

You need a Cashu mint for testing. If you don't already have one, follow the instructions below to set one up. Then we will run the JS code in this repo.

##### Set up a mint
Install the [Cashu Python mint](https://github.com/cashubtc/cashu) and run the server on `localhost:3338`. Don't be afraid. This is a quick an easy process if you follow the instructions carefully.


Run the mint: 

```sh
LIGHTNING=FALSE poetry run mint
```

Here we made sure to disable Lightning for testing purposes, otherwise the mint will demand a Lightning payment (set `LIGHTNING=FALSE` in `.env` file to disable it permanently). 

#### Set up cashu-js 

Clone this repository and install the dependencies:

```sh
git clone https://github.com/cashubtc/cashu-js-wallet.git
npm install
```

##### Mint tokens and receive Lightnign invoices
Get a Lightning invoice:

```sh
node src/index.js invoice 420
```

Save the `<invoice_hash>` for the next step (or compute it yourself from the bolt11 invoice). Note: This step will fail if you've set `LIGHTNING=FALSE` in the mint. Just skip to the next step if so. 

After paying it, enter:

```sh
node src/index.js invoice 420 <invoice_hash>
```
Where `<invoice_hash>` is the hash of the bolt11 invoice. Note: If you've set `LIGHTNING=FALSE` in the mint, you can use any `invoice_hash` you want here.

##### Melt tokens and pay Lightnign invoices

```sh
node src/index.js pay <invoice>
```

##### Send tokens

```sh
node src/index.js send 69
```

##### Receive tokens

```sh
node src/index.js receive W3siaWQiOiJEU0FsOW52dnlm...
```

##### Receive tokens

```sh
node src/index.js receive W3siaWQiOiJEU0FsOW52dnlm...
```

##### Run tests
```sh
node test/test_crypto.js
```

## Use in browser

Install browserify and other packages using `npm install --save-dev` and run

```sh
browserify -p common-shakeify src/wallet.js -o dist/bundle.js
node_modules/terser/bin/terser  -c toplevel,sequences=false --mangle -- dist/bundle.js > dist/bundle.min.js
```

Check the [/dist](/dist/) directory for an example HTML.