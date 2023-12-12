export const includeHTML = (el, url) => {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;

    if (xhr.status >= 200 && xhr.status < 300) {
      el.innerHTML = xhr.responseText;
    } else {
      let message =
        xhr.statusText ||
        "Error loading the file, verify that you are making the request by http or https";
      el.innerHTML = `<div><p>Error ${xhr.status}: ${message}</p></div>`;
    }
  });

  xhr.open("GET", url);
  xhr.setRequestHeader("Content-type", "text/html; charset=utf-8");
  xhr.send();
};