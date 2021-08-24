const fileInput = document.querySelector('#fileInput')
const imgForm = document.querySelector('#imgUpload')
const textForm = document.querySelector('#textUpload')
const imgInput = document.querySelector('#urlPic')
const displayContainer = document.querySelector('#displayContainer')
const downloadContainer = document.querySelector('#downloadContainer')
const upperText = document.querySelector('#upperText')
const lowerText = document.querySelector('#lowerText')
const upperP = document.createElement("p")
const lowerP = document.createElement("p")

const baseURL = ""
let id = 0

const addImage = event => {
    event.preventDefault()
    displayContainer.innerHTML = ``
    downloadContainer.innerHTML = ``
    let image = imgInput.value

    let bodyObj = {
        id: id,
        url: image
    }

    imgInput.value = ``
    id++

    axios.post(baseURL+'/img', bodyObj)
        .then(res => {
            let url = res.data
            
            const newImage = document.createElement("img")
            newImage.classList.add("memeImg")
            newImage.setAttribute("src", url)
            displayContainer.appendChild(newImage)

            generateButtons()
        })
        .catch(err => console.log(err))
}

const uploadImage = (event) => {

    displayContainer.innerHTML = ``
    downloadContainer.innerHTML = ``


    const uploadedImage = document.createElement("img")
    uploadedImage.classList.add("memeImg")
            
    const url = URL.createObjectURL(fileInput.files[0]);
    uploadedImage.src = url;
    console.log(url)
    displayContainer.appendChild(uploadedImage)

    generateButtons()
}

const generateButtons = () => {
    const downloadButton = document.createElement('button')
    downloadButton.innerText = "Download"
    downloadButton.classList.add("imageButtons")
    downloadContainer.appendChild(downloadButton)
    downloadButton.addEventListener('click', downloadImage)

    const resetTextButton = document.createElement('button')
    resetTextButton.innerText = "Reset Text"
    resetTextButton.classList.add("imageButtons")
    downloadContainer.appendChild(resetTextButton)
    resetTextButton.addEventListener('click', resetText)

    const resetImgButton = document.createElement('button')
    resetImgButton.innerText = "Clear Image"
    resetImgButton.classList.add("imageButtons")
    downloadContainer.appendChild(resetImgButton)
    resetImgButton.addEventListener('click', resetImage)
}

const downloadImage = () => {
    const newDisplayContainer = document.querySelector('#displayContainer')
    html2canvas(newDisplayContainer, {allowTaint : true}).then(function(canvas) {
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.download = "html_image.png";
        link.href = canvas.toDataURL("image/png");
        link.target = '_blank';
        link.click();
    })
}

const addText = event => {
    event.preventDefault()

    if(displayContainer.innerHTML) {
        
    let topText = upperText.value
    let bottomText = lowerText.value

    
    upperP.classList.add("upperTextElement")
    
    lowerP.classList.add("lowerTextElement")

    upperP.innerHTML = topText.toUpperCase()
    lowerP.innerHTML = bottomText.toUpperCase()

    displayContainer.appendChild(upperP)
    displayContainer.appendChild(lowerP)

    upperText.value = ""
    lowerText.value = ""
    } else {
        alert("Please select an image first.")
    }
}

const resetText = () => {
    upperP.innerHTML = ""
    lowerP.innerHTML = ""
}

const resetImage = () => {
    displayContainer.innerHTML = ``
    downloadContainer.innerHTML = ``
    fileInput.value = ``
}

imgForm.addEventListener('submit', addImage)
textForm.addEventListener('submit', addText)
fileInput.addEventListener('change', uploadImage)