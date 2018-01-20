import LocalStream from './LocalStream';
import { expect, assert } from 'chai';
import 'mocha';

// Chrome message event bus stub
const chrome = {
	runtime:{
		id:'TEST',
		sendMessage:function(msg, cb){ this.onMessage.trigger(msg, cb) },
		onMessage:{
			messageQueue:[],
			trigger:function(data, cb) { this.messageQueue.push({data, cb}) },
			addListener:function(cb){
				setInterval(() => {
					if(this.messageQueue.length){
						let message = this.messageQueue.pop();
						cb({data:message.data}, {id:'TEST'}, message.cb)
					}
				}, 100)
			}
		}
	}
}

describe('LocalStream', () => {
	const testData = 'LocalStream Test';

	before(() => (<any>global).chrome = chrome);

	it('should be able to attach a watcher', () => {
		LocalStream.watch((request, sendResponse) => {
			// Just passing back the data
			sendResponse(request.data)
		});
	});

	it('should be able to send a message and get a response asynchronously', async () => {
		expect(await LocalStream.send(testData)).to.equal(testData);
	})

});