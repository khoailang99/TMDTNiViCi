import ListProduct from "./ListProducts.js";
import PDetail_PSpecification from "./ProductDetail.js";

document.addEventListener('DOMContentLoaded', function () {
    finishProgressBar();

    $('[data-toggle="tooltip"]').tooltip();

    var objListProduct = new ListProduct(Number($(".prod-numb-search-filter").attr("data-numbProdSatisFilterCond")));
    objListProduct.handlePaging();
    objListProduct.f_displayProdNumb();
    objListProduct.triggerClickEvPagingBtns();
    objListProduct.triggerClickEvProdFilterBtn();
    objListProduct.triggerClickEvProdSearchBtn();
    objListProduct.triggerClickEventVEDBtn();
    objListProduct.refreshProdFilterForm();

    
    var pDetail_pSpecification = new PDetail_PSpecification(objListProduct.maxHeight_PD_PS);
    pDetail_pSpecification.triggerShownEOnModalProdDetail();


}, false)