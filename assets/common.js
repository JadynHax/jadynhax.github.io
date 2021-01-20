function htmlEncode(text) {
    return $('<div/>').text(text).html();
}

function htmlDecode(text) {
  return $('<div/>').html(text).text();
}

$("#source-view > code").load(window.location.pathname, function(){$("#source-view > code").text($("#source-view > code").html());hljs.highlightAuto(document.querySelector("#source-view > code"))})

document.querySelector("#view-source").addEventListener("click", function(){document.querySelector("#source-view-bkg").style.opacity = 1; document.querySelector("#source-view-bkg").style.pointerEvents = "auto"})
document.querySelector("#close-source").addEventListener("click", function(){document.querySelector("#source-view-bkg").style.opacity = 0; document.querySelector("#source-view-bkg").style.pointerEvents = "none"})
