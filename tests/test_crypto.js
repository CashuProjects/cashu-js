const { utils, Point } = require("@noble/secp256k1");
const dhke = require("../src/dhke");
const {
  splitAmount,
  bytesToNumber,
  hexToNumber,
  bigIntStringify,
  toUTF8Array,
} = require("../src/utils");

async function test_hash_to_curve() {
  let secret = utils.hexToBytes(
    "0000000000000000000000000000000000000000000000000000000000000000"
  );
  let Y = await dhke.hashToCurve(secret);
  hexY = Y.toHex((isCompressed = true));
  if (
    hexY !==
    "0266687aadf862bd776c8fc18b8e9f8e20089714856ee233b3902a591d0d5f2925"
  ) {
    console.error("ERROR");
  } else {
    console.log("SUCCESS");
  }

  secret = utils.hexToBytes(
    "0000000000000000000000000000000000000000000000000000000000000001"
  );
  Y = await dhke.hashToCurve(secret);
  hexY = Y.toHex((isCompressed = true));
  if (
    hexY !==
    "02ec4916dd28fc4c10d78e287ca5d9cc51ee1ae73cbfde08c6b37324cbfaac8bc5"
  ) {
    console.error("ERROR");
  } else {
    console.log("SUCCESS");
  }

  secret = utils.hexToBytes(
    "0000000000000000000000000000000000000000000000000000000000000002"
  );
  Y = await dhke.hashToCurve(secret);
  hexY = Y.toHex((isCompressed = true));
  if (
    hexY !==
    "02076c988b353fcbb748178ecb286bc9d0b4acf474d4ba31ba62334e46c97c416a"
  ) {
    console.error("ERROR");
    console.error(hexY);
  } else {
    console.log("SUCCESS");
  }
}

test_hash_to_curve();

async function test_step1() {
  var enc = new TextEncoder();
  let secretUInt8 = enc.encode("test_message");
  let { B_, r } = await dhke.step1Alice(
    secretUInt8,
    utils.hexToBytes(
      "0000000000000000000000000000000000000000000000000000000000000001"
    )
  );
  if (
    B_ !== "02a9acc1e48c25eeeb9289b5031cc57da9fe72f3fe2861d264bdc074209b107ba2"
  ) {
    console.error("ERROR");
    console.error(B_);
  } else {
    console.log("SUCCESS");
  }
}

test_step1();

async function test_step3() {
  // I had to delete the first two character "02" from here
  let C_ = Point.fromHex(
    "02a9acc1e48c25eeeb9289b5031cc57da9fe72f3fe2861d264bdc074209b107ba2"
  );
  let r = utils.hexToBytes(
    "0000000000000000000000000000000000000000000000000000000000000001"
  );
  let A = Point.fromHex(
    "020000000000000000000000000000000000000000000000000000000000000001"
  );
  let C = await dhke.step3Alice(C_, r, A);
  if (
    C.toHex(true) !==
    "03c724d7e6a5443b39ac8acf11f40420adc4f99a02e7cc1b57703d9391f6d129cd"
  ) {
    console.error("ERROR");
    console.error(C.toHex(true));
  } else {
    console.log("SUCCESS");
  }
}

test_step3();
