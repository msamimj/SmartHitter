class SmartHitter{

	constructor(){
		this.shQueue = [];
		this.shRunning = [];
	}

	isRunning(name){
		var response = false;
		for(var i = 0; i<this.shRunning.length && !response; i++){
			if(this.shRunning[i] == name){
				response = true;
			}
		}
		return response;
	}

	addToQueue(name, url, method, data){
		this.shQueue.push({
			name: name,
			url: url,
			method: method,
			data: data
		})
	}

	addToRunning(name){
		this.shRunning.push(name);
	}

	fetchFromServer(name, url, method, data){

		if(method=='POST'){
			return fetch(url, {
				method: 'POST',
				body: JSON.stringify(data)
			})
		}else{
			return fetch(url, {
				method: 'GET'
			})
		}
	}

	removeFromRunning(name){

		var response = false;
		for(var i=0; i<this.shRunning.length && !response; i++){
			if(this.shRunning[i]==name){
				this.shRunning.splice(i, 1);
				response = true
			}
		}
		return response;
	}

	inQueue(name){

		var response = false;
		for(var i = 0; i<this.shQueue.length && !response; i++){
			if(this.shQueue[i].name == name){
				response = true;
			}
		}
		return response;
	}

	callLatest(name){

		var achieved = false;
		var response = null;
		for(var i = this.shQueue.length-1; i >= 0; i--){
			if(this.shQueue[i].name==name){
				if(!achieved){
					achieved = true;
					response = this.hit(this.shQueue[i].name, this.shQueue[i].url, this.shQueue[i].method, this.shQueue[i].data);
					this.shQueue.splice(i, 1);
				}else{
					this.shQueue.splice(i, 1);
				}
			}
		}
		return response;
	}

	hit(name, url, method, data){

		if(this.isRunning(name)){
			this.addToQueue(name, url, method, data);
			return new Promise(function(resolve, reject){
				reject({
					errorMessage: 'In Queue'
				})
			})
		}else{
			this.addToRunning(name);
			return this.fetchFromServer(name, url, method, data).then((res)=>{
				this.removeFromRunning(name);
				if(this.inQueue(name)){
					return this.callLatest(name);
				}else{
					return res.json();
				}
			});
		}
	}
}

export default SmartHitter;