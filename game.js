var map, addP, json, selected = -1,
    player = {
        money: 0,
        name: 'Player',
        controlOf: []
    },
    showStats = function (i) {
        if (i > -1) {
            selected = i
            $('.stats').html('<h1>' + json[i].name + '</h1><h2>Stats</h2><ul><li><label>Population: </label>' + json[i].population + '<li><label>Population Density: </label>' + json[i].density + '<li><label>Money: </label>' + json[i].gva + '<li><label>Crime: ' + json[i].crime + '<li><label>Schools: </label>' + json[i].schools + '<li><label>Hospitals: </labels>' + json[i].hospitals + '</ul><ul id="bars"><li><i class="icon-minus icon-large"></i><span id="happiness" class="bar"><span style="width: 50%;"></span></span><i class="icon-plus icon-large"></i></li><li><i class="icon-bolt icon-large"></i><span id="oppression" class="bar"><span style="width: 50%;"></span></span><i class="icon-bolt icon-large"></i></li></ul><a class="sideB btn" href="javascript:modal();">Build</a>');
        } else {
            selected = -1
            $('.stats').html('<h1>No Selection</h1>')
        }
    },
    modal = function(){
    	m = $('#modal')
    	$('#modal h3').html(json[selected].name);
    	$('#modal .modal-body').html('YEAAAAAHHHH!')
	    m.modal('toggle');
    },
    happiness= function(j){
	    h = 50
	    if (json[j].density > 150) h -= (Math.sqrt(json[j].density - 150) / 2);else h += 10;
	    h -= json[j].crime / 3
	    h += json[j].schools / 200
	    h += Math.sqrt(json[j].hospitals) *3
	    
	    return Math.round(h)
    }


function initialize() {
	$('#modal').modal({show: false}); //Initialize the modal
	$.post("backend/user.php", { uid: "CURRENT", field: "uname" },
		function(data) {
			$('#playername').html(data);
	});
	$.post("backend/user.php", { uid: "CURRENT", field: "money" },
		function(data) {
			$('#currentmoney').html(data);
	});
    var styles = [{stylers:[{visibility:"off"}]},{featureType:"landscape",stylers:[{visibility:"on"},{color:"#ccc"}]},{featureType:"water",stylers:[{visibility:"simplified"},{color:"#408099"}]},{featureType:"landscape"}]
    var styledMap=new google.maps.StyledMapType(styles,{name:"Minimal Map"})
    var myLatLng = new google.maps.LatLng(56.46,-7.015);
    function makePath(c){
    	newA = []
    	for (i=0;i<c.length;i++){
	    	newA.push(new google.maps.LatLng(c[i][0],c[i][1]))
    	}
    	return newA
    }
    var mapOptions = {
        zoom: 5,
        center: myLatLng,
        mapTypeControlOptions: {
            mapTypeIds: []
        },
        maxZoom: 10,
        minZoom: 5,
        streetViewControl: false,
        panControl: false,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.TOP_RIGHT
        }
    }
    map = new google.maps.Map(document.getElementById('map_canvas'),mapOptions)
    addP = function (i) {
            json[i].poly = new google.maps.Polygon({
                path: makePath(json[i].path),
                strokeColor: "#ff0000",
                strokeWeight: '2',
                fillColor: '#ff0000',
                fillOpacity: '0.5',
                map: map
            })
            google.maps.event.addListener(map, 'click', function () {
                showStats(-1);
            })
            google.maps.event.addListener(json[i].poly, 'click', function () {
                showStats(i)
            })
    }
    map.mapTypes.set('Minimal Map', styledMap);
    map.setMapTypeId('Minimal Map');
    
json = [{id:"0",name:"London",population:"8174000",density:"5200",gva:"30385",crime:"104",schools:"4764",hospitals:"80",path:[[51.7,-.4339],[51.71,-.4284],[51.71,-.379],[51.7,-.3309],[51.71,-.2732],[51.68,-.2252],[51.68,-.1771],[51.68788231035757,-.157928466796875],[51.691287641824474,-.10986328125],[51.68277383281327,-.061798095703125],[51.678516327862134,.009613037109375],[51.678516327862134,.031585693359375],[51.68788231035757,.0823974609375],[51.68958500811337,.098876953125],[51.64699834847127,.207366943359375],[51.60181277107468,.270538330078125],[51.558289817660665,.2911376953125],[51.42490192575532,.237579345703125],[51.36320660581431,.15380859375],[51.30657945585936,.1593017578125],[51.267929925864756,.01373291015625],[51.26535213392538,-.14556884765625],[51.25589899305907,-.2252197265625],[51.269648373496736,-.25543212890625],[51.2928411273273,-.2911376953125],[51.30743796487254,-.41473388671875],[51.33833359386697,-.487518310546875],[51.415481636209535,-.542449951171875],[51.534377136326285,-.50537109375],[51.56768064709022,-.536956787109375],[51.61545844207285,-.52734375],[51.66914840783795,-.490264892578125]]},{id:"1",name:"North East England",population:"2597000",density:"302",gva:"15688",crime:"59",schools:"1967",hospitals:"28",path:[[55.78892895389265,-2.04345703125],[55.61558902526751,-1.790771484375],[55.50374985927514,-1.58203125],[55.166318941250886,-1.58203125],[54.882927024213885,-1.373291015625],[54.572061655658544,-.94482421875],[54.54020652089137,-.6591796875],[54.48918653875086,-1.417236328125],[54.46365264504479,-1.988525390625],[54.42532191246645,-2.340087890625],[54.75633118164471,-2.79052734375],[55.03431871502809,-3.021240234375]]},{id:"2",name:"North West England",population:"7052000",density:"498",gva:"17433",crime:"70",schools:"5469",hospitals:"49",path:[[55.02802211299252,-3.087158203125],[54.76267040025495,-2.823486328125],[54.49556752187406,-2.603759765625],[54.406143090319674,-2.296142578125],[54.12382170046237,-2.537841796875],[54.04003822492974,-2.493896484375],[53.9560855309879,-2.2412109375],[53.8460456413833,-2.08740234375],[53.657661020298,-2.08740234375],[53.48804553605622,-1.856689453125],[53.50111704294316,-1.988525390625],[53.30462107510271,-2.0654296875],[53.225768435790194,-1.99951171875],[52.9751081817353,-2.493896484375],[52.94201777829491,-2.8125],[53.07422751310222,-2.8564453125],[53.28492154619621,-3.109130859375],[53.48804553605622,-3.1201171875],[53.92375094101389,-3.05419921875],[53.969012350740314,-2.889404296875],[54.02713344412541,-2.889404296875],[54.10450206317112,-2.7685546875],[54.194583360162646,-2.867431640625],[54.16243396806779,-2.9443359375],[54.20101023973888,-3.076171875],[54.04003822492974,-3.197021484375],[54.09161730232633,-3.284912109375],[54.271639968447985,-3.18603515625],[54.213861000644926,-3.306884765625],[54.41253702796794,-3.504638671875],[54.508326500290735,-3.603515625],[54.77534585936447,-3.482666015625],[54.93345430690937,-3.482666015625],[55.034318715028064,-3.065185546875]]},{id:"3",name:"Yorkshire & the Humber",population:"5284000",density:"343",gva:"16880",crime:"74",schools:"4117",hospitals:"69",path:[[53.41,-1.11],[53.3,-1.26],[53.34,-1.43],[53.32,-1.62],[53.45,-1.75],[53.55,-1.9],[53.65,-2.05],[53.84,-2.05],[53.96,-2.19],[54.02,-2.36],[54.1,-2.53],[54.23,-2.4],[54.38,-2.29],[54.46,-2.13],[54.45,-1.95],[54.52,-1.78],[54.51,-1.59],[54.48,-1.42],[54.51,-1.24],[54.5,-1.05],[54.48,-.87],[54.52,-.69],[54.45,-.52],[54.31,-.41],[54.18,-.27],[54.13,-.09],[53.98,-.2],[53.84,-.09],[53.72,.05],[53.55,-.01],[53.47,-.17],[53.61,-.29],[53.56,-.46],[53.46,-.61],[53.46,-.79],[53.47,-.98],[53.41,-1.11]]},{id:"4",name:"East Midlands",population:"4533000",density:"290",gva:"17698",crime:"67",hospitals:"23",schools:"3260",path:[[52.64,-.5],[52.52,-.38],[52.38,-.46],[52.25,-.56],[52.19,-.71],[52.13,-.87],[52.08,-1.02],[51.99,-1.16],[52.04,-1.31],[52.2,-1.26],[52.35,-1.21],[52.5,-1.3],[52.55,-1.46],[52.67,-1.57],[52.83,-1.58],[52.87,-1.74],[53.03,-1.76],[53.17,-1.83],[53.21,-1.99],[53.37,-2.03],[53.5,-1.94],[53.47,-1.78],[53.37,-1.65],[53.32,-1.49],[53.32,-1.33],[53.33,-1.17],[53.43,-1.04],[53.46,-.88],[53.52,-.73],[53.46,-.57],[53.52,-.42],[53.61,-.28],[53.48,-.19],[53.52,-.03],[53.5,.13],[53.38,.24],[53.25,.33],[53.09,.33],[53.03,.18],[52.92,.06],[52.84,.2],[52.72,.08],[52.67,-.07],[52.66,-.23],[52.65,-.39],[52.64,-.5]]},{id:"5",name:"West Midlands",population:"5602000",density:"431",gva:"17161",crime:"66",hospitals:"39",schools:"4122",path:[[52.69,-1.59],[52.57,-1.51],[52.52,-1.38],[52.45,-1.26],[52.32,-1.24],[52.19,-1.3],[52.1,-1.4],[52.02,-1.51],[51.98,-1.65],[52.09,-1.73],[52.07,-1.87],[52.03,-2.01],[52,-2.14],[51.98,-2.28],[52,-2.42],[51.89,-2.5],[51.84,-2.64],[51.86,-2.77],[51.92,-2.9],[51.96,-3.03],[52.07,-3.12],[52.21,-3.1],[52.26,-2.97],[52.36,-3.07],[52.42,-3.2],[52.5,-3.08],[52.64,-3.07],[52.73,-2.97],[52.79,-3.09],[52.93,-3.05],[52.94,-2.91],[52.91,-2.78],[52.99,-2.66],[52.95,-2.53],[52.99,-2.39],[53.08,-2.28],[53.16,-2.17],[53.19,-2.04],[53.2,-1.9],[53.11,-1.79],[52.98,-1.83],[52.87,-1.75],[52.84,-1.61],[52.74,-1.7],[52.69,-1.59]]},{id:"6",name:"East of England",population:"5847000",density:"306",gva:"20524",crime:"59",hospitals:"31",schools:"4055",path:[[52.96187505907605,.4833984375],[52.822682558069324,.24169921875],[52.66305767075937,-.02197265625],[52.669720383688194,-.318603515625],[52.16045455774708,-.50537109375],[51.83577752045251,-1.142578125],[51.73383267274116,-1.043701171875],[51.49506473014373,-.94482421875],[51.39920565355381,-.63720703125],[51.385495069223225,-.538330078125],[51.69979984974196,-.263671875],[51.66574141105715,.010986328125],[51.66574141105715,.17578125],[51.5634123286759,.263671875],[51.46085244645552,.263671875],[51.31001339554937,.142822265625],[51.50190410761816,.428466796875],[51.55658218576256,.911865234375],[51.81540697949439,1.219482421875],[51.93749209045437,1.29638671875],[52.099756925757276,1.636962890625],[52.70967533219885,1.724853515625],[52.981723223906855,.911865234375]]},{id:"7",name:"South East England",population:"8635000",density:"452",gva:"22624",crime:"63",hospitals:"26",schools:"5850",path:[[51.48822432632349,.46142578125],[51.303145259199084,.230712890625],[51.23440735163461,-.186767578125],[51.37178037591742,-.560302734375],[51.55658218576256,-.999755859375],[51.795027225829166,-1.16455078125],[52.07275365395322,-.72509765625],[52.10650519075635,-.87890625],[51.984880139916655,-1.219482421875],[52.13348804077152,-1.307373046875],[51.984880139916655,-1.56005859375],[51.76104049272955,-1.658935546875],[51.590722643120166,-1.571044921875],[51.43346414054374,-1.51611328125],[51.048301133312265,-1.6259765625],[50.9791824266019,-1.812744140625],[50.80593472676911,-1.77978515625],[50.76425935711649,-1.77978515625],[50.77120783188785,-1.3623046875],[50.77120783188785,-.977783203125],[50.85450904781298,-.230712890625],[50.6947178381929,.296630859375],[50.92381327191295,.823974609375],[50.89610395554361,.955810546875],[51.08282186160981,1.16455078125],[51.158676864423676,1.40625],[51.351200630656,1.417236328125]]},{id:"8",name:"South West England",population:"5289000",density:"222",gva:"18195",crime:"61",schools:"3898",hospitals:"39",path:[[52.11,-1.77],[51.94,-1.62],[51.73,-1.69],[51.52,-1.59],[51.3,-1.53],[51.09,-1.64],[51.01,-1.85],[50.79,-1.8],[50.62,-1.96],[50.62,-2.19],[50.63,-2.41],[50.67,-2.64],[50.73,-2.86],[50.7,-3.09],[50.63,-3.3],[50.52,-3.51],[50.32,-3.6],[50.21,-3.81],[50.3,-4.02],[50.34,-4.24],[50.34,-4.47],[50.35,-4.69],[50.22,-4.88],[50.13,-5.09],[50.08,-5.31],[50.11,-5.54],[50.24,-5.35],[50.35,-5.15],[50.54,-5.02],[50.6,-4.8],[50.75,-4.63],[50.96,-4.54],[50.99,-4.32],[51.19,-4.21],[51.22,-3.98],[51.24,-3.75],[51.23,-3.53],[51.18,-3.3],[51.2,-3.08],[51.39,-2.96],[51.49,-2.75],[51.7,-2.67],[51.88,-2.52],[52.02,-2.34],[52.01,-2.12],[52.03,-1.89],[52.11,-1.77]]},{id:"9",name:"Wales",population:"3064000",density:"148",gva:"19530",crime:"63",schools:"1833",hospitals:"106",path:[[51.62,-3.88],[51.56,-4.05],[51.54,-4.24],[51.66,-4.09],[51.68,-4.28],[51.77,-4.45],[51.73,-4.63],[51.64,-4.79],[51.61,-4.98],[51.72,-5.13],[51.87,-5.23],[51.99,-5.08],[52.03,-4.9],[52.11,-4.73],[52.14,-4.55],[52.21,-4.38],[52.27,-4.2],[52.42,-4.09],[52.6,-4.12],[52.79,-4.13],[52.94,-4.02],[52.91,-4.21],[52.89,-4.39],[52.81,-4.56],[52.78,-4.74],[52.92,-4.62],[52.99,-4.45],[53.12,-4.32],[53.22,-4.16],[53.26,-3.98],[53.32,-3.8],[53.29,-3.62],[53.34,-3.43],[53.31,-3.25],[53.23,-3.08],[53.12,-2.93],[52.99,-2.8],[52.96,-2.98],[52.88,-3.15],[52.76,-3.01],[52.6,-3.1],[52.46,-3.22],[52.35,-3.07],[52.17,-3.11],[51.99,-3.07],[51.92,-2.9],[51.84,-2.73],[51.67,-2.66],[51.56,-2.81],[51.54,-2.99],[51.45,-3.16],[51.39,-3.33],[51.4,-3.52],[51.48,-3.69],[51.6,-3.83],[51.62,-3.88]]},{id:"10",name:"Northern Ireland",population:"1810900",density:"131",gva:"19603",crime:"55",schools:"1210",hospitals:"33",path:[[55.2,-6.67],[55.25,-6.49],[55.23,-6.31],[55.22,-6.13],[55.05,-6.04],[54.93,-5.89],[54.85,-5.73],[54.7,-5.84],[54.67,-5.66],[54.58,-5.5],[54.4,-5.46],[54.54,-5.58],[54.37,-5.67],[54.24,-5.8],[54.09,-5.91],[54.03,-6.08],[54.1,-6.26],[54.06,-6.44],[54.04,-6.62],[54.19,-6.73],[54.32,-6.86],[54.42,-7.03],[54.31,-7.18],[54.14,-7.26],[54.15,-7.45],[54.17,-7.64],[54.21,-7.85],[54.34,-7.98],[54.44,-8.16],[54.54,-8],[54.56,-7.82],[54.72,-7.72],[54.79,-7.54],[54.94,-7.43],[55.05,-7.28],[55.04,-7.09],[55.17,-6.96],[55.17,-6.77],[55.2,-6.67]]},{id:"11",name:"Scotland",population:"5062011",density:"65",gva:"26766",crime:"82",schools:"2755",hospitals:"222",path:[[55.95,-3.08],[56,-2.55],[55.83,-2.05],[55.38,-2.34],[55.14,-2.81],[54.98,-3.32],[54.86,-3.84],[54.87,-4.37],[54.84,-4.9],[55.36,-4.77],[55.87,-4.89],[56,-5.4],[55.49,-5.52],[56.01,-5.6],[56.51,-5.42],[56.58,-5.94],[56.98,-5.6],[57.45,-5.86],[57.92,-5.62],[57.85,-5.1],[58.37,-5.17],[58.55,-4.67],[58.56,-4.14],[58.62,-3.61],[58.65,-3.08],[58.24,-3.43],[57.99,-3.89],[57.65,-4.31],[57.62,-3.78],[57.71,-3.25],[57.69,-2.72],[57.67,-2.18],[57.15,-2.08],[56.76,-2.43],[56.46,-2.87],[56.06,-3.22],[56.08,-3.75],[55.99,-3.23],[55.95,-3.08]]}]
}
function run(){
	for(x=0;x<12;x++){
		addP(x);
	}
	
}
