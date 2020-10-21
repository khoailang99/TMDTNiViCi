import Pagination from "/Scripts/Common/Pagination/Pagination.js";

export default class ListProduct {
    constructor(totalProducts, defaultPageNumbs, originalProdNumb = 8, maxHeight_PD_PS = 500) {
        this.grossProd = totalProducts;
        this.defaultPageNumbs = defaultPageNumbs;
        this.originalProdNumb = originalProdNumb;
        this.maxHeight_PD_PS = maxHeight_PD_PS;
        this.smallestProdNumbDisplayed = 8;
        this.largestProdNumbDisplayed = 50;
        this.numbProdSatisfyCond = Number($(".prod-numb-search-filter").attr("data-numbprodsatisfiltercond"));
        this.noticeNumbSatisfyProd = "Gía trị phải nhỏ hơn hoặc bằng " + this.largestProdNumbDisplayed + " và lớn hơn " + this.smallestProdNumbDisplayed;
        this.noticeNumbProdSatisfyCond = "Số sản phẩm đang có trong điều kiện lọc: ";

    }

    // Lấy html của các phần tử html mà hiển thị nút thêm sản phẩm rồi thêm đến vị trí tg ứng trong responsive
    ProductIndex_handleRps() {
        let classNameContainBtnAddProd = ".cas__add-product";
        let btnAddProductHTML = document.querySelector(".cas__add-product").outerHTML;
        function rpsAddRemoveElemFromDom(wd) {
            if (wd.matches) {
                if ($(".asp__container-add-search").children(classNameContainBtnAddProd).html() == null) {
                    document.querySelector(".PC-ai__list-products").removeChild(document.querySelector(classNameContainBtnAddProd));
                    $(btnAddProductHTML).insertBefore(".asp__container-add-search>.cas__search-product");
                }
            } else {
                if ($(".PC-ai__list-products").children(classNameContainBtnAddProd).html() == null) {
                    document.querySelector(".asp__container-add-search").removeChild(document.querySelector(classNameContainBtnAddProd));
                    $(btnAddProductHTML).insertBefore(".PC-ai__list-products>.Pc-ai__product-filter");
                }
            }
        }
        let browserWindow = window.matchMedia("(min-width: 450px)");
        rpsAddRemoveElemFromDom(browserWindow);
        browserWindow.addListener(rpsAddRemoveElemFromDom);
    }

    // Hiển thị số sản phẩm mà người dùng muốn xem
    f_displayProdNumb() {
        let objListProduct = this;
        // Hiển thị thông báo về giá trị của số sản phẩm là được hợp lệ
        $(".pnd__ip-prod-numb").focusin(function (event) {
            $(this).removeClass('trigger-error-message');
            $(".message-box").addClass("mb-active__ms-tooltip");
            $(".message-box__tooltip").text(objListProduct.noticeNumbSatisfyProd);
            objListProduct.originalProdNumb = Number(stringNotContainDots($(this).val().trim()))
        });
        $(".pnd__ip-prod-numb").focusout(function (event) {
            let val = Number(stringNotContainDots($(this).val()));

            $(".message-box").addClass('mb-active__ms-tooltip-close');
            setTimeout(() => {
                $(".message-box").removeClass("mb-active__ms-tooltip mb-active__ms-tooltip-close");
            }, 500);

            if (objListProduct.originalProdNumb == val) { return; }
            if (objListProduct.f_checkValidProdNumb(val)) {
                $(".dpl__prod-numb-displayed").attr('data-pro-numb-displayed', '');
                activeProgressBar();

                objListProduct.originalProdNumb = val;
                let arrContainFilters = objListProduct.getValuesFilter();
                let objPagination = new Pagination(Math.ceil(objListProduct.grossProd / objListProduct.originalProdNumb), objListProduct.defaultPageNumbs);
                objListProduct.getProductsFromDb(arrContainFilters[0], arrContainFilters.slice(1).join(","), val, 1);
                objPagination.pagingInit();
                return;
            } else {
                $(".dpl__prod-numb-displayed").attr('data-pro-numb-displayed', '(* Lỗi)');
                $(this).toggleClass('trigger-error-message');
            }
        });
    }

    // Xử lý phân trang
    handlePaging() {
        let wmM__minW400 = window.matchMedia("(min-width: 400px)");
        let wmM__minW320_maxW400 = window.matchMedia("(min-width: 320px) and (max-width: 400px)");
        let wmM__maxW320 = window.matchMedia("(max-width: 320px)");

        this.checkMatchMedia_1(wmM__minW400);
        this.checkMatchMedia_2(wmM__minW320_maxW400);
        this.checkMatchMedia_3(wmM__maxW320);

        wmM__minW400.addListener(this.checkMatchMedia_1.bind(this));
        wmM__minW320_maxW400.addListener(this.checkMatchMedia_2.bind(this));
        wmM__maxW320.addListener(this.checkMatchMedia_3.bind(this));
    }

    // Kiểm tra giá trị số sản phẩm được nhập là hợp lệ chưa
    f_checkValidProdNumb(prodNumb) {
        return prodNumb >= this.smallestProdNumbDisplayed && prodNumb <= this.largestProdNumbDisplayed;
    }

    // JS Query Media - (min-width: 400px)
    checkMatchMedia_1(elemWd) {
        if (elemWd.matches) {
            this.activePagingBtn(9);
        }
    }

    // JSQM - (min-width: 320px) and (max-width: 400px)
    checkMatchMedia_2(elemWd) {
        if (elemWd.matches) {
            this.activePagingBtn(7);
        }
    }

    // JSQM - (max-width: 320px)
    checkMatchMedia_3(elemWd) {
        if (elemWd.matches) {
            this.activePagingBtn(5);
        }
    }

    // Lấy các giá trị để lọc và tìm kiếm
    getValuesFilter() {
        let arrContainFilters = [];
        let lowestPrice = $(".lp__input").val().trim() == "" ? 0 : stringNotContainDots($(".lp__input").val().trim());
        let highestPrice = $(".hp__input").val().trim() == "" ? 0 : stringNotContainDots($(".hp__input").val().trim());
        let prod = {
            prod_type: $("#PC-ac__product-type-ddl").children("option:selected").val(),
            supplier: $("#Supplier").children("option:selected").val(),
            price_range: (lowestPrice == 0 && highestPrice == 0) ? null : lowestPrice + "-" + highestPrice,
            status: $('input[name="Status"]:checked').val(),
            prod_name: $(".filter-prod-name").val().trim()
        };

        for (let key in prod) {
            if (prod[key] == null || prod[key] == "") { continue; }
            arrContainFilters.push(`${Object.keys(prod).indexOf(key) + 1}/${prod[key]}`)
        }
        return arrContainFilters;
    }

    // Thêm sự kiện click cho nút reset trong form lọc sản phẩm
    refreshProdFilterForm() {
        $(".fhc__btn-reset").click((e) => {
            $("#PC-ai__product-filter-form .selectpicker").val("");
            $('.selectpicker').selectpicker('refresh');
        });
    }

    // Kích hoạt phân trang trên một query media phù hợp
    activePagingBtn(p_defaultPageNumbs) {
        this.defaultPageNumbs = p_defaultPageNumbs;
        let objPagination = new Pagination(Math.ceil(this.grossProd / this.originalProdNumb), p_defaultPageNumbs);
        objPagination.pagingInit();
    }

    // Thêm sự kiện click cho nút tìm kiếm sản phẩm theo tên
    triggerClickEvProdSearchBtn() {
        $(".admin__bs__search-btn").click(function () {
            if ($(".filter-prod-name").val().trim() == "") {
                showNotification("error", "Không được để trống tên sản phẩm!");
                return;
            }
            $(".filter-btn").trigger("click");
        });
    }

    // Thêm sự kiện click cho nút lọc sản phẩm
    triggerClickEvProdFilterBtn() {
        let objListProduct = this;
        $(".filter-btn").click(function(e) {
            if ($(".hp__input").val().trim() != "" && Number(stringNotContainDots($(".lp__input").val())) > Number(stringNotContainDots($(".hp__input").val()))) {
                showNotification("error", "Giá tiền lớn nhất không thỏa mãn!");
                return;
            }

            activeProgressBar();

            let arrContainFilters = objListProduct.getValuesFilter();
            $.ajax({
                url: '/Product/GetProductList',
                type: "GET",
                data: { firstFV: arrContainFilters[0], filterValue: arrContainFilters.slice(1).join(","), numbProdDisplayed: objListProduct.originalProdNumb, page: 1 },
                success: function (partialViewResult) {
                    $("#aap__wrap-prod-list").html(partialViewResult);
                    objListProduct.grossProd = Number($(".prod-numb-search-filter").attr("data-numbProdSatisFilterCond"));
                    if ($(".filter-prod-name").val().trim() == "") {
                        $(".fhc__ft-filter_result .search-filter-result").text(`(${$(".prod-numb-search-filter").attr("data-numbprodsatisfiltercond")} sản phẩm thỏa mãn)`);
                        $(".header__title-search .search-filter-result").text("");
                    } else {
                        document.querySelectorAll(".search-filter-result").forEach((elem) => {
                            elem.textContent = `(${$(".prod-numb-search-filter").attr("data-numbprodsatisfiltercond")} sản phẩm được tìm thấy)`;
                        });
                    }

                    if (objListProduct.grossProd < objListProduct.smallestProdNumbDisplayed) {
                        $(".dpl__prod-numb-displayed, .paging-area, .prod-filter-notice").css("display", "none");
                        if (objListProduct.grossProd == 0) {
                            $(".prod-filter-notice").css("display", "block");
                        }
                        objListProduct.triggerClickEventVEDBtn();
                        finishProgressBar();
                        return;
                    }

                    let objPagination = new Pagination(Math.ceil(objListProduct.grossProd / objListProduct.originalProdNumb), objListProduct.defaultPageNumbs);
                    objPagination.pagingInit();

                    $(".paging-area").css("display", "block");
                    $(".dpl__prod-numb-displayed").css("display", "flex");
                    $(".prod-filter-notice").css("display", "none");

                    objListProduct.triggerClickEvPagingBtns();
                    objListProduct.triggerClickEventVEDBtn();

                    finishProgressBar();
                },
                error: function (err) {
                    console.log(err);
                    showNotification("error", "Lỗi khi lấy sản phẩm từ DB!");
                }
            });
        });
    }

    // Thêm sự kiện click cho các nút phân trang
    triggerClickEvPagingBtns() {
        let objListProduct = this;
        let objPagination = new Pagination(Math.ceil(this.grossProd / this.originalProdNumb), this.defaultPageNumbs);
        let arrContainFilters = this.getValuesFilter();
        document.querySelectorAll(".pa__list-page-numbers button").forEach((elem) => {
            elem.addEventListener("click", (e) => {
                if (!objPagination.updateStatusValuePagingBtns(Number(elem.getAttribute('data-page')), Number(document.querySelector("button.active").getAttribute('data-page')))) {
                    return;
                }
                objListProduct.getProductsFromDb(arrContainFilters[0], arrContainFilters.slice(1).join(","), objListProduct.originalProdNumb, Number(elem.getAttribute('data-page')));
            }, false);
        });
    }

    // Lấy các sản phẩm từ DB
    getProductsFromDb(firstFV, filterValue, numbProdDisplayed, page) {
        activeProgressBar();
        let objListProduct = this;
        $.ajax({
            url: '/Product/GetProductList',
            type: "GET",
            data: { firstFV, filterValue, numbProdDisplayed, page },
            success: function (partialViewResult) {
                $("#aap__wrap-prod-list").html(partialViewResult);
                objListProduct.triggerClickEventVEDBtn();
                finishProgressBar();
            },
            error: function (err) {
                console.log(err);
                showNotification("error", "Lỗi khi lấy sản phẩm từ DB!");
            }
        });
    }

    // Thêm sự kiện click trên các button xem, sửa, xóa sản phẩm
    triggerClickEventVEDBtn() {
        let objListProd = this;
        $(".adm__wpl__table-contain-products tbody tr").each((indexTr, elemTr) => {
            $(elemTr).find(".adm__tcp__action button").each((index, elem) => {
                if (Number($(elem).attr("data-status")) == 3) { $(elem).addClass("aav__btn-disabled") }
                elem.addEventListener("click", function () {
                    let typeAc_prodId = $(this).attr("data-typeAc-prodID");
                    if (Number($(elem).attr("data-status")) == 3 || typeAc_prodId == null) { return; }
                    if (typeAc_prodId[0] == "s") {
                        activeProgressBar();
                        objListProd.ajaxViewProdInfo(Number(typeAc_prodId.slice(1)));
                    } else if (typeAc_prodId[0] == "d") {
                        $("#si__radio-delete").trigger("click");
                        objListProd.ajaxDeleteProd(Number(typeAc_prodId.slice(1)), objListProd.originalProdNumb, Number($(".pa__list-page-numbers .active").attr("data-page")))
                    }
                });
            });
        });
    }

    // Sử dụng ajax để lấy và hiển thị thông tin chi tiết của 1 sản phẩm
    ajaxViewProdInfo(prodId) {
        $.ajax({
            url: '/Product/GetPVProductDetails',
            type: "GET",
            data: { prodId },
            success: function (partialViewResult) {
                $("#modal-body__prod-details-area").html(partialViewResult);
                $("#modal__view-product-detail").modal('toggle');
                finishProgressBar();
            },
            error: function (err) {
                console.log(err);
                showNotification("error", "Lỗi hiển thị sản phẩm!");
            }
        });
    }

    // Sử dụng ajax để xóa sản phẩm
    ajaxDeleteProd(prodId) {
        $.ajax({
            url: '/Product/DeleteProduct',
            type: "GET",
            data: { prodId },
            success: function (result) {
                if (result == prodId) {
                    showNotification("success", "Xóa thành công!", 1);
                    $(".filter-btn").trigger("click");
                }
            },
            error: function (err) {
                console.log(err);
                showNotification("error", "Lỗi xóa sản phẩm!");
            }
        });
    }
}