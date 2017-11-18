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
var account_to = "0xa6681FF1D48813DdCd2e0061128a79B7C9acD8e5";

var contract_abi = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
var abiArray = contract_abi;
var contract = new web3.eth.Contract(abiArray, contract_address);

/* get balance */
contract.methods.balanceOf(account_from).call({from: account_from}, function(error, result){
	console.log(result);
});
