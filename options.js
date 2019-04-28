function save_options() {
  var form_apitoken = document.getElementById('form_apptoken').value;
  chrome.storage.sync.set({
    apitoken: form_apitoken,
  })
}


document.getElementById('save').addEventListener('click',
    save_options);
