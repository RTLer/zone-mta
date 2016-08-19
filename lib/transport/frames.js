'use strict';

const msgpack = require('msgpack-js');
const snappy = require('snappy');

function parse(frame) {
    if (!frame || !frame.length) {
        return false;
    }

    console.log('RECEIVED %s', JSON.stringify(msgpack.decode(snappy.uncompressSync(frame))));
    return msgpack.decode(snappy.uncompressSync(frame));
}

function encode(data) {
    console.log('SENDING %s', JSON.stringify(data));
    let encoded = snappy.compressSync(msgpack.encode(data));
    let frame = Buffer.allocUnsafe(encoded.length + 4);
    frame.writeUInt32LE(encoded.length, 0);
    encoded.copy(frame, 4);
    return frame;
}

module.exports = {
    parse,
    encode
};