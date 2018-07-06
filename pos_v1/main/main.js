'use strict';
let sum = 0;
let saveMoney = 0;

function countShopcar(buyBarcodes) {
  let codeNumObj = [];
  let soonObj = {};
  for (let buyBarcode of buyBarcodes) {
    if (buyBarcode.indexOf("-") > 0) {
      //含有特殊的
      let spl = buyBarcode.split("-");
      if (soonObj.hasOwnProperty(spl[0])) {
        soonObj[spl[0]] = soonObj[spl[0]] + parseFloat(spl[1]);
      } else {
        soonObj[spl[0]] = parseFloat(spl[1]);
      }
    }
    else {
      if (soonObj.hasOwnProperty(buyBarcode)) {
        soonObj[buyBarcode]++;
      }
      else {
        soonObj[buyBarcode] = 1;
      }
    }
  }
  // console.log(soonObj);
  for (let j in soonObj) {
    codeNumObj.push({barcode: j, num: soonObj[j]});
  }
  return codeNumObj;
}

function mergeAllItem(codeNumObj, loadAllItems) {
  let allItems = [];
  for (let codeNumOb of codeNumObj) {
    for (let loadAllItem of loadAllItems) {
      if (codeNumOb.barcode === loadAllItem.barcode) {
        let soonObjOfAll = {};
        soonObjOfAll.barcode = codeNumOb.barcode;
        soonObjOfAll.num = codeNumOb.num;
        soonObjOfAll.name = loadAllItem.name;
        soonObjOfAll.unit = loadAllItem.unit;
        soonObjOfAll.price = loadAllItem.price;
        allItems.push(soonObjOfAll);
      }
    }
  }
  return allItems;
}

function calculateSum(allItems) {
  for (let item of allItems) {
    item.allPrice = (item.price) * (item.num);
    sum += item.allPrice;
  }
  return allItems;
}

function cutPrice(AllItems, loadPromotions) {
  for (let items of AllItems) {
    let sooCom = loadPromotions[0].barcodes;
    if (sooCom.includes(items.barcode)) {
      if (items.num >= 2) {
        items.allPrice -= items.price;
        saveMoney += items.price;
        sum -= items.price;
      }
    }
  }
  return AllItems;
}
function productReceip(afterDiscount) {
  let str = "***<没钱赚商店>收据***\n";
  for (let item of afterDiscount) {
    let price = item.price.toFixed(2);
    let littlePrice = item.allPrice.toFixed(2);
    //str += `名称： {$item.name}  ，数量：  item.num + item.unit + ，单价： + price + (元)，小计： + littlePrice + (元)\n`;
    str +=`名称：${item.name}，数量：${item.num}${item.unit}，单价：${price}(元)，小计：${littlePrice}(元)\n`;
  }

  str += `----------------------\n总计：${ sum.toFixed(2)}(元)\n节省：${saveMoney.toFixed(2)}(元)\n**********************`;
  console.log(str);
}
function printReceipt(tags) {
  let load_data = loadAllItems();
  let cut_data = loadPromotions();
  let shopcar_data= countShopcar(tags);
  let merge_data = mergeAllItem(shopcar_data, load_data);
  let calculateSum_data = calculateSum(merge_data);
  let afterDiscount = cutPrice(calculateSum_data, cut_data);
  productReceip(afterDiscount);
}

