const form = document.querySelector('#searchForm');
const res = document.querySelector('#result');
var upd; 
form.addEventListener('submit',(e)=>{
// to prevent refreshing the form when clicking on form //
    e.preventDefault();
    if(upd){
        clearTimeout(upd);
    }

    const ctype = form.elements.coinType.value;

    fetchPrice(ctype);

});


const fetchPrice= async(ctype) =>{
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=USD`);
    console.log(r.data.coin.price);
     const rawPrice = r.data.coin.price;
     const price = Math.round(rawPrice*100)/100.00;
     const volume  = r.data.coin.volume;
     const change = r.data.coin.priceChange1d;
     const base = r.data.coin.name;
     const curr = 'USD';
     var col= "green";

    if(change<0){
        col = "red";
    }


     res.innerHTML =`<tr style="background-color:yellow; color:black; font-weight:700">
     <td>
         Property
     </td>
     <td>Value</td>
     <td>Currency</td>
 </tr>
 <tr>
     <td>
         ${base}
         <td style="color:${col};"><span style="font-size: 1.3em;">${price}</span> </td>
     </td>
     <td> ${curr}</td>
     
 </tr>
 <tr>
     <td>
         Volume
     </td>
     <td>${volume}</td>
 </tr>
 <tr>
     <td>
         Change
     </td>
     <td>${change}</td>
 </tr>`

    upd = setTimeout(()=>fetchPrice(ctype),10000);

}