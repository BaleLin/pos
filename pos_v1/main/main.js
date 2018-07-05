'use strict';
let sum = 0;
let saveMoney = 0;

function calculateItemNum(buyBarcode) {
  var codeNumObj = [];
  var soonObj = {};
  for (var i = 0; i < buyBarcode.length; i++) {
    if (buyBarcode[i].indexOf("-") > 0) {
      //含有特殊的
      var spl = buyBarcode[i].split("-");
      if (soonObj.hasOwnProperty(spl[0])) {
        soonObj[spl[0]] = soonObj[spl[0]] + parseFloat(spl[1]);
      } else {
        soonObj[spl[0]] = parseFloat(spl[1]);
      }
    }
    else {
      if (soonObj.hasOwnProperty(buyBarcode[i])) {
        soonObj[buyBarcode[i]]++;
      }
      else {
        soonObj[buyBarcode[i]] = 1;
      }
    }
  }
  // console.log(soonObj);
  for (var j in soonObj) {
    codeNumObj.push({barcode: j, num: soonObj[j]});
  }
  return codeNumObj;
  return codeNumObj;
}

function mergeAllItem(codeNumObj, loadAllItems) {
  var allItems = [];
  for (var i = 0; i < codeNumObj.length; i++) {
    for (var j = 0; j < loadAllItems.length; j++) {
      if (codeNumObj[i].barcode == loadAllItems[j].barcode) {
        var soonObjOfAll = {};
        soonObjOfAll.barcode = codeNumObj[i].barcode;
        soonObjOfAll.num = codeNumObj[i].num;
        soonObjOfAll.name = loadAllItems[j].name;
        soonObjOfAll.unit = loadAllItems[j].unit;
        soonObjOfAll.price = parseFloat((loadAllItems[j].price));
        soonObjOfAll.price = loadAllItems[j].price;
        allItems.push(soonObjOfAll);
      }
    }
  }
  return allItems;
}

function calculateSum(allItems) {
  for (var i = 0; i < allItems.length; i++) {
    allItems[i].allPrice = (allItems[i].price) * (allItems[i].num);
    sum += allItems[i].allPrice;
  }
  return allItems;
}

function cutPrice(AllItems, loadPromotions) {
  for (var i = 0; i < AllItems.length; i++) {
    //console.log(loadPromotions[0].barcodes);
    var sooCom = loadPromotions[0].barcodes;
    if (sooCom.includes(AllItems[i].barcode)) {
      if (AllItems[i].num >= 2) {
        AllItems[i].allPrice = AllItems[i].allPrice - AllItems[i].price;
        saveMoney += AllItems[i].price;
        sum -= AllItems[i].price;
      }
    }
  }
  return AllItems;
}

function printReceipt(tags) {
  var loada = loadAllItems();
  var cut = loadPromotions();
  var clau = calculateItemNum(tags);
  var ASD = mergeAllItem(clau, loada);
  var cluAll = calculateSum(ASD);
  var afterDiscount = cutPrice(cluAll, cut);
  let str = "***<没钱赚商店>收据***\n";
  for (let item of afterDiscount) {
    let price = item.price.toFixed(2);
    let littlePrice = item.allPrice.toFixed(2);
    str += "名称：" + item.name + "，数量：" + item.num + item.unit + "，单价：" + price + "(元)，小计：" + littlePrice + "(元)\n";
  }
  str += "----------------------\n总计：" + sum.toFixed(2) + "(元)\n节省：" + saveMoney.toFixed(2) + "(元)\n**********************";
  console.log(str);
  return str;
}

