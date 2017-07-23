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

   var icon_w = 20;//14;
   var icon_h = 20;//20;

   var userIcon = L.icon({
       iconUrl: 'icon/image001.png',
       iconSize:     [icon_w, icon_h], // size of the icon
       iconAnchor: [icon_w/2, icon_h/2],
   });
   var Seikatsu = L.icon({
       iconUrl: 'icon/Seikatsu.png',
       iconSize:     [icon_w, icon_h], // size of the icon
       iconAnchor: [icon_w/2, icon_h/2],
   });
	 var Unyu = L.icon({
       iconUrl: 'icon/Unyu.png',
       iconSize:     [icon_w, icon_h], // size of the icon
       iconAnchor: [icon_w/2, icon_h/2],
   });
	 var Kagaku = L.icon({
       iconUrl: 'icon/Kagaku.png',
       iconSize:     [icon_w, icon_h], // size of the icon
       iconAnchor: [icon_w/2, icon_h/2],
   });
	 var Kami = L.icon({
       iconUrl: 'icon/Kami.png',
       iconSize:     [icon_w, icon_h], // size of the icon
       iconAnchor: [icon_w/2, icon_h/2],
   });
	 var Kozo = L.icon({
       iconUrl: 'icon/Kozo.png',
       iconSize:     [icon_w, icon_h], // size of the icon
       iconAnchor: [icon_w/2, icon_h/2],
   });
	 var Kikai = L.icon({
       iconUrl: 'icon/Kikai.png',
       iconSize:     [icon_w, icon_h], // size of the icon
       iconAnchor: [icon_w/2, icon_h/2],
   });
	 var Butsuri = L.icon({
       iconUrl: 'icon/Butsuri.png',
       iconSize:     [icon_w, icon_h], // size of the icon
       iconAnchor: [icon_w/2, icon_h/2],
   });
	 var Denki = L.icon({
       iconUrl: 'icon/Denki.png',
       iconSize:     [icon_w, icon_h], // size of the icon
       iconAnchor: [icon_w/2, icon_h/2],
   });
	 var Robot = L.icon({
       iconUrl: 'icon/Robot.png',
       iconSize:     [icon_w, icon_h], // size of the icon
       iconAnchor: [icon_w/2, icon_h/2],
   });
	 var Plant = L.icon({
       iconUrl: 'icon/Plant.png',
       iconSize:     [icon_w, icon_h], // size of the icon
       iconAnchor: [icon_w/2, icon_h/2],
   });


   var today = new Date("2017-04-24T00:00:00Z");

	 // SPARQLクエリを　"/*"の次の行から"*/"の前の行に書く
	 var query = (function () {/*
		 prefix bp: <http://data.lodosaka.jp/keihanna/data/property/>
	prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
	prefix xsd: <http://www.w3.org/2001/XMLSchema>
	prefix schema: <http://schema.org/>
	prefix geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>

	SELECT DISTINCT ?label ?cate ?lat ?long ?web
		 WHERE
		 {
		   ?s rdfs:label ?label ;
		      geo:lat ?lat ;
		      geo:long ?long;
	          bp:category ?cate;
	          schema:address ?addr;
		      schema:WebSite ?web.
	     }
	 */}).toString().match(/\n([\s\S]*)\n/)[1];

	 	qr = sendQuery("http://lod.hozo.jp/repositories/keihanna",query);
	 		qr.fail(
	 			function (xhr, textStatus, thrownError) {
	 				alert("Error: A '" + textStatus+ "' occurred.");
	 			}
	 		);
	 		qr.done(
	 			function (d) {
	 				//showMAP(d.results.bindings,'Map');
	 				//result_table(d.results.bindings);
	 				//download_result(d.results.bindings);
					window.alert(JSON.stringify(d));
	 			}
	 		);





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

		var cat_lbl = "all";
		if(cat == "Seikatsu"){
			cat_lbl == "生活";
		}else if(cat == "Unyu"){
			cat_lbl = "運輸";
		}else if(cat == "Kagaku"){
			cat_lbl = "化学";
		} if(cat == "Kami"){
			cat_lbl = "紙";
		} if(cat == "Kozo"){
			cat_lbl = "構造物";
		} if(cat == "Kikai"){
			cat_lbl = "機械";
		} if(cat == "Butsuri"){
			cat_lbl = "物理学";
		} if(cat == "Denki"){
			cat_lbl = "電気";
		} if(cat == "Robot"){
			cat_lbl = "構造物";
//			cat_lbl = "ロボット";
		} if(cat == "Plant"){
			cat_lbl = "生活";
//			cat_lbl = "植物";
		}


		if ( (iri.indexOf(cat_lbl) != -1)	|| (cat=='all') ) {
		//カスタマイズアイコンを利用する場合
			var icon = Kagaku;
		  if(iri.indexOf("生活") != -1){
				icon = Plant;
			  //icon = Seikatsu;
			}else if(iri.indexOf("運輸") != -1){
				icon = Unyu;
			}else if(iri.indexOf("化学") != -1){
				icon = Kagaku;
			}else if(iri.indexOf("紙") != -1){
				icon = Kami;
			}else if(iri.indexOf("構造") != -1){
				icon = Kozo;
			}else if(iri.indexOf("機械") != -1){
				icon = Robot;
				//icon = Kikai;
			}else if(iri.indexOf("物理") != -1){
				icon = Butsuri;
			}else if(iri.indexOf("電気") != -1){
				icon = Denki;
			}else if(iri.indexOf("ロボット") != -1){
				icon = Robot;
			}else if(iri.indexOf("植物") != -1){
				icon = Plant;
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
