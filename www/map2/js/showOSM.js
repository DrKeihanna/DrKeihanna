function showMAP(result_data,mapid,cat){
	   var lat            = 34.759966666;
	   var lon            = 135.791938888;

   // 位置とズームを決めてマップを描画
   var map = L.map(mapid,{
       center:[lat, lon],
       zoom: 13
   });

   // OpenStreetMapを使うためのおまじない
   var tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
       attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   });

   //GoogleMapを使う場合
//   var tileLayer = L.tileLayer(
//			'http://mt{s}.google.com/vt/lyrs=m@121&hl=ja&x={x}&y={y}&z={z}',
//			{ subdomains: [0,1,2,3] }
//		).addTo(map);

   tileLayer.addTo(map);

   var icon_w = 21;//14;
   var icon_h = 30;//20;

   var userIcon = L.icon({
       iconUrl: 'icon/image001.png',
       iconSize:     [icon_w, icon_h], // size of the icon
       iconAnchor: [0, icon_h],
   });
   var userIcon2 = L.icon({
       iconUrl: 'icon/image002.png',
       iconSize:     [icon_w, icon_h], // size of the icon
       iconAnchor: [0, icon_h],
   });

   var today = new Date("2017-04-24T00:00:00Z");


   // 指定した位置にマーカーを置く
	 for ( i = 0; i < result_data.result.data.length; i++ ) {
						// document.getElementById("resas_data").innerHTML +=
						// result_data.result.data[i].patentSection +"-"+
						// result_data.result.data[i].patentSubject +"\t"+
						// result_data.result.data[i].lat + ","+
						// result_data.result.data[i].lng + "<br />";
// }
//    for (var d = 0; d < data.length; d++) {
		var iri = result_data.result.data[i].patentSection;
		var v_label = result_data.result.data[i].patentSubject;
		//var v_cat = data[d]['pin'].value;
		// var v_point = data[d]['point'].value.replace("Point","").replace("(","").replace(")","");
		// var point = v_point.split(" ");
		v_lat = result_data.result.data[i].lat ;
		v_long = result_data.result.data[i].lng ;

		// var v_update = data[d]['update'].value;
		// var ms = Date.parse(v_update);
		// var date = new Date(ms);
		//var d1 = new Date(ms1);
		//print(d1.toString());

		if ( (iri.indexOf(cat) != -1) || (cat=='all') ) {
		//カスタマイズアイコンを利用する場合
			var icon = userIcon2;
		  if(iri.indexOf("化学") != -1){
				icon = userIcon;
			}

			var mapMarker = L.marker([v_lat, v_long], {icon: icon});
		//	var mapMarker = L.marker([v_lat, v_long]);
			   mapMarker.addTo(map);
			   mapMarker.bindPopup('<b>'+v_label+'</b><br>'+v_lat +","+v_long
						+'<br><a href="'+iri+'" target="_blank">'+iri+'</a>'
					//	+'<br>更新日:'+date.toString()
					   );
			}
   }//For文の終わり

}
