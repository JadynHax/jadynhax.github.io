function htmlEncode(text) {
    return $('<div/>').text(text).html();
}

function htmlDecode(text) {
  return $('<div/>').html(text).text();
}

window.onload = function() {
    document.body.innerHTML += `
        <div id="source-view-bkg">
            <span id="close-source">&times;</span>
            <h1>Page Source</h1>
            <pre id="source-view"><code>
                <!-- Page source gets loaded here -->
            </code></pre>
        </div>
        <button id="view-source"><i class="fas fa-file-code"></i> View Source</button>`

    $("#source-view > code").load(window.location.pathname, function(){$("#source-view > code").text($("#source-view > code").html());hljs.highlightAuto(document.querySelector("#source-view > code"))})

    document.querySelector("#view-source").onclick = function(){document.querySelector("#source-view-bkg").style.opacity = 1; document.querySelector("#source-view-bkg").style.pointerEvents = "auto"}
    document.querySelector("#close-source").onclick = function(){document.querySelector("#source-view-bkg").style.opacity = 0; document.querySelector("#source-view-bkg").style.pointerEvents = "none"}
    window.onload = undefined
};
