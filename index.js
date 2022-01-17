var URLSearchParams = require('@ungap/url-search-params');

exports.corssupported= function () {
  return "withCredentials" in (new XMLHttpRequest());
}

function formatAa(vejnavn,husnr,supplerendebynavn,postnr,postnrnavn,enlinje) {
	let separator= (enlinje || typeof enlinje != 'undefined')?", ":"<br/>";
	supplerendebynavn= supplerendebynavn?separator + supplerendebynavn:"";
	return vejnavn + " " + husnr + supplerendebynavn + separator + postnr + " " + postnrnavn
}

exports.formatAdgangsadresse= function (record, enlinje) {
	if (record.vejstykke) {
		return formatAa(record.vejstykke.navn, record.husnr, record.supplerendebynavn, record.postnummer.nr, record.postnummer.navn, enlinje);
	}
	else {
		return formatAa(record.vejnavn, record.husnr, record.supplerendebynavn, record.postnr, record.postnrnavn, enlinje);
	}	
}

exports.formatAdresse= function (mini, enlinje) {
	let separator= (enlinje || typeof enlinje != 'undefined')?", ":"<br/>";
	let etagedør= (mini.etage?", "+mini.etage+".":"") + (mini.dør?" "+mini.dør:"");

	let supplerendebynavn= mini.supplerendebynavn?separator + mini.supplerendebynavn:"";
	return mini.vejnavn + " " + mini.husnr + etagedør + supplerendebynavn + separator + mini.postnr + " " + mini.postnrnavn
}

exports.danUrl= function (path, query) { 
  var params = new URLSearchParams();
  Object.keys(query).forEach(function(key) {params.set(key, query[key])});
  return path + "?" + params.toString();
}

exports.getQueryVariable= function (variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0; i<vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
}
