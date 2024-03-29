$(document).ready(function () {
     //   connect the contract with window
    const ABI = [
        {
          inputs: [],
          name: "deposit",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "getAddress",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getBalance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address payable",
              name: "_to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_amount",
              type: "uint256",
            },
          ],
          name: "withdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
    ];
    const contractAddress = "0xBE6a9987C263FC582cd488134b99D69411e2Dd2b";

    const handleLogin = async () => {
      var userStatus;
      try {
          const accounts = await ethereum.request({method: "eth_requestAccounts"});
          userStatus = accounts[0];
          $('#displayPage').show();
          $('#loginButton').hide();
      } catch (error) {
          if(userStatus === undefined)
          {
              $('#loginButton').show();
          }
      }
    }

    // login starts
    handleLogin();

    $('#loginButton').on('click',function(e){
      e.preventDefault();
      location.reload();
    });

    // login ends
    if (typeof window.ethereum !== "undefined") {
      console.log("Metamask is installed");
    } else {
      console.error("please install Metamask to use this app");
    }
  
    const displayBalance = async () => {
      window.web3 = await new Web3(window.ethereum);
      window.contract = await new window.web3.eth.Contract(ABI, contractAddress);
  
      // display the current balance in the smart contract
      const balance = await window.contract.methods.getBalance().call();
      const ETHBalance = window.web3.utils.fromWei(balance, "ether");
  
  
      $("#etherBalance")
        .empty()
        .append("(" + ETHBalance + " ETH)");
    };
  
    const depositEtherToContract = async (price) => {
      //   connect the contract with window
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      account = accounts[0];
      window.web3 = new Web3(window.ethereum);
      window.contract = await new window.web3.eth.Contract(ABI, contractAddress);
      const priceWei = window.web3.utils.toWei(String(price), 'ether');
      // deposit the amount in to the contract
      await window.contract.methods
        .deposit()
        .send({ from: account, value: priceWei });
      return true;
    };
  
    $(".purchase").on("click", function () {
      // get the price
      var price = "0.00001";
      depositEtherToContract(price);
    });
  
    if (document.getElementById("redeemEther")) {
      displayBalance();
    }
  
    const connectMetamask = async () => {
      if (window.ethereum !== undefined) {
          const accounts = await ethereum.request({ method: "eth_requestAccounts" });
          account = accounts[0];
          document.getElementById("userArea").innerHTML = `User Account: ${account}`;
      }else{
        ethereum.request({ method: 'eth_requestAccounts' });
      }
    }

    const connectContract = async () => {
      window.web3 = new Web3(window.ethereum);
      window.contract = await new window.web3.eth.Contract(ABI, contractAddress);
      document.getElementById("contractArea").innerHTML = "Connected to Contract"; // calling the elementID above
    }

    const getContractAccount = async () => {
      const data = await window.contract.methods.getAddress().call();
      document.getElementById("contractAccount").innerHTML = `Contract Account: ${data}`;
    }

    const getBalance = async () => { // const getBalance is the HTML function & .contract.getBalance is the smart contract function
      const data = await window.contract.methods.getBalance().call();
      const ETHBalance = window.web3.utils.fromWei(data, "ether");
      document.getElementById("balanceArea").innerHTML = `Contract Balance: ${ETHBalance} ETH`;
    }

    const depositContract = async () => {
      const amount = document.getElementById("depositInput").value;
      const amountInWei = window.web3.utils.toWei(amount, "ether");
      await window.contract.methods.deposit().send({ from: account, value: amountInWei });
    }

    const withdraw = async () => {
      const amount = document.getElementById("amountInput").value;
      const address = document.getElementById("addressInput").value;
      // Convert amount to Wei
      const amountInWei = window.web3.utils.toWei(amount, "ether");
      await window.contract.methods.withdraw(address, amountInWei).send({ from: account });
    }



    $('#connectMetamask').on('click', function(e) {
      e.preventDefault();
      connectMetamask();

    });

    $('#connectContract').on('click', function(e) {
      e.preventDefault();
      connectContract();

    });

    $('#getContractAccount').on('click', function(e) {
      e.preventDefault();
      getContractAccount();

    });

    $('#getBalance').on('click', function(e) {
      e.preventDefault();
      getBalance();
    });

    $('#depositContract').on('click', function(e) {
      e.preventDefault();
      depositContract();

    });

    $('#withdraw').on('click', function(e) {
      e.preventDefault();
      withdraw();
    });

  });
  