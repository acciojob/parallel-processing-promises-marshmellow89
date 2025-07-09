//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];


document.getElementById("loading").innerText = "loading"
function imgDownload(){
	const allimgs = images.map(image => 
		fetch(image.url)
			.then(res => {
				if(!res.ok){
					throw new Error("Failed to load image:" + image.url);
				}
				return res.url;
			}).then(url => {
				const img = document.createElement("img");
				img.src = url;
				getElementById("output").appendchild(img);
			});				   

							   
	);
	document.getElementById("loading").innerText = ""

	Promise.all(allimgs)
	   .then(() => {
		   console.log("all img downloaded");
	   }).catch(err => {
		   const errorDiv = document.getElementById("error");
		   errorDiv.innerText = err.message;
	   });
}