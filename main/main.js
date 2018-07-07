'use strict';
const {loadAllItems,loadPromotions } = require('../spec/fixtures');

const printReceipt=tags=> {
    let load_data = loadAllItems();
    let cut_data = loadPromotions();
    let hasformatBrarcodes=formattedBarcode(tags);
    let shopcar_data= countShopcar(hasformatBrarcodes);
    let merge_data = mergeAllItem(shopcar_data, load_data);
    let calculateAllPrice_data = calculateAllPrice(merge_data);
    let afterDiscount = cutPrice(calculateAllPrice_data, cut_data);
    let saveMoney_data = getSaveMoney(afterDiscount);
    let sum_data = calculateSum(afterDiscount);
    productReceip(afterDiscount,saveMoney_data,sum_data);
  }
//格式化条形码
const formattedBarcode=tags=>{
    let hasformatBrarcodes = [];
    for(let tag of tags){
        let tempObj = {};
        if(tag.indexOf("-")==-1){
            tempObj.barcode = tag;
            tempObj.num = 1;
        }else{
            let spl = tag.split("-");
            tempObj.barcode =spl[0];
            tempObj.num = parseFloat(spl[1]);
        }
        hasformatBrarcodes.push(tempObj);
    }
    //console.info(hasformatBrarcodes);
    return hasformatBrarcodes;
}
//统计购物车数量
const countShopcar=hasformatBrarcodes=> {
 
    let cartItems = [];

    for (let formattedBarcode of hasformatBrarcodes) {
        let existCartItem = null;
        for (let cartItem of cartItems) {
            if (cartItem.barcode === formattedBarcode.barcode) {
                existCartItem = cartItem;
            }
        }
        if (existCartItem != null) {
             existCartItem.num += formattedBarcode.num;
        } else {
             cartItems.push({ barcode:formattedBarcode.barcode,
                             num:formattedBarcode.num});
        }
    }

    console.info(cartItems);
    return cartItems;
}
//汇总商品信息
const mergeAllItem=(codeNumObj, loadAllItems)=> {
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
//计算小计
const calculateAllPrice=allItems=> {
  for (let item of allItems) {
    item.allPrice = (item.price) * (item.num);
  }
  return allItems;
}
//计算结账总价
const calculateSum=allItems=> {
  let sum = 0;
  for (let item of allItems) {
    sum += item.allPrice_after;
  }
//   console.info("aa");
//   console.info(allItems);
//   console.info(sum);
  return sum;
}
//获取节约的钱
const getSaveMoney=AllItems=> {
  let savePrice = 0;
  for(let AllItem of AllItems){
    if(AllItem.allPrice !== AllItem.allPrice_after){
      savePrice += (AllItem.allPrice-AllItem.allPrice_after);
    }
  }
//   console.info(AllItems);
//   console.info(savePrice);
//   console.log(savePrice);
  return savePrice;

}
//优惠折算
const cutPrice=(AllItems, loadPromotions)=> {
  for (let items of AllItems) {
    let sooCom = loadPromotions[0].barcodes;
    if (sooCom.includes(items.barcode)) {
      if (items.num >= 2) {
        items.allPrice_after =items.allPrice-items.price;
      }
    }else {
      items.allPrice_after =items.allPrice;
    }
  }
  return AllItems;
}
const productReceip=(afterDiscount,saveMoney_data,sum_data)=> {
  let str = "***<没钱赚商店>收据***\n";
  for (let item of afterDiscount) {
    let price = item.price.toFixed(2);
    let littlePrice = item.allPrice_after.toFixed(2);
    //str += `名称： {$item.name}  ，数量：  item.num + item.unit + ，单价： + price + (元)，小计： + littlePrice + (元)\n`;
    str +=`名称：${item.name}，数量：${item.num}${item.unit}，单价：${price}(元)，小计：${littlePrice}(元)\n`;
  }

  str += `----------------------\n总计：${ sum_data.toFixed(2)}(元)\n节省：${saveMoney_data.toFixed(2)}(元)\n**********************`;
  console.log(str);
}



module.exports = {
    formattedBarcode,
    countShopcar,
    mergeAllItem,
    calculateAllPrice,
    getSaveMoney,
    cutPrice,
    productReceip,
    printReceipt,
    calculateSum

}