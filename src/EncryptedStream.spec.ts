import EncryptedStream from './EncryptedStream';
import { expect, assert } from 'chai';
import 'mocha';
const cleanup = require('jsdom-global')();

describe('EncryptedStream', () => {

	let streamA = null;
	let streamB = null;

	let synced = false;

	const random = () => Math.round(Math.random() * 1000000 + Math.random() * 1000 + 1).toString();

	it('should be able instantiate two unique streams', () => {
		streamA = new EncryptedStream("streamA", random());
		streamB = new EncryptedStream("streamB", random());
		streamB.onSync(() => this.synced = true)
	});

	it('should be able to sync the streams and trigger encryption', (done) => {
		streamA.sync("streamB", streamA.key);
		assert(streamA.synced);
		assert(streamB.synced);
		assert(this.synced);
		done();
	});

	it('should be able to send messages and receive them decrypted', (done) => {
		const payload = {test:'test'};
		streamB.listenWith((msg) => {
			assert(JSON.stringify(msg.payload) === JSON.stringify(payload))
			done();
		});
		streamA.send({payload}, "streamB");
	});

	it('should cleanup jsdom', () => {
		cleanup();
	})


});