var title ='';
var url ='';
var all ='';
var keywords ='';
var limit=11;

$(window).load(function() {

	$.ajax('https://opendata.resas-portal.go.jp/api/v1/industry/patent/list',
		{
			type: 'get',
			headers: {
					'X-API-KEY': "s36YFEiIAeJR1bYgkPSLXyeVPRQIrF79xVEJ9ydo",
			},
			data: {
				year:"2014",
				mode:"1",
				prefCode:"26",  //京都府
				cityCode:"26366",//精華町
				patentHolderId:"-",
				sort1:"1",
				sort2:"1",
				offset:"0",
				addTec:"_",
			},//data: { query: $('#keyword').val() },
			dataType: 'json'
		}
	)
	// 検索成功時にはページに結果を反映
	.done(function(result) {
		//window.alert(JSON.stringify(getParameter()));
		var parm = getParameter();
		var cat =  parm.cat;
		// if("".length=<0){
		// 	cat = "all";
		// }
		//window.alert(cat);

		// else{
		// 	cat = null;
		// }
		showMAP(result,'Map',cat);
		//result_table(d.results.bindings);

			// var json_text = JSON.stringify(result_data);
			// document.getElementById("resas_data").innerHTML += json_text;
			// window.alert('OK!');
	/*	 for ( i = 0; i < result_data.result.data.length; i++ ) {
							document.getElementById("resas_data").innerHTML +=
							result_data.result.data[i].patentSection +"-"+
							result_data.result.data[i].patentSubject +"\t"+
							result_data.result.data[i].lat + ","+
							result_data.result.data[i].lng + "<br />";
	}*/
		// 結果リストをクリア
	/*  $('#result').empty();
		// <Question>要素（個々の質問情報）を順番に処理
		$('Question', data).each(function() {
			// <Url>（詳細ページ）、<Content>（質問本文）を基にリンクリストを生成
			$('#result').append(
				$('<li></li>').append(
					$('<a></a>')
						.attr({
							href: $('Url', this).text(),
							target: '_blank'
						})
						.text($('Content', this).text().substring(0, 255) + '...')
				)
			);*/
	//  });
	})
	// 検索失敗時には、その旨をダイアログ表示
	.fail(function() {
		window.alert('正しい結果を得られませんでした。');
	});


	$('#result_div').hide();

});






//SPARQLクエリの結果を元に表示する情報を生成する
//結果表示用の関数【テーブル表示】
function result_table(data){
	 var result_div = $('#result_div');

	var table = $('#result_list')[0];


	if (table == undefined) {
		result_div.append($('<table border="1"></table>').attr({
			'id' : 'result_list',
			'class' : 'table'
		}));
		table = $('#result_list')[0];
	}

	while (table.rows.length > 0) {
		table.deleteRow(0); // 行を追加
	}

	if (data instanceof Array) {
		result_div.show();
		// ヘッダ
		var header = table.createTHead(); // 行を追加
		var headerRow = header.insertRow(0);

		id = 1;
		for (var d = 0; d < data.length; d++) {
			var row1 = table.insertRow(d + 1); // 行を追加

			if (d == 0) {
				for ( var key in data[0]) {
					var th = document.createElement('th');
					var label = key;
					th.innerHTML = key;
					headerRow.appendChild(th);
				}
			}

			var i = 0;
			for ( var key in data[d]) {
				var cell = row1.insertCell(i++); // ２つ目以降のセルを追加
				var value = data[d][key];
				if (value.value != undefined){
					value = value.value;
				}
				if (value == null) {
					value = '';
				}

				var link = true;
				if (link) {
					if (value != null && value.indexOf("http://") == 0) {
						value = '<a href="'+value+'" target="_blank">'
								+ value + '</a>';
					}
				}
				cell.innerHTML = value;
			}
		}
	}
};


//GETパラメータの処理
function getParameter()
{
    var result = {};
    if( 1 < window.location.search.length )
    {
        var query = window.location.search.substring( 1 );

        var parameters = query.split( '&' );

        for( var i = 0; i < parameters.length; i++ )
        {
            var element = parameters[ i ].split( '=' );

            var paramName = decodeURIComponent( element[ 0 ] );
            var paramValue = decodeURIComponent( element[ 1 ] );

            result[ paramName ] = paramValue;
        }
    }
    return result;
}
