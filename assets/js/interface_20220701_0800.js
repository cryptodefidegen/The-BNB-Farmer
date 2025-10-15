var minersAddr = "0xa03b16b92c080c10485d6b91515c890c1ba66d2a"
var minersAbi = [{"inputs":[{"internalType":"address payable","name":"_dev1","type":"address"},{"internalType":"address payable","name":"_dev2","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"enabled","type":"bool"}],"name":"EmergencyModeChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"totalAmount","type":"uint256"}],"name":"FeePayed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dev","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"FeeTransferFailed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint8","name":"plan","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NewDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"}],"name":"Newbie","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":true,"internalType":"address","name":"referral","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RefBonus","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint8","name":"plan","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ReinvestedDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"address","name":"value","type":"address"}],"name":"CHANGE_OWNERSHIP","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"COMPOUND_COOLDOWN","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CUTOFF_STEP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MARKET_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_DEPOSITS_PER_USER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_WITHDRAW","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERCENTS_DIVIDER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PROJECT_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REFERRAL_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"SET_START_TIME","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TIME_STEP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WALLET_LIMIT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAW_COOLDOWN","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBlockTimeStamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"plan","type":"uint8"}],"name":"getPlanInfo","outputs":[{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"uint256","name":"percent","type":"uint256"},{"internalType":"uint256","name":"minimumInvestment","type":"uint256"},{"internalType":"uint256","name":"maximumInvestment","type":"uint256"},{"internalType":"uint256","name":"planTotalInvestorCount","type":"uint256"},{"internalType":"uint256","name":"planTotalInvestments","type":"uint256"},{"internalType":"uint256","name":"planTotalReInvestorCount","type":"uint256"},{"internalType":"uint256","name":"planTotalReInvestments","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPlansLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSiteInfo","outputs":[{"internalType":"uint256","name":"_totalInvested","type":"uint256"},{"internalType":"uint256","name":"_totalBonus","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"uint8","name":"plan","type":"uint8"}],"name":"getUserActiveInvestments","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserActiveProjectInvestments","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserAmountOfDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserAvailable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"uint8","name":"plan","type":"uint8"}],"name":"getUserCheckpoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserCutoff","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getUserDepositInfo","outputs":[{"internalType":"uint8","name":"plan","type":"uint8"},{"internalType":"uint256","name":"percent","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"finish","type":"uint256"},{"internalType":"bool","name":"reinvested","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"int8","name":"plan","type":"int8"}],"name":"getUserDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserInfo","outputs":[{"internalType":"uint256","name":"totalDeposit","type":"uint256"},{"internalType":"uint256","name":"totalWithdrawn","type":"uint256"},{"internalType":"uint256","name":"totalReferrals","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserReferralBonus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserReferralTotalBonus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserReferralWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserReferrer","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserTotalDeposits","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserTotalReferrals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserTotalReinvested","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserTotalWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"referrer","type":"address"},{"internalType":"uint8","name":"plan","type":"uint8"}],"name":"invest","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint8","name":"plan","type":"uint8"}],"name":"reinvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sendTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalInvested","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalInvestorCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalReInvested","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRefBonus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
var minersContract

var canSell = true
var canHatch = true

/*function approveBUSD(trx) {
  tokenContract.methods.approve(minersAddr, trx).send({ from: currentAddr })
}
function spendLimit(callback) {
  tokenContract.methods
    .allowance(currentAddr, minersAddr)
    .call()
    .then((result) => {
      callback(web3.utils.fromWei(result))
    })
    .catch((err) => {
      console.log(err)
    })invest
}
 */
function userBalance(callback) {
  web3.eth.getBalance(currentAddr).then(result => {
    callback(web3.utils.fromWei(result));
}).catch((err) => {
    console.log(err)
});
}

// Modified
function contractBalance(callback) {
  web3.eth.getBalance(minersAddr).then(result => {
    callback(web3.utils.fromWei(result));
}).catch((err) => {
    console.log(err)
});
}

// Done
function userTotalDeposits(callback) {
  minersContract.methods
    .getUserTotalDeposits(currentAddr)
    .call()
    .then((result) => {
      var amt = web3.utils.fromWei(result)
      // console.log("balance" + amt)
      callback(amt)
    })
    .catch((err) => {
      console.log(err)
    })
}

// Done
function totalInvested(callback) {
  minersContract.methods
    .totalInvested()
    .call()
    .then((result) => {
      //var amt = result
      var amt = web3.utils.fromWei(result)
      // console.log("balance" + amt)
      callback(amt)
    })
    .catch((err) => {
      console.log(err)
    })
}

// Done
function userAvailable(callback) {
  minersContract.methods
    .getUserAvailable(currentAddr)
    .call()
    .then((result) => {
      var amt = web3.utils.fromWei(result)
      callback(amt)
    })
    .catch((err) => {
      console.log(err)
    })
}

// Done, not working
function userAmountOfDeposits(callback) {
  minersContract.methods
    .getUserAmountOfDeposits(currentAddr)
    .call()
    .then((result) => {
      callback(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

// Done, needs inputs
function planInfo(callback) {
  minersContract.methods
    .getPlanInfo(_plan)
    .call()
    .then((result) => {
      callback(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

// Done, think working
function userTotalWithdrawn(callback) {
  minersContract.methods
    .getUserTotalWithdrawn(currentAddr)
    .call()
    .then((result) => {
      var amt = web3.utils.fromWei(result)
      callback(amt)
    })
    .catch((err) => {
      console.log(err)
    })
}

function userReferralTotalBonus(callback) {
  minersContract.methods
    .getUserReferralTotalBonus(currentAddr)
    .call()
    .then((result) => {
      var amt = web3.utils.fromWei(result)
      callback(amt)
    })
    .catch((err) => {
      console.log(err)
    })
}

function userTotalReferrals(callback) {
  minersContract.methods
    .getUserTotalReferrals(currentAddr)
    .call()
    .then((result) => {
      //var amt = web3.utils.fromWei(result)
      callback(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

function compoundCooldown(callback) {
  minersContract.methods
    .COMPOUND_COOLDOWN()
    .call()
    .then((result) => {
      callback(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

function withdrawCooldown(callback) {
  minersContract.methods
    .WITHDRAW_COOLDOWN()
    .call()
    .then((result) => {
      callback(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

function getUserDeposits(callback) {
  userAmountOfDeposits((result) => {
    if (result && result > 0) {
      const promises = []
      for (let i = 0; i < result; i++) {
        // console.log(`Query deposit ${i}`)
        promises.push(
          minersContract.methods.getUserDepositInfo(currentAddr, i).call()
        )
      }
      Promise.all(promises).then((deposits) => {
        // console.log(`Found all results`, deposits)
        callback(deposits)
      })
    } else {
      callback([])
    }
  })
}

function withdraw(callback) {
  if (canSell) {
    canSell = false
    console.log("Selling")
    minersContract.methods
      .withdraw()
      .send({ from: currentAddr })
      .then((result) => {
        callback()
      })
      .catch((err) => {
        console.log(err)
      })
    setTimeout(function () {
      canSell = true
    }, 10000)
  } else {
    console.log("Cannot sell yet...")
  }
}

function invest(ref, plan, trx, callback) {
  minersContract.methods
    .invest(ref, plan)
    .send({ from: currentAddr, value: trx })
    .then((result) => {
      callback()
    })
    .catch((err) => {
      console.log(err)
    })
}

function reinvest(plan) {
  minersContract.methods
    .reinvest(plan)
    .send({ from: currentAddr })
    .then((result) => {
      callback()
    })
    .catch((err) => {
      console.log(err)
    })
}

function UserCutoff(callback) {
  minersContract.methods
    .getUserCutoff(currentAddr)
    .call()
    .then((result) => {
      callback(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

function UserCheckpointPlan1(callback) {
  minersContract.methods
    .getUserCheckpoint(currentAddr, 0)
    .call()
    .then((result) => {
      callback(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

function UserCheckpointPlan2(callback) {
  minersContract.methods
    .getUserCheckpoint(currentAddr, 1)
    .call()
    .then((result) => {
      callback(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

function UserCheckpointPlan3(callback) {
  minersContract.methods
    .getUserCheckpoint(currentAddr, 2)
    .call()
    .then((result) => {
      callback(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

function UserCheckpointPlan4(callback) {
  minersContract.methods
    .getUserCheckpoint(currentAddr, 3)
    .call()
    .then((result) => {
      callback(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

function Plan1Info(callback) {
  minersContract.methods
    .getPlanInfo(0)
    .call()
    .then((result) => {
      callback(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

function StartTime(callback) {
  minersContract.methods
    .startTime()
    .call()
    .then((result) => {
      console.log(result)
      callback(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

// startTime

// function getUserDeposits(callback){
// 	userAmountOfDeposits((result) => {
// 		if (result && result > 0) {
// 			const promises = []
// 			for (let i=0; i<result; i++) {
// 				// console.log(`Query deposit ${i}`)
// 				promises.push(minersContract.methods.getUserDepositInfo(currentAddr, i).call())
// 			}
// 			Promise.all(promises).then(deposits => {
// 				// console.log(`Found all results`, deposits)
// 				callback(deposits)
// 			})
// 		} else {
// 			callback([])
// 		}
// 	})
// }
