function ei(id){
	return document.getElementById(id);
}
function sps(tower){//speed per sec
	if(tower<13)
		return parseInt(tower)/60;
	else if(tower>12 && tower<37)
		return (parseInt(tower)+10)/60;
}
var s1,s2,s3,t1,t2,t3;
function tvalid(el) {
	if(!isNaN(el.value)){
		if (el.value<0){
			el.value=0;
		}else if(el.value>36){
			el.value=36;
		}
	}else{
		el.value=12;
	}
	switch(el.id){
		case 't01':
			t1=sps(el.value);
			ei('spd1').innerText=(t1*60).toFixed(2);
		break;
		case 't02':
			t2=sps(el.value);
			ei('spd2').innerText=(t2*60).toFixed(2);
		break;
		case 't03':
			t3=sps(el.value);
			ei('spd3').innerText=(t3*60).toFixed(2);
		break;
	}
}
function svalid(el) {
	if(!isNaN(el.value)){
		if (el.value<0){
			el.value=0;
		}else if(el.value>20000){
			el.value=20000;
		}
	}else{
		el.value=0;
	}
	switch(el.id){//progress
		case 's01':
			s1=1;
			ei('m1').style.width=(el.value)/200+"%";
		break;
		case 's02':
			s2=1;
			ei('m2').style.width=(el.value)/200+"%";
		break;
		case 's03':
			s3=1;
			ei('m3').style.width=(el.value)/200+"%";
		break;
	}
}
var s=1;
function speedC() {//speed change
	if(ei('speed').selectedIndex!=0) s=ei('speed').selectedIndex;
}
function change(g) {
	switch(g){
		case 'g1':
			var	p1=parseFloat(ei('s01').value);//now score
			p1+=t1*s;//now score=now score+towerspeed*speed speedC()
			ei('s01').value=p1;
			ei('m1').style.width=p1/200+"%";
			if(p1>=20000) clearInterval(play);
		break;
		case 'g2':
			var	p2=parseFloat(ei('s02').value);
			p2+=t2*s;
			ei('s02').value=p2;
			ei('m2').style.width=p2/200+"%";
			if(p2>=20000) clearInterval(play);
		break;
		case 'g3':
			var	p3=parseFloat(ei('s03').value);
			p3+=t3*s;
			ei('s03').value=p3;
			ei('m3').style.width=p3/200+"%";
			if(p3>=20000) clearInterval(play);
		break;
	}
}
play = setInterval(function(){
	if(typeof s1 !== 'undefined' && typeof t1 !== 'undefined'){
		change('g1');
	}
	if(typeof s2 !== 'undefined' && typeof t2 !== 'undefined'){
		change('g2');
	}
	if(typeof s3 !== 'undefined' && typeof t3 !== 'undefined'){
		change('g3');
	}
	end();
}, 1000);
function end() {//sec later
	var a1,a2,a3;
	if(typeof s1 !== 'undefined' && typeof t1 !== 'undefined'){
		a1=20000-parseFloat(ei('s01').value);
		a1/=t1;
	}
	if(typeof s2 !== 'undefined' && typeof t2 !== 'undefined'){
		a2=20000-parseFloat(ei('s02').value);
		a2/=t2;
	}
	if(typeof s3 !== 'undefined' && typeof t3 !== 'undefined'){
		a3=20000-parseFloat(ei('s03').value);
		a3/=t3;
	}
	var et=Math.min(a1,a2,a3); //TIME : who is fastest reach score 20000
	if(isNaN(et)) et=0;
	ei('endtime').innerText=(et/60).toFixed(2);

	ei('es1').innerText=(parseFloat(ei('s01').value)+(et*t1)).toFixed(2);	//now score + (endtime*towerspeed)
	ei('es2').innerText=(parseFloat(ei('s02').value)+(et*t2)).toFixed(2);
	ei('es3').innerText=(parseFloat(ei('s03').value)+(et*t3)).toFixed(2);	
}