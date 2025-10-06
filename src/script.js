
function getfivemindata() {
    fetch('http://localhost:8080/charts/intraday', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            securityId: "13",
            exchangeSegment: "NSE_EQ",
            instrument: "EQUITY",
            interval: "5",
            oi: false,
            fromDate: "2025-09-26 09:30:00",
            toDate: "2025-09-26 13:00:00"
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            insertTableData(data);
        })
}


//Common function to insert data 
function insertTableData(tData) {
    var tableData = document.getElementById('intraday').querySelector('tbody');
    tableData.innerHTML = '';

    tData.forEach(element => {
        var insertRow = tableData.insertRow();

        const timestamp = element.timestamp
            ? new Date(element.timestamp * 1000).toLocaleString()
            : '';

        insertRow.insertCell(0).innerHTML = 'NSE';
        insertRow.insertCell(1).innerHTML = element.open;
        insertRow.insertCell(2).innerHTML = element.high;
        insertRow.insertCell(3).innerHTML = element.low;
        insertRow.insertCell(4).innerHTML = element.close;
        insertRow.insertCell(5).innerHTML = element.volume;
        insertRow.insertCell(6).innerHTML = element.timestamp;
    });
}

//Fetching Index data
let indexdata = () => {
    fetch('http://localhost:8080/marketfeed/ltp', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            'NSE_EQ': [],
            'NSE_FNO': [],
            'IDX_I': [13, 25, 27, 51, 69]
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            insertIndexData(data);
        })
}

function insertIndexData(res) {

    //Nifty 
    var niftyValue = document.getElementById('nifty');
    let lastPrice = res.data.IDX_I['13'].last_price;
    //For color change
    if (niftyValue.innerText != lastPrice) {
        if (niftyValue.innerText < lastPrice) {
            niftyValue.classList.add("highlight"); // apply light green
        }
        if (niftyValue.innerText > lastPrice) {
            niftyValue.classList.add("highlight1"); // apply light red
        }
        niftyValue.innerText = lastPrice;
        setTimeout(() => niftyValue.classList.remove("highlight"), 500); // remove after 0.5s
        setTimeout(() => niftyValue.classList.remove("highlight1"), 500); // remove after 0.5s
    }

    // Bank Nifty 
    var bnValue = document.getElementById('banknifty');
    let bnlastPrice = res.data.IDX_I['25'].last_price;
    //For color change
    if (bnValue.innerText != bnlastPrice) {
        if (bnValue.innerText < bnlastPrice) {
            bnValue.classList.add("highlight"); // apply light green
        }
        if (bnValue.innerText > bnlastPrice) {
            bnValue.classList.add("highlight1"); // apply light red
        }
        bnValue.innerText = bnlastPrice;
        setTimeout(() => bnValue.classList.remove("highlight"), 500); // remove after 0.5s
        setTimeout(() => bnValue.classList.remove("highlight1"), 500); // remove after 0.5s
    }

    // Fin Nifty 
    var fnValue = document.getElementById('finnifty');
    let fnlastPrice = res.data.IDX_I['27'].last_price;
    //For color change
    if (fnValue.innerText != fnlastPrice) {
        if (fnValue.innerText < fnlastPrice) {
            fnValue.classList.add("highlight"); // apply light green
        }
        if (fnValue.innerText > fnlastPrice) {
            fnValue.classList.add("highlight1"); // apply light red
        }
        fnValue.innerText = fnlastPrice;
        setTimeout(() => fnValue.classList.remove("highlight"), 500); // remove after 0.5s
        setTimeout(() => fnValue.classList.remove("highlight1"), 500); // remove after 0.5s
    }

    // Sensex 
    var sensexalue = document.getElementById('sensex');
    let sensexlastPrice = res.data.IDX_I['51'].last_price;
    //For color change
    if (sensexalue.innerText != sensexlastPrice) {
        if (sensexalue.innerText < sensexlastPrice) {
            sensexalue.classList.add("highlight"); // apply light green
        }
        if (sensexalue.innerText > sensexlastPrice) {
            sensexalue.classList.add("highlight1"); // apply light red
        }
        sensexalue.innerText = sensexlastPrice;
        setTimeout(() => sensexalue.classList.remove("highlight"), 500); // remove after 0.5s
        setTimeout(() => sensexalue.classList.remove("highlight1"), 500); // remove after 0.5s
    }

    // BankEx 
    var bankexvalue = document.getElementById('bankex');
    let bankexlastPrice = res.data.IDX_I['69'].last_price;
    //For color change
    if (bankexvalue.innerText != bankexlastPrice) {
        if (bankexvalue.innerText < bankexlastPrice) {
            bankexvalue.classList.add("highlight"); // apply light green
        }
        if (bankexvalue.innerText > bankexlastPrice) {
            bankexvalue.classList.add("highlight1"); // apply light red
        }
        bankexvalue.innerText = bankexlastPrice;
        setTimeout(() => bankexvalue.classList.remove("highlight"), 500); // remove after 0.5s
        setTimeout(() => bankexvalue.classList.remove("highlight1"), 500); // remove after 0.5s
    }

    // Crude Oil 
    var crudevalue = document.getElementById('crudeoil');
    // let crudelastPrice = res.data.IDX_I['69'].last_price;
    let crudelastPrice = 'Under Construction';
    //For color change
    if (crudevalue.innerText != crudelastPrice) {
        if (crudevalue.innerText < crudelastPrice) {
            crudevalue.classList.add("highlight"); // apply light green
        }
        if (crudevalue.innerText > crudelastPrice) {
            crudevalue.classList.add("highlight1"); // apply light red
        }
        crudevalue.innerText = crudelastPrice;
        setTimeout(() => crudevalue.classList.remove("highlight"), 500); // remove after 0.5s
        setTimeout(() => crudevalue.classList.remove("highlight1"), 500); // remove after 0.5s
    }
}



setInterval(indexdata, 1100);