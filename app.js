const API_KEY = [YOUR_API_KEY]
const submitButton = document.querySelector("#submit")
const promptInput = document.querySelector("input")
const imageSection = document.querySelector(".images")

const getImages = async () => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "prompt": promptInput.value,
      "n": 4,
      "size": "256x256",
    }),
  }
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', options)
    const data = await response.json()
    console.log(data)
    data?.data.forEach((image) => {
      const imageContainer = document.createElement('div')
      imageContainer.classList.add('image-container')
      const imageElement = document.createElement('img')
      imageElement.setAttribute('src', image?.url)
      imageContainer.appendChild(imageElement)
      imageSection.appendChild(imageContainer)
    })
  } catch (error) {
    console.log(error)
  }
}

submitButton.addEventListener("click", getImages)