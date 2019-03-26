// import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { UserProvider } from "../user/user";
import * as moment from "moment";
import { Network } from "@ionic-native/network";

@Injectable()
export class MessageProvider {
	ws;
	messages: any = {};
	waitingMessages: any[] = [];
	userId: string = "";
	users: object = {};
	networkStatus: boolean = true;
	userAddedStatus = new BehaviorSubject<any>("");
	postAddedStatus = new BehaviorSubject<any>("");
	constructor(
		private storage: Storage,
		private userProvider: UserProvider,
		private network: Network
	) {
		this.network.onConnect().subscribe(
			data => {
				this.networkStatus = true;
			},
			error => console.error(error)
		);

		this.network.onDisconnect().subscribe(
			data => {
				this.networkStatus = false;
			},
			error => console.error(error)
		);

		if (this.userProvider.userInfo && this.userProvider.userInfo.emailId) {
			this.userId = this.userProvider.userInfo.emailId.replace("@", "_").trim();


			this.connect(this.userId);
		}
		this.storage
			.get("users")
			.then(data => {
				this.users = data;
				this.userAddedStatus.next(data);
			})
			.catch(err => {
				this.users = {};
			});
		this.storage
			.get("waiting_messages")
			.then(data => {
				this.waitingMessages = data;
				if (!(this.waitingMessages && this.waitingMessages.length > 0)) {
					this.waitingMessages = [];
				}
				//this.userAddedStatus.next( data );
			})
			.catch(err => {
				console.error("emptys");
				this.waitingMessages = [];
			});
		this.storage
			.get("messages")
			.then(data => {
				this.messages = data;
				//this.
				if (!this.messages["post"]) {
					this.messages["post"] = [];
				}
				this.postAddedStatus.next(data);
			})
			.catch(err => {
				console.error("emptys");
				this.messages = {};
				this.messages["post"] = [];
			});

		this.init();
		this.sendWaitingMessage();
	}

	sendWaitingMessage() {
		setInterval(() => {
			// alert("Hello");
			if (this.waitingMessages) {
				this.waitingMessages.forEach(message => {
					//this.ws.onopen =  ()=> {
					if (message.msg_type == "post") {
						if (this.networkStatus) {
							this.waitingMessages = this.waitingMessages.filter(
								msg =>
									msg.creatAt == message.creatAt &&
									msg.from == message.from &&
									msg.msg_type == message.msg_type &&
									msg.story == message.story &&
									msg.title == message.title
							);
						} else {
							this.ws.send(JSON.stringify(message));
						}
					} else {
						this.ws.send(JSON.stringify(message));
					}

					// alert("Message is sent...");
					//};
				});
			}
		}, 3000);
	}


	connect(userId) {
		// this.ws = new WebSocket("ws://192.168.1.56:8002", userId);
		// this.ws = new WebSocket('ws://192.168.1.8:8002', userId);
		this.ws = new WebSocket('ws://192.168.2.3:8002', userId);
		this.ws.onopen = () => {
			// subscribe to some channels
			// ws.send( JSON.stringify( {
			// 	//.... some message the I must send when I connect ....
			// } ) );
		};

		this.ws.onclose = (e) => {
			setTimeout(() => {
				this.connect(userId);
			}, 1000);
		};

		this.ws.onerror = function (err: any) {
			console.error('Socket encountered error: ', err.message, 'Closing socket');
			this.ws.close();
		};
	}


	init() {
		this.ws.onmessage = evt => {
			var received_msg = JSON.parse(evt.data);
			console.info("in recieve sending = ", received_msg);

			if (received_msg.msg_type == "dm") {
				this.saveUser(received_msg.senderInfo);
				this.getMessages(received_msg);
				//this.ws.onopen =  ()=> {
				let message: any = {};
				message.msg_type = "dr";
				message.from = this.userId;
				message.to = received_msg.from;
				message.text = "message recieved";
				message.senderInfo = this.userProvider.userInfo;
				message.original = received_msg;
				message.id = received_msg.id;
				this.ws.send(JSON.stringify(message));
				//};
			} else if (received_msg.msg_type == "dr") {
				this.saveUser(received_msg.senderInfo);
				this.waitingMessages = this.waitingMessages.filter(
					message => message == received_msg.original
				);
				this.storage.set("waiting_messages", this.waitingMessages);
			} else if (received_msg.msg_type == "post") {
				this.saveUser(received_msg.senderInfo);
				this.getPostMessages(received_msg);
			}
		};
	}

	sendMessage(message) {
		let user: any = {};
		user.emailId = message.to;
		this.saveUser(user)
			.then(data => {
				message.id = new Date().getMilliseconds();
				message.from = this.userId;
				message.to = message.to.replace("@", "_").trim();
				message.creatAt = new Date(moment(new Date()).format()).getTime();
				message.senderInfo = this.userProvider.userInfo;
				// message.isDelivered = false;
				//	this.ws.onopen =  ()=> {
				this.ws.send(JSON.stringify(message));

				// alert("Message is sent...");
				//	};
				this.getMessages(message);
				this.waitingMessages.push(message);
				this.storage.set("waiting_messages", this.waitingMessages);
				this.ws.onclose = () => {
					// websocket is closed.
					// alert("Connection is closed...");
				};
			})
			.catch(err => {
				console.error(err);
			});
	}

	sendPostMessage(message) {
		message.from = this.userId;
		message.id = new Date().getMilliseconds();//	message.to = message.to.replace( "@", "_" );
		message.creatAt = new Date(moment(new Date()).format()).getTime();
		message.senderInfo = this.userProvider.userInfo;
		// message.isDelivered = false;//	this.ws.onopen =  ()=> {
		this.ws.send(JSON.stringify(message));

		// alert("Message is sent...");
		//	};
		this.getPostMessages(message);
		//this.messages['post'].push(message);

		if (!this.networkStatus) {
			this.waitingMessages.push(message);
		}
		this.storage.set("waiting_messages", this.waitingMessages);
		this.ws.onclose = () => {
			// websocket is closed.
			// alert("Connection is closed...");
		};
	}

	saveUser(user): Promise<any> {
		return new Promise((resolve, reject) => {
			if (user.emailId !== this.userProvider.userInfo.emailId) {
				if (this.users && Object.keys(this.users).length > 0) {
					if (this.users[user.emailId]) {
						if (this.users[user.emailId] != user) {
							this.users[user.emailId] = user;
						}
						resolve();
					} else {
						this.users[user.emailId] = user;
						this.userAddedStatus.next(user);

						this.storage.set("users", this.users);
						resolve();
					}
				} else {
					this.users = {};
					this.storage
						.get("users")
						.then(val => {
							this.users = JSON.parse(val);

							if (Object.keys(this.users).length > 0) {
								if (this.users[user.emailId]) {
									if (this.users[user.emailId] != user) {
										this.users[user.emailId] = user;
									}
									resolve();
								} else {
									this.users[user.emailId] = user;
									this.userAddedStatus.next(user);

									this.storage.set("users", this.users);
									resolve();
								}
							} else {
								this.users[user.emailId] = user;
								this.userAddedStatus.next(user);
								this.storage.set("users", this.users);
								resolve();
							}
						})
						.catch(err => {
							this.users = {};
							this.users[user.emailId] = user;
							this.userAddedStatus.next(user);
							this.storage.set("users", this.users);
							resolve();
						});
				}
			}
		});
	}

	getMessages(message) {
		let messageId: string = "";
		if (message.to == this.userId) {
			messageId = message.from;
		} else {
			messageId = message.to;
		}
		if (this.messages && this.messages[messageId]) {
			let existingPost = this.messages[messageId].filter(element => element.id == message.id);
			if (existingPost.length < 1) {
				this.messages[messageId].push(message);
				this.storage.set("messages", this.messages);
			}
		} else {
			if (this.messages) {
				this.messages[messageId] = [];
				this.messages[messageId].push(message);
				this.storage.set("messages", this.messages);
			} else {
				this.storage
					.get("messages")
					.then(messages => {
						this.messages = messages;
						if (this.messages && this.messages[messageId]) {
							let existingPost = this.messages[messageId].filter(element => element.id == message.id);
							if (existingPost.length < 1) {
								this.messages[messageId].push(message);
								this.storage.set("messages", this.messages);
							}
						} else {
							this.messages = {};
							this.messages[messageId] = [];
							this.messages[messageId].push(message);
							this.storage.set("messages", this.messages);
						}
					})
					.catch(err => {
						console.error(err);
						this.messages[messageId] = [];
						this.messages[messageId].push(message);
						this.storage.set("messages", this.messages);
					});
			}
		}
	}

	getPostMessages(message) {
		if (this.messages && this.messages["post"]) {
			let existingPost = this.messages["post"].filter(element => element.id == message.id);
			if (existingPost.length < 1) {
				this.messages["post"].push(message);
				this.postAddedStatus.next(message);
				this.storage.set("messages", this.messages);
			}
		} else {
			if (this.messages && !this.messages["post"]) {
				this.messages["post"] = [];
				this.messages["post"] = message;
				this.postAddedStatus.next(message);
				this.storage.set("messages", this.messages);
			} else {
				this.storage
					.get("messages")
					.then(messages => {
						this.messages = messages;
						if (this.messages && this.messages["post"]) {
							let existingPost = this.messages["post"].filter(element => element.id == message.id);
							if (existingPost.length < 1) {
								this.messages["post"].push(message);
								this.postAddedStatus.next(message);
								this.storage.set("messages", this.messages);
							}
						} else {
							this.messages = {};
							this.messages["post"] = [];
							this.messages["post"].push(message);
							this.postAddedStatus.next(message);
							this.storage.set("messages", this.messages);
						}
					})
					.catch(err => {
						console.error(err);
						this.messages["post"] = [];
						this.messages["post"].push(message);
						this.postAddedStatus.next(message);
						this.storage.set("messages", this.messages);
					});
			}
		}
	}


	deleteMessage(message) {
		console.log(' msg  =', message);
		this.storage
			.get("messages")
			.then(messages => {
				this.messages = messages;
				if (message.msg_type == "post" && messages && messages["post"]) {
					let existingPost = this.messages["post"].filter(element => element.id == message.id);
					if (existingPost.length >= 1) {
						let i = this.messages["post"].indexOf(message, 0);
						this.messages["post"].splice(i, 1);
						this.storage.set("messages", this.messages);
					}
				} else {
					let messageId: string = "";
					if (message.to == this.userId) {
						messageId = message.from;
					} else {
						messageId = message.to;
					}
					let existingPost = this.messages[messageId].filter(element => element.id == message.id);
					if (existingPost.length >= 1) {
						let i = this.messages[messageId].indexOf(message, 0);
						this.messages[messageId].splice(i, 1);
						this.storage.set("messages", this.messages);
					}
				}
			})
			.catch(err => {
			});
	}
}
