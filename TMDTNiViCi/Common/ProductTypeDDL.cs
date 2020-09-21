using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TMDTNiViCi.Model.EF;

namespace TMDTNiViCi.Common
{
    public static class ProductTypeDDL
    {

        // Điều chỉnh DropdownList của loại sản phẩm
        // Tham khảo ở: https://stackoverflow.com/questions/17665426/selectlistitem-with-data-attributes và https://stackoverflow.com/questions/10761484/system-web-mvc-htmlhelper-does-not-contain-a-definition-for-enumdropdownlistfor
        public static MvcHtmlString DropDownListForWithTag(this HtmlHelper helper, string name, List<AttributeProductTypeDDL> attributes, List<ProductCategory> items, int idSelected)
        {

            char delimiter = char.Parse(",");
            // Điều chỉnh trên tag Select
            var select = new TagBuilder("select");
            select.MergeAttribute("name", name);
            foreach (AttributeProductTypeDDL att in attributes) select.MergeAttribute(att.Key, att.Value);

            // Điều chỉnh trên các tag Options
            foreach (var item in items)
            {
                if (item.IsCategory == 0)
                {
                    int productTypeLevel = item.Relationship.Split(delimiter).Length;
                    TagBuilder option = new TagBuilder("option");
                    option.MergeAttribute("value", item.ID.ToString());
                    option.MergeAttribute("class", (productTypeLevel == 3) ? "PC-ac__product-type-1-ddl" : ((productTypeLevel == 4) ? "PC-ac__product-type-2-ddl" : ""));
                    if (idSelected == item.ID) option.MergeAttribute("selected", "selected");
                    option.InnerHtml = item.Name;

                    select.InnerHtml += option.ToString();
                }
            }

            return new MvcHtmlString(select.ToString());
        }
        // Kêt thúc điều chỉnh DropdownList của loại sản phẩm
    }
}