    document.onscroll = function (event) {
        var elements = document.getElementsByClassName("tab");
        for (var i = 0, len = elements.length; i < len; i++) {
            var scrollTop = (document.documentElement && document.documentElement.scrollTop) || 
              document.body.scrollTop;
            if (elements[i].offsetTop >= scrollTop) {
                // found top-most tab in view
                // remove previous "selected" class
                var selectedElements = document.getElementsByClassName("selected");
                if (selectedElements.length === 1) {
                    selectedElements[0].className = "";
                }
                // assign new "selected" class
                var tab = document.getElementById("tab" + (i + 1).toString() + "Selector");
                if (tab) {
                    tab.parentElement.className = "selected";
                }
                break;
            }
        }
    };