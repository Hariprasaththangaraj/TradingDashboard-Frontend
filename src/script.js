
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

// setInterval(indexdata, 1100);

// ---------------------------------- Greeks Data -------------------------------------


const sctiptMapping = {
    Nifty: { underlyingScrip: 13, underlyingSeg: "IDX_I" },
    BankNifty: { underlyingScrip: 25, underlyingSeg: "IDX_I" },
    FinNifty: { underlyingScrip: 27, underlyingSeg: "IDX_I" },
    SenSex: { underlyingScrip: 51, underlyingSeg: "IDX_I" },
    BankEx: { underlyingScrip: 69, underlyingSeg: "IDX_I" },

}

async function getGreeksData() {
    let dt = document.getElementById('select').value;
    let greeksPayLoad = sctiptMapping[dt]
    // console.log(greeksPayLoad)

    let res = await fetch('http://localhost:8080/optionchain/expirylist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(
            greeksPayLoad
        )
    })

    let data = await res.json();
    geeksDataInsert(data);

    return data;
}


function geeksDataInsert(ele) {
    var tdata = document.getElementById('greeksdata').querySelector('tbody');
    tdata.innerHTML = '';

    ele.data.forEach((expiry, index) => {
        var inserRow = tdata.insertRow();

        inserRow.insertCell(0).innerHTML = index + 1;
        inserRow.insertCell(1).innerHTML = expiry;

    });
}


async function showGreeksData(data) {
    var data = data.id;
    let greeksPayLoad = sctiptMapping[data]
    // console.log(greeksPayLoad)

    let res = await fetch('http://localhost:8080/optionchain/expirylist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(
            greeksPayLoad
        )
    })

    let expiryData = await res.json();

    // console.log(expiryData)


    let payLoad = {
        underlyingScrip: greeksPayLoad.underlyingScrip,
        underlyingSeg: greeksPayLoad.underlyingSeg,
        expiry: expiryData.data[0]
    }

    // console.log(payLoad)

    let resp = await fetch('http://localhost:8080/optionchain', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(
            payLoad
        )
    });

    let respData = await resp.json();
    // console.log(respData);
    inserOptionsGreeksDataHeader(respData, data);
}


function inserOptionsGreeksDataHeader(element, data) {
    var theaderData = document.getElementById('headerData');
    var theaderValue = document.getElementById('headerValue');

    theaderData.innerHTML = '';
    theaderValue.innerHTML = '';

    theaderData.innerHTML = data;
    theaderValue.innerHTML = element.data.last_price;
    console.log(element)


    var tbody = document.getElementById('greeksbtable').querySelector('tbody');
    tbody.innerHTML = ''

    var strikePrices = Object.keys(element.data.oc);

    // console.log(strikePrices)
    strikePrices.forEach((sp) => {
        var ceData = element.data.oc[sp].ce;
        var peData = element.data.oc[sp].pe;

        console.log(ceData)
        console.log(peData)

        if (ceData) {
            var inserRow = tbody.insertRow();

            inserRow.insertCell(0).innerHTML = Number(sp);
            inserRow.insertCell(1).innerHTML = 'ce';
            inserRow.insertCell(2).innerHTML = ceData.greeks.delta;
            inserRow.insertCell(3).innerHTML = ceData.greeks.theta;
            inserRow.insertCell(4).innerHTML = ceData.greeks.gamma;
            inserRow.insertCell(5).innerHTML = ceData.greeks.vega;
            inserRow.insertCell(6).innerHTML = ceData.implied_volatility;
            inserRow.insertCell(7).innerHTML = ceData.last_price;
            inserRow.insertCell(8).innerHTML = ceData.oi;
            inserRow.insertCell(9).innerHTML = ceData.previous_close_price;;
            inserRow.insertCell(10).innerHTML = ceData.previous_oi;
            inserRow.insertCell(11).innerHTML = ceData.previous_volume;
            inserRow.insertCell(12).innerHTML = ceData.top_ask_price;
            inserRow.insertCell(13).innerHTML = ceData.top_ask_quantity;
            inserRow.insertCell(14).innerHTML = ceData.top_bid_price;
            inserRow.insertCell(15).innerHTML = ceData.top_bid_quantity;
            inserRow.insertCell(16).innerHTML = ceData.volume;
            inserRow.insertCell(17).innerHTML = 'BUY / SELL';
        }



        if (peData) {
            var inserRow = tbody.insertRow();

            inserRow.insertCell(0).innerHTML = Number(sp);
            inserRow.insertCell(1).innerHTML = 'pe';
            inserRow.insertCell(2).innerHTML = peData.greeks.delta;
            inserRow.insertCell(3).innerHTML = peData.greeks.theta;
            inserRow.insertCell(4).innerHTML = peData.greeks.gamma;
            inserRow.insertCell(5).innerHTML = peData.greeks.vega;
            inserRow.insertCell(6).innerHTML = peData.implied_volatility;
            inserRow.insertCell(7).innerHTML = peData.last_price;
            inserRow.insertCell(8).innerHTML = peData.oi;
            inserRow.insertCell(9).innerHTML = peData.previous_close_price;;
            inserRow.insertCell(10).innerHTML = peData.previous_oi;
            inserRow.insertCell(11).innerHTML = peData.previous_volume;
            inserRow.insertCell(12).innerHTML = peData.top_ask_price;
            inserRow.insertCell(13).innerHTML = peData.top_ask_quantity;
            inserRow.insertCell(14).innerHTML = peData.top_bid_price;
            inserRow.insertCell(15).innerHTML = peData.top_bid_quantity;
            inserRow.insertCell(16).innerHTML = peData.volume;
            inserRow.insertCell(17).innerHTML = 'BUY / SELL';
        }


    });

}