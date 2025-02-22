function OnClickHandler() {
  const general_data = {
    time: document.querySelector("#time").value,
    big_name: document.querySelector("#big_name").value.toUpperCase(),
    perpetual: document.querySelector("#perpetual").value,
    positions: document.querySelector("#positions").value,
    orders: document.querySelector("#orders").value,
  };

  const coin1 = {
    coin_name: document.querySelector("#coin_name_1").value.toUpperCase(),
    margin_usdt: document.querySelector("#margin_usdt_1").value,
    entry_price: document.querySelector("#entry_price_1").value,
    mark_price: document.querySelector("#mark_price_1").value,
    don_bay: document.querySelector("#don_bay_1").value,
    side: document.querySelector(`input[name="side_1"]:checked`).value,
    tp_1: document.querySelector("#tp_1_value").value,
    sl_1: document.querySelector("#sl_1_value").value,
    est_liq_price_1: document.querySelector("#est_liq_price_1").value,
    r_pnl_1: document.querySelector("#r_pnl_1").value,
  };

  const coin2 = {
    coin_name: document.querySelector("#coin_name_2").value.toUpperCase(),
    margin_usdt: document.querySelector("#margin_usdt_2").value,
    entry_price: document.querySelector("#entry_price_2").value,
    mark_price: document.querySelector("#mark_price_2").value,
    don_bay: document.querySelector("#don_bay_2").value,
    side: document.querySelector(`input[name="side_2"]:checked`).value,
    tp_2: document.querySelector("#tp_2_value").value,
    sl_2: document.querySelector("#sl_2_value").value,
    est_liq_price_2: document.querySelector("#est_liq_price_2").value,
    r_pnl_2: document.querySelector("#r_pnl_2").value,
  };

  // Tạo mảng chứa hai đối tượng thông tin coin
  const coinData = {
    general_data: general_data,
    coin1: coin1,
    coin2: coin2,
  };

  // Lưu mảng vào localStorage dưới dạng chuỗi JSON
  localStorage.setItem("coinDataArray", JSON.stringify(coinData));
  loadFormData();
}

// Để cập nhật lại dữ liệu trong form khi đã có dữ liệu trong localStorage
function loadFormData() {
  const storedData = JSON.parse(localStorage.getItem("coinDataArray"));
  if (storedData) {
    
    document.querySelector("#time").value = storedData["general_data"].time;
    document.querySelector("#big_name").value =
      storedData["general_data"].big_name;
    document.querySelector("#perpetual").value =
      storedData["general_data"].perpetual;
    document.querySelector("#positions").value =
      storedData["general_data"].positions;
    document.querySelector("#orders").value = storedData["general_data"].orders;

    // Điền dữ liệu vào form "Thông tin coin 1"
    document.querySelector("#coin_name_1").value =
      storedData["coin1"].coin_name;
    document.querySelector("#margin_usdt_1").value =
      storedData["coin1"].margin_usdt;
    document.querySelector("#entry_price_1").value =
      storedData["coin1"].entry_price;
    document.querySelector("#mark_price_1").value =
      storedData["coin1"].mark_price;
    document.querySelector("#don_bay_1").value = storedData["coin1"].don_bay;
    document.querySelector(
      `input[name="side_1"][value="${storedData["coin1"].side}"]`
    ).checked = true;
    document.querySelector("#tp_1_value").value = storedData["coin1"].tp_1;
    document.querySelector("#sl_1_value").value = storedData["coin1"].sl_1;
    document.querySelector("#est_liq_price_1").value =
      storedData["coin1"].est_liq_price_1;
    document.querySelector("#r_pnl_1").value = storedData["coin1"].r_pnl_1;
    // Điền dữ liệu vào form "Thông tin coin 2"
    document.querySelector("#coin_name_2").value =
      storedData["coin2"].coin_name;
    document.querySelector("#margin_usdt_2").value =
      storedData["coin2"].margin_usdt;
    document.querySelector("#entry_price_2").value =
      storedData["coin2"].entry_price;
    document.querySelector("#mark_price_2").value =
      storedData["coin2"].mark_price;
    document.querySelector("#don_bay_2").value = storedData["coin2"].don_bay;
    document.querySelector(
      `input[name="side_2"][value="${storedData["coin2"].side}"]`
    ).checked = true;
    document.querySelector("#tp_2_value").value = storedData["coin2"].tp_2;
    document.querySelector("#sl_2_value").value = storedData["coin2"].sl_2;
    document.querySelector("#est_liq_price_2").value =
      storedData["coin2"].est_liq_price_2;
    document.querySelector("#r_pnl_2").value = storedData["coin2"].r_pnl_2;
  }
  var a = coin_calc(storedData.coin1);
  var b = coin_calc(storedData.coin2);

  print_data(storedData.coin1, storedData.coin2, storedData.general_data, a, b);
}

// Hàm tính toán
function coin_calc(coin) {
  var ROE = 0;

  // Chuyển đổi các giá trị sang số
  const margin_usdt = parseFloat(coin.margin_usdt);
  const don_bay = parseFloat(coin.don_bay);
  const entry_price = parseFloat(coin.entry_price);
  const mark_price = parseFloat(coin.mark_price);

  // Kiểm tra nếu entry_price là 0 để tránh chia cho 0
  if (entry_price === 0) {
    console.error("Entry price cannot be zero");
    return null;
  }

  // Tính positon và r_pnl
  const positon = (margin_usdt * don_bay) / entry_price;
  const r_pnl = (margin_usdt * don_bay * 0.06) / 100;
  var ur_pnl = 0;

  // Tính ROE dựa trên giá trị của side
  if (coin.side === "Long") {
    ROE = ((mark_price - entry_price) / entry_price) * 100 * don_bay;
    // Tính ur_pnl
    ur_pnl = (mark_price - entry_price) * positon;
  } else if (coin.side === "Short") {
    ROE = ((entry_price - mark_price) / entry_price) * 100 * don_bay;
    ur_pnl = ((entry_price - mark_price) / entry_price) * don_bay * margin_usdt;
  } else {
    console.error("Side must be either 'Long' or 'Short'");
    return null;
  }

  return {
    ROE: ROE,
    positon: positon,
    r_pnl: r_pnl,
    ur_pnl: ur_pnl,
  };
}

//Hàm đổ dữ liệu
function print_data(coin1, coin2, general_data, a, b) {

  //#region genaral
  document.querySelector(".coin-name").innerHTML = general_data.big_name;
  document.querySelector(".time").innerHTML = general_data.time;

  document.querySelector(".text_chart").innerHTML =
    general_data.big_name + " Chart";
  if (Number(general_data.perpetual) > 0) {
    document.querySelector(".text-wrapper-4").style.color = "#5c9bb0";
    document.querySelector(".text-wrapper-4").innerHTML =
      "+" + general_data.perpetual + "%";
  } else {
    document.querySelector(".text-wrapper-4").style.color = "#E15E56";
    document.querySelector(".text-wrapper-4").innerHTML =
      general_data.perpetual + "%";
  }
  document.querySelector(".text-wrapper-11").innerHTML =
    "Positions(" + general_data.positions + ")";
  document.querySelector(".orders-menu").innerHTML =
    "Orders(" + general_data.orders + ")";
  //#endregion

  //#region coin data 1
  document.querySelector(".coin_1_name").innerHTML = coin1.coin_name; //ten
  document.querySelector(".positions_name_1").innerHTML =
    "Positions" + " " + "(" + coin1.coin_name.split("USDT")[0] + ")"; //ten
  document.querySelector(".coin_side_1").innerHTML = coin1.side; // side
  if (coin1.side == "Long") {
    document.querySelector(".coin_side_1").classList.add("lai-color");
    document.querySelector(".coin_side_1").classList.remove("lo-color");
    document.querySelectorAll(".coin1").forEach(item => {
      item.classList.add("bg-lai-color")
      item.classList.remove("bg-lo-color")
    });
    document.querySelector(".don-bay-1").classList.add("lai-color");
    document.querySelector(".don-bay-1").classList.remove("lo-color");
  } else if (coin1.side == "Short") {
    document.querySelector(".coin_side_1").classList.add("lo-color");
    document.querySelector(".coin_side_1").classList.remove("lai-color");
    document.querySelectorAll(".coin1").forEach(item => {
      item.classList.add("bg-lo-color")
      item.classList.remove("bg-lai-color")
    });
    document.querySelector(".don-bay-1").classList.add("lo-color");
    document.querySelector(".don-bay-1").classList.remove("lai-color");
  }
  document.querySelector(".don-bay-1").innerHTML = coin1.don_bay + "x"; //don bay
  if (Number(a.positon) >= 100000 || Number(a.positon) <= -100000) {
    document.querySelector(".positions_coin_1").innerHTML =
      a.positon.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
  } else if (Number(a.positon) <= 100000 || Number(a.positon) >= -100000) {
    document.querySelector(".positions_coin_1").innerHTML =
      a.positon.toLocaleString("en-US", {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      });
  } // position

  document.querySelector(".margin_coin_1").innerHTML = Number(
    coin1.margin_usdt
  ).toLocaleString("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 4,
  }); //margin
  document.querySelector(".entry_price_coin_1").innerHTML = coin1.entry_price; // entry price
  document.querySelector(".mark_price_coin_1").innerHTML = coin1.mark_price; // mark price
  if (Number(a.ur_pnl) >= 100000 || Number(a.ur_pnl) <= -100000) {
    document.querySelector(".ur_pnl_coin_1").innerHTML = Number(
      a.ur_pnl.toFixed(2)
    ).toLocaleString(); // ur Pnl
  } else if (Number(a.ur_pnl) < 100000 || Number(a.ur_pnl) > -100000) {
    document.querySelector(".ur_pnl_coin_1").innerHTML = Number(
      a.ur_pnl.toFixed(3)
    ).toLocaleString(); // ur Pnl
  }
  if (a.ur_pnl < 1000 && a.ur_pnl > -1000) {
    document.querySelector(".ur_dollar_coin_1").innerHTML = `≈$${Number(
      a.ur_pnl.toFixed(2)
    ).toLocaleString()}`; // ur Pnl
  } else if (a.ur_pnl >= 1000 || a.ur_pnl <= -1000) {
    document.querySelector(".ur_dollar_coin_1").innerHTML = `≈$${Number(
      a.ur_pnl.toFixed(2)
    ).toLocaleString()}`; // ur Pnl
  }

  if (a.ur_pnl < 0) {
    document.querySelector(".ur_pnl_coin_1").classList.add("lo-color");
    document.querySelector(".ur_pnl_coin_1").classList.remove("lai-color");
  } else if (a.ur_pnl > 0) {
    document.querySelector(".ur_pnl_coin_1").classList.add("lai-color");
    document.querySelector(".ur_pnl_coin_1").classList.remove("lo-color");
  }

  document.querySelector(".roe_coin_1").innerHTML =
    a.ROE > 0 ? "+" + a.ROE.toFixed(2) + "%" : a.ROE.toFixed(2) + "%"; // ROE
  if (a.ROE < 0) {
    document.querySelector(".roe_coin_1").classList.add("lo-color");
    document.querySelector(".roe_coin_1").classList.remove("lai-color");
  } else if (a.ROE > 0) {
    document.querySelector(".roe_coin_1").classList.add("lai-color");
    document.querySelector(".roe_coin_1").classList.remove("lo-color");
  }

  if (coin1.r_pnl_1 == "") {
    document.querySelector(".rpnl_coin_1").innerHTML = `-${Number(
      a.r_pnl.toFixed(4)
    )}`; // r Pnl
  } else {
    document.querySelector(".rpnl_coin_1").innerHTML = `-${Number(
      coin1.r_pnl_1
    )}`; // r Pnl
  }

  document.querySelector(".est_coin_1").innerHTML = coin1.est_liq_price_1; // est liq price
  //#endregion

  //#region coin data 2
  document.querySelector(".coin_2_name").innerHTML = coin2.coin_name; //ten
  document.querySelector(".positions_name_2").innerHTML =
    "Positions" + " " + "(" + coin2.coin_name.split("USDT")[0] + ")"; //ten
  document.querySelector(".coin_side_2").innerHTML = coin2.side; // side
  if (coin2.side == "Long") {
    document.querySelector(".coin_side_2").classList.add("lai-color");
    document.querySelector(".coin_side_2").classList.remove("lo-color");
    document.querySelectorAll(".coin2").forEach(item => {
      item.classList.add("bg-lai-color")
      item.classList.remove("bg-lo-color")
    });
    document.querySelector(".don-bay-2").classList.add("lai-color");
    document.querySelector(".don-bay-2").classList.remove("lo-color");
  } else if (coin2.side == "Short") {
    document.querySelector(".coin_side_2").classList.add("lo-color");
    document.querySelector(".coin_side_2").classList.remove("lai-color");
    document.querySelectorAll(".coin2").forEach(item => {
      item.classList.add("bg-lo-color")
      item.classList.remove("bg-lai-color")
    });
    document.querySelector(".don-bay-2").classList.add("lo-color");
    document.querySelector(".don-bay-2").classList.remove("lai-color");
  }
  document.querySelector(".don-bay-2").innerHTML = coin2.don_bay + "x"; //don bay

  if (Number(b.positon) >= 100000 || Number(b.positon) <= -100000) {
    document.querySelector(".positions_coin_2").innerHTML =
      b.positon.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
  } else if (Number(b.positon) <= 100000 || Number(b.positon) >= -100000) {
    document.querySelector(".positions_coin_2").innerHTML =
      b.positon.toLocaleString("en-US", {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      });
  } // position

  document.querySelector(".margin_coin_2").innerHTML = Number(
    coin2.margin_usdt
  ).toLocaleString("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 4,
  }); //margin
  document.querySelector(".entry_price_coin_2").innerHTML = coin2.entry_price; // entry price
  document.querySelector(".mark_price_coin_2").innerHTML = coin2.mark_price; // mark price
  if (b.ur_pnl >= 100000 || b.ur_pnl <= -100000) {
    document.querySelector(".ur_pnl_coin_2").innerHTML = Number(
      b.ur_pnl.toFixed(2)
    ).toLocaleString(); // ur Pnl
  } else if (b.ur_pnl <= 100000 || b.ur_pnl >= -100000) {
    document.querySelector(".ur_pnl_coin_2").innerHTML = Number(
      b.ur_pnl.toFixed(3)
    ).toLocaleString(); // ur Pnl
  }

  if (b.ur_pnl < 1000 && b.ur_pnl > -1000) {
    document.querySelector(".ur_dollar_coin_2").innerHTML = `≈$${Number(
      b.ur_pnl.toFixed(2)
    ).toLocaleString()}`; // ur Pnl
  } else if (b.ur_pnl >= 1000 || b.ur_pnl <= -1000) {
    document.querySelector(".ur_dollar_coin_2").innerHTML = `≈$${Number(
      b.ur_pnl.toFixed(2)
    ).toLocaleString()}`; // ur Pnl
  }

  if (b.ur_pnl < 0) {
    document.querySelector(".ur_pnl_coin_2").classList.add("lo-color");
    document.querySelector(".ur_pnl_coin_2").classList.remove("lai-color");
  } else if (b.ur_pnl > 0) {
    document.querySelector(".ur_pnl_coin_2").classList.add("lai-color");
    document.querySelector(".ur_pnl_coin_2").classList.remove("lo-color");
  }

  document.querySelector(".roe_coin_2").innerHTML =
    b.ROE > 0 ? "+" + b.ROE.toFixed(2) + "%" : b.ROE.toFixed(2) + "%"; // ROE
  if (b.ROE < 0) {
    document.querySelector(".roe_coin_2").classList.add("lo-color");
    document.querySelector(".roe_coin_2").classList.remove("lai-color");
  } else if (b.ROE > 0) {
    document.querySelector(".roe_coin_2").classList.add("lai-color");
    document.querySelector(".roe_coin_2").classList.remove("lo-color");
  }
  if (coin2.r_pnl_2 == "") {
    document.querySelector(".rpnl_coin_2").innerHTML = `-${Number(
      b.r_pnl.toFixed(4)
    )}`; // r Pnl
  } else {
    document.querySelector(".rpnl_coin_2").innerHTML = `-${Number(
      coin2.r_pnl_2
    )}`; // r Pnl
  }

  document.querySelector(".est_coin_2").innerHTML = coin2.est_liq_price_2; // est liq price
  //#endregion

  // Xử lý độ dài text cho coin 1
  let urPnl1Text = "";
  if (Number(a.ur_pnl) >= 100000 || Number(a.ur_pnl) <= -100000) {
    urPnl1Text = Number(a.ur_pnl.toFixed(2)).toLocaleString();
  } else if (Number(a.ur_pnl) < 100000 || Number(a.ur_pnl) > -100000) {
    urPnl1Text = Number(a.ur_pnl.toFixed(3)).toLocaleString();
  }
}

function updateBatteryImage() {
    const batterySelect = document.getElementById("battery");
    const batteryImage = document.getElementById("batteryImage");
    const selectedValue = batterySelect.value;

    switch (selectedValue) {
        case "1":
            batteryImage.src = "./assets/img/_StatusBar-battery-1.svg";
            break;
        case "0":
            batteryImage.src = "./assets/img/-statusbar-battery.svg";
            break;
        case "2":
            batteryImage.src = "./assets/img/_StatusBar-battery-2.svg";
            break;
        default:
            batteryImage.src = "./assets/img/-statusbar-battery.svg"; // Default image
    }
}

window.onload = loadFormData;
