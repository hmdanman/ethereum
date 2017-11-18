/*
npm install web3
npm install ethereumjs-tx
node test.js
*/

var web3 = require('web3');
var EthereumTx = require('ethereumjs-tx');

web3 = new web3(new web3.providers.HttpProvider("http://localhost:8545"));

/* constants */
var contract_address = "0x8a93de15bb66446c4d0bf196633a70982c35aa43"; // smart contract
var account_from = "0x7c065c3068d27ae3d1b04129333414d37c5ad076";
var account_password = "dasistmeinpasswort";
var account_private_key = "f1d77f0323979f2c8368b6d8a15e4461cf3df022c754d4a264b5b36b57068606"; // keystore file -> myetherwallet -> private key
var account_to = "0xa6681FF1D48813DdCd2e0061128a79B7C9acD8e5";
var amount = 1;

/* unlock account */
web3.eth.personal.unlockAccount(account_from, account_password, 60, function (error, result) {

	var contract_abi = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
	var gasLimit = 3000000; // genesis wert
	var chainId = 999;

	/* fillup variables */
	var abiArray = contract_abi;
	var contract = new web3.eth.Contract(abiArray, contract_address);
	// contract.methods.balanceOf(account_from).call().then(console.log).catch(console.error);
	
	// 
	contract.methods.balanceOf(account_from).call(balanceOf).then(console.log("balanceOf")).catch(console.error);
	
	var contract_data = contract.methods.transfer(account_to, amount).send({from: account_from}).then(console.log).catch(console.error);
	var gasPrice = web3.eth.gasPrice;
	var gasPrice = 0;
	console.log("gasPrice: " + gasPrice);

	/* transfer token */
	web3.eth.getTransactionCount(account_from).then(function(count){	

		count = count + 3;
	
		console.log("count: " + count);
	
		var rawTransaction = {		
		  from: account_from,
		  nonce: web3.utils.toHex(count),		  
		  gasPrice: web3.utils.toHex(gasPrice),
		  gasLimit: web3.utils.toHex(gasLimit),
		  to: contract_address,
		  value: 0,
		  data: web3.utils.toHex(contract_data),
		  chainId: chainId
		};
		
		var privateKey = new Buffer(account_private_key, 'hex')
		var tx = new EthereumTx(rawTransaction)
		tx.sign(privateKey);
		var serializedTx = tx.serialize();

		console.log("sendSignedTransaction");
		
		web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
		  if (!err)
			  console.log(hash);
		  else
			  console.log(err);
		});	
		
		
	});

});


