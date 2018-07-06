'use strict';
describe('pos', () => {

  it('should print text', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    spyOn(console, 'log');

    printReceipt(tags);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;
    expect(console.log).toHaveBeenCalledWith(expectText);

  });
});
describe('test calculateItemNum()', () => {
  it('should print', function () {
    //when
    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];
    const actualText1 = JSON.stringify(countShopcar(tags));
    //then
    const text_codeNum = [{barcode:'ITEM000001',num:5},{barcode:'ITEM000003',num:2.5},{barcode:'ITEM000005',num:3}];
    expect(actualText1).toBe(JSON.stringify(text_codeNum));

  });
});
describe('test mergeAllItem()', () => {

  it('should print', function () {
    //when
    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];
    let load_data = loadAllItems();
    let cut_data = loadPromotions();
    let shopcar_data= countShopcar(tags);
    let merge_data = mergeAllItem(shopcar_data, load_data);
    const actualText2 = JSON.stringify(merge_data);
    console.log(actualText2);
    //then
    const text_codeNum = [{barcode:'ITEM000001',num:5,name:'雪碧',unit:'瓶',price:3},{barcode:'ITEM000003',num:2.5,name:'荔枝',unit:'斤',price:15},{barcode:'ITEM000005',num:3,name:'方便面',unit:'袋',price:4.5}];
    expect(actualText2).toBe(JSON.stringify(text_codeNum));

  });
});
describe('test calculateSum()', () => {

  it('should print', function () {
    //when
    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];
    let load_data = loadAllItems();
    let cut_data = loadPromotions();
    let shopcar_data= countShopcar(tags);
    let merge_data = mergeAllItem(shopcar_data, load_data);
    let calculateSum_data = calculateSum(merge_data);
    const actualText3 = JSON.stringify(calculateSum_data);
    //then
    const text_calculateSum = [{barcode:'ITEM000001',num:5,name:'雪碧',unit:'瓶',price:3,allPrice:15},{barcode:'ITEM000003',num:2.5,name:'荔枝',unit:'斤',price:15,allPrice:37.5},{barcode:'ITEM000005',num:3,name:'方便面',unit:'袋',price:4.5,allPrice:13.5}];
    expect(actualText3).toBe(JSON.stringify(text_calculateSum));

  });
});
describe('test afterDiscount()', () => {

  it('should print', function () {
    //when
    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];
    let load_data = loadAllItems();
    let cut_data = loadPromotions();
    let shopcar_data= countShopcar(tags);
    let merge_data = mergeAllItem(shopcar_data, load_data);
    let calculateSum_data = calculateSum(merge_data);
    let afterDiscount = cutPrice(calculateSum_data, cut_data);
    const actualText4 = JSON.stringify(afterDiscount);
    //then
    const text_afterDiscount = [{barcode:'ITEM000001',num:5,name:'雪碧',unit:'瓶',price:3,allPrice:12},{barcode:'ITEM000003',num:2.5,name:'荔枝',unit:'斤',price:15,allPrice:37.5},{barcode:'ITEM000005',num:3,name:'方便面',unit:'袋',price:4.5,allPrice:9}];
    expect(actualText4).toBe(JSON.stringify(text_afterDiscount));

  });
});
