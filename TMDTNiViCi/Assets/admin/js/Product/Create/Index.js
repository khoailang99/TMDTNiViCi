import AddProduct from "./AddProduct.js";

document.addEventListener('DOMContentLoaded', function () {
    var objAddProduct = new AddProduct();
    objAddProduct.handleResponsive();
    objAddProduct.marksElemsNonBlank();
    objAddProduct.changeBackgroundSpeTypeAP();
    objAddProduct.triggerInlineEditor();
    objAddProduct.getOriginalValueSelectTag();
    objAddProduct.triggerChangeEvProdType();
    objAddProduct.triggerClickEvImgSelectBtns();
    objAddProduct.triggerChangeEvIUploadMulImgs();
    objAddProduct.triggerClickEvBtnResetProdAddF();
    objAddProduct.triggerClickEvSubmitBtnAPF();

    // Phần cập nhật sản phẩm
    objAddProduct.addCheckedToCategoryInput();
    objAddProduct.displayMainARelatedImg();

    window.onSuccessWAddProdKeyInfo = objAddProduct.onSuccessWAddProdKeyInfo.bind(objAddProduct);
    window.onFailureWAddProdKeyInfo = objAddProduct.onFailureWAddProdKeyInfo;

}, false)