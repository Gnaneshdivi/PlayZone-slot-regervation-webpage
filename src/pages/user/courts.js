var gal = document.getElementById('aa');
    

fetch("http://localhost:3000/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res.message[i]);
      for(var i=0;i<=res.message.length;i++){
        
       
   document.body.appendChild(` <div class="filterDiv cricket" style="background-image: linear-gradient(rgba(0, 0, 0, 0.486), rgba(73, 70, 70, 0.363)), url(cc4.jpg); margin-left: 40px;">a
   <button class="bt" onclick="openForm()">Book Now</button></div>`);

      }
    });




    function pay(){
      window.location ='./pay.html'
    }

