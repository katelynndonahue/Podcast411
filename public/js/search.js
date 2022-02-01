const searchFormHandler = async (event) => {
	event.preventDefault();
	console.log("clicked me");
	const search = document.getElementById("search").value.trim();
	let searchDiv = document.getElementById("searchRes");
    let playlist_id = document.getElementById("playlistId").textContent;

	console.log(search);
	if (search) {
		const response = await fetch("/api/search", {
			method: "POST",
			body: JSON.stringify({ search }),
			headers: { "Content-Type": "application/json" },
		});
		console.log(response);
		if (response.ok) {
			// document.location.replace('/search');
			const data = await response.json();
			console.log(data);
			for (let i = 0; i < data.length; i++) {
				const podcast = data[i];
				let template = `<div class="row search-row">
    <div class="col s12 m7">
      <div class="card">
        <div class="card-image">
          <img src="${podcast.thumbnail}">
        </div>
        <div class="card-content search-content">
		<p class="card-title search-title">${podcast.title_highlighted}</p>
          <p>${podcast.publisher_highlighted}</p>
        </div>
        <div class="card-action">
          <a class="search-link" href="${podcast.listennotes_url}">Link to podcast!</a>
          <button class="black-text saveToProfile">Save</button>
        </div>
      </div>
    </div>
  </div>`;
				searchDiv.insertAdjacentHTML("afterbegin", template);
			}
			const createPodcast = async (event) => {
				event.preventDefault();
                const listennotes_url = $(event.target).siblings("a").attr("href");
                // console.log(listennotes_url);
				// console.log($(event.target).parent().siblings());
				let thumbnail = $(event.target).parent().siblings(0).children(0).attr("src");
                // console.log(thumbnail);
                let title = $(event.target).parent().siblings(0).children(1).text();
                // console.log(title_highlighted);
				// let url = document.getAttribute("");
				// console.log(title);
                const response = await fetch("/api/podcasts",{
                    method: "POST",
			        body: JSON.stringify({ 
                        title,
                        listennotes_url,
                        thumbnail,
                        playlist_id
                     }),
			        headers: { "Content-Type": "application/json" },
                });
                console.log(response);
			};
			$(searchDiv).on("click", ".saveToProfile", createPodcast);
		} else {
			alert("Failed to search.");
		}
	}
};
document
	.getElementById("searchForm")
	.addEventListener("submit", searchFormHandler);
