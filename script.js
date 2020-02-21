function getDoggo() {
  let url = "http://random.dog/woof.json"

  Fetch.fetchWithInit(url, Fetch.RequestInit.make(~mode=Fetch.NoCORS, ()))
    .then(response => {
      if (response.status !== 200) {
        return {
          url: "ERROR: " + response.statusText
        }
      }
      return response.json();
    })
    .then (json => {
      updateDoggo(json.url)
    });
}

function updateDoggo(url) {
  let doggo;
  if (url.includes("ERROR")) {
    doggo = document.createElement("P")
    doggo.className = "Error"
    doggo.textContent = url
  } else if (url.includes('.mp4') || url.includes('.webm')) {
    doggo = document.createElement("VIDEO");
    doggo.autoplay = true;
    doggo.loop = true;
    doggo.controls = true;
    doggo.src = url;
  } else {
    doggo = document.createElement("IMG");
    doggo.src = url;
  }
  doggo.id = "doggo"
  document.getElementById("doggo").replaceWith(doggo);
}

document.getElementById('getButton')
  .addEventListener('click', getDoggo);
