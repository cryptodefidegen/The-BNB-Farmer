var modal
var modalContent
var lastNumEggs = -1
var modalID = 0
var baseNum = ""
var spend
var usrBal

let currentAddr = null;
let connecting = false;

window.addEventListener("load", async function () {
  if (typeof window.ethereum !== "undefined") {
    console.log("🦊 MetaMask detected.");

    window.web3 = new Web3(window.ethereum);

    try {
      // ✅ Request wallet connection (modern way)
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      const chainId = await ethereum.request({ method: "eth_chainId" });

      // ✅ Store user address
      currentAddr = accounts[0];
      console.log("✅ Connected wallet:", currentAddr);
      console.log("🌐 Current Chain ID:", chainId);

      // ✅ Initialize contract
      minersContract = new web3.eth.Contract(minersAbi, minersAddr);
      // tokenContract = new web3.eth.Contract(tokenAbi, tokenAddr);

      // ✅ Kick off your control loops
      setTimeout(() => {
        controlLoop();
        controlLoopFaster();
      }, 1000);

      // ✅ Handle account or network changes live
      ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
          console.log("⚠️ Wallet disconnected");
        } else {
          currentAddr = accounts[0];
          console.log("🔄 Account changed:", currentAddr);
          // You could recall your contract functions here if needed
        }
      });

      ethereum.on("chainChanged", (chainId) => {
        console.log("🔄 Network changed to:", chainId);
        window.location.reload(); // refresh the DApp to reload data
      });

    } catch (error) {
      if (error.code === 4001) {
        console.warn("❌ User rejected connection request");
      } else {
        console.error("❌ MetaMask connection error:", error);
      }
    }

  } else if (window.web3) {
    // ✅ Legacy dApp browsers (very old versions)
    console.log("🧓 Legacy web3 provider detected.");
    window.web3 = new Web3(web3.currentProvider);
    minersContract = new web3.eth.Contract(minersAbi, minersAddr);
    // tokenContract = new web3.eth.Contract(tokenAbi, tokenAddr);
    const accounts = await web3.eth.getAccounts();
    currentAddr = accounts[0];
    console.log("✅ Connected wallet:", currentAddr);

    setTimeout(() => {
      controlLoop();
      controlLoopFaster();
    }, 1000);

  } else {
    console.warn("❌ No Ethereum provider detected. Please install MetaMask.");
    alert("Please install MetaMask to use this DApp.");
  }
});


async function connect() {
  if (connecting) {
    console.log("⚠️ Connection already in progress...");
    return;
  }

  if (typeof window.ethereum === "undefined") {
    alert("MetaMask not detected. Please install it.");
    return;
  }

  console.log("🔗 Connecting to wallet...");
  connecting = true;
  $("#enableMetamask").attr("disabled", true);

  try {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    console.log("Accounts returned:", accounts);

    if (!accounts || accounts.length === 0) {
      console.log("⚠️ Please connect to MetaMask.");
      $("#enableMetamask").html("Connect MetaMask");
      return;
    }

    currentAddr = accounts[0];
    console.log("✅ Wallet connected =", currentAddr);

    // Set referral link
    myReferralLink(currentAddr);

    const shortenedAccount = `${currentAddr.substring(0, 5)}***${currentAddr.substring(currentAddr.length - 4)}`;
    $("#enableMetamask").html(shortenedAccount);
    $(".withdraw-btn").prop("disabled", false);

  } catch (err) {
    console.error("❌ MetaMask connection error:", err);
    if (err.code === -32002) {
      alert("A MetaMask connection request is already pending.\nPlease open MetaMask and approve it.");
    } else if (err.code === 4001) {
      alert("You rejected the connection request.");
    }
  } finally {
    $("#enableMetamask").attr("disabled", false);
    connecting = false;
  }
}

async function autoConnect() {
  if (typeof window.ethereum === "undefined") return;

  try {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts && accounts.length > 0) {
      currentAddr = accounts[0];
      console.log("🔁 Auto-connected:", currentAddr);

      myReferralLink(currentAddr);

      const shortenedAccount = `${currentAddr.substring(0, 5)}***${currentAddr.substring(currentAddr.length - 4)}`;
      $("#enableMetamask").html(shortenedAccount);
      $(".withdraw-btn").prop("disabled", false);
    } else {
      console.log("🕓 No connected account found, waiting for user...");
      $("#enableMetamask").html("Connect MetaMask");
    }
  } catch (error) {
    console.error("Auto-connect failed:", error);
  }
}

window.addEventListener("load", async () => {
  console.log("✅ DOM fully loaded");
  await autoConnect();
  await loadWeb3();
});

async function loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    $("#enableMetamask").attr("disabled", false);

    // Don't call connect() here — handled by autoConnect
    setTimeout(() => {
      controlLoop();
      controlLoopFaster();
    }, 1000);
  } else {
    $("#enableMetamask").attr("disabled", true);
    alert("Please install MetaMask.");
  }
}

$("#enableMetamask").on("click", connect);



function copyRef() {
  const refDisplay = document.getElementById("reflink");
  const textToCopy = refDisplay?.textContent?.trim();

  console.log("copyRef() called — current referral text:", textToCopy);

  if (!textToCopy) {
    $("#copied").html("<i class='ri-error-warning-line'></i> No referral link yet!");
    return;
  }

  navigator.clipboard.writeText(textToCopy).then(() => {
    $("#copied").html("<i class='ri-checkbox-circle-line'></i> Copied!");
    setTimeout(() => $("#copied").html(""), 2000);
  });
}

function myReferralLink(address) {
  console.log("myReferralLink() called with:", address);

  if (!address) {
    console.warn("⚠️ address is empty or undefined!");
    return;
  }

  const link = window.location.origin + "/index.html?ref=" + address;
  console.log("Generated link:", link);

  const refDisplay = document.getElementById("reflink");
  if (!refDisplay) {
    console.error("❌ Element #reflink not found!");
    return;
  }

  refDisplay.textContent = link;
  console.log("✅ Referral link set:", refDisplay.textContent);
}

function controlLoop() {
  refreshAllData()
  setTimeout(controlLoop, 1000)
}
function controlLoopFaster() {
  setTimeout(controlLoopFaster, 30)
}

function stripDecimals(str, num) {
  if (str.indexOf(".") > -1) {
    var left = str.split(".")[0]
    var right = str.split(".")[1]
    return left + "." + right.slice(0, num)
  } else {
    return str
  }
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function populateContractBalance() {
  var balanceElem = document.getElementById("contract-balance")
  var baseNum = 0
  contractBalance(function (result) {
    rawStr = Number(result).toFixed(5)
    balanceElem.textContent = rawStr

    // rawStr = numberWithCommas(Number(result).toFixed(5))
    // if (balanceElem) balanceElem.textContent = stripDecimals(rawStr, 5)
  })
}

function populateUserDeposits() {
  // UserTotalDeposits
  var userDepositElem = document.getElementById("user-deposits")
  var baseNum = 0
  userTotalDeposits(function (result) {
    rawStr = Number(result).toFixed(5)
    userDepositElem.textContent = rawStr
    // rawStr = numberWithCommas(Number(result).toFixed(5))
    // if (userDepositElem) userDepositElem.textContent = rawStr
  })
}

function populateTotalInvested() {
  // UserTotalDeposits
  var investedElem = document.getElementById("total-invested")
  var baseNum = 0
  totalInvested(function (result) {
    rawStr = Number(result).toFixed(5)
    investedElem.textContent = rawStr

    // rawStr = numberWithCommas(Number(result).toFixed(5))
    // if (investedElem) investedElem.textContent = stripDecimals(rawStr, 5)
  })
}

function populateUserAvailable() {
  // UserTotalDeposits
  var userAvailableElem = document.getElementById("user-available")
  userAvailable(function (result) {
    rawStr = Number(result).toFixed(5)
    if (userAvailableElem) userAvailableElem.textContent = stripDecimals(rawStr)
  })
}

function populateUserUserTotalWithdrawn() {
  var userTotalWithdrawnElem = document.getElementById("user-total-withdrawn")
  userTotalWithdrawn(function (result) {
    rawStr = Number(result).toFixed(5)
    if (userTotalWithdrawnElem) userTotalWithdrawnElem.textContent = stripDecimals(rawStr)
  })
}

function populateUserReferralTotalBonus() {
  var userReferralTotalBonusElem = document.getElementById("user-referral-total-bonus")
  userReferralTotalBonus(function (result) {
    rawStr = Number(result).toFixed(5)
    if (userReferralTotalBonusElem) userReferralTotalBonusElem.textContent = stripDecimals(rawStr)
  })
}

function populateUserTotalReferrals() {
  var userTotalReferralsElem = document.getElementById("user-total-referrals")
  userTotalReferrals(function (result) {
    rawStr = Number(result).toFixed(5)
    if (userTotalReferralsElem) userTotalReferralsElem.textContent = rawStr
  })
}

// function populateSpendLimit() {
//   var spentLimitElem = document.getElementById("spend-limit")
//   spendLimit(function (result) {
//     rawStr = Number(result).toFixed(2)
//     if (spentLimitElem) spentLimitElem.textContent = rawStr
//   })
// }

function populateUserBalance() {
  var userBalanceElem = document.getElementById("user-balance")
  userBalance(function (result) {
    rawStr = Number(result).toFixed(5)
    if (userBalanceElem) userBalanceElem.textContent = rawStr
  })
}

function populateUserCutOff() {
  var usercutoffElem = document.getElementById("user-cutoff")
  UserCutoff(function (result) {
    const cutOff = new Date(result * 1000)
    textStr = returnDHMRemaining(cutOff)
    if (usercutoffElem) usercutoffElem.textContent = textStr
  })
}

function returnDHMRemaining(futureDate) {
  var today = new Date()

  if (futureDate > today) {
    var diffMs = futureDate - today // milliseconds between now & cutoff
    var diffDays = Math.floor(diffMs / 86400000) // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000) // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000) // minutes
    textStr = diffDays + "d " + diffHrs + "h " + diffMins + "m"
  } else {
    textStr = "Now"
  }
  return textStr
}

var checkPointPlan1 = new Date()
var compoundCooldownValue = 0
function populateUserCheckpointPlan1() {
  var usercheckpoint1Elem = document.getElementById("user-checkpoint-1")

  UserCheckpointPlan1(function (result) {
    checkPointPlan1 = new Date(result * 1000)
  })

  compoundCooldown(function (result) {
    compoundCooldownValue = result
  })

  var nextCompoundPlan1 = new Date(
    checkPointPlan1.getTime() + 1000 * parseInt(compoundCooldownValue)
  )

  textStr = returnDHMRemaining(nextCompoundPlan1)
  if (usercheckpoint1Elem) usercheckpoint1Elem.textContent = textStr
}

var checkPointPlan2 = new Date()
var compoundCooldownValue = 0
function populateUserCheckpointPlan2() {
  var usercheckpoint2Elem = document.getElementById("user-checkpoint-2")

  UserCheckpointPlan2(function (result) {
    checkPointPlan2 = new Date(result * 1000)
  })

  compoundCooldown(function (result) {
    compoundCooldownValue = result
  })

  var nextCompoundPlan2 = new Date(
    checkPointPlan2.getTime() + 1000 * parseInt(compoundCooldownValue)
  )

  textStr = returnDHMRemaining(nextCompoundPlan2)
  if (usercheckpoint2Elem) usercheckpoint2Elem.textContent = textStr
}

var checkPointPlan3 = new Date()
var compoundCooldownValue = 0
function populateUserCheckpointPlan3() {
  var usercheckpoint3Elem = document.getElementById("user-checkpoint-3")

  UserCheckpointPlan3(function (result) {
    checkPointPlan3 = new Date(result * 1000)
  })

  compoundCooldown(function (result) {
    compoundCooldownValue = result
  })

  var nextCompoundPlan3 = new Date(
    checkPointPlan3.getTime() + 1000 * parseInt(compoundCooldownValue)
  )

  textStr = returnDHMRemaining(nextCompoundPlan3)
  if (usercheckpoint3Elem) usercheckpoint3Elem.textContent = textStr
}

var withdrawCooldownValue = 0
function populateUserWithdrawCountdown() {
  var userwithdrawElem = document.getElementById("user-withdraw-countdown")

  UserCheckpointPlan1(function (result) {
    checkPointPlan1 = new Date(result * 1000)
  })

  UserCheckpointPlan2(function (result) {
    checkPointPlan2 = new Date(result * 1000)
  })

  UserCheckpointPlan3(function (result) {
    checkPointPlan3 = new Date(result * 1000)
  })

  withdrawCooldown(function (result) {
    withdrawCooldownValue = result
  })
  //console.log(withdrawCooldownValue);

  var maxCheckpointDate = new Date()
  if (checkPointPlan1 > checkPointPlan2) {
    maxCheckpointDate = checkPointPlan1
  } else {
    maxCheckpointDate = checkPointPlan2
  }

  if (checkPointPlan3 > maxCheckpointDate) {
    maxCheckpointDate = checkPointPlan3
  }
  //console.log(maxCheckpointDate);

  var nextWithdraw = new Date(maxCheckpointDate.getTime() + 1000 * parseInt(withdrawCooldownValue))

  textStr = returnDHMRemaining(nextWithdraw)
  //console.log(textStr);
  if (userwithdrawElem) userwithdrawElem.textContent = textStr
}

function populatePlan1Info() {
  //var usercutoffElem = document.getElementById('user-cutoff');
  var plan1Table = document.getElementById("plan1-info")
  var plan1TableBody = document.getElementById("plan1-info").getElementsByTagName("tbody")[0]
  Plan1Info(function (result) {
    //console.log(result);
    let time = result["time"]
    let percent = result["percent"]
    let minimumInvestment = result["minimumInvestment"]
    let maximumInvestment = result["maximumInvestment"]
    let planTotalInvestorCount = result["planTotalInvestorCount"]
    let planTotalInvestment = result["planTotalInvestments"]
    let planTotalReInvestorCount = result["planTotalReInvestoryCount"]
    let planReInvestments = result["planTotalReInvestments"]

    var rowCount = plan1TableBody.rows.length
    for (var i = rowCount - 1; i >= 0; i--) {
      plan1TableBody.deleteRow(i)
    }

    const newRow = plan1TableBody.insertRow(plan1TableBody.rows.length)
    newRow.innerHTML = `
        <tr>
            <td>Investors</td><td>${planTotalInvestorCount + planTotalReInvestorCount}</td>
        </tr>
        `

    const newRow2 = plan1TableBody.insertRow(plan1TableBody.rows.length)
    newRow2.innerHTML = `
        <tr>
            <td>Invested</td><td>${planTotalInvestment + planReInvestments}</td>
        </tr>
        `

    // const newRow3 = plan1TableBody.insertRow(plan1TableBody.rows.length);
    // newRow3.innerHTML = `
    // <tr>
    //     <td>Max</td><td>${Number((maximumInvestment * 10 ** -18).toFixed(0))} BUSD</td>
    // </tr>
    // `;

    // <tr>
    //     <td>${percent / 10}%</td>
    //     <td>${Number((minimumInvestment * 10 ** -18).toFixed(2))} BUSD</td>
    //     <td>${Number((maximumInvestment * 10 ** -18).toFixed(2))} BUSD</td>
    //     <td>${planTotalInvestorCount}</td>
    //     <td>${planTotalInvestment}</td>
    //     <td>${planTotalReInvestorCount}</td>
    //     <td>${planReInvestments}</td>
    // </tr>

    //const serializedResult = JSON.parse(result);
    //console.log(serializedResult);
    // if (usercutoffElem)
    //     usercutoffElem.textContent = textStr;
  })
}
//   time   uint256 :  90
//   percent   uint256 :  25
//   minimumInvestment   uint256 :  40000000000000000000
//   maximumInvestment   uint256 :  8000000000000000000000
//   planTotalInvestorCount   uint256 :  0
//   planTotalInvestments   uint256 :  0
//   planTotalReInvestorCount   uint256 :  0
//   planTotalReInvestments   uint256 :  0
//   planActivated   bool :  true

function populateDepositTable() {
  var depositsTable = document.getElementById("table-deposits")
  var depositsTableBody = document.getElementById("table-deposits").getElementsByTagName("tbody")[0]
  if (depositsTable) {
    getUserDeposits(function (results) {
      // console.log(`Deposits = `, results)
      var rowCount = depositsTable.rows.length
      for (var i = rowCount - 1; i > 0; i--) {
        depositsTable.deleteRow(i)
      }
      results.forEach(deposit => {
        var today = new Date()
        var dateEndNonLocale = new Date(deposit.finish * 1000)

        const dateStart = new Date(deposit.start * 1000).toLocaleString()
        const dateEnd = new Date(deposit.finish * 1000).toLocaleString()

        var diffMs = dateEndNonLocale - today // milliseconds between now & cutoff
        var diffDays = Math.floor(diffMs / 86400000) // days
        var diffHrs = Math.floor((diffMs % 86400000) / 3600000) // hours
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000) // minutes
        textStr = diffDays + " days"

        const reinvested = deposit.reinvested
        const newRow = depositsTableBody.insertRow(depositsTableBody.rows.length)
        newRow.innerHTML = `
                <tr>
                    <td>Plan ${+deposit.plan + 1}</td>
                    <td>${deposit.percent / 10}%</td>
                    <td>${Number((deposit.amount * 10 ** -18).toFixed(8))} BNB</td>
                    <td>${textStr}</td>
                    <td>${reinvested}</td>
                </tr>`
      })

      if (results && results.length > 0) {
        //console.log(`Display deposits div`)
        // document.getElementById("div-deposits").style.display = "block"
      }
    })
  }
}

var startTime = new Date()
// var compoundCooldownValue = 0;
function populateStartTime() {
  var startTimeElem = document.getElementById("start-time")

  StartTime(function (result) {
    startTime = new Date(result * 1000)
  })

  var timeTillStart = new Date(startTime)

  textStr = returnDHMRemaining(timeTillStart)
  if (startTimeElem) startTimeElem.textContent = textStr
}

function refreshAllData() {
  populateContractBalance()
  populateUserDeposits()
  populateTotalInvested()
  populateUserAvailable()
  populateUserUserTotalWithdrawn()
  populateUserReferralTotalBonus()
  populateUserTotalReferrals()
  // populateSpendLimit()
  populateUserBalance()
  populateUserCutOff()

  populateUserCheckpointPlan1()
  populateUserCheckpointPlan2()
  populateUserCheckpointPlan3()

  populateUserWithdrawCountdown()
  populateDepositTable()
  populateStartTime()
  //populatePlan1Info();
}

// Invest Functions on Buttons

function investInPlan1() {
  var trxspenddoc = document.getElementById("eth-to-spend1")
  ref = getQueryVariable("ref")
  plan = 1 - 1
  console.log("REF:" + ref)
  if (!web3.utils.isAddress(ref)) {
    ref = defaultAdd
  }
  var bnb = trxspenddoc.value
  var amt = web3.utils.toWei(bnb)
  console.log(amt)
  invest(ref, plan, amt, function () {
    displayTransactionMessage()
  })
}

function investInPlan2() {
  var trxspenddoc = document.getElementById("eth-to-spend2")
  ref = getQueryVariable("ref")
  plan = 2 - 1
  console.log("REF:" + ref)
  if (!web3.utils.isAddress(ref)) {
    ref = defaultAdd
  }
  var bnb = trxspenddoc.value
  var amt = web3.utils.toWei(bnb)
  console.log(amt)
  invest(ref, plan, amt, function () {
    displayTransactionMessage()
  })
}

function investInPlan3() {
  var trxspenddoc = document.getElementById("eth-to-spend3")
  ref = getQueryVariable("ref")
  plan = 3 - 1
  console.log("REF:" + ref)
  if (!web3.utils.isAddress(ref)) {
    ref = defaultAdd
  }
  var bnb = trxspenddoc.value
  var amt = web3.utils.toWei(bnb)
  console.log(amt)
  invest(ref, plan, amt, function () {
    displayTransactionMessage()
  })
}

function investInPlan4() {
  var trxspenddoc = document.getElementById("eth-to-spend4")
  ref = getQueryVariable("ref")
  plan = 4 - 1
  console.log("REF:" + ref)
  if (!web3.utils.isAddress(ref)) {
    ref = defaultAdd
  }
  var bnb = trxspenddoc.value
  var amt = web3.utils.toWei(bnb)
  console.log(amt)
  invest(ref, plan, amt, function () {
    displayTransactionMessage()
  })
}

// Reinvest Functions on Buttons

function ReinvestInPlan1() {
  plan = 1 - 1
  console.log("Reinvesting in : " + plan + 1)
  reinvest(plan, function () {
    displayTransactionMessage()
  })
}

function ReinvestInPlan2() {
  plan = 2 - 1
  console.log("Reinvesting in : " + plan + 1)
  reinvest(plan, function () {
    displayTransactionMessage()
  })
}

function ReinvestInPlan3() {
  plan = 3 - 1
  console.log("Reinvesting in : " + plan + 1)
  reinvest(plan, function () {
    displayTransactionMessage()
  })
}

function ReinvestInPlan4() {
  plan = 4 - 1
  console.log("Reinvesting in : " + plan + 1)
  reinvest(plan, function () {
    displayTransactionMessage()
  })
}

function removeModal2() {
  $("#adModal").modal("toggle")
}
function removeModal() {
  modalContent.innerHTML = ""
  modal.style.display = "none"
}
function displayTransactionMessage() {
  displayModalMessage("Transaction Submitted")
}
function displayModalMessage(message) {
  modal.style.display = "block"
  modalContent.textContent = message
  setTimeout(removeModal, 3000)
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1)
  var vars = query.split("&")
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=")
    if (pair[0] == variable) {
      return pair[1]
    }
  }
  return false
}
