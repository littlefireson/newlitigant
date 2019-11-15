window.onload = function () {
    var currentheight = document.documentElement.scrollHeight;
    window.parent.postMessage(currentheight,'*');

}