export default class PDetail_PSpecification {
    constructor(maxHeightDContentS) {
        this.maxHeightDContentS = maxHeightDContentS;
    }

    triggerShownEOnModalProdDetail() {
        $('#modal__view-product-detail').on('shown.bs.modal', function (e) {
            console.log(1)
            if ($(".ddc__dc__detail-txtValue").outerHeight() - Number($('.ddc__dc__detail-txtValue').css("padding-bottom").slice(0, -2)) > this.maxHeightDContentS) {
                this.controlMaxHContainer_PD_PS($(".ddc__dc__detail-txtValue"));
            }
            if ($('.ps__box-contain-specifications').outerHeight() - Number($('.ps__box-contain-specifications').css("padding-bottom").slice(0, -2)) > this.maxHeightDContentS) {
                this.controlMaxHContainer_PD_PS($('.ps__box-contain-specifications'));
            }

            this.activeModalShowPDetail();

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
        $(".ddc__dc__detail-expand-collapse").click(function (e) {
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
        $(".specifications-viewport").click(function (e) {
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

    activeModalShowPDetail() {
        let galleryThumbs = new Swiper('.gallery-thumbs', {
            spaceBetween: 10,
            slidesPerView: 'auto',
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            slideToClickedSlide: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            watchOverflow: true,
        });
        let galleryTop = new Swiper('.gallery-top', {
            spaceBetween: 10,
            mousewheel: true,
            thumbs: {
                swiper: galleryThumbs
            }
        });

        $('.gallery-thumbs .swiper-wrapper .swiper-slide').mouseenter(function () {
            galleryTop.slideTo($(this).index());
        });
    }
}
