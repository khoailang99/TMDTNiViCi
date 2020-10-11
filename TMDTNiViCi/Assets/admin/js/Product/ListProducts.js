document.addEventListener('DOMContentLoaded', function () {
    finishProgressBar();

    $('[data-toggle="tooltip"]').tooltip();

    class ListProduct {
        constructor(totalProducts, defaultPageNumbs, originalProdNumb = 8, maxHeight_PD_PS = 500) {
            this.grossProd = totalProducts;
            this.defaultPageNumbs = defaultPageNumbs;
            this.originalProdNumb = originalProdNumb;
            this.maxHeight_PD_PS = maxHeight_PD_PS;
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
            let objListProducts = this;
            // Hiển thị thông báo về giá trị của số sản phẩm là được hợp lệ
            $(".pnd__ip-prod-numb").focusin(function (event) {
                $(this).removeClass('trigger-error-message');
                $(".message-box").addClass("mb-active__ms-tooltip");
                this.originalProdNumb = Number(stringNotContainDots($(this).val()));
            });
            $(".pnd__ip-prod-numb").focusout(function (event) {
                let val = Number(stringNotContainDots($(this).val()));

                $(".message-box").addClass('mb-active__ms-tooltip-close');
                setTimeout(() => {
                    $(".message-box").removeClass("mb-active__ms-tooltip mb-active__ms-tooltip-close");
                }, 500);

                if (val == this.originalProdNumb) { return; }
                if (objListProducts.f_checkValidProdNumb(val)) {
                    $(".dpl__prod-numb-displayed").attr('data-pro-numb-displayed', '');
                    activeProgressBar();

                    objListProducts.ProductIndex_displayProdList(val, 0);
                    objListProduct.originalProdNumb = val;
                    objListProduct.activePagingBtn(objListProduct.defaultPageNumbs);
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

        // Sử dụng Ajax để lấy sản phẩm từ DB rồi hiển thị danh sách tất cả sản phẩm.
        ProductIndex_displayProdList(p_numbProd, p_pageNumb) {
            $.ajax({
                url: '/Product/GetProductList',
                type: "GET",
                data: { numbProd: p_numbProd, pageNumb: p_pageNumb },
                success: function (partialViewResult) {
                    $("#aap__wrap-prod-list").html(partialViewResult);
                    finishProgressBar();
                },
                error: function (err) {
                    console.log(err);
                    showNotification("error", "Lỗi khi lấy sản phẩm từ DB!");
                }
            });
        }

        // Kiểm tra giá trị số sản phẩm được nhập là hợp lệ chưa
        f_checkValidProdNumb(prodNumb) {
            return prodNumb >= 8 && prodNumb <= 50;
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

        // Kích hoạt phân trang trên một query media phù hợp
        activePagingBtn(p_defaultPageNumbs) {
            this.defaultPageNumbs = p_defaultPageNumbs;
            let objPagination = new Pagination(Math.ceil(this.grossProd / this.originalProdNumb), p_defaultPageNumbs);
            objPagination.f_runPagination();
        }
    }

    var objListProduct = new ListProduct(Number($('.ad__product-numb .lsp__pn__text').attr("data-total-product")));
    objListProduct.ProductIndex_handleRps();
    objListProduct.handlePaging();
    objListProduct.f_displayProdNumb();

    class PDetail_PSpecification {
        constructor(maxHeightDContentS) {
            this.maxHeightDContentS = maxHeightDContentS;
        }

        triggerShownEOnModalProdDetail() {
            $('#modal__view-product-detail').on('shown.bs.modal', function (e) {
                if ($(".ddc__dc__detail-txtValue").outerHeight() - Number($('.ddc__dc__detail-txtValue').css("padding-bottom").slice(0, -2)) > this.maxHeightDContentS) {
                    this.controlMaxHContainer_PD_PS($(".ddc__dc__detail-txtValue"));
                }
                if ($('.ps__box-contain-specifications').outerHeight() - Number($('.ps__box-contain-specifications').css("padding-bottom").slice(0, -2)) > this.maxHeightDContentS) {
                    this.controlMaxHContainer_PD_PS($('.ps__box-contain-specifications'));
                }

                this.triggerClickEOnProdDEB();
                this.triggerClickEOnExpandBPS();
                this.triggerClickOnSViewport();

            }.bind(this));
        }

        controlMaxHContainer_PD_PS(elem) {
            $(elem).next().css("display", "block");
            $(elem).css({ "max-height": `${this.maxHeightDContentS}px` })
        }

        triggerClickEOnProdDEB() { // sự kiện click trên hộp chứa phần để mở rộng chi tiết sản phẩm
            $(".ddc__dc__detail-expand-collapse").click(function(e) {
                this.TgClassOnBoxExpandCollapseCnt();
                $(".ddc__dc__detail-txtValue").css({ "max-height": ($(".ddc__dc__detail-txtValue").outerHeight() == this.maxHeightDContentS) ? "100%" : this.maxHeightDContentS + "px" });
            }.bind(this));
        }

        triggerClickEOnExpandBPS() { // sự kiện click trên hộp chứa phần để mở rộng thông số kĩ thuật sản phẩm
            $('.ps__ls__expand-collapse-specifications').click(function () {
                if ($(window).width() < 530) { // > 530px thì hiển thị thông số kĩ thuật dưới dạng modal
                    $(".ps__box-contain-specifications").css({ "max-height": ($('.ps__box-contain-specifications').outerHeight() == this.maxHeightDContentS ? "100%" : this.maxHeightDContentS + "px") });
                    this.TgClassOnBoxExpandCollapseS();
                    this.modalDisplaySpecifications("none");
                    return;
                }
                $(".modal__ps__table-contain-s").html($(".pad__dip__part-specifications").html());
                this.modalDisplaySpecifications("block");
            }.bind(this));
        }

        triggerClickOnSViewport() {
            let objPDPS = this;
            $(".specifications-viewport").click(function(e) {
                if (!$(e.target).closest('.modal__prod-specificationis').length &&
                    $('.modal__prod-specificationis').is(":visible")) {
                    objPDPS.modalDisplaySpecifications("none");
                    $(this).removeClass('backdrop__body-backdrop__dark-bgColor');
                }
            });
        }

        TgClassOnBoxExpandCollapseCnt() {
            $(".ddc__dc__detail-expand-collapse").toggleClass("active-blur-prod_detail");
            $(".dc__dec__expand-prod-cDetail").toggleClass("active");
            $(".dc__dec__collapse-prod-cDetail").toggleClass("active");
        }

        TgClassOnBoxExpandCollapseS() {
            $('.ls__ecs__expand-table-specifications').toggleClass("active");
            $('.ls__ecs__collapse-table-specifications').toggleClass("active");
        }

        modalDisplaySpecifications(vDisplay) {
            $('.specifications-viewport').css("display", `${vDisplay}`).addClass(vDisplay == "block" ? 'backdrop__body-backdrop__dark-bgColor' : null);
            $(".icon-loading").css("display", "none");
            $(".modal__prod-specificationis").css("display", `${vDisplay}`).find(".ps__list-specifications").css({ "overflow": (vDisplay == "block" ? "initial" : "hidden") });
            $(".ps__ls__expand-collapse-specifications").css("display", (vDisplay == "block" ? "none" : "block"));
        }
    }

    let pDetail_pSpecification = new PDetail_PSpecification(objListProduct.maxHeight_PD_PS);
    //pDetail_pSpecification.triggerShownEOnModalProdDetail();

}, false)