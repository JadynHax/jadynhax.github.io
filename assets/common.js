function htmlEncode(text) {
    return $('<div/>').text(text).html();
}

function htmlDecode(text) {
  return $('<div/>').html(text).text();
}

document.innerHTML += `
        <div id="source-view-bkg">
            <span id="close-source">&times;</span>
            <h1>Page Source</h1>
            <pre id="source-view"><code>
                <!-- Page source gets loaded here -->
            </code></pre>
        </div>
        <button id="view-source"><i class="fas fa-file-code"></i> View Source</button>
`;
$("#source-view > code").load(window.location.pathname, function(){$("#source-view > code").text($("#source-view > code").html());hljs.highlightAuto(document.querySelector("#source-view > code"))})

document.querySelector("#view-source").addEventListener("click", function(){document.querySelector("#source-view-bkg").style.opacity = 1})
document.querySelector("#close-source").addEventListener("click", function(){document.querySelector("#source-view-bkg").style.opacity = 0})