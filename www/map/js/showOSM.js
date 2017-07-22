function showMAP(data,mapid){
	   var lat            = 35.678056;
	   var lon            = 139.714722;

   // 位置とズームを決めてマップを描画
   var map = L.map(mapid,{
       center:[lat, lon],
       zoom: 11
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
   for (var d = 0; d < data.length; d++) {
		var iri = data[d]['s'].value;
		var v_label = data[d]['label'].value;
		//var v_cat = data[d]['pin'].value;
		var v_point = data[d]['point'].value.replace("Point","").replace("(","").replace(")","");
		var point = v_point.split(" ");
		v_lat = point[1];
		v_long = point[0];
		var v_update = data[d]['update'].value;
		var ms = Date.parse(v_update);
		var date = new Date(ms); 
		//var d1 = new Date(ms1);
		//print(d1.toString());
		

//カスタマイズアイコンを利用する場合
	var icon = userIcon;
        if(today<date){
		icon = userIcon2;
	}
	
	var mapMarker = L.marker([v_lat, v_long], {icon: icon});
//	var mapMarker = L.marker([v_lat, v_long]);
	   mapMarker.addTo(map);
	   mapMarker.bindPopup('<b>'+v_label+'</b><br>'+v_lat +","+v_long
				+'<br><a href="'+iri+'" target="_blank">'+iri+'</a>'
				+'<br>更新日:'+date.toString()
			   );
   }

}



