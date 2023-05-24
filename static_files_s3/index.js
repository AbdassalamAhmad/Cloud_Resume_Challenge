const getVisitorsCount = async ()=> {
  try {
    const gateway_url = "https://p5ox4dc5q7.execute-api.eu-south-1.amazonaws.com/GetVisitorsCount"
    const res = await fetch(gateway_url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    
    let data = await res.json(); 
    if (res.status === 200) {
      const visitorsCountElement = document.getElementById("visitorsCount");
      visitorsCountElement.textContent = data.visitors_count;

    } else {
      console.log(res)
    }
  } catch (err) {
    console.log(err);
  }
}

getVisitorsCount()

