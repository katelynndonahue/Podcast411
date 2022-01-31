const searchFormHandler = async (event) => {
	event.preventDefault();
	console.log("clicked me");
	const search = document.getElementById("search").value.trim();

	console.log(search);
	if(search){
	  const response = await fetch('/api/search',{
	    method:"POST",
	    body:JSON.stringify({search}),
	    headers: { 'Content-Type': 'application/json' },
	  })
	  console.log(response);
	  if (response.ok) {
	    document.location.replace('/search');
	  } else {
	    alert('Failed to search.');
	  }
	}
};
document
	.getElementById("searchForm")
	.addEventListener("submit", searchFormHandler);
