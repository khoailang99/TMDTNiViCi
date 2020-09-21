using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TMDTNiViCi.Common
{
    /*AttributeProductTypeDDL chứa các attribute áp dụng cho dropdownlist của loại sản phẩm */
    public class AttributeProductTypeDDL
    {
        public string Key { get; set; }
        public string Value { get; set; }
        public AttributeProductTypeDDL(string Key, string Value)
        {
            this.Key = Key;
            this.Value = Value;
        }
    }
}